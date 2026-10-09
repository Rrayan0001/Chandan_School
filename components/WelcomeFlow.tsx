"use client";

import { useCallback, useState } from "react";
import { usePathname } from "next/navigation";
import { WelcomeAnimation } from "./WelcomeAnimation";

export function WelcomeFlow() {
  const [animationDone, setAnimationDone] = useState(false);
  const pathname = usePathname();

  const handleFinished = useCallback(() => {
    setAnimationDone(true);
  }, []);

  // Bypass welcome flow on admin portal pages
  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <>
      {!animationDone && (
        <WelcomeAnimation onFinished={handleFinished} />
      )}
    </>
  );
}
