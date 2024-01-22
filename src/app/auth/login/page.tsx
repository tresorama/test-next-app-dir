import { LoginForm } from "./_components/form-login";

export default function Page() {
  return (
    <main className="p-4">
      <h1 className="text-3xl">Login</h1>
      <div className="mx-auto w-full max-w-[400px] flex flex-col gap-2">
        <div className="flex justify-center items-center h-20 w-full rounded-lg bg-neutral-500 p-3 md:h-36">
          <div className="font-bold">LOGO</div>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}