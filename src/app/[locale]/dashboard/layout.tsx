import { NavDashboard } from "./_components/NavDashboard";

export default async function Layout({ children }: { children: React.ReactNode; }) {
  return (
    <>
      {/* Main Heaeder */}
      <div className="p-4 pt-0 grid grid-cols-[15rem_1fr]">
        <aside className="bg-neutral-900 p-4 rounded">
          <NavDashboard />
        </aside>
        <main>
          {children}
        </main>
      </div>
    </>
  );
}
