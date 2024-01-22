'use client';

import { type AnchorHTMLAttributes } from 'react';
import NextLink, { type LinkProps } from 'next/link';
import { pathnameIsMultilingual } from '../i18n.utils';
import { type SupportedLocale } from '../i18n.config';
import { useLocale } from './i18n.use-locale';

const localizeHref = (href: LinkProps['href'], locale: SupportedLocale) => {

  if (typeof href === 'string') {
    const urlIsMultilingual = pathnameIsMultilingual(href);
    if (!urlIsMultilingual) return href;

    // if (locale === defaultLocale) return href;
    return `/${locale}${href}`;
  }
  else {
    if (!href.pathname) return href;

    const urlIsMultilingual = pathnameIsMultilingual(href.pathname);
    if (!urlIsMultilingual) return href;

    // if (locale === defaultLocale) return href;
    const newHref = { ...href };
    newHref.pathname = `/${locale}${href.pathname}`;
    return newHref;
  }
};

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & LinkProps;

export default function Link(props: Props) {
  const { currentLocale } = useLocale();

  // rewrite the "href" props prepending the currentLocale
  const localizedHref = localizeHref(props.href, currentLocale);

  return (
    <NextLink
      {...props}
      href={localizedHref}
    />
  );
};