"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const navItems = [
  ["Shop", "/shop"],
  ["Jan Day Originals", "/originals"],
  ["Seasonal", "/seasonal"],
  ["Weddings", "/weddings"],
  ["Visit", "/visit"],
  ["Contact", "/contact"],
] as const;

export function CatalogHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <>
      <div className="announcement">
        <span>Opening soon</span>
        <p>Inside China Wok · Stevens Point, Wisconsin</p>
      </div>
      <header className="site-header">
        <div className="page-shell header-inner">
          <Link className="wordmark" href="/" aria-label="Jan Day home" onClick={() => setOpen(false)}>
            <span className="wordmark-jan">JAN</span>
            <span className="wordmark-day">DAY</span>
          </Link>

          <button
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="primary-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <span>{open ? "Close" : "Menu"}</span>
            <i aria-hidden="true" />
          </button>

          <nav id="primary-nav" className={`main-nav ${open ? "is-open" : ""}`} aria-label="Main navigation">
            {navItems.map(([label, href]) => (
              <Link
                key={href}
                href={href}
                className={pathname === href ? "is-active" : ""}
                onClick={() => setOpen(false)}
              >
                {label}
              </Link>
            ))}
          </nav>

          <Link className="header-visit" href="/visit">
            Find the shop <span aria-hidden="true">↗</span>
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
            <span className="wordmark-jan">JAN</span>
            <span className="wordmark-day">DAY</span>
          </Link>
          <p>A small shop for useful, delightful, and beautifully made gifts.</p>
        </div>
        <div>
          <p className="footer-label">Browse</p>
          <nav aria-label="Shop links">
            <Link href="/shop">Shop</Link>
            <Link href="/originals">Jan Day Originals</Link>
            <Link href="/seasonal">Seasonal</Link>
            <Link href="/weddings">Weddings</Link>
          </nav>
        </div>
        <div>
          <p className="footer-label">Find us</p>
          <address>
            Inside China Wok<br />
            135 Division St N<br />
            Stevens Point, WI
          </address>
          <Link className="footer-link" href="/visit">Visit details →</Link>
        </div>
        <div>
          <p className="footer-label">Keep in touch</p>
          <p>New arrivals will land on Instagram first.</p>
          <span className="owner-placeholder">Instagram link · OWNER TO ADD</span>
          <Link className="footer-link" href="/contact">Contact Jan Day →</Link>
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
