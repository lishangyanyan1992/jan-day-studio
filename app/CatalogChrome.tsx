import Link from "next/link";

export function CatalogHeader() {
  return (
    <>
      <div className="announcement">
        <span>Opening soon</span>
        <p>Inside China Wok and Online · Stevens Point, Wisconsin</p>
      </div>
      <header className="site-header">
        <div className="page-shell header-inner">
          <Link className="wordmark" href="/" aria-label="Jan Day home">
            <img className="wordmark-logo" src="/brand/jan-day-wordmark.png" alt="Jan Day Studio" width={682} height={230} />
          </Link>
          <Link className="header-visit" href="/#contact">
            Get in touch <span aria-hidden="true">↓</span>
          </Link>
        </div>
      </header>
    </>
  );
}

export function CatalogFooter() {
  return (
    <footer className="site-footer">
      <div className="page-shell footer-grid">
        <div className="footer-brand">
          <Link className="wordmark wordmark--light" href="/" aria-label="Jan Day home">
            <img className="wordmark-logo" src="/brand/jan-day-wordmark.png" alt="Jan Day Studio" width={682} height={230} />
          </Link>
          <p>A small shop for useful, delightful, and beautifully made gifts.</p>
        </div>
        <div>
          <p className="footer-label">Find us</p>
          <address>
            Inside China Wok<br />
            135 Division St N<br />
            Stevens Point, WI
          </address>
          <a className="footer-link" href="https://www.google.com/maps/search/?api=1&query=China+Wok+135+Division+St+N+Stevens+Point+WI" target="_blank" rel="noreferrer">Get directions ↗</a>
        </div>
        <div>
          <p className="footer-label">Keep in touch</p>
          <p>New arrivals will land on Instagram first.</p>
          <a className="footer-link" href="https://www.instagram.com/shopjanday/" target="_blank" rel="noreferrer">@shopjanday on Instagram ↗</a>
          <Link className="footer-link" href="/#contact">Contact Jan Day ↑</Link>
        </div>
      </div>
      <div className="page-shell footer-bottom">
        <p>© {new Date().getFullYear()} Jan Day</p>
        <p>Small shop · Family restaurant · Stevens Point</p>
      </div>
    </footer>
  );
}

export function SiteFrame({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <main className={`site-page ${className}`}>
      <CatalogHeader />
      {children}
      <CatalogFooter />
    </main>
  );
}
