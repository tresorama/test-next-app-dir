import NextAuth, { Account, Profile } from "next-auth";
import { type UserFromDB_Safe } from "./get-user-by-credentials";

declare module "@auth/core/jwt" {
  interface JWT_Custom {
    account?: Account,
    profile?: Profile,
    user?: UserFromDB_Safe,
  }
  interface JWT extends JWT_Custom { }
}
declare module "next-auth" {
  interface Session {
    token: JWT;
  }
}