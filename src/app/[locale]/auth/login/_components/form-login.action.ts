'use server';

import { signIn } from "@/auth/auth.config";
import { AuthError } from "next-auth";

export async function loginWithCredentials(
  prevState: string | undefined,
  formData: FormData,
) {
  debugger;
  try {
    await signIn('credentials', formData);
    debugger;
  } catch (error) {
    debugger;
    if (error instanceof AuthError) {
      switch (error.type) {
        case 'CredentialsSignin':
          return 'Invalid credentials.';
        default:
          return 'Something went wrong.';
      }
    }
    throw error;
  }
}
