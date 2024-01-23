import acceptLanguageParser from 'accept-language-parser';
import { SupportedLocale, multilingualPathsRules, supportedLocales } from "./i18n.config";
import { removePrefix } from './utils/string.utils';

// small functions

/**
 * - Type-Guard that check if a locale string is a locale that we want support
 * - A locale is supported if defined in `supportedLocales`
*/
export const isSupportedLocale = (locale: string): locale is SupportedLocale => {
  return supportedLocales.includes(locale as any);
};

/**
 * - Extract`locale` from pathname only if defined in `supportedLocales`
 * - If request is `/en/xxxx` and `supportedLocales = [ "en", "it" ]` it returns `"en"`
 * - If request is `/de/xxxx` and `supportedLocales = [ "en", "it" ]` it returns `undefined`
*/
export function extractSupportedLocaleFromPathname(pathname: URL['pathname']) {
  return supportedLocales.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

/**
 * - Remove the leading locale from a pathname, only if we supported that locale
 * - A locale is supported if defined in `supportedLocales`
 * - If request is `/en/xxxx` and `supportedLocales = [ "en", "it" ]` it returns `"/xxxx"`
 * - If request is `/de/xxxx` and `supportedLocales = [ "en", "it" ]` it returns `"/de/xxxx"`
 */
export const removeSupportedLocaleFromPathname = (pathname: URL['pathname']) => {
  const pathnameWithoutLocale = removePrefix(pathname, supportedLocales.map(x => "/" + x));
  if (pathnameWithoutLocale === "") return "/";
  return pathnameWithoutLocale;
};

/**
 * Given a pathname return if this pathname is a multilanguale pathname, 
 * meaning that we provide translations for this path.
 */
export const pathnameIsMultilingual = (pathname: URL['pathname']) => {
  const pathnameWithoutLocale = removeSupportedLocaleFromPathname(pathname);
  return multilingualPathsRules.some(fn => fn(pathnameWithoutLocale));
};

// /**
// * - Check if pathname starts with a`locale` defined in `supportedLocales`
// * - If request is `/en/xxxx` and `supportedLocales = [ "en", "it" ]` it returns `true`
// * - If request is `/de/xxxx` and `supportedLocales = [ "en", "it" ]` it returns `false`
// */
// export function pathnameHasSupportedLocale(pathname: URL['pathname']) {
//   return Boolean(extractSupportedLocaleFromPathname(pathname));
// }


// big functions

/**
 * Given a pathname get infos about how we treat that pathname
 */
export function extractLocaleDataFromPathname(pathname: URL['pathname']) {
  const currentLocale = extractSupportedLocaleFromPathname(pathname);
  const pathnameWithoutLocale = removeSupportedLocaleFromPathname(pathname);
  const pathIsMultilangual = pathnameIsMultilingual(pathname);
  return {
    pathname,
    pathnameWithoutLocale,
    currentLocale,
    pathIsMultilangual,
  };
}



/**
 * - Return the first`locale` defined in `Accept-Language` HTTP Request Header (if defined)
 * - Only `locale` defined in `supportedLocales` are considered valid
 * - If request has `it-IT,it;q=0.9,en;q=0.8` and `supportedLocales = [ "en", "it" ]` it returns `"it"`
 * - If request has `de-DE,de;q=0.9,en;q=0.8` and `supportedLocales = [ "en", "it" ]` it returns `"en"`
 * - If request has `de-DE,de;q=0.9,fr;q=0.8` and `supportedLocales = [ "en", "it" ]` it returns `null`
 * - If request is `/de/xxxx` and `supportedLocales = [ "en", "it" ]` it returns `false`
 */
export function getPreferredLocaleFromRequest(request: Request) {
  return getPreferredLocaleFromRequestHeader(request.headers);
}

export function getPreferredLocaleFromRequestHeader(headers: Request['headers']) {
  const _headers = Object.fromEntries(headers.entries());
  if (_headers['accept-language']) {
    const userPreferredLocales = acceptLanguageParser.parse(_headers['accept-language']);
    const resolvedLocale = acceptLanguageParser.pick(supportedLocales, userPreferredLocales);
    if (resolvedLocale) return resolvedLocale;
  }
  return null;
}


