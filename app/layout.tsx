import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Lora, Nunito } from "next/font/google";

import "aos/dist/aos.css";

import { AOSInit } from "@/components/AOSInit";
import { WelcomeFlow } from "@/components/WelcomeFlow";
import { WhatsAppButton } from "@/components/WhatsAppButton";

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
  metadataBase: new URL("https://schoolchandan.edu.in"),
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    title: "School Chandan | Chandan Education Society",
    description:
      "Excellence Beyond Education — An Institution of Chandan Education Society, Laxmeshwar. CBSE Affiliation No. 830305.",
    siteName: "School Chandan",
    type: "website",
    images: [
      {
        url: "/assets/hero/campus-front.jpg",
        width: 1200,
        height: 630,
        alt: "School Chandan campus",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "School Chandan | Chandan Education Society",
    description:
      "Excellence Beyond Education — An Institution of Chandan Education Society, Laxmeshwar.",
    images: ["/assets/hero/campus-front.jpg"],
  },
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang="en" className={`${fontHeading.variable} ${fontBody.variable}`} data-scroll-behavior="smooth">
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
