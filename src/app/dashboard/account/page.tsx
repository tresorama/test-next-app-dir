import { auth } from "@/auth/auth.config";
import { Card } from "../_components/ui/card";

export default async function Page() {
  const session = await auth();

  return (
    <main className="p-4 flex flex-col gap-12">
      <h1 className="text-3xl">Dashboard - Account</h1>
      <Card>
        <DebugJson json={session} />
      </Card>
    </main>
  );
}

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