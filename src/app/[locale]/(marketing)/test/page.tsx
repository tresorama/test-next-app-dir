import { supportedLocales } from "@/i18n/i18n.config";

export async function generateStaticParams() {
  return supportedLocales.map(locale => ({ locale }));
}

export default function Page() {
  return (
    <div>
      Next Js Page
    </div>
  );
}