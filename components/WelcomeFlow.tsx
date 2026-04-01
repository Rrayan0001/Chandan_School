"use client";

import { useState } from "react";
import { WelcomeAnimation } from "./WelcomeAnimation";
import { WelcomePopup } from "./WelcomePopup";

export function WelcomeFlow() {
  const [animationDone, setAnimationDone] = useState(false);

  return (
    <>
      <WelcomeAnimation onFinished={() => setAnimationDone(true)} />
      <WelcomePopup isVisible={animationDone} />
    </>
  );
}
