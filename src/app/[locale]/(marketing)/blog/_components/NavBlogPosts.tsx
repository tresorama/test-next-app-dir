'use client';

import { cn } from '@/utils/cn';
import { type BlogPost } from '../_data';
import Link from "@/i18n/client/i18n.link";
import { useLocaleData } from '@/i18n/client/i18n.use-locale-data';

type Props = {
  blogPosts: BlogPost[];
};

export const NavBlogPosts = ({ blogPosts }: Props) => {
  const { pathnameWithoutLocale } = useLocaleData();

  return (
    <nav>
      <ul>
        {blogPosts.map(post => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className={cn(
                "underline", {
                "opacity-30 hover:opacity-80": pathnameWithoutLocale !== `/blog/${post.slug}`,
              })}
            >{post.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};