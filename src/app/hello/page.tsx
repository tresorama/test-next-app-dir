import { headers } from "next/headers";
import Link from "next/link";

export default async function Page() {
  const headersList = headers();

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 max-w-5xl w-full items-center justify-between font-mono text-sm lg:flex">
        <h1>Hello</h1>

        <Link
          href="/"
          className="inline-block underline border p-2 mt-6 hover:bg-white/50"
        >
          Go to /
        </Link>
        <Link
          href="/force-not-found"
          className="inline-block underline border p-2 mt-6 hover:bg-white/50"
        >
          Go to a _not found_ route
        </Link>

        <pre className="mt-6 w-full p-4 border">
          {JSON.stringify({ headersList }, null, 4)}
        </pre>
      </div>
    </main>
  );
}
