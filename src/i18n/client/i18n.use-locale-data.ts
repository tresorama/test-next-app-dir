'use client';

import { usePathname } from "next/navigation";
import { extractLocaleDataFromPathname, } from "../i18n.utils";

export const useLocaleData = () => {
  const pathname = usePathname();
  const {
    pathnameWithoutLocale,
    currentLocale,
    pathIsMultilangual
  } = extractLocaleDataFromPathname(pathname);

  return {
    pathname,
    pathnameWithoutLocale,
    currentLocale,
    pathIsMultilangual,
  };
};