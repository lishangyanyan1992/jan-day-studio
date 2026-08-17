import { CatalogFooter, CatalogHeader } from "./CatalogChrome";
import type { PlaceholderCollection } from "@/lib/sourcing/placeholder-collections";

export function PlaceholderSampleCatalog({ collection }: { collection: PlaceholderCollection }) {
  return (
    <main className="shop-page">
      <CatalogHeader />
      <header className="collection-hero collection-hero--placeholder page-shell">
        <p className="shop-kicker">{collection.eyebrow}</p>
        <h1>{collection.title}</h1>
        <p>{collection.intro}</p>
      </header>
      <section className="coming-grid page-shell" aria-label={collection.sectionLabel}>
        {collection.samples.map((sample) => (
          <article key={sample.number}>
            <div className="coming-image"><span>{sample.number}</span><p>Image coming soon</p></div>
            <p className="product-category">{sample.use}</p>
            <h2>{sample.name}</h2>
            <p>{sample.description}</p>
            <span className="coming-status">Collection preview</span>
          </article>
        ))}
      </section>
      <section className="collection-coming-cta">
        <div className="page-shell">
          <p className="shop-kicker">Help shape what comes next</p>
          <h2>{collection.ctaTitle}</h2>
          <p>{collection.ctaBody}</p>
          <a className="shop-button shop-button--dark" href="mailto:lshangyanyan@gmail.com?subject=Jan%20Day%20collection%20request">
            Share your vision <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>
      <CatalogFooter />
    </main>
  );
}
