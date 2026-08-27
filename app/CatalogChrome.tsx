import Link from "next/link";

export function CatalogHeader() {
  return (
    <>
      <div className="shop-announcement">Floral collection + design studio · Madison, Wisconsin</div>
      <header className="shop-header page-shell">
        <Link className="shop-wordmark" href="/" aria-label="Jan Day Studio home">
          <img src="/brand/jan-day-wordmark.png" alt="Jan Day Studio" />
        </Link>
        <nav className="shop-nav" aria-label="Main navigation">
          <Link href="/ceremony-florals">Florals</Link>
          <Link href="/design-studio">Design Studio</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <Link className="shop-header-cta" href="/contact">
          Start a project
        </Link>
      </header>
    </>
  );
}

export function CatalogFooter() {
  return (
    <footer className="shop-footer">
      <div className="page-shell shop-footer-inner">
        <div>
          <img src="/brand/jan-day-wordmark.png" alt="Jan Day Studio" />
          <p>Thoughtful florals and custom design for celebrations, stories and everyday moments.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/ceremony-florals">Florals</Link>
          <Link href="/design-studio">Design Studio</Link>
          <Link href="/contact">Contact</Link>
        </nav>
        <p className="shop-footer-meta">© {new Date().getFullYear()} Jan Day Studio</p>
      </div>
    </footer>
  );
}
