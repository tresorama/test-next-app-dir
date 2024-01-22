import deepmerge from 'deepmerge';
import { DefaultLocale, SupportedLocale, defaultLocale } from '../i18n.config';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then(module => module.default),
  it: () => import('../dictionaries/it.json').then(module => module.default),
};

export type DefaultDictionary = Awaited<ReturnType<typeof dictionaries[DefaultLocale]>>;

export const getDictionary = async (locale: string): Promise<DefaultDictionary> => {
  const resolvedLocale = (Object.keys(dictionaries).find((x) => x === locale) ?? defaultLocale) as SupportedLocale;
  const requestedDictionary = await dictionaries[resolvedLocale]();
  const defaultDictionary = await dictionaries[defaultLocale]();
  return deepmerge(defaultDictionary, requestedDictionary) as DefaultDictionary;
};