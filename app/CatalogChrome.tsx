import Link from "next/link";

export function CatalogHeader() {
  return (
    <>
      <div className="shop-announcement">Faux-floral rentals · Madison, Wisconsin</div>
      <header className="shop-header page-shell">
        <Link className="shop-wordmark" href="/" aria-label="Jan Day Studio home">
          <img src="/brand/jan-day-wordmark.png" alt="Jan Day Studio" />
        </Link>
        <nav className="shop-nav" aria-label="Main navigation">
          <Link href="/#collections">Collections</Link>
          <Link href="/#contact">Contact</Link>
        </nav>
        <Link className="shop-header-cta" href="/ceremony-florals/purple-arch#availability">
          Check availability
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
          <p>Thoughtful faux flowers for celebrations in and around Madison.</p>
        </div>
        <nav aria-label="Footer navigation">
          <Link href="/#collections">Collections</Link>
          <a href="mailto:lshangyanyan@gmail.com">Email us</a>
        </nav>
        <p className="shop-footer-meta">© {new Date().getFullYear()} Jan Day Studio</p>
      </div>
    </footer>
  );
}
