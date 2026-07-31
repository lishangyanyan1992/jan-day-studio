import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About us | Jan Day Studio",
  description:
    "Meet Yanyan and Jen, the newlyweds behind Jan Day Studio, and learn why they help Madison couples source high-quality faux wedding flowers overseas.",
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

export default function About() {
  return (
    <main className="about-page">
      <nav className="nav nav--light page-shell" aria-label="Main navigation">
        <Link className="brand-logo" href="/" aria-label="Jan Day Studio home">
          <Image src="/brand/jan-day-wordmark.png" alt="" width={682} height={230} />
        </Link>
        <div className="nav-links">
          <Link href="/#collections">Faux flowers</Link>
          <Link href="/about" aria-current="page">About us</Link>
          <Link href="/#inquire">Contact</Link>
        </div>
        <Link className="button button--small" href="/#inquire">
          Start a sourcing request <span aria-hidden="true">→</span>
        </Link>
      </nav>

      <section className="about-hero page-shell">
        <div className="about-hero-copy">
          <p className="eyebrow">Our story</p>
          <h1>It started with<br />our own wedding.</h1>
          <p className="about-hero-intro">
            We&apos;re Yanyan and Jen—the newlyweds behind Jan Day Studio. We started this business to help couples buy beautifully designed faux wedding flowers without navigating overseas sourcing alone.
          </p>
        </div>
        <figure className="about-photo">
          <Image
            src="/images/yanyan-and-jen-wedding.jpg"
            alt="Yanyan and Jen together on their wedding day at sunset"
            width={1795}
            height={1197}
            sizes="(max-width: 760px) calc(100vw - 36px), 55vw"
            priority
          />
          <figcaption>Yanyan &amp; Jen · Founders of Jan Day Studio</figcaption>
        </figure>
      </section>

      <section className="founder-story page-shell" aria-labelledby="why-we-started">
        <div className="founder-story-heading">
          <p className="eyebrow">Why we started</p>
          <h2 id="why-we-started">Beautiful shouldn&apos;t mean out of reach.</h2>
        </div>
        <div className="founder-story-copy">
          <p className="story-lead">
            When we planned our wedding, we wanted the flowers to feel thoughtful, beautiful, and unmistakably ours. Fresh florals added up quickly, while buying directly overseas meant unfamiliar suppliers, uncertain quality, freight, and a long list of details to get right.
          </p>
          <p>
            With backgrounds in design and building efficient startups, we knew there could be a more considered way. Jan Day brings those two worlds together—good design, practical research, and direct overseas sourcing—to make high-quality faux florals more accessible without the traditional wedding markup.
          </p>
          <p>
            We&apos;re building the kind of sourcing partner we wished we had while planning: one where couples can bring a reference photo, compare real product options, understand the full cost, and pick up their own flowers locally when the order arrives.
          </p>
          <blockquote>
            Your wedding should reflect the people at the center of it—not the size of their budget.
          </blockquote>
        </div>
      </section>

      <section className="about-values">
        <div className="page-shell">
          <div className="about-values-heading">
            <p className="eyebrow">What guides us</p>
            <h2>A better way to<br />make it yours.</h2>
          </div>
          <div className="about-values-grid">
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

      <section className="about-cta page-shell">
        <div>
          <p className="eyebrow">From our wedding to yours</p>
          <h2>Let&apos;s make your day<br />feel like you.</h2>
        </div>
        <div className="about-cta-copy">
          <p>
            Send the floral reference photo you can&apos;t stop thinking about. We&apos;ll help turn it into practical specifications, source promising options overseas, and give you a clear path to ordering your own flowers.
          </p>
          <Link className="button button--dark" href="/#inquire">
            Start a sourcing request <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <footer className="footer page-shell">
        <Link className="footer-logo" href="/" aria-label="Jan Day Studio home">
          <Image src="/brand/jan-day-wordmark.png" alt="" width={682} height={230} />
        </Link>
        <p>High-quality faux florals, sourced overseas and picked up in Madison.</p>
        <div className="footer-links">
          <Link href="/#collections">Faux flowers</Link>
          <Link href="/about" aria-current="page">About us</Link>
          <Link href="/#inquire">Inquire</Link>
        </div>
      </footer>
    </main>
  );
}
