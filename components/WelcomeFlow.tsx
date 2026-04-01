"use client";

import { useState } from "react";
import { WelcomeAnimation } from "./WelcomeAnimation";

export function WelcomeFlow() {
  const [animationDone, setAnimationDone] = useState(false);

  return (
    <>
      {!animationDone && (
        <WelcomeAnimation onFinished={() => setAnimationDone(true)} />
      )}
    </>
  );
}
