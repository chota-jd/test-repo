import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AI Director Challenge",
  description:
    "An interactive, stepped activity platform for the Agentic AI course, allowing users to apply classification, blueprinting, and prompting skills in a guided journey.",
  applicationName: "AI Director Challenge",
  openGraph: {
    title: "AI Director Challenge",
    description:
      "Design, prompt, and activate an Agentic AI solution in a guided journey.",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Director Challenge",
    description:
      "Design, prompt, and activate an Agentic AI solution in a guided journey.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>{children}</body>
    </html>
  );
}
