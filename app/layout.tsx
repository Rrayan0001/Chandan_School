import type { Metadata } from "next";
import type { ReactNode } from "react";

import { WelcomePopup } from "@/components/WelcomePopup";

import "./globals.css";

export const metadata: Metadata = {
  title: "School Chandan | Chandan Education Society",
  description:
    "A professional Next.js school website for School Chandan under Chandan Education Society, Bangalore - Laxmeshwar.",
  metadataBase: new URL("https://chandan-school.local")
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        {children}
        <WelcomePopup />
      </body>
    </html>
  );
}
