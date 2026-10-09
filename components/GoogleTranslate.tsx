"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

declare global {
  interface Window {
    googleTranslateElementInit?: () => void;
    google?: { translate: { TranslateElement: new (...args: unknown[]) => unknown } };
  }
}

function initTranslateElement() {
  const mount = document.getElementById("google_translate_element");
  if (!mount) return;
  // Skip if the widget already rendered into this node
  if (mount.querySelector("select, iframe, .goog-te-gadget")) return;
  if (window.google?.translate?.TranslateElement) {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,kn",
        layout: 0, // SIMPLE layout
        autoDisplay: false,
      },
      "google_translate_element"
    );
  }
}

export function GoogleTranslate() {
  const pathname = usePathname();

  useEffect(() => {
    window.googleTranslateElementInit = initTranslateElement;

    let script = document.getElementById(
      "google-translate-script"
    ) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement("script");
      script.id = "google-translate-script";
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => {
        document.getElementById("gtranslate-wrap")?.setAttribute("hidden", "");
      };
      document.body.appendChild(script);
    } else if (window.google?.translate?.TranslateElement) {
      // Script already loaded (e.g. after client-side navigation remounted
      // the target node) — re-instantiate the widget into the fresh node.
      initTranslateElement();
    }
  }, [pathname]);

  return (
    <div className="gtranslate-wrap" id="gtranslate-wrap">
      <div id="google_translate_element" />
    </div>
  );
}
