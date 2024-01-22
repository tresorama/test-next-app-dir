import { notFound } from "next/navigation";
import Image from "next/image";
import { getAllBlogPosts, getBlogPostBySlug } from "../_data";

// utils
const formatDate = (date: Date) => new Intl.DateTimeFormat(undefined, { day: 'numeric', month: 'long' }).format(date);

// Return a list of `params` to populate the [slug] dynamic segment
export async function generateStaticParams() {
  const blogPost = await getAllBlogPosts();
  return blogPost.map(post => ({ slug: post.slug }));
}

type PageProps = {
  params: {
    slug: string,
  };
};

export default async function Page(props: PageProps) {
  const { slug } = props.params;
  const post = await getBlogPostBySlug(slug);
  if (!post) notFound();

  return (
    <main>
      <article className="">
        <h1 className="text-4xl">{post.title}</h1>
        <div className="mt-4">
          <p className="text-sm ">{post.author_name}</p>
          <p className="text-sm ">{formatDate(post.published_date)}</p>
        </div>
        <p className="mt-4 opacity-60 text-lg">{post.excerpt}</p>
        <Image
          className="mt-4 w-full aspect-video"
          src={post.image_url}
          alt={post.title}
          width={1600}
          height={900}
        />
        <div
          className="mt-4 prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </main>
  );
}