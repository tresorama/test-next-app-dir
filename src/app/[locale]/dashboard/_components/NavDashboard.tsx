'use client';

import Link from "@/i18n/client/i18n.link";
import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';

const navItems: Array<{
  name: string,
  url: string,
}> = [
    { name: "Overview", url: "/dashboard" },
    { name: "Summary", url: "/dashboard/summary" },
    { name: "Account", url: "/dashboard/account" },
  ];

export const NavDashboard = () => {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        {navItems.map(item => (
          <li key={item.url}>
            <Link
              href={item.url}
              className={cn(
                "underline", {
                "opacity-30 hover:opacity-80": pathname !== item.url,
              })}
            >{item.name}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};