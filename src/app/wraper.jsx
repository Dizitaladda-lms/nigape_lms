'use client';

import { useState, useEffect } from 'react';
import Loader from './Loader.jsx';

export default function ClientWrapper({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2800);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {children}
      {loading && <Loader />}
    </>
  );
}
