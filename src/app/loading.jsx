"use client";

import { usePathname } from "next/navigation";
import NeoLeafLoader from "@/app/Loader";

export default function Loading() {
  const pathname = usePathname();

  return pathname === "/" ? <NeoLeafLoader /> : null;
}
