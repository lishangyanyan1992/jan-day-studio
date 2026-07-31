import type { Metadata } from "next";
import { Bodoni_Moda, DM_Sans } from "next/font/google";
import "./globals.css";

const serif = Bodoni_Moda({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const sans = DM_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl = productionHost ? new URL(`https://${productionHost}`) : new URL("http://localhost:3000");
const title = "Jan Day Studio | Faux flower sourcing in Madison";
const description = "High-quality faux wedding flowers sourced from vetted overseas makers, with clear ordering support and local Madison pickup.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/og-faux-florals.png", width: 1731, height: 909, alt: "Jan Day Studio faux flowers sourced for Madison weddings" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-faux-florals.png"],
  },
  icons: {
    icon: "/brand/jan-day-mark.jpg",
    apple: "/brand/jan-day-mark.jpg",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className={`${serif.variable} ${sans.variable}`}>{children}</body>
    </html>
  );
}
