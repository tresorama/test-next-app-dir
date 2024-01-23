import deepmerge from 'deepmerge';
import { DefaultLocale, defaultLocale } from '../i18n.config';
import { isSupportedLocale } from '../i18n.utils';

const dictionaries = {
  en: () => import('../dictionaries/en.json').then(module => module.default),
  it: () => import('../dictionaries/it.json').then(module => module.default),
};

export type DefaultDictionary = Awaited<ReturnType<typeof dictionaries[DefaultLocale]>>;

export const getDictionary = async (locale: string): Promise<DefaultDictionary> => {
  if (!isSupportedLocale(locale)) {
    throw new Error(`(i18n) - locale "${locale}" is not a locale that we support for i18n`);
  }
  if (!(locale in dictionaries)) {
    throw new Error(`(i18n) - locale "${locale}" is supported but missing dictionary for that locale`);
  }
  const requestedDictionary = await dictionaries[locale]();
  const defaultDictionary = await dictionaries[defaultLocale]();
  return deepmerge(defaultDictionary, requestedDictionary) as DefaultDictionary;
};