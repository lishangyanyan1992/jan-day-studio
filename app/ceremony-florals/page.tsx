import type { Metadata } from "next";
import Link from "next/link";
import { CatalogFooter, CatalogHeader } from "../CatalogChrome";
import { flowerArchVariations, purpleArch } from "@/lib/catalog";

export const metadata: Metadata = {
  title: "Florals | Jan Day Studio",
  description: "Rent, buy or source reusable faux flowers from Jan Day Studio in Madison, Wisconsin.",
};

const floralServices = [
  ["01", "Rent", "Choose a ready-to-rent design for one event, with straightforward Madison-area pickup and return."],
  ["02", "Buy", "Purchase a floral design for repeated events, permanent display or use in your own rental collection."],
  ["03", "Source", "Share a reference and we’ll help compare overseas makers, manage ordering and inspect what arrives."],
] as const;

const sourcingSteps = [
  ["01", "Choose the flowers", "Browse the catalog or send the look, dimensions, quantities and palette you want."],
  ["02", "We source with care", "We compare high-quality makers in China and other overseas markets, then manage ordering and freight."],
  ["03", "Pick up in Madison", "We inspect what arrives and prepare the flowers for a clear, easy local handoff."],
] as const;

const archShapeGroups = [
  {
    id: "square",
    kicker: "01 · Architectural",
    title: "Square arches",
    description: "A full floral frame with a clean, classic silhouette.",
  },
  {
    id: "u-shaped",
    kicker: "02 · Open form",
    title: "U-shaped arches",
    description: "Open U-shaped and sculptural horn-shaped pairs create an airy ceremony frame.",
  },
] as const;

export default function CeremonyFloralsPage() {
  return (
    <main className="shop-page floral-page">
      <CatalogHeader />

      <section className="floral-hero page-shell">
        <div className="floral-hero-copy">
          <p className="shop-kicker">Jan Day · Florals</p>
          <h1>Flowers with more than one way forward.</h1>
          <p>
            Rent a finished faux-flower design, purchase one for your own collection, or bring us a reference and let us help source it overseas.
          </p>
          <a className="shop-button shop-button--dark" href="#floral-catalog">
            Browse all products <span aria-hidden="true">↓</span>
          </a>
        </div>
        <figure>
          <img src={purpleArch.images[0].src} alt={purpleArch.images[0].alt} />
          <figcaption>Reusable faux florals · Madison, Wisconsin</figcaption>
        </figure>
      </section>

      <section className="floral-services page-shell" aria-labelledby="floral-services-title">
        <div className="floral-section-heading">
          <p className="shop-kicker">How to work with us</p>
          <h2 id="floral-services-title">Rent it. Buy it. Or ask us to find it.</h2>
        </div>
        <div className="floral-services-grid">
          {floralServices.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="floral-catalog" id="floral-catalog" aria-labelledby="floral-catalog-title">
        <div className="page-shell">
          <div className="floral-catalog-heading">
            <div>
              <p className="shop-kicker">The floral catalog</p>
              <h2 id="floral-catalog-title">All products.</h2>
            </div>
            <p>Every design is presented at the same catalog level. Prices marked TBD are placeholders while purchase and rental details are finalized.</p>
          </div>

          <div className="floral-product-groups">
            {archShapeGroups.map((group) => (
              <section className="floral-product-group" id={`${group.id}-arches`} key={group.id} aria-labelledby={`${group.id}-title`}>
                <header className="floral-product-group-heading">
                  <div>
                    <p className="shop-kicker">{group.kicker}</p>
                    <h3 id={`${group.id}-title`}>{group.title}</h3>
                  </div>
                  <p>{group.description}</p>
                </header>
                <div className="floral-product-grid">
                  {group.id === "u-shaped" && (
                    <article className="floral-product-card">
                      <Link href={purpleArch.href} className="floral-product-image">
                        <img src={purpleArch.images[0].src} alt={purpleArch.images[0].alt} />
                      </Link>
                      <div className="floral-product-meta">
                        <p>{purpleArch.shape} · Lavender &amp; plum</p>
                        <h3><Link href={purpleArch.href}>{purpleArch.name}</Link></h3>
                        <span>{purpleArch.palette}</span>
                        <div className="floral-product-pricing">
                          <span>{purpleArch.rentPriceLabel}</span>
                          <span>{purpleArch.sellPriceLabel}</span>
                        </div>
                        <Link className="shop-text-link" href={purpleArch.href}>View product</Link>
                      </div>
                    </article>
                  )}
                  {flowerArchVariations.filter((arch) => arch.shapeId === group.id).map((arch) => (
                    <article className="floral-product-card" key={arch.slug}>
                      <Link href={arch.href} className="floral-product-image">
                        <img src={arch.image.src} alt={arch.image.alt} loading="lazy" />
                      </Link>
                      <div className="floral-product-meta">
                        <p>{arch.shape} · {arch.color}</p>
                        <h3><Link href={arch.href}>{arch.name}</Link></h3>
                        <span>{arch.palette}</span>
                        <div className="floral-product-pricing">
                          <span>{arch.rentPriceLabel}</span>
                          <span>{arch.sellPriceLabel}</span>
                        </div>
                        <Link className="shop-text-link" href={arch.href}>View product</Link>
                      </div>
                    </article>
                  ))}
                  {group.id === "u-shaped" && flowerArchVariations.filter((arch) => arch.shapeId === "horn-shaped").map((arch) => (
                    <article className="floral-product-card" key={arch.slug}>
                      <Link href={arch.href} className="floral-product-image">
                        <img src={arch.image.src} alt={arch.image.alt} loading="lazy" />
                      </Link>
                      <div className="floral-product-meta">
                        <p>{arch.shape} · {arch.color}</p>
                        <h3><Link href={arch.href}>{arch.name}</Link></h3>
                        <span>{arch.palette}</span>
                        <div className="floral-product-pricing">
                          <span>{arch.rentPriceLabel}</span>
                          <span>{arch.sellPriceLabel}</span>
                        </div>
                        <Link className="shop-text-link" href={arch.href}>View product</Link>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            ))}
          </div>

        </div>
      </section>

      <section className="floral-sourcing page-shell" aria-labelledby="floral-sourcing-title">
        <div className="floral-sourcing-intro">
          <p className="shop-kicker">Beyond the catalog</p>
          <h2 id="floral-sourcing-title">You choose the flowers. We handle the distance.</h2>
          <p>
            Bring us the reference image you keep returning to. We translate the look into useful specifications, compare options and help manage the overseas order.
          </p>
        </div>
        <ol>
          {sourcingSteps.map(([number, title, description]) => (
            <li key={number}>
              <span>{number}</span>
              <div><h3>{title}</h3><p>{description}</p></div>
            </li>
          ))}
        </ol>
      </section>

      <section className="floral-contact">
        <div className="page-shell floral-contact-inner">
          <p className="shop-kicker">Need help choosing?</p>
          <h2>Start with the flowers you love.</h2>
          <p>Send your date, preferred product or reference image. We&apos;ll help you compare rental, purchase and sourcing options.</p>
          <Link className="shop-button shop-button--light" href="/contact?service=florals">
            Contact the floral studio <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <CatalogFooter />
    </main>
  );
}
