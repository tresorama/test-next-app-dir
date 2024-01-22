'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/utils/cn';
import { type BlogPost } from '../_data';
import Link from "@/i18n/client/i18n.link";

type Props = {
  blogPosts: BlogPost[];
};

export const NavBlogPosts = ({ blogPosts }: Props) => {
  const pathname = usePathname();

  return (
    <nav>
      <ul>
        {blogPosts.map(post => (
          <li key={post.slug}>
            <Link
              href={`/blog/${post.slug}`}
              className={cn(
                "underline", {
                "opacity-30 hover:opacity-80": pathname !== `/blog/${post.slug}`,
              })}
            >{post.title}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};