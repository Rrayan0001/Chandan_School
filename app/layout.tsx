import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Lora, Nunito } from "next/font/google";

import { AOSInit } from "@/components/AOSInit";
import { WelcomeFlow } from "@/components/WelcomeFlow";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { GoogleTranslate } from "@/components/GoogleTranslate";

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
    "A professional Next.js school website for School Chandan, An Institution of Chandan Education Society, Bangalore - Laxmeshwar.",
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
        <WhatsAppButton />
        {/* WelcomeFlow runs the animation then shows the popup */}
        <WelcomeFlow />
      </body>
    </html>
  );
}
