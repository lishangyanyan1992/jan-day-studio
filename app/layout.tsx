import type { Metadata } from "next";
import { Bodoni_Moda, DM_Sans } from "next/font/google";
import "./globals.css";

const serif = Bodoni_Moda({ variable: "--font-serif", subsets: ["latin"], weight: ["400", "500", "600"] });
const sans = DM_Sans({ variable: "--font-sans", subsets: ["latin"], weight: ["400", "500", "600"] });

const productionHost = process.env.VERCEL_PROJECT_PRODUCTION_URL ?? process.env.VERCEL_URL;
const siteUrl = productionHost ? new URL(`https://${productionHost}`) : new URL("http://localhost:3000");
const title = "Jan Day | A small design-led gift shop in Stevens Point";
const description = "Discover thoughtful gifts, teaware, seasonal finds, and Jan Day Originals inside China Wok in Stevens Point, Wisconsin.";

export const metadata: Metadata = {
  metadataBase: siteUrl,
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
    images: [{ url: "/images/shop/lifestyle-gifts.jpg", width: 1800, height: 1200, alt: "A warm display of gifts at Jan Day" }],
  },
  twitter: { card: "summary_large_image", title, description, images: ["/images/shop/lifestyle-gifts.jpg"] },
  icons: { icon: "/brand/jan-day-mark.jpg", apple: "/brand/jan-day-mark.jpg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body className={`${serif.variable} ${sans.variable}`}>{children}</body></html>;
}
