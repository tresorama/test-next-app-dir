import { signIn } from "@/auth/auth.config";

export const OAuthButtons = () => {
  return (
    <>
      <form action={async () => {
        "use server";
        await signIn("github");
      }}>
        <button>Sign in with GitHub</button>
      </form>
    </>
  );
};