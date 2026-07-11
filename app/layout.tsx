import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { headers } from "next/headers";
import "./globals.css";

const serif = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host = requestHeaders.get("x-forwarded-host") ?? requestHeaders.get("host") ?? "localhost";
  const protocol = requestHeaders.get("x-forwarded-proto") ?? "https";
  const siteUrl = new URL(`${protocol}://${host}`);
  const title = "Jan Day | Thoughtful wedding rentals";
  const description = "Curated wedding rentals for timeless celebrations, delivered with care.";

  return {
    metadataBase: siteUrl,
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      images: [{ url: new URL("/og.png", siteUrl), width: 1200, height: 630, alt: "Jan Day wedding rentals" }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [new URL("/og.png", siteUrl)],
    },
  };
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
