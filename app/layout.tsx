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
const title = "Jan Day Studio | Faux flower rentals & sourcing in Madison";
const description = "Browse thoughtful faux-flower rentals for Madison celebrations, or let Jan Day Studio source high-quality florals overseas for local pickup.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/catalog/purple-arch/01-full-arch.jpg", width: 1280, height: 1707, alt: "Jan Day Studio Purple Arch faux-floral rental" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/catalog/purple-arch/01-full-arch.jpg"],
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
