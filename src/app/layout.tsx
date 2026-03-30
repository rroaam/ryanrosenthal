import type { Metadata } from "next";
import { Bebas_Neue } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas-neue",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ryan Rosenthal — A.I. x Creative Director",
  description:
    "Ryan Rosenthal is a Creative Director working at the intersection of artificial intelligence and design. Based in Los Angeles, CA.",
  openGraph: {
    title: "Ryan Rosenthal — A.I. x Creative Director",
    description:
      "Creative Director working at the intersection of A.I. and design.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryan Rosenthal — A.I. x Creative Director",
    description:
      "Creative Director working at the intersection of A.I. and design.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} h-full antialiased`}>
      <body className="h-full">{children}</body>
    </html>
  );
}
