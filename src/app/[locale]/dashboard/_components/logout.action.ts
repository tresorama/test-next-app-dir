"use server";

import { signOut } from "@/auth/auth.config";

export const action_logout = async () => {
  await signOut();
};