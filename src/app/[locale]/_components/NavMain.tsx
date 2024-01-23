'use client';

import Link from "@/i18n/client/i18n.link";
import { useI18nDictionary } from "@/i18n/client/i18n.dictionary-provider";
import { useLocaleData } from "@/i18n/client/i18n.use-locale-data";
import { DefaultDictionary } from "@/i18n/server/i18n.dictionaries";
import { cn } from "@/utils/cn";

const navItems: Array<{
  key: keyof DefaultDictionary['navMain'],
  url: string;
  isActive: (pathname: URL['pathname']) => boolean;
}> = [
    { key: "home", url: "/", isActive: (pathname) => pathname === "/" },
    { key: "about", url: "/about", isActive: (pathname) => pathname.startsWith("/about") },
    { key: "blog", url: "/blog", isActive: (pathname) => pathname.startsWith("/blog") },
    { key: "dashboard", url: "/dashboard", isActive: (pathname) => pathname.startsWith("/dashboard") }
  ];

export const NavMain = () => {
  const { pathnameWithoutLocale } = useLocaleData();
  const dictionary = useI18nDictionary();

  if (!dictionary) return <>No dictionary</>;

  return (
    <nav>
      <ul className="flex gap-10">
        {navItems.map(item => {
          const name = dictionary.navMain[item.key];
          const isActive = item.isActive(pathnameWithoutLocale);

          return (
            <li key={item.key}>
              <Link
                href={item.url}
                className={cn(
                  "underline", {
                  "opacity-50": true,
                  "!opacity-100": isActive,
                })}
              >{name}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};