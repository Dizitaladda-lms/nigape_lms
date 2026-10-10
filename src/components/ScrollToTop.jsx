"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function ScrollToTop() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Disable automatic browser scroll restoration to prevent browser from restoring
    // previous scroll position when navigating to a new route.
    if (typeof window !== "undefined" && "scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
  }, []);

  useEffect(() => {
    // Immediate scroll-to-top on route change
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
    if (document.documentElement) document.documentElement.scrollTop = 0;
    if (document.body) document.body.scrollTop = 0;

    // Reset any possible scrolling parent containers
    const containers = document.querySelectorAll(
      "main, [data-scroll-container], #__next, .overflow-y-auto, .overflow-y-scroll"
    );
    containers.forEach((el) => {
      if (el && el !== document.documentElement && el !== document.body) {
        el.scrollTop = 0;
      }
    });
  }, [pathname, searchParams]);

  return null;
}
