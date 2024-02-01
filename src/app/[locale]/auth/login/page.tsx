import { getDictionary } from "@/i18n/server/i18n.dictionaries";
import { LoginForm } from "./_components/form-login";
import { OAuthButtons } from "./_components/oauth-buttons";

type PageProps = {
  params: {
    locale: string,
  };
};

export default async function Page(props: PageProps) {
  const { locale } = props.params;
  const dictionary = await getDictionary(locale);

  return (
    <main className="p-4">
      <h1 className="text-3xl">{dictionary.auth.login.title}</h1>
      <div className="mx-auto w-full max-w-[400px] flex flex-col gap-2">
        <div className="flex justify-center items-center h-20 w-full rounded-lg bg-neutral-500 p-3 md:h-36">
          <div className="font-bold">LOGO</div>
        </div>
        <LoginForm />
        <hr />
        <div className="bg-neutral-900 p-4">
          <OAuthButtons />
        </div>
      </div>
    </main>
  );
}