import { Card } from "./_components/ui/card";

export default function Page() {
  return (
    <main className="p-4 flex flex-col gap-12">
      <h1 className="text-3xl">Dashboard - home</h1>
      <Card>
        <p>Select a section from the left</p>
      </Card>
    </main>
  );
}