import { removeLocaleFromPathname } from "./utils/string.utils";

export type SupportedLocale = "en" | "it";
export const supportedLocales: SupportedLocale[] = ['en', 'it'];
export const defaultLocale = 'en';
export type DefaultLocale = typeof defaultLocale;

export const pathnameIsMultilingual = (pathname: URL['pathname']) => {
  const rules: Array<(pathname: string) => boolean> = [
    (pathname) => ["", "/"].includes(removeLocaleFromPathname(pathname)),
    (pathname) => removeLocaleFromPathname(pathname).startsWith("/about"),
    (pathname) => removeLocaleFromPathname(pathname).startsWith("/blog"),
    (pathname) => removeLocaleFromPathname(pathname).startsWith("/dashboard"),
  ];
  return rules.some(fn => fn(pathname));
};