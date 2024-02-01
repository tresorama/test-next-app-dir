import { SupportedLocale, supportedLocales } from "@/i18n/i18n.config";

export async function generateStaticParams() {
  return supportedLocales.map(locale => ({ locale }));
}

type PageProps = {
  params: {
    locale: SupportedLocale,
  };
};

export default function Page(props: PageProps) {
  const { locale } = props.params;
  return (
    <div>
      Blog - Home
      <br />Locale: {locale}
    </div>
  );
}



