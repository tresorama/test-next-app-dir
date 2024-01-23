'use client';
import { useRef } from "react";
import { useRouter } from "next/navigation";
import { SupportedLocale, supportedLocales, defaultLocale } from "@/i18n/i18n.config";
import { useLocaleData } from "@/i18n/client/i18n.use-locale-data";

const capitalize = (x: string) => x.slice(0, 1).toUpperCase() + x.slice(1).toLowerCase();

type LanguageSwitcherBarProps = {
  prefferedLocale: SupportedLocale | null;
};

export const LanguageSwitcherBar = (props: LanguageSwitcherBarProps) => {
  const router = useRouter();
  const { pathIsMultilangual, currentLocale } = useLocaleData();
  const refSelect = useRef<HTMLSelectElement>(null);

  const handleSubmit = () => {
    // if we do not have current locale we cannot do our logic
    if (!currentLocale) return;

    // get selcted local from <select>
    if (!refSelect.current) return;
    const newLocale = refSelect.current.value as SupportedLocale;

    // redirect
    const newUrl = new URL(window.location.href);
    newUrl.pathname = newUrl.pathname.replace(currentLocale, newLocale);
    router.push(newUrl.href);
  };

  if (!currentLocale) {
    // wait until it's available
    return <></>;
  }
  if (!pathIsMultilangual) return <></>;
  if (currentLocale !== defaultLocale) {
    // if url start with a `locale` that is not the `defaultLocale` means 
    // that user already selected a locale
    return <></>;
  }

  return (
    <section className="p-4 pb-0">
      <div className="p-4 bg-neutral-900 flex flex-col items-start gap-2">
        <p>Seleziona la tua lingua preferita</p>
        <select
          defaultValue={props.prefferedLocale ?? undefined}
          ref={refSelect}
          className="text-black"
        >
          {supportedLocales.map(locale => (
            <option key={locale} value={locale}>{capitalize(locale)}</option>
          ))}
        </select>
        <button onClick={handleSubmit}>Conferma</button>
      </div>
    </section>
  );
};
