'use client';

import Link from "@/i18n/client/i18n.link";
import { cn } from '@/utils/cn';
import { useLocaleData } from "@/i18n/client/i18n.use-locale-data";

const navItems: Array<{
  name: string,
  url: string,
}> = [
    { name: "Overview", url: "/dashboard" },
    { name: "Summary", url: "/dashboard/summary" },
    { name: "Account", url: "/dashboard/account" },
  ];

export const NavDashboard = () => {
  const { pathnameWithoutLocale } = useLocaleData();

  return (
    <nav>
      <ul>
        {navItems.map(item => (
          <li key={item.url}>
            <Link
              href={item.url}
              className={cn(
                "underline", {
                "opacity-30 hover:opacity-80": pathnameWithoutLocale !== item.url,
              })}
            >{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};