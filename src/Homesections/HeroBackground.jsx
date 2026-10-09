"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const Iridescence = dynamic(() => import("@/Homesections/bits/Iridescence.js"), {
  ssr: false,
  loading: () => null,
});

export default function HeroBackground() {
  const [animationReady, setAnimationReady] = useState(false);

  useEffect(() => {
    let timeoutId;
    let idleId;

    if (typeof window.requestIdleCallback === "function") {
      idleId = window.requestIdleCallback(() => setAnimationReady(true), {
        timeout: 1500,
      });
    } else {
      timeoutId = window.setTimeout(() => setAnimationReady(true), 1000);
    }

    return () => {
      window.clearTimeout(timeoutId);
      if (
        idleId !== undefined &&
        typeof window.cancelIdleCallback === "function"
      ) {
        window.cancelIdleCallback(idleId);
      }
    };
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="hero-aurora absolute inset-0" />
      {animationReady ? (
        <Iridescence
          color={[1, 0.25, 0.92]}
          mouseReact={false}
          amplitude={0.03}
          speed={0.7}
          className="iridescence-container absolute inset-0"
        />
      ) : null}
    </div>
  );
}
