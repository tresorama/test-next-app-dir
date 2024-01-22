'use client';

import { User } from "next-auth";
import { useToggle } from "react-use";
import { action_logout } from "./logout.action";

export const UserDropdown = ({ user }: { user: User; }) => {
  const [isOpen, toggle] = useToggle(false);

  return (
    <div className="relative">
      {/* Avatar */}
      <button
        onClick={toggle}
        className="flex items-center gap-2"
      >
        <span className="text-xs">{user.name}</span>
        <span
          className="inline-block size-6 bg-gradient-to-r from-red-500 to-amber-500 rounded-full border"
          style={{
            ...(user.image && {
              backgroundImage: `url(${user.image})`,
              backgroundSize: "cover"
            })
          }}
        />
      </button>
      {/* Panel */}
      {isOpen && (
        <div className="absolute top-full right-0">
          <div className="p-4 bg-neutral-900 max-w-72">
            <DebugJson json={user} />
            <hr className="my-2" />
            <LogoutButton />
          </div>
        </div>
      )}
    </div>
  );
};

const DebugJson = ({ json }: { json: unknown; }) => (
  <pre
    style={{
      whiteSpace: 'pre',
      maxWidth: '100%',
      overflow: 'auto'
    }}
  >
    {JSON.stringify(json, null, 4)}
  </pre>
);

const LogoutButton = () => (
  <form action={action_logout}>
    <button
      type="submit"
      className="p-2 bg-neutral-800"
    >
      Logout
    </button>
  </form>
);