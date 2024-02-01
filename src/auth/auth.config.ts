import NextAuth from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import { z } from "zod";
import { getUserByCredentials } from "./get-user-by-credentials";
import Github from "next-auth/providers/github";
import { NextResponse } from "next/server";

export const {
  auth,
  signIn,
  signOut,
  handlers,
} = NextAuth({
  // debug: true,
  trustHost: true,
  session: {
    // @see https://authjs.dev/concepts/session-strategies
    // the `session` is the object that is created after a successfull login attempt
    // and it contains info about the logged user
    // you can customize what is included in the session object 
    // with `callbacks.jwt` and `callback.session`
    //
    // `strategy` defines where to store the session
    // - jwt (default): encrypt data as JWT and store it in cookie
    // - database: save in a "session" table of a DB and save a sessionID" in cookie to lookup in DB
    strategy: "jwt"
  },
  pages: {
    // replace default NextAuth pages with custom pages
    // signIn: "/auth/login"
  },
  providers: [
    Github,
    Credentials({
      // define which form input HTML elements next-auth must create in 
      // default "login" page for "credentails" strategy
      // NOTE: if you use custom "login" you DO NOT need these
      credentials: {
        username: { label: "Username" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials, request) {
        // ensure filled form is valid
        const parsedCredentials = z.object({
          username: z.string().min(3),
          password: z.string().min(3),
        }).safeParse(credentials);
        if (!parsedCredentials.success) return null;// invalid credentials

        // check if an user exists for these credentails
        const user = await getUserByCredentials(parsedCredentials.data);

        // "user" if successfully authenticated
        if (user) return user;

        // "user" is not authenticated
        return null;
      },
    }),
  ],
  callbacks: {
    // The `authorized` callback is used to verify if the request 
    // is authorized to access a page via Next.js Middleware. 
    // It is called before a request is completed, and 
    // it receives an object with the auth and request properties. 
    // The auth property contains the user's session, 
    // and the request property contains the incoming request.
    // Return :
    //   - `true` if user "isAuthorized" to let render the page
    //   - `false` to redirect to login page
    //   - retturn Response or NextResponse when 
    //     - you want to redirect 
    authorized({ auth, request }) {
      const url = request.nextUrl;

      console.log({
        what: "auth.callbacks.authorize",
        pathname: url.pathname,
      });

      // if user is logged allow the request and redirect if necessary
      const userIsLogged = Boolean(auth?.user);
      if (userIsLogged) {
        // if this request is the request after successfull login
        // the url is like http://localhost:3000/?callbackUrl="http:..."
        // in that case redirect to the page that triggered the auth flow
        const callbackUrl = request.nextUrl.searchParams.get('callbackUrl') ?? '';
        if (callbackUrl) {
          console.log({ result: "user is logged and callback url in search params => redirect to callback url" });
          return NextResponse.redirect(callbackUrl);
        }

        console.log({ result: "user is logged => return true" });
        return true;// allow the request
      }

      // user is not logged, check if the request is protected
      // if is protected, redirect to login page
      // otherwise allow the request
      const requestIsProtected = [
        () => url.pathname.includes("/dashboard"),
        () => url.pathname.includes("/protected"),
      ].some(fn => fn());

      if (!requestIsProtected) {
        console.log({ result: "user is not logged and request is not protected => return true => allow request" });
        return true;// allow the request
      }

      console.log({ result: "user is not logged and request is protected => return false => redrect to login" });
      return false;// redirect to login page

    },

    // @see https://next-auth.js.org/configuration/callbacks#jwt-callback
    async jwt({ token, account, profile, user, session, trigger }) {

      if (
        trigger !== "signIn" &&
        trigger !== "signUp" &&
        trigger !== "update"
      ) {
        return token;
      }

      console.dir({
        what: "auth.callback.jwt",
        data: {
          token,
          account,
          profile,
          user,
          session,
          trigger,
        }
      }, { depth: 4 });

      return {
        ...token,
        ...(account && { account }),
        ...(profile && { profile }),
        ...(user && { user }),
        ...(session && { session }),
        // ...(trigger && { trigger }),
      };


      //    this is what `callbacks.jwt` receives:
      //   - After Github login:
      // {
      //   token: {
      //     name: 'Joe Don',
      //     email: 'joe.don@gmail.com',
      //     picture: 'https://avatars.githubusercontent.com/u/47954700?v=4',
      //     sub: '74595787'
      //   },
      //   account: {
      //     access_token: 'gho_T4VN45K92jdShsfti3kqMfAtBmDvy2kWE1g',
      //     token_type: 'bearer',
      //     scope: 'read:user,user:email',
      //     provider: 'github',
      //     type: 'oauth',
      //     providerAccountId: '47954756'
      //   },
      //   profile: {
      //     login: 'joedon',
      //     id: 47945457,
      //     node_id: 'MDQ6VXNlcjhdgyU0NzAw',
      //     avatar_url: 'https://avatars.githubusercontent.com/u/47954700?v=4',
      //     gravatar_id: '',
      //     url: 'https://api.github.com/users/joedon',
      //     html_url: 'https://github.com/joedon',
      //     followers_url: 'https://api.github.com/users/joedon/followers',
      //     following_url: 'https://api.github.com/users/joedon/following{/other_user}',
      //     gists_url: 'https://api.github.com/users/joedon/gists{/gist_id}',
      //     starred_url: 'https://api.github.com/users/joedon/starred{/owner}{/repo}',
      //     subscriptions_url: 'https://api.github.com/users/joedon/subscriptions',
      //     organizations_url: 'https://api.github.com/users/joedon/orgs',
      //     repos_url: 'https://api.github.com/users/joedon/repos',
      //     events_url: 'https://api.github.com/users/joedon/events{/privacy}',
      //     received_events_url: 'https://api.github.com/users/joedon/received_events',
      //     type: 'User',
      //     site_admin: false,
      //     name: 'Joe Don',
      //     company: null,
      //     blog: 'joedon.com',
      //     location: 'Italy',
      //     email: 'joe.don@gmail.com',
      //     hireable: null,
      //     bio: 'web developer | dev blogger.',
      //     twitter_username: null,
      //     public_repos: 61,
      //     public_gists: 30,
      //     followers: 5,
      //     following: 11,
      //     created_at: '2019-02-24T23:05:41Z',
      //     updated_at: '2024-01-18T00:06:53Z',
      //     private_gists: 9,
      //     total_private_repos: 61,
      //     owned_private_repos: 61,
      //     disk_usage: 836748,
      //     collaborators: 0,
      //     two_factor_authentication: true,
      //     plan: {
      //       name: 'free',
      //       space: 976562499,
      //       collaborators: 0,
      //       private_repos: 10000
      //     }
      //   },
      //   user: {
      //     id: '456835',
      //     name: 'Jacopo Marrone',
      //     email: 'jacopo.marrone27@gmail.com',
      //     image: 'https://avatars.githubusercontent.com/u/47954700?v=4'
      //   },
      //   session: undefined,
      //   trigger: 'signIn'
      // }
    },

    // @see https://next-auth.js.org/configuration/callbacks#session-callback
    async session(params) {
      return {
        ...params.session,
        ...("token" in params && { token: params.token })
      };
    }

  }
});