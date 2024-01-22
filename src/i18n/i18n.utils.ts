import acceptLanguageParser from 'accept-language-parser';
import { supportedLocales } from "./i18n.config";
export { pathnameIsMultilingual } from './i18n.config';


/**
 * - Extract`locale` from pathname only if defined in `supportedLocales`
 * - If request is `/en/xxxx` and `supportedLocales = [ "en", "it" ]` it returns `"en"`
 * - If request is `/de/xxxx` and `supportedLocales = [ "en", "it" ]` it returns `undefined`
*/
export function getSupportedLocaleFromPathname(pathname: URL['pathname']) {
  return supportedLocales.find(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
}

/**
* - Check if pathname starts with a`locale` defined in `supportedLocales`
* - If request is `/en/xxxx` and `supportedLocales = [ "en", "it" ]` it returns `true`
* - If request is `/de/xxxx` and `supportedLocales = [ "en", "it" ]` it returns `false`
*/
export function pathnameHasSupportedLocale(pathname: URL['pathname']) {
  return Boolean(getSupportedLocaleFromPathname(pathname));
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