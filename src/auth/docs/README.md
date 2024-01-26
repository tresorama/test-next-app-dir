# How to setup

With Next.js App Router (`v13+`) you need to use `next-auth v5`.
To install it `npm i next-auth@beta`.

## Overview 

This setup is compose of these parts:

- define the configuration and the auth flow in `src/auth/auth.config.ts`
- add entrypoints to your Next.js app to execute the logic defined in `src/auth/auth.config.ts`
- define providers (Google, Github, Credentails, ...)
- (Optional) Migrate to custom login page instead of default one

## Process

### 1. Define Configration of Auth-Flow

- Step 1
  Create a `.env.local` file to store secrets.  
  Generate a random string with this command `openssl rand -base64 32`  
  Copy that code into `.env.local` as

  ```bash
  # in .env.local

  # next-auth
  # generate random string => openssl rand -base64 32
  AUTH_SECRET="paste here"
  ```

  This "secret" will be used by `next-auth` to encrypt things.
  in `PRODUCTION` you must define this "secret" in your deploy service (Vercel, Netlify, ...) instead of an .env.local file.

- Step 2
  Create a `src/auth/auth.config.ts` file (you can name it and locate it where you want, this is only my convention)  

  ```ts
  // in src/auth/auth.config.ts
  import NextAuth, { type NextAuthConfig } from "next-auth";

  const authConfig: NextAuthConfig = {
    providers: [
      // every "provider" (Github, Google, Apple, Credentials, ...) that 
      // you want that your user can use to authenticated will be defined here
      // more on this later...
    ],
    callbacks: {
     // this is where we define the entire "Auth Flow" logic
      // more on this later...
    },
  }
  
  export const {
    auth,
    handlers,
    signIn,
    signOut,
  } = NextAuth(authConfig);
  ```

