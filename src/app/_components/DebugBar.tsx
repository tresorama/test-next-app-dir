'use client';

import { useLocaleData } from "@/i18n/client/i18n.use-locale-data";

export const DebugBar = () => {
  const _useLocaleData = useLocaleData();
  const info = {
    _useLocaleData,
  };

  return (
    <div className="p-4">
      <div className="p-4">
        <DebugJson json={info} />
      </div>
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