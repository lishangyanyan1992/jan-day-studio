import Link from "next/link";
import { CatalogFooter, CatalogHeader } from "./CatalogChrome";
import { catalogCollections, purpleArch } from "@/lib/catalog";

const steps = [
  ["01", "Choose the flowers", "Browse the Jan Day rental collection or send us the look you want."],
  ["02", "We source with care", "We compare high-quality makers in China and other overseas markets, then manage ordering and freight."],
  ["03", "Pick up in Madison", "We inspect what arrives and prepare your flowers for an easy local handoff."],
];

export default function Home() {
  return (
    <main className="shop-page">
      <CatalogHeader />

      <section className="shop-hero page-shell" id="top">
        <div className="shop-hero-copy">
          <p className="shop-kicker">The Jan Day floral collection</p>
          <h1>Beautiful faux flowers, thoughtfully within reach.</h1>
          <p>
            Browse ready-to-rent flowers for Madison celebrations—or show us your vision and let us source high-quality options overseas, including from trusted makers in China.
          </p>
          <div className="shop-actions">
            <Link className="shop-button shop-button--dark" href="/ceremony-florals/purple-arch">
              Shop Purple Arch <span aria-hidden="true">→</span>
            </Link>
            <a className="shop-text-link" href="#how-it-works">How sourcing works</a>
          </div>
        </div>
        <Link className="shop-hero-media" href={purpleArch.href} aria-label="View Purple Arch">
          <img src={purpleArch.images[0].src} alt={purpleArch.images[0].alt} />
          <span>Now available · Ceremony</span>
        </Link>
      </section>

      <section className="shop-featured page-shell" aria-labelledby="featured-title">
        <div className="shop-section-heading">
          <p className="shop-kicker">Featured rental</p>
          <h2 id="featured-title">Made to transform the room.</h2>
          <Link className="shop-text-link" href={purpleArch.categoryHref}>View ceremony collection</Link>
        </div>
        <article className="featured-product">
          <Link className="featured-product-image" href={purpleArch.href}>
            <img src={purpleArch.images[1].src} alt={purpleArch.images[1].alt} />
          </Link>
          <div className="featured-product-copy">
            <p className="product-category">{purpleArch.category}</p>
            <h3><Link href={purpleArch.href}>{purpleArch.name}</Link></h3>
            <p>{purpleArch.description}</p>
            <div className="featured-product-meta">
              <span>{purpleArch.priceLabel}</span>
              <span>{purpleArch.palette}</span>
            </div>
            <Link className="shop-button shop-button--outline" href={purpleArch.href}>
              View the piece <span aria-hidden="true">→</span>
            </Link>
          </div>
        </article>
      </section>

      <section className="shop-collections" id="collections" aria-labelledby="collections-title">
        <div className="page-shell">
          <div className="shop-section-heading shop-section-heading--collections">
            <p className="shop-kicker">Browse the catalog</p>
            <h2 id="collections-title">Flowers for every part of the day.</h2>
            <p>One ceremony piece is ready now. The rest of the collection is growing.</p>
          </div>
          <div className="shop-collection-grid">
            {catalogCollections.map((collection, index) => (
              <Link className={`shop-collection-card ${collection.image ? "is-live" : "is-coming"}`} href={collection.href} key={collection.name}>
                <div className="shop-collection-image">
                  {collection.image ? (
                    <img src={collection.image.src} alt={collection.image.alt} />
                  ) : (
                    <div className="collection-placeholder" aria-hidden="true"><span>{String(index + 1).padStart(2, "0")}</span></div>
                  )}
                </div>
                <div>
                  <h3>{collection.title}</h3>
                  <p>{collection.status}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="shop-editorial page-shell" id="how-it-works">
        <figure>
          <img src={purpleArch.images[5].src} alt={purpleArch.images[5].alt} />
        </figure>
        <div>
          <p className="shop-kicker">Beyond the catalog</p>
          <h2>You pick the flowers. We handle the distance.</h2>
          <p className="shop-editorial-lead">
            Jan Day helps couples reach premium faux florals without navigating an international order alone. You share the look, quantities and budget; we translate the vision into useful specifications, compare options and manage the overseas order.
          </p>
          <ol className="shop-steps">
            {steps.map(([number, title, description]) => (
              <li key={number}>
                <span>{number}</span>
                <div><h3>{title}</h3><p>{description}</p></div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="shop-contact" id="contact">
        <div className="page-shell shop-contact-inner">
          <p className="shop-kicker">Have another flower in mind?</p>
          <h2>Show us the look.<br />We’ll help you find it.</h2>
          <p>Send your reference images, event date, quantities and budget. We’ll help you understand what can be sourced and what it will take to bring it to Madison.</p>
          <a className="shop-button shop-button--light" href="mailto:lshangyanyan@gmail.com?subject=Jan%20Day%20flower%20sourcing%20request">
            Start a sourcing request <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <CatalogFooter />
    </main>
  );
}
