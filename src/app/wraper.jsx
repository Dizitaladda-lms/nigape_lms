'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import '@/lib/dom-patch';
import NeoLeafLoader from './Loader.jsx';

export default function ClientWrapper({ children }) {
  const [loading, setLoading] = useState(true);
  const pathname = usePathname();

  useEffect(() => {
    // Only display the full loader on the main landing / homepage
    if (pathname !== '/') {
      setLoading(false);
      return;
    }

    // Safety fallback so page is never blocked
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, [pathname]);

  return (
    <>
      {loading && pathname === '/' && (
        <NeoLeafLoader onComplete={() => setLoading(false)} />
      )}
      {children}
    </>
  );
}
