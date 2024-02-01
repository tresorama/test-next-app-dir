'use client';

import { type AnchorHTMLAttributes } from 'react';
import NextLink, { type LinkProps } from 'next/link';
import { type SupportedLocale } from '../i18n.config';
import { useLocaleData } from './i18n.use-locale-data';

const localizeHref = (href: LinkProps['href'], locale: SupportedLocale) => {

  if (typeof href === 'string') {
    return `/${locale}${href}`;
  }

  if (!href.pathname) return href;
  const newHref = { ...href };
  newHref.pathname = `/${locale}${href.pathname}`;
  return newHref;
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps;

export default function Link(props: Props) {
  const { currentLocale } = useLocaleData();

  if (!currentLocale) {
    console.error("We should alawys have a locale ! but none found in 'useLocaleData()' client hook");
    return <NextLink {...props} />;
  }

  // rewrite the "href" props prepending the currentLocale
  const localizedHref = localizeHref(props.href, currentLocale);

  return (
    <NextLink
      {...props}
      href={localizedHref}
    />
  );
};