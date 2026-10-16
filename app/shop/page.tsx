import type { Metadata } from "next";
import Link from "next/link";
import { SiteFrame } from "../CatalogChrome";

export const metadata: Metadata = { title: "Shop | Jan Day", description: "Browse the gift categories and typical price ranges coming to Jan Day in Stevens Point." };

const collections = [
  { number: "01", title: "Lifestyle gifts", price: "$5–$30", image: "/images/shop/lifestyle-gifts.jpg", copy: "Cheerful, useful, and just a little unexpected. Look for stationery, plush, lucky cats, keychains, phone charms, and small desk companions.", picks: "Great for: birthdays, study breaks, stocking stuffers" },
  { number: "02", title: "Teaware & tableware", price: "$8–$45", image: "/images/shop/teaware-home.jpg", copy: "Quietly beautiful pieces for tea, dinner, and the everyday table: teacups, small teapots, chopstick sets, bowls, and sculptural chopstick rests.", picks: "Great for: hosts, new apartments, tea people" },
  { number: "03", title: "Seasonal & festival", price: "$3–$40", image: "/images/shop/lunar-new-year.jpg", copy: "Small traditions and festive details for Lunar New Year, Mid-Autumn Festival, and the moments our community celebrates together.", picks: "Great for: family gatherings, teachers, seasonal tables" },
  { number: "04", title: "Home & decor", price: "$10–$50", image: "/images/shop/teaware-home.jpg", copy: "Ceramics, Chinese knot charms, folding fans, and small prints chosen to add character without taking over the room.", picks: "Great for: dorms, housewarmings, a shelf refresh" },
  { number: "05", title: "Jan Day Originals", price: "$5–$35", image: "/images/shop/jan-day-originals.jpg", copy: "Our signature line of illustrated cards, tote bags, prints, and gift boxes—designed by Jan Day and made to be kept.", picks: "Great for: one-of-a-kind gifts, sending, carrying" },
] as const;

export default function ShopPage() {
  return (
    <SiteFrame className="shop-browse-page">
      <section className="page-hero page-shell">
        <div><p className="eyebrow">Browse the shelves</p><h1>Good things,<br /><em>carefully picked.</em></h1></div>
        <div className="page-hero-aside"><p>Jan Day is browse-only online for now. The assortment will change often, so prices shown here are typical ranges—not a promise of current stock.</p><span className="status-pill">No cart · Shop in person</span></div>
      </section>

      <section className="collections-list page-shell" aria-label="Product categories">
        {collections.map((collection) => (
          <article className="collection-row" key={collection.title}>
            <figure><img src={collection.image} alt="" /></figure>
            <div className="collection-copy">
              <div className="collection-meta"><span>{collection.number}</span><p>{collection.price}</p></div>
              <h2>{collection.title}</h2>
              <p>{collection.copy}</p>
              <small>{collection.picks}</small>
            </div>
          </article>
        ))}
      </section>

      <section className="under-twenty-card page-shell" id="under-twenty">
        <p className="price-burst">Under<br /><strong>$20</strong></p>
        <div><p className="eyebrow">The quick-gift edit</p><h2>Affordable doesn&apos;t have to feel afterthought.</h2><p>Start with cards, phone charms, keychains, red envelopes, stationery, small lucky cats, and select Jan Day prints. Ask us what is on the shelf when you visit.</p></div>
      </section>

      <section className="shop-note page-shell">
        <div><p className="section-number">How shopping works</p><h2>See something you like?</h2></div>
        <div><p>Come browse in person during China Wok&apos;s hours. We&apos;ll share new arrivals on Instagram and are happy to answer a quick stock question before you make a special trip.</p><div className="button-row"><Link className="button button--ink" href="/visit">Plan a visit →</Link><Link className="text-link" href="/contact">Ask about an item</Link></div></div>
      </section>
    </SiteFrame>
  );
}
