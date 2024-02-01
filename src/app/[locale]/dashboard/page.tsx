import { getDictionary } from "@/i18n/server/i18n.dictionaries";
import { Card } from "./_components/ui/card";

type PageProps = {
  params: {
    locale: string,
  };
};

export default async function Page(props: PageProps) {
  const { locale } = props.params;
  const dictionary = await getDictionary(locale);

  return (
    <main className="p-4 flex flex-col gap-12">
      <h1 className="text-3xl">{dictionary.dashboard.overview.title}</h1>
      <Card>
        <p>{dictionary.dashboard.overview.body}</p>
      </Card>
    </main>
  );
}