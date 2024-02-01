import { NavBlogPosts } from "./_components/NavBlogPosts";
import { getAllBlogPosts } from "./_data";

export default async function Layout({ children }: { children: React.ReactNode; }) {
  const blogPosts = await getAllBlogPosts();

  return (
    <div className="p-4 pt-0 grid grid-cols-[15rem_1fr] gap-6">
      {/* Sidebar */}
      <aside className="bg-neutral-900 p-4 rounded-sm">
        <p>BlogPosts</p>
        <NavBlogPosts blogPosts={blogPosts} />
      </aside>
      {/* Page */}
      {children}
    </div>
  );
}
