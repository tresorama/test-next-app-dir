import { supportedLocales } from "../i18n.config";

export const removePrefix = (str: string, prefix: string[]) => prefix.reduce((acc, curr) => acc.replace(curr, ""), str);
export const removeLocaleFromPathname = (pathname: string) => {
  const out = removePrefix(pathname, supportedLocales.map(x => "/" + x));
  if (out === "") return "/";
  return out;
};
