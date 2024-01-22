'use client';

import { usePathname } from "next/navigation";
import { removeLocaleFromPathname } from "../utils/string.utils";
import { getSupportedLocaleFromPathname } from "../i18n.utils";
import { defaultLocale, pathnameIsMultilingual } from "../i18n.config";

export const useLocale = () => {
  const pathname = usePathname();
  const pathnameWithoutLocale = removeLocaleFromPathname(pathname);
  const currentLocale = getSupportedLocaleFromPathname(pathname) ?? defaultLocale;
  const pathIsMultilangual = pathnameIsMultilingual(pathname);

  return {
    pathname,
    pathnameWithoutLocale,
    currentLocale,
    pathIsMultilangual,
  };
};