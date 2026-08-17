import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { CatalogFooter, CatalogHeader } from "../CatalogChrome";

export const metadata: Metadata = {
  title: "Our Story | Jan Day Studio",
  description:
    "Meet Yanyan and Jen, the newlyweds behind Jan Day Studio, and learn why they help Madison couples find high-quality faux wedding flowers.",
  robots: { index: false, follow: false },
};

const principles = [
  {
    number: "01",
    title: "Personal by design",
    description:
      "Your flowers should feel like the two of you. We make room for color, texture, and thoughtful combinations—not one-size-fits-all packages.",
  },
  {
    number: "02",
    title: "Clear before you buy",
    description:
      "You see the product details, quantities, timing, and landed quote before approving an overseas order.",
  },
  {
    number: "03",
    title: "Managed with care",
    description:
      "We compare suppliers, confirm the order, follow the freight, inspect what arrives, and make pickup straightforward.",
  },
];

export function OurStoryPage() {
  return (
    <main className="shop-page story-page">
      <CatalogHeader />

      <section className="story-hero page-shell">
        <div className="story-hero-copy">
          <p className="shop-kicker">Our story</p>
          <h1>It started with our own wedding.</h1>
          <p>
            We&apos;re Yanyan and Jen—the newlyweds behind Jan Day Studio. We started this business to help couples find beautifully designed faux wedding flowers without navigating overseas sourcing alone.
          </p>
        </div>
        <figure className="story-hero-photo">
          <Image
            src="/images/yanyan-and-jen-wedding.jpg"
            alt="Yanyan and Jen together on their wedding day at sunset"
            width={1795}
            height={1197}
            sizes="(max-width: 720px) calc(100vw - 32px), 55vw"
            priority
          />
          <figcaption>Yanyan &amp; Jen · Founders of Jan Day Studio</figcaption>
        </figure>
      </section>

      <section className="story-origin page-shell" aria-labelledby="why-we-started">
        <div className="story-origin-heading">
          <p className="shop-kicker">Why we started</p>
          <h2 id="why-we-started">Beautiful shouldn&apos;t mean out of reach.</h2>
        </div>
        <div className="story-origin-copy">
          <p className="story-origin-lead">
            When we planned our wedding, we wanted the flowers to feel thoughtful, beautiful, and unmistakably ours.
          </p>
          <p>
            Fresh florals added up quickly, while buying directly overseas meant unfamiliar suppliers, uncertain quality, freight, and a long list of details to get right.
          </p>
          <p>
            With backgrounds in design and building efficient startups, we knew there could be a more considered way. Jan Day brings those two worlds together—good design, practical research, and direct overseas sourcing—to make high-quality faux florals more accessible without the traditional wedding markup.
          </p>
          <p>
            We&apos;re building the kind of sourcing partner we wished we had while planning: one where couples can bring a reference photo, compare real product options, understand the full cost, and pick up their own flowers locally when the order arrives.
          </p>
        </div>
      </section>

      <section className="story-quote">
        <blockquote className="page-shell">
          “Your wedding should reflect the people at the center of it—not the size of their budget.”
        </blockquote>
      </section>

      <section className="story-principles">
        <div className="page-shell">
          <div className="story-principles-heading">
            <p className="shop-kicker">What guides us</p>
            <h2>A better way to make it yours.</h2>
          </div>
          <div className="story-principles-grid">
            {principles.map((principle) => (
              <article key={principle.number}>
                <span>{principle.number}</span>
                <h3>{principle.title}</h3>
                <p>{principle.description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="story-contact">
        <div className="page-shell story-contact-inner">
          <p className="shop-kicker">From our wedding to yours</p>
          <h2>Let&apos;s make your day feel like you.</h2>
          <p>
            Send the floral reference photo you can&apos;t stop thinking about. We&apos;ll turn it into practical specifications, source promising options overseas, and give you a clear path to bringing your flowers home.
          </p>
          <a className="shop-button shop-button--light" href="mailto:lshangyanyan@gmail.com?subject=Jan%20Day%20flower%20sourcing%20request">
            Start a sourcing request <span aria-hidden="true">→</span>
          </a>
        </div>
      </section>

      <CatalogFooter />
    </main>
  );
}

export default function HiddenAboutPage() {
  notFound();
}
