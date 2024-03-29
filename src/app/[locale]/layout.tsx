import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { headers } from "next/headers";
import { auth } from "@/auth/auth.config";
import { getDictionary } from "@/i18n/server/i18n.dictionaries";
import { getPreferredLocaleFromRequestHeader } from "@/i18n/i18n.utils";
import { I18nDictionaryProvider } from "@/i18n/client/i18n.dictionary-provider";
// import { DebugBar } from "../_components/DebugBar";
import { LanguageSwitcherBar } from "./_components/LanguageSwitcherBar";
import { NavMain } from "./_components/NavMain";
import { UserDropdown } from "./_components/UserDropdown";
import "./globals.css";
import { supportedLocales } from "@/i18n/i18n.config";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

type LayoutProps = {
  params: {
    locale: string,
  },
  children: React.ReactNode;
};

export default async function RootLayout({ params, children }: LayoutProps) {
  // const headerList = headers();

  // i18n
  const { locale } = params;
  const dictionary = await getDictionary(locale);
  const preferredLocale = getPreferredLocaleFromRequestHeader(headers());

  // auth
  const session = await auth();
  const userIsLogged = Boolean(session?.user);

  return (
    <html lang={locale}>
      <body className={inter.className}>
        {/* <DebugBar /> */}
        {/* <div className="p-4">
          <DebugJson json={{ headerList }} />
        </div> */}
        <I18nDictionaryProvider dictionary={dictionary}>
          <LanguageSwitcherBar prefferedLocale={preferredLocale} />
          <header className="p-4">
            <div className="p-4 bg-neutral-900 rounded flex justify-between items-center">
              <NavMain />
              {userIsLogged && session?.user && <UserDropdown user={session.user} />}
            </div>
          </header>
          {/* Page */}
          {children}
        </I18nDictionaryProvider>
      </body>
    </html>
  );
}


const DebugJson = ({ json }: { json: unknown; }) => (
  <pre
    style={{
      whiteSpace: 'pre',
      maxWidth: '100%',
      overflow: 'auto'
    }}
  >
    {JSON.stringify(json, null, 4)}
  </pre>
);