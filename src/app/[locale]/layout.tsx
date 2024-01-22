import { headers } from "next/headers";
import { getPreferredLocaleFromRequestHeader } from "@/i18n/i18n.utils";
import { getDictionary } from "@/i18n/server/i18n.dictionaries";
import { I18nDictionaryProvider } from "@/i18n/client/i18n.dictionary-provider";
import { LanguageSwitcherBar } from "./_components/LanguageSwitcherBar";
import { NavMain } from "../_components/NavMain";

type Props = {
  params: {
    locale: string,
  };
  children: React.ReactNode;
};

export default async function Template({ params, children }: Props) {

  // i18n
  const { locale } = params;
  const dictionary = await getDictionary(locale);
  const preferredLocale = getPreferredLocaleFromRequestHeader(headers());

  return (
    <I18nDictionaryProvider dictionary={dictionary}>
      {/* Language Switcher Bar */}
      <LanguageSwitcherBar prefferedLocale={preferredLocale} />
      {/* Main Heaeder */}
      <header className="p-4">
        <div className="p-4 bg-neutral-900 rounded flex justify-between items-center">
          <NavMain />
        </div>
      </header>
      {/* Page */}
      {children}
    </I18nDictionaryProvider>
  );
}