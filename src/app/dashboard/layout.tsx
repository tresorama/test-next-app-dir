import { auth } from "@/auth/auth.config";
import { NavMain } from "../_components/NavMain";
import { NavDashboard } from "./_components/NavDashboard";
import { UserDropdown } from "./_components/UserDropdown";

export default async function Layout({ children }: { children: React.ReactNode; }) {

  // auth
  const session = await auth();
  const userIsLogged = Boolean(session?.user);

  return (
    <>
      {/* Main Heaeder */}
      <header className="p-4">
        <div className="p-4 bg-neutral-900 rounded flex justify-between items-center">
          <NavMain />
          {userIsLogged && session?.user && <UserDropdown user={session.user} />}
        </div>
      </header>
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
