import { NextFetchEvent, NextRequest, NextResponse } from 'next/server';
import acceptLanguage from 'accept-language';
import { fallbackLocale, locales, cookieName } from './settings';


export const config = {
  // matcher: '/:locale*'
  matcher: ['/((?!api|_next/static|_next/image|assets|favicon.ico|sw.js).*)']
};

acceptLanguage.languages(locales);

export const handleI18n = async (req: NextRequest, event: NextFetchEvent) => {
  console.log({ what: `new request => ${req.method} ${req.nextUrl.pathname}` });
  debugger;
  let locale: string | null = null;
  // get locale from cookie...
  if (req.cookies.has(cookieName)) locale = req.cookies.get(cookieName)!.value;
  // otherwise get locale from ""Accept-Language" header...
  if (!locale) locale = acceptLanguage.get(req.headers.get('Accept-Language'));
  // otherwise set the default locale
  if (!locale) locale = fallbackLocale;
  console.log({ locale });

  // Redirect if locale in path is not supported
  if (
    !locales.some(loc => req.nextUrl.pathname.startsWith(`/${loc}`)) &&
    !req.nextUrl.pathname.startsWith('/_next')
  ) {
    console.log({ result: "redirect to " + `/${locale}${req.nextUrl.pathname}` });
    return NextResponse.redirect(new URL(`/${locale}${req.nextUrl.pathname}`, req.url));
  }

  if (req.headers.has('referer')) {
    console.log({ result: "referer => " + req.headers.get('referer') });
    const refererUrl = new URL(req.headers.get('referer')!);
    const localeInReferer = locales.find((l) => refererUrl.pathname.startsWith(`/${l}`));
    const response = NextResponse.next();
    if (localeInReferer) response.cookies.set(cookieName, localeInReferer);
    return response;
  }

  return NextResponse.next();
};
