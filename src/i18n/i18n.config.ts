export type SupportedLocale = "en" | "it";
export const supportedLocales: SupportedLocale[] = ['en', 'it'];
export const defaultLocale = 'en';
export type DefaultLocale = typeof defaultLocale;

export const multilingualPathsRules: Array<(pathnameWithoutLocale: URL['pathname']) => boolean> = [
  (pathnameWithoutLocale) => ["", "/"].includes(pathnameWithoutLocale),
  (pathnameWithoutLocale) => pathnameWithoutLocale.startsWith("/about"),
  (pathnameWithoutLocale) => pathnameWithoutLocale.startsWith("/blog"),
  (pathnameWithoutLocale) => pathnameWithoutLocale.startsWith("/dashboard"),
];