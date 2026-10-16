import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "../CatalogChrome";

export const metadata: Metadata = { title: "Jan Day Originals", description: "Explore Jan Day's signature line of illustrated paper goods, totes, prints, and gift boxes." };

const originals = [
  ["Illustrated cards", "$5–$9", "Small notes with a point of view—made for birthdays, thank-yous, celebrations, and just because."],
  ["Tote bags", "$18–$28", "Useful canvas carryalls with original Jan Day artwork, made for market runs and library stacks."],
  ["Small prints", "$12–$25", "Colorful, easy-to-frame artwork for dorm rooms, reading corners, and thoughtful walls."],
  ["Gift boxes", "$20–$35", "A ready-to-give mix of paper goods and small finds, wrapped with the Jan Day touch."],
] as const;

export default function OriginalsPage() {
  return (
    <SiteFrame className="originals-page">
      <section className="originals-hero page-shell">
        <div className="originals-title"><p className="eyebrow">Our signature line</p><h1>Made by Jan Day.<br /><em>Made to be given.</em></h1><p>Original illustration, useful formats, and color that feels like us. Designed in-house in small runs.</p></div>
        <figure className="image-frame"><img src="/images/shop/jan-day-originals.jpg" alt="A collection of Jan Day illustrated cards, tote bag, art print, and wrapped gift box" /></figure>
      </section>

      <section className="originals-manifesto">
        <div className="page-shell manifesto-grid">
          <p className="section-number">Why originals</p>
          <h2>Not a souvenir.<br />A little piece of the shop.</h2>
          <p>Jan Day Originals are the heart of the collection: work we can&apos;t find anywhere else because we made it ourselves. The line will grow with the pilot—one card, print, and useful object at a time.</p>
        </div>
      </section>

      <section className="originals-grid page-shell">
        {originals.map(([title, price, copy], index) => <article key={title}><span>{String(index + 1).padStart(2, "0")}</span><p>{price}</p><h2>{title}</h2><div className="mini-art" aria-hidden="true"><i /><i /><i /></div><p>{copy}</p></article>)}
      </section>

      <section className="originals-values page-shell">
        <div><p className="eyebrow">The Jan Day stamp</p><h2>Drawn with warmth.<br />Printed with texture.<br />Easy to live with.</h2></div>
        <ol><li><span>01</span><div><strong>Original artwork</strong><p>Every motif begins with our own drawing or composition.</p></div></li><li><span>02</span><div><strong>Small, useful formats</strong><p>Pieces that are easy to gift, send, carry, or hang.</p></div></li><li><span>03</span><div><strong>Limited small runs</strong><p>We start with a few, listen, then make more of what people love.</p></div></li></ol>
      </section>

      <section className="cta-panel page-shell"><div><p className="eyebrow">Opening soon</p><h2>Find the first drop in store.</h2><p>New Originals will be announced on Instagram as the shop opens.</p></div><div className="button-row"><Link className="button button--red" href="/visit">Visit Jan Day →</Link><Link className="text-link" href="/contact">Ask about originals</Link></div></section>
    </SiteFrame>
  );
}
