import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "../CatalogChrome";

export const metadata: Metadata = { title: "Visit Jan Day", description: "Find Jan Day inside China Wok at 135 Division St N in Stevens Point, Wisconsin." };

export default function VisitPage() {
  return (
    <SiteFrame className="visit-page">
      <section className="page-hero page-shell">
        <div><p className="eyebrow">The shop in the restaurant</p><h1>Come in hungry.<br /><em>Leave inspired.</em></h1></div>
        <div className="page-hero-aside"><p>Jan Day is a shop corner inside China Wok, not a separate storefront. Walk into the restaurant and look for the display.</p></div>
      </section>

      <section className="visit-card page-shell">
        <div className="visit-map" aria-label="Stylized map showing Jan Day at China Wok on Division Street North">
          <div className="map-street map-street--vertical"><span>Division St N</span></div><div className="map-street map-street--horizontal"><span>North Point Dr</span></div><div className="map-pin"><i>JD</i><strong>Jan Day</strong><small>inside China Wok</small></div>
        </div>
        <div className="visit-card-copy"><p className="section-number">Find us</p><h2>Inside China Wok</h2><address>135 Division St N<br />Stevens Point, WI 54481</address><a className="button button--red" href="https://www.google.com/maps/search/?api=1&query=China+Wok+135+Division+St+N+Stevens+Point+WI" target="_blank" rel="noreferrer">Open in maps ↗</a><p className="small-note">You do not need to dine at the restaurant to browse the shop.</p></div>
      </section>

      <section className="visit-details page-shell">
        <article><span>01</span><h2>Hours</h2><p>Tuesday–Sunday<br />Roughly 10:30 AM–9:00 PM</p><p>Closed Monday</p><strong className="confirm-tag">CONFIRM WITH OWNER</strong></article>
        <article><span>02</span><h2>Parking</h2><p>[OWNER TO CONFIRM: Add the best parking guidance, accessible entrance details, and any busy-time advice.]</p><strong className="confirm-tag">DETAILS NEEDED</strong></article>
        <article><span>03</span><h2>Before you go</h2><p>The shop is small and inventory changes. If you&apos;re looking for something specific, send a note before making a special trip.</p><Link className="text-link" href="/contact">Ask a stock question →</Link></article>
      </section>

      <section className="visit-steps"><div className="page-shell"><p className="eyebrow">Your visit, in three steps</p><ol><li><span>1</span><p>Walk into China Wok at 135 Division St N.</p></li><li><span>2</span><p>Look for the Jan Day corner inside the restaurant.</p></li><li><span>3</span><p>Browse, choose, and purchase in person.</p></li></ol></div></section>
    </SiteFrame>
  );
}