- Step 3
  Independently on which providers you want to support you must handle the auth flow.
  This is because `next-auth` (semi)automatically handles the `Authentication` phase of the flow.  
  But does not handle the `Authorization` becasue it cannot known for example which "pages/routes" are protected and which aren't.  
  So you must define some `authConfig.callbacks`.  
  At least you must define `authConfig.callbacks.authorize` function.  
  `authConfig.callbacks.authorize` receives `auth` (that represent the `session`) and the `request` object.  
  If user:
  - is logged in, the `auth` object contains `auth.user` with some info about it (these info cames from the provider that handled the "authentication")
  - is NOT logged in, the `auth` object contains `auth.user === null` (means that provider that handled the "authentication" rejected auth (usually due to wrong credentails)
  Here is a working demo
  
  ```ts
  // in src/auth/auth.config.ts
  
  // .. omitted

  const authConfig: NextAuthConfig = {
    // ... omitted
    callbacks: {
      // The `authorized` callback is used to verify if the request 
      // is authorized to access a page via Next.js Middleware. 
      // It is called before a request is completed, and 
      // it receives an object with the auth and request properties. 
      // The auth property contains the user's session, 
      // and the request property contains the incoming request.
      // Return :
      //   - `true` if user IS authorized, allowing the request
      //   - `false` if user is NOT authorized, redirecting to login page
      //   - return Response or NextResponse when you want to redirect
      authorized({ auth, request }) {
        const url = request.nextUrl;

        console.log({
          what: "auth.callbacks.authorize",
          pathname: url.pathname,
        });

        // if user is logged allow the request (redirecting if necessary)
        const userIsLogged = Boolean(auth?.user);
        if (userIsLogged) {
          // if this request is the request after successfull login
          // the url is like http://localhost:3000/?callbackUrl="http:..."
          // in that case redirect to the page that triggered the auth flow
          const callbackUrl = request.nextUrl.searchParams.get('callbackUrl') ?? '';
          if (callbackUrl) {
            console.log({ result: "user is logged and callback url in search params => redirect to callback url" });
            return Response.redirect(callbackUrl);
          }

          console.log({ result: "user is logged => return true => allow the request" });
          return true;// allow the request
        }

        // user is not logged, check if the request is protected
        // if is protected, redirect to login page
        // otherwise allow the request
        const requestIsProtected = [
          () => url.pathname.startsWith("/dashboard"),
          () => url.pathname.startsWith("/protected"),
        ].some(fn => fn());

        if (!requestIsProtected) {
          console.log({ result: "user is not logged and request is not protected => return true => allow request" });
          return true;// allow the request
        }

        console.log({ result: "user is not logged and request is protected => return false => redrect to login" });
        return false;// redirect to login page

      },
    }
  }
  ```

### 2. Mount the Auth-Flow to entrypoints in Next.js

- Step 1
  In this code of before

  ```ts
  // in src/auth/auth.config.ts
  import NextAuth, { type NextAuthConfig } from "next-auth";

  const authConfig: // ... omitted
  
  export const {
    auth, // NOTE ME
    handlers, // NOTE ME
    signIn,
    signOut,
  } = NextAuth(authConfig);
  ```

  You passed `authConfig` to `NextAuth` intializer.  
  This step create `auth` and `handlers` that you need to mount to 2 differnet point of your Next.js app.  
  - `auth` is for [`Next.js Middleware`](https://nextjs.org/docs/app/building-your-application/routing/middleware)
    Create a `src/middleware.ts` and put the following code inside.  
    This middleware is default invoked at every server request.  
    This default behavior can be configured with `matcher` ([learn more about Next.js Middleware](https://nextjs.org/docs/app/building-your-application/routing/middleware))

    ```ts
    // in src/middleware.ts
    import { auth as handleAuth } from "@/auth/auth.config";

    export const config = {
      matcher: [
        /*
    * Match all request paths except for the ones starting with:
    * - api (API routes)
    * - _next/static (static files)
    * - _next/image (image optimization files)
    * - favicon.ico (favicon file)
    */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
      ],
    };

    export default handleAuth;
    ```

    - `handlers` is for [`Next.JS Route Hanlders`](https://nextjs.org/docs/app/building-your-application/routing/route-handlers) (API Layer endpoint)
    Create a `src/app/api/auth/[...nextauth]/route.ts` and put the following code inside.  
    In this file we export `GET` and `POST` functions.
    These functions are a requirement in Next.js Route Handlers.
    These function are used for provideing a `default login page` created by `next-auth` (more on this later)

    ```ts
    // in src/app/api/auth/[...nextauth]/route.ts
    import { handlers } from "@/auth/auth.config";
    export const { GET, POST } = handlers;
    ```

### 3. Define authentication providers

Define every providers you want to support for auth.
There are multiply "type" of providers:

- Oauth
  - Github (go to guide) ([next-auth docs](https://authjs.dev/reference/core/providers/github))
  - Google (similar to Github)
  - Apple
  - ...
- Credentials (go to guide)
- ...others

#### 3.1 OAuth provider

In this giude we use `Github` but the same process is similar to every other (Google, Apple).  
Be sure to check the offical `next-auth` page for every provider (here is the [Github one](https://authjs.dev/reference/core/providers/github), but you can check other from the left sidebar)

- Step 1
  Enable Github provider in `authConfig`  

  ```ts
  // in src/auth/auth.config.ts
  import NextAuth, { type NextAuthConfig } from "next-auth";
  import Github from "next-auth/providers/github";// NOTE ME

  const authConfig: NextAuthConfig = {
    providers: [
      Github,// NOTE ME
    ],
    // ... omitted 
  }
  
  export const {
    auth,
    signIn,
    signOut,
    handlers,
  } = NextAuth(authConfig);
  ```

- Step 2
  Be sure dev server is running (`npm run dev`).  
  Navigate to `http://localhost:3000/api/auth/providers`, and you get the following json response.  
  Copy in the clipboard the `github.callbackUrl` value.

  ```json
  {
    github: {
      id: "github",
      name: "GitHub",
      type: "oauth",
      signinUrl: "http://localhost:3000/api/auth/signin/github",
      callbackUrl: "http://localhost:3000/api/auth/callback/github" 
      // COPY ⬆︎
    }
  }
  ```

  ***NOTE: Every provider that you enable will be added to this list.***

- Step 3
  Navigate to your profile in github `https://github.com/<username>`.
  Click on your avatar on top right.  
  Go to `Settings > Developer Settings > OAuth Apps`  
  Click on `New OAuth App` on top right.
  Fiil the form:
  - Application name: whatever
  - Homepage URL:
    - `DEVELOPMENT` => `http://localhost:3000`
    - `PRODUCTION` => `https://your-domain.xxx`
  - Application Description: whatever
  - Authorization Callback URL
    - `DEVELOPMENT` => Paste the value from previous step
    - `PRODUCTION` => ??? => TODO => maybe: `https//your-domain.xxx/api/auth/callback/<provider-name>`

- Step 4
  You created an "oauth app". Now you need to get `client_id` and `client_secret`.
  After creation Github should have redirected you to a "details" page for the app.  
  Here you can copy the "Client ID" and also generate `Generate a new client secret`.
  Paste these values in `.env.local`:

  ```bash
  # in .env.local
  # ...
  AUTH_GITHUB_ID="paste client id here"
  AUTH_GITHUB_SECRET="paste client secret here"
  ```

  If you use these names `next-auth` automatically get these env var without configration from your side.  
  NOTE: the docuemtnation is misleading becasue it tells you to use :
  - `AUTH_GITHUB_CLIENT_ID` over `AUTH_GITHUB_ID` but it's wrong
  - `AUTH_GITHUB_CLIENT_SECRET` over `AUTH_GITHUB_SECRET` but it's wrong

  In case that you want a different name for env vars you need manually configure them in `src/auth/auth.config.ts`:

  ```ts
  // in src/auth/auth.config.ts
  import NextAuth, { type NextAuthConfig } from "next-auth";
  import Github from "next-auth/providers/github";

  const authConfig: NextAuthConfig = {
    providers: [
      Github({
        clientId: process.env.CUSTOM_GITHUB_ID,
        clientSecret: process.env.CUSTOM_GITHUB_SECRET,
      }),
    ],
    // ... omitted 
  }
  
  // ... omitted 
  ```

- Step 5
  Navigate to a protected route in your app as defined in `src/auth/auth.config.ts > authConfig.callbacks.autorize` code.  
  If you used the code of this guide protected routes are:
  - `/dashboard/*`
  - `/protected/*`

  Be sure to create these pages if you haven't done.
  Example: for `/dashboard` create `src/app/dashboard/page.tsx` file.  
  When you navigate to `/dashboard` you should be redirected to `api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fdashboard`.  
  This page is the "default" next-auth login page (you can customize it and override it, more on this later).
  You should see a `Sign in with Github` button that ask you to login with Github, and when successfully done it will be redirect back to `/dashboard`

#### 3.2 Use Credentials provider

- Step 1
  Enable Credentials provider in `authConfig`  

  ```ts
  // in src/auth/auth.config.ts
  import NextAuth, { type NextAuthConfig } from "next-auth";
  import Credentials from "next-auth/providers/credentials";// NOTE ME
  import { z } from "zod";// NOTE ME
  import { getUserByCredentials } from './get-user-by-credentials'


  const authConfig: NextAuthConfig = {
    providers: [
      // NOTE ME
      Credentials({
      // define which form input HTML elements next-auth must create in 
      // default "login" page for "credentails" strategy
      // NOTE: if you use custom "login" you DO NOT need these
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" }
      },

      // handle the authentication.
      // this functions receive "credentails" from the login form
      // and must do the lookup in the Database
      // and return:
      //  - `User` if succesfully login
      //  - `null` if NOT succesfully login
      async authorize(credentials, request) {
        // ensure filled form is valid (using `zod`)
        const parsedCredentials = z.object({
          username: z.string().min(3),
          password: z.string().min(3),
        }).safeParse(credentials);
        if (!parsedCredentials.success) return null;// invalid credentials

        // check if an user exists for these credentails
        const user = await getUserByCredentials(parsedCredentials.data);
        // NOTE: you need to create `getUserByCredentials` function yourself
        // below there is a starting point

        // "user" if successfully authenticated
        if (user) return user;

        // "user" is not authenticated
        return null;
      },
    }),
    ],
    // ... omitted 
  }
  
  export const {
    auth,
    signIn,
    signOut,
    handlers,
  } = NextAuth(authConfig);
  ```

  ```ts
  //  in src/auth/get-user-by-credentials.ts

  import * as bcrypt from 'bcrypt-ts';

  export const getUserByCredentials = async (credentials: { username: string, password: string; }) => {
    // TODO: migrate to a real DB
    const users = [
      {
        username: "luke",
        passwordHash: await bcrypt.hash('hhhh', 10),
        name: 'Luke',
        email: "luje@gmail.com",
      }
    ];
    type User = typeof users[number];

    // search user in db awith provided username
    const userFromDb = users.find(item => item.username === credentials.username);

    // user does not exists
    if (!userFromDb) return null;

    // check if password is correct
    const passwordIsCorrect = await bcrypt.compare(credentials.password, userFromDb.passwordHash);

    // password is incorrect
    if (!passwordIsCorrect) return null;

    // user exists and password is correct
    return {
      email: userFromDb.email,
      name: userFromDb.name,
      username: userFromDb.username,
    } satisfies Omit<User, "passwordHash">;
  };
  ```

- Step 2
  Navigate to a protected route in your app as defined in `src/auth/auth.config.ts > authConfig.callbacks.autorize` code.  
  If you used the code of this guide protected routes are:
  - `/dashboard/*`
  - `/protected/*`

  Be sure to create these pages if you haven't done.
  Example: for `/dashboard` create `src/app/dashboard/page.tsx` file.  
  When you navigate to `/dashboard` you should be redirected to `api/auth/signin?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fdashboard`.  
  This page is the "default" next-auth login page (you can customize it and override it, more on this later).
  You should see a form with:
  - `username`
  - `password`
  
  If you copied `getUserByCredentials` code from this guide you can login with `username=luke password=hhhh`

  Fill the form, and press `Sign in with Credentials`, and when successfully done it will be redirect back to `/dashboard`

### 4. Migrate login page to custom Next.js page

TODO