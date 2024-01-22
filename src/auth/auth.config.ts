import NextAuth from "next-auth";
import Credentials from 'next-auth/providers/credentials';
import { z } from "zod";
import { getUserByCredentials } from "./get-user-by-credentials";
import Github from "next-auth/providers/github";

// DOCUMENTATION
// next-auth v5
// @see https://authjs.dev/guides/upgrade-to-v5?authentication-method=client-component

export const {
  auth,
  signIn,
  signOut,
  handlers,
} = NextAuth({
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

      debugger;
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
          return Response.redirect(callbackUrl);
        }

        console.log({ result: "user is logged => return true" });
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
});