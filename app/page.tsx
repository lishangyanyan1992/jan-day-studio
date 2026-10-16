import Link from "next/link";
import { SiteFrame } from "./CatalogChrome";

const categories = [
  {
    title: "Little delights",
    subtitle: "Lifestyle gifts · $5–$30",
    copy: "Stationery, plush, lucky cats, keychains, and phone charms for the friend who is easy—or impossible—to shop for.",
    image: "/images/shop/lifestyle-gifts.jpg",
  },
  {
    title: "For the table",
    subtitle: "Teaware & tableware · $8–$45",
    copy: "Teacups, small teapots, bowls, chopstick sets, and rests that make an everyday meal feel considered.",
    image: "/images/shop/teaware-home.jpg",
  },
  {
    title: "Made for the season",
    subtitle: "Festival finds · $3–$40",
    copy: "Red envelopes, lanterns, paper cuts, and small traditions for Lunar New Year, Mid-Autumn Festival, and more.",
    image: "/images/shop/lunar-new-year.jpg",
  },
] as const;

export default function Home() {
  return (
    <SiteFrame className="home-page">
      <section className="hero page-shell">
        <div className="hero-copy">
          <p className="eyebrow">A tiny shop with a big eye for good things</p>
          <h1>Small gifts.<br /><em>Good days.</em></h1>
          <p className="hero-lede">Jan Day is a design-led gift shop tucked inside our family&apos;s restaurant in Stevens Point. Come for lunch, leave with something thoughtful.</p>
          <div className="button-row">
            <Link className="button button--red" href="/shop">See what we carry <span aria-hidden="true">→</span></Link>
            <Link className="text-link" href="/visit">Plan your visit <span aria-hidden="true">↗</span></Link>
          </div>
        </div>
        <figure className="hero-image image-frame">
          <img src="/images/shop/lifestyle-gifts.jpg" alt="A plush rabbit, lucky cat, illustrated card, charm, and keychain arranged on a wood shelf" />
          <figcaption><span>Find us in the corner</span>Inside China Wok<br />135 Division St N</figcaption>
        </figure>
      </section>

      <section className="intro-section page-shell">
        <p className="section-number">01 / Hello</p>
        <div>
          <h2>A little shop inside the place we know best.</h2>
          <div className="two-column-copy">
            <p>Jan Day began with a simple idea: make it easier to find useful, joyful, well-designed gifts close to home. We&apos;re starting small—a carefully edited corner inside China Wok—and learning as we go.</p>
            <p>Browse while you wait for a table, stop on your way out, or visit just for the shop. There is no separate storefront and no online checkout yet. New arrivals will be shared on Instagram first.</p>
          </div>
          <aside className="story-placeholder">
            <span>Owner note</span>
            <strong>The meaning behind “Jan Day” goes here.</strong>
            <p>[OWNER TO ADD: Tell the story of the name, what it means to you, and why it belongs to this shop.]</p>
          </aside>
        </div>
      </section>

      <section className="category-section page-shell">
        <header className="section-heading">
          <div><p className="section-number">02 / In the shop</p><h2>Gifts with a point of view.</h2></div>
          <p>Playful, practical, and easy to give. Most pieces are under $30, with plenty of student-friendly finds under $20.</p>
        </header>
        <div className="category-grid">
          {categories.map((category, index) => (
            <article className="category-card" key={category.title}>
              <figure><img src={category.image} alt="" /></figure>
              <div className="category-card-copy">
                <p>{String(index + 1).padStart(2, "0")} · {category.subtitle}</p>
                <h3>{category.title}</h3>
                <span>{category.copy}</span>
              </div>
            </article>
          ))}
        </div>
        <Link className="button button--ink centered-button" href="/shop">Browse all categories <span aria-hidden="true">→</span></Link>
      </section>

      <section className="under-twenty">
        <div className="page-shell under-twenty-inner">
          <p className="oversized-price">$20</p>
          <div><p className="eyebrow">Good gifts, student budgets</p><h2>Plenty to love under twenty.</h2><p>Small cards, charms, stationery, lucky cats, and dorm-friendly details—easy to give and easy to keep.</p><Link className="text-link text-link--light" href="/shop#under-twenty">See the under-$20 edit →</Link></div>
        </div>
      </section>

      <section className="originals-feature page-shell">
        <figure className="image-frame"><img src="/images/shop/jan-day-originals.jpg" alt="Jan Day illustrated cards, tote bag, print, and gift box" /></figure>
        <div><p className="section-number">03 / Our signature</p><p className="script-note">Made by us</p><h2>Meet Jan Day Originals.</h2><p>Illustrated cards, tote bags, prints, and gift boxes designed in-house. This is where our point of view becomes something you can take home.</p><Link className="button button--outline" href="/originals">Explore the originals <span aria-hidden="true">→</span></Link></div>
      </section>

      <section className="seasonal-callout page-shell">
        <div className="seasonal-copy"><p className="section-number">04 / On the calendar</p><h2>Traditions, made easy to bring home.</h2><p>Our seasonal shelves follow the festivals and gatherings that matter—especially Lunar New Year. Expect red envelopes, paper decor, gift-ready sets, and a few surprises.</p><Link className="text-link" href="/seasonal">See the seasonal edit →</Link></div>
        <figure><img src="/images/shop/lunar-new-year.jpg" alt="Red envelopes, lantern, paper cut, oranges, and Chinese knot for Lunar New Year" /></figure>
      </section>

      <section className="visit-strip">
        <div className="page-shell visit-strip-inner">
          <div><p className="eyebrow">Come find the corner</p><h2>Inside China Wok.</h2></div>
          <div className="visit-facts"><p><span>Where</span>135 Division St N<br />Stevens Point, WI</p><p><span>Hours · confirm</span>Tue–Sun, roughly 10:30 AM–9:00 PM<br />Closed Monday</p></div>
          <Link className="button button--cream" href="/visit">Get visit details <span aria-hidden="true">↗</span></Link>
        </div>
      </section>
    </SiteFrame>
  );
}
