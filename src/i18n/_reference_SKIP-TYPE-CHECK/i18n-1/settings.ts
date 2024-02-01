export const fallbackLocale = 'en';
export const locales = [fallbackLocale, 'de'];
export const cookieName = 'i18next';
export const defaultNS = 'translation';


export function getOptions(lng = fallbackLocale, ns = defaultNS) {
  return {
    // debug: true,
    supportedLngs: locales,
    fallbackLng: fallbackLocale,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns
  };
}