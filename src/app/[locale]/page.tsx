import { getDictionary } from "@/i18n/server/i18n.dictionaries";

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
      <h1 className="text-3xl">{dictionary.home.title}</h1>
    </main>
  );
}
