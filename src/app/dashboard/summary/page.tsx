import { Suspense } from "react";
import { Card } from "../_components/ui/card";

// utils
const sleep = (timeInMs: number) => new Promise(res => setTimeout(res, timeInMs));

// data
const getData1 = async () => {
  await sleep(2000);
  return {
    suspense: 'is great'
  };
};
const getData2 = async () => {
  await sleep(4000);
  return {
    streaming: 'is the future'
  };
};

// main components
const Loading = () => <div className="p-8 flex justify-center items-center">Loading</div>;
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

export default function Page() {
  return (
    <main className="p-4 flex flex-col gap-12">
      <h1 className="text-3xl">Dashboard - Summary</h1>
      <Card>
        <Suspense fallback={<Loading />}>
          <Data1 />
        </Suspense>
      </Card>
      <Card>
        <Suspense fallback={<Loading />}>
          <Data2 />
        </Suspense>
      </Card>
    </main>
  );
}

async function Data1() {
  const data = await getData1();
  return <DebugJson json={data} />;
}
async function Data2() {
  const data = await getData2();
  return <DebugJson json={data} />;
} 