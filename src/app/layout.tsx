import type { Metadata } from "next";
import "./globals.css";
import FilmGrain from "@/components/FilmGrain";

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
    <html lang="en" className="h-full antialiased">
      <body className="h-full" style={{ background: "#F4F3F1" }}>
        <FilmGrain opacity={0.025} />
        {children}
      </body>
    </html>
  );
}
