import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "../CatalogChrome";

export const metadata: Metadata = { title: "Seasonal | Jan Day", description: "Lunar New Year and seasonal festival goods at Jan Day in Stevens Point." };

export default function SeasonalPage() {
  return (
    <SiteFrame className="seasonal-page">
      <section className="seasonal-hero">
        <div className="page-shell seasonal-hero-inner">
          <div><p className="eyebrow">The seasonal shelf</p><h1>For the days<br /><em>we gather.</em></h1><p>Small traditions, festive tables, and gift-ready details—chosen for the season and our community.</p></div>
          <figure><img src="/images/shop/lunar-new-year.jpg" alt="Modern Lunar New Year display with red envelopes, lantern, paper cut, oranges, and knot charm" /></figure>
        </div>
      </section>

      <section className="lny-feature page-shell">
        <div className="vertical-label">Lunar New Year</div>
        <div className="lny-copy"><p className="section-number">Featured festival</p><h2>Welcome the new year with color, luck, and something to share.</h2><p>Our Lunar New Year edit brings together red envelopes, lanterns, paper cuts, lucky charms, and small gifts for hosts, family, friends, and little ones.</p><p className="stock-note">Selection will vary during the pilot. Follow Instagram or contact us before making a special trip for a specific item.</p></div>
        <div className="lny-list"><p><span>01</span>Red envelopes · $3–$12</p><p><span>02</span>Paper decor & lanterns · $8–$30</p><p><span>03</span>Lucky charms & small gifts · $5–$25</p><p><span>04</span>Gift-ready sets · $18–$40</p></div>
      </section>

      <section className="festival-calendar">
        <div className="page-shell"><header><p className="eyebrow">Across the year</p><h2>A shelf that changes<br />with the calendar.</h2></header><div className="festival-grid"><article><span>Spring</span><h3>Lunar New Year</h3><p>Red envelopes, lanterns, paper cuts, lucky charms, and gift sets.</p></article><article><span>Autumn</span><h3>Mid-Autumn</h3><p>Table decor, small gifts, tea pairings, and gathering-ready details.</p></article><article><span>Winter</span><h3>Holiday gifting</h3><p>Pre-ordered gift boxes for friends, families, teams, and local employers.</p></article></div></div>
      </section>

      <section className="gift-box-teaser page-shell"><div><p className="section-number">Coming later</p><h2>Holiday boxes, packed by Jan Day.</h2></div><div><p>We&apos;re planning pre-ordered gift boxes and corporate gifts for local employers. Tell us what you&apos;re celebrating, how many you need, and your budget—we&apos;ll follow up as the pilot takes shape.</p><Link className="button button--ink" href="/contact?interest=gift-boxes">Start a gift inquiry →</Link></div></section>
    </SiteFrame>
  );
}
