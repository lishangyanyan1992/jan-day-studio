import Link from "next/link";
import { CatalogFooter, CatalogHeader } from "./CatalogChrome";
import { purpleArch } from "@/lib/catalog";

const studioPrinciples = [
  ["01", "Personal by design", "Every flower, map, sticker or printed piece begins with the people and occasion it belongs to."],
  ["02", "Beautiful and practical", "We care about how something looks, how it works and how clearly it fits the real budget and timeline."],
  ["03", "Made through conversation", "You work directly with our small studio, from the first reference image to the final handoff."],
] as const;

export default function Home() {
  return (
    <main className="shop-page studio-home">
      <CatalogHeader />

      <section className="studio-home-hero page-shell">
        <p className="shop-kicker">Jan Day Studio · Madison, Wisconsin</p>
        <h1>We make the details feel like yours.</h1>
        <p>
          Jan Day is a floral and design studio for celebrations, gifts and thoughtful everyday moments. Rent or buy faux flowers, or work with us to design something entirely personal.
        </p>
      </section>

      <section className="home-businesses page-shell" aria-label="Jan Day Studio services">
        <Link href="/ceremony-florals" className="home-business-card">
          <figure>
            <img src={purpleArch.images[0].src} alt={purpleArch.images[0].alt} />
          </figure>
          <div className="home-business-copy">
            <div><span>01</span><p>Rent · Buy · Source</p></div>
            <h2>Florals</h2>
            <p>Reusable faux flowers for ceremonies and celebrations, with rental, purchase and overseas sourcing options.</p>
            <span className="shop-text-link">Explore florals</span>
          </div>
        </Link>

        <Link href="/design-studio" className="home-business-card">
          <div className="home-design-visual" aria-hidden="true">
            <div className="home-design-sheet home-design-sheet--one"><span>JD</span><small>Made personally</small></div>
            <div className="home-design-sheet home-design-sheet--two"><span>02</span><small>Maps · stickers · presents</small></div>
            <div className="home-design-seal">Jan<br />Day</div>
          </div>
          <div className="home-business-copy">
            <div><span>02</span><p>Imagine · Design · Make</p></div>
            <h2>Design Studio</h2>
            <p>Custom presents, maps, stickers, printed pieces and visual details designed around your story.</p>
            <span className="shop-text-link">Explore design</span>
          </div>
        </Link>
      </section>

      <section className="home-about page-shell" aria-labelledby="home-about-title">
        <div>
          <p className="shop-kicker">What brings it together</p>
          <h2 id="home-about-title">One small studio. Two ways to make a moment personal.</h2>
        </div>
        <div className="home-about-copy">
          <p>
            We&apos;re Yanyan and Jen, the founders of Jan Day Studio. We bring together thoughtful visual design, practical research and direct collaboration to help ideas become real, useful things.
          </p>
          <p>
            Sometimes that means finding the right flowers. Sometimes it means designing the map, present or tiny sticker that completes the whole experience.
          </p>
        </div>
      </section>

      <section className="home-principles">
        <div className="page-shell home-principles-grid">
          {studioPrinciples.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="home-contact">
        <div className="page-shell home-contact-inner">
          <p className="shop-kicker">Start with the idea</p>
          <h2>What would you like to make?</h2>
          <p>Tell us about the flowers, design or occasion you have in mind. We&apos;ll help you find the clearest next step.</p>
          <Link className="shop-button shop-button--light" href="/contact">
            Contact Jan Day <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <CatalogFooter />
    </main>
  );
}
