import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About us | Jan Day Studio",
  description:
    "Meet Yanyan and Jen, the newlyweds behind Jan Day Studio, and learn why they are making beautiful, customizable wedding pieces more accessible.",
};

const principles = [
  {
    number: "01",
    title: "Personal by design",
    description:
      "Your wedding should feel like the two of you. We make room for color, details, and thoughtful customization—not one-size-fits-all choices.",
  },
  {
    number: "02",
    title: "Fairly priced",
    description:
      "We source carefully, operate efficiently, and keep unnecessary markups out of the way so more of your budget can go toward the day itself.",
  },
  {
    number: "03",
    title: "Made with empathy",
    description:
      "We have planned a wedding, compared the options, and felt the sticker shock. We are building the experience we wished we had.",
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
          <Link href="/#collections">Rentals &amp; sourcing</Link>
          <Link href="/about" aria-current="page">About us</Link>
          <Link href="/#inquire">Contact</Link>
        </div>
        <Link className="button button--small" href="/#inquire">
          Build your wishlist <span aria-hidden="true">→</span>
        </Link>
      </nav>

      <section className="about-hero page-shell">
        <div className="about-hero-copy">
          <p className="eyebrow">Our story</p>
          <h1>It started with<br />our own wedding.</h1>
          <p className="about-hero-intro">
            We&apos;re Yanyan and Jen—the newlyweds behind Jan Day Studio. We started this business to make beautifully designed wedding pieces feel more personal, more accessible, and much less overwhelming.
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
            When we planned our wedding, we wanted it to feel thoughtful, beautiful, and unmistakably ours. But the options often felt limited: meaningful customization came with a steep price, and even simple details could quickly stretch the budget.
          </p>
          <p>
            With backgrounds in design and building efficient startups, we knew there could be a more considered way. Jan Day brings those two worlds together—good design, smarter sourcing, and a leaner way of working—to offer wedding pieces you can make your own without the traditional wedding markup.
          </p>
          <p>
            We&apos;re building the kind of place we wished we had while planning: one where couples can find products they love, personalize the details, and feel confident about what they&apos;re spending.
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
            Tell us what you&apos;re imagining—or send the reference photo you can&apos;t stop thinking about. We&apos;ll help you find a thoughtful, fairly priced way to bring it to life.
          </p>
          <Link className="button button--dark" href="/#inquire">
            Build your wishlist <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <footer className="footer page-shell">
        <Link className="footer-logo" href="/" aria-label="Jan Day Studio home">
          <Image src="/brand/jan-day-wordmark.png" alt="" width={682} height={230} />
        </Link>
        <p>Thoughtful rentals and sourcing for Madison gatherings.</p>
        <div className="footer-links">
          <Link href="/#collections">Rentals &amp; sourcing</Link>
          <Link href="/about" aria-current="page">About us</Link>
          <Link href="/#inquire">Inquire</Link>
        </div>
      </footer>
    </main>
  );
}
