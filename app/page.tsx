'use client';

import dynamic from 'next/dynamic';

const ClientApp = dynamic(() => import('./ClientApp'), {
  ssr: false,
  loading: () => <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Loading...</div>,
});

export default function Page() {
  return <ClientApp />;
}
