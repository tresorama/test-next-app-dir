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
    <div className="p-4">
      <h1 className="text-4xl">{dictionary.about.title}</h1>
      <p className="text-xl">{dictionary.about.subtitle}</p>
    </div>
  );
}