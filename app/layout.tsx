import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Lora, Nunito } from "next/font/google";

import { WelcomePopup } from "@/components/WelcomePopup";
import { AOSInit } from "@/components/AOSInit";

import "./globals.css";

const fontHeading = Lora({ 
  subsets: ["latin"], 
  display: "swap", 
  variable: "--font-heading" 
});

const fontBody = Nunito({ 
  subsets: ["latin"], 
  display: "swap", 
  variable: "--font-body" 
});

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
    <html lang="en" className={`${fontHeading.variable} ${fontBody.variable}`}>
      <body>
        <AOSInit />
        {children}
        <WelcomePopup />
      </body>
    </html>
  );
}
