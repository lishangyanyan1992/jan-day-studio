import type { Metadata } from "next";
import Link from "next/link";
import { AvailabilityForm } from "../../AvailabilityForm";
import { CatalogFooter, CatalogHeader } from "../../CatalogChrome";
import { purpleArch } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Purple Arch Rental | Jan Day Studio",
  description: "Rent the Purple Arch, a romantic pair of lavender, plum and ivory faux-floral pillars for Madison-area weddings.",
  openGraph: {
    title: "Purple Arch | Jan Day Studio",
    description: "A romantic pair of faux-floral ceremony pillars, available to rent in Madison.",
    images: [{ url: purpleArch.images[0].src, width: 1280, height: 1707, alt: purpleArch.images[0].alt }],
  },
};

export default function PurpleArchPage() {
  return (
    <main className="shop-page product-page">
      <CatalogHeader />
      <div className="product-breadcrumb page-shell">
        <Link href="/">Catalog</Link><span>/</span><Link href={purpleArch.categoryHref}>Ceremony</Link><span>/</span><span>{purpleArch.name}</span>
      </div>

      <section className="product-layout page-shell">
        <div className="product-gallery" aria-label="Purple Arch photo gallery">
          {purpleArch.images.map((image, index) => (
            <figure className={index === 0 ? "product-gallery-feature" : ""} key={image.src}>
              <img src={image.src} alt={image.alt} loading={index > 1 ? "lazy" : undefined} />
            </figure>
          ))}
        </div>

        <aside className="product-details">
          <p className="product-category">{purpleArch.category} rental</p>
          <h1>{purpleArch.name}</h1>
          <p className="product-price">{purpleArch.priceLabel}</p>
          <p className="product-description">{purpleArch.description}</p>
          <p className="product-palette">{purpleArch.palette}</p>
          <a className="shop-button shop-button--dark" href="#availability">Check availability <span aria-hidden="true">↓</span></a>
          <div className="product-includes">
            <h2>Rental includes</h2>
            <ul>{purpleArch.includes.map((item) => <li key={item}>{item}</li>)}</ul>
          </div>
          <details className="product-disclosure">
            <summary>Pickup & timing</summary>
            <p>Pickup and return details are confirmed with your reservation. Share your date and venue below and we’ll reply with availability and the handoff window.</p>
          </details>
          <details className="product-disclosure">
            <summary>Care & setup</summary>
            <p>The pillars are freestanding and designed for flexible positioning. Keep them dry, move them from the base, and follow the setup notes provided at pickup.</p>
          </details>
        </aside>
      </section>

      <section className="availability-section" id="availability">
        <div className="page-shell availability-inner">
          <div>
            <p className="shop-kicker">Purple Arch availability</p>
            <h2>Tell us about your date.</h2>
            <p>We’ll confirm whether the piece is available and send the next steps for reserving it.</p>
          </div>
          <AvailabilityForm />
        </div>
      </section>
      <CatalogFooter />
    </main>
  );
}
