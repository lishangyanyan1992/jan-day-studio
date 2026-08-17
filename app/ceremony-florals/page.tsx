import type { Metadata } from "next";
import Link from "next/link";
import { CatalogFooter, CatalogHeader } from "../CatalogChrome";
import { purpleArch } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Ceremony Florals | Jan Day Studio",
  description: "Browse faux-floral ceremony rentals from Jan Day Studio in Madison, Wisconsin.",
};

export default function CeremonyFloralsPage() {
  return (
    <main className="shop-page">
      <CatalogHeader />
      <header className="collection-hero page-shell">
        <p className="shop-kicker">The collection · Ceremony</p>
        <h1>Ceremony florals</h1>
        <p>Faux-floral pieces with the scale to frame a promise and the flexibility to move wherever the celebration goes next.</p>
      </header>
      <section className="collection-product-grid page-shell" aria-label="Ceremony products">
        <article className="catalog-product-card">
          <Link href={purpleArch.href} className="catalog-product-image">
            <img src={purpleArch.images[0].src} alt={purpleArch.images[0].alt} />
          </Link>
          <div className="catalog-product-title">
            <div>
              <p>{purpleArch.category}</p>
              <h2><Link href={purpleArch.href}>{purpleArch.name}</Link></h2>
            </div>
            <span>{purpleArch.priceLabel}</span>
          </div>
          <Link className="shop-text-link" href={purpleArch.href}>View details</Link>
        </article>
      </section>
      <section className="collection-note page-shell">
        <p>Looking for another palette or shape?</p>
        <a href="mailto:lshangyanyan@gmail.com?subject=Jan%20Day%20ceremony%20flower%20request">Ask us to source it <span aria-hidden="true">→</span></a>
      </section>
      <CatalogFooter />
    </main>
  );
}
