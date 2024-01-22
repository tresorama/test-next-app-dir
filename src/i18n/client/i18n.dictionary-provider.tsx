'use client';

import { createContext, useContext } from "react";
import { type DefaultDictionary } from "../server/i18n.dictionaries";

const ctx = createContext<DefaultDictionary>({} as DefaultDictionary);

export const I18nDictionaryProvider = ({
  children,
  dictionary,
}: {
  children: React.ReactNode,
  dictionary: DefaultDictionary,
}) => {
  return <ctx.Provider value={dictionary}>{children}</ctx.Provider>;
};

export const useI18nDictionary = () => useContext(ctx);