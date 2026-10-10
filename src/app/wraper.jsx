'use client';

import { useState, useEffect } from 'react';
import '@/lib/dom-patch';
import NeoLeafLoader from './Loader.jsx';

export default function ClientWrapper({ children }) {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    // Show loader only once when the user visits the site for the first time
    try {
      const alreadyLoaded = sessionStorage.getItem('nigape_has_loaded');
      if (!alreadyLoaded) {
        setShowLoader(true);
        sessionStorage.setItem('nigape_has_loaded', 'true');
      }
    } catch {
      // In case storage is inaccessible
      setShowLoader(false);
    }
  }, []);

  return (
    <>
      {showLoader && (
        <NeoLeafLoader onComplete={() => setShowLoader(false)} />
      )}
      {children}
    </>
  );
}
