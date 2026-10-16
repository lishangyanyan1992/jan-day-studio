import type { Metadata } from "next";
import { SiteFrame } from "../CatalogChrome";
import { WeddingInquiryForm } from "../WeddingInquiryForm";

export const metadata: Metadata = { title: "Weddings | Jan Day", description: "Faux flower rentals, ceremony teaware, wedding favors, and custom gifts from Jan Day." };

const floralServices = [
  ["Personal flowers", "Bouquets, boutonnières, corsages, and handheld floral pieces."],
  ["Tables", "Centerpieces, bud-vase groupings, and coordinated table details."],
  ["Ceremony moments", "Arches, aisle flowers, backdrops, and statement pieces."],
  ["Finishing touches", "Welcome-table decor, cake flowers, and small floral accents."],
] as const;

export default function WeddingsPage() {
  return (
    <SiteFrame className="weddings-page">
      <section className="wedding-hero">
        <div className="page-shell wedding-hero-inner"><div className="wedding-hero-copy"><p className="eyebrow">Jan Day Weddings</p><h1>Flowers that last.<br /><em>Details that feel like you.</em></h1><p>Realistic faux flower rentals, thoughtful ceremony pieces, and custom gifts for weddings and gatherings.</p><a className="button button--wedding" href="#wedding-inquiry">Contact us for a quote →</a><span className="confirm-tag">SERVICE DETAILS · CONFIRM WITH OWNER</span></div><figure><img src="/images/shop/weddings.jpg" alt="A wedding couple standing together in a garden" /><figcaption>Personal, practical, and designed to photograph beautifully.</figcaption></figure></div>
      </section>

      <section className="wedding-benefits page-shell"><p className="section-number">Why faux flowers</p><div className="benefit-grid"><article><span>01</span><h2>No wilting</h2><p>Set up earlier and celebrate longer without worrying about heat, water, or timing.</p></article><article><span>02</span><h2>Camera-ready</h2><p>High-quality stems photograph like the real thing and stay consistent all day.</p></article><article><span>03</span><h2>Reusable</h2><p>Rental pieces can serve more than one celebration instead of becoming one-day waste.</p></article><article><span>04</span><h2>Budget-aware</h2><p>Faux arrangements can offer scale and impact for less than comparable fresh florals.</p></article></div></section>

      <section className="wedding-services"><div className="page-shell"><header className="section-heading"><div><p className="eyebrow">Rental collection</p><h2>Build the floral layer.</h2></div><p>Choose the pieces that matter most, then we&apos;ll shape a cohesive package around your date, venue, and visual direction.</p></header><div className="wedding-service-grid">{floralServices.map(([title, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><h3>{title}</h3><p>{copy}</p></article>)}</div><p className="quote-line">No fixed prices are listed during the pilot. Contact us for a quote.</p></div></section>

      <section className="wedding-gifts page-shell"><figure><img src="/images/shop/jan-day-originals.jpg" alt="Illustrated cards, tote, print, and gift box arranged in warm colors" /></figure><div><p className="section-number">Gifts & ceremony</p><h2>Meaningful pieces for the people around you.</h2><ul><li><strong>Custom gift boxes</strong><span>For wedding parties, family, guests, or welcome tables.</span></li><li><strong>Tea ceremony sets</strong><span>Teaware and presentation pieces for a considered ceremony.</span></li><li><strong>Favors & red envelopes</strong><span>Small, coordinated details that are ready to give.</span></li><li><strong>Jan Day cards</strong><span>Original artwork with room for your own words.</span></li></ul></div></section>

      <section className="wedding-inquiry" id="wedding-inquiry"><div className="page-shell wedding-inquiry-grid"><div><p className="eyebrow">Start the conversation</p><h2>Tell us about your day.</h2><p>Share what you know so far. We&apos;ll use it to understand fit and prepare next steps. Packages and availability are subject to owner confirmation during the pilot.</p></div><WeddingInquiryForm /></div></section>
    </SiteFrame>
  );
}
