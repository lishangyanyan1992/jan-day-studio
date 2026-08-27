import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { CatalogFooter, CatalogHeader } from "../CatalogChrome";
import { ContactForm } from "../ContactForm";

export const metadata: Metadata = {
  title: "Contact | Jan Day Studio",
  description: "Contact Jan Day Studio about faux flowers, sourcing, rentals or a custom design project.",
};

export default function ContactPage() {
  return (
    <main className="shop-page contact-page">
      <CatalogHeader />

      <section className="contact-hero page-shell">
        <div>
          <p className="shop-kicker">Contact Jan Day</p>
          <h1>Let&apos;s make something thoughtful.</h1>
        </div>
        <p>
          Tell us whether you&apos;re planning with flowers or beginning a design project. We&apos;ll reply by email with the clearest next step.
        </p>
      </section>

      <section className="contact-main page-shell" aria-labelledby="contact-form-title">
        <div className="contact-intro">
          <p className="shop-kicker">One studio · Two offerings</p>
          <h2 id="contact-form-title">Start the conversation.</h2>
          <div className="contact-business-lines">
            <article>
              <span>01</span>
              <h3>Florals</h3>
              <p>Faux-flower rentals, direct purchases and help sourcing high-quality pieces overseas.</p>
              <Link href="/ceremony-florals">Browse florals</Link>
            </article>
            <article>
              <span>02</span>
              <h3>Design Studio</h3>
              <p>Custom presents, maps, stickers, printed pieces and visual details made for your story.</p>
              <Link href="/design-studio">Explore design</Link>
            </article>
          </div>
        </div>
        <ContactForm />
      </section>

      <section className="contact-about">
        <div className="page-shell contact-about-inner">
          <figure>
            <Image
              src="/images/yanyan-and-jen-wedding.jpg"
              alt="Yanyan and Jen, founders of Jan Day Studio"
              width={1795}
              height={1197}
              sizes="(max-width: 720px) calc(100vw - 32px), 45vw"
            />
          </figure>
          <div>
            <p className="shop-kicker">A little about us</p>
            <h2>Built from our own celebration.</h2>
            <p>
              We&apos;re Yanyan and Jen, the newlyweds behind Jan Day Studio. Our work brings together thoughtful design and practical problem-solving—from helping couples find beautiful faux flowers to creating the small visual pieces that make an occasion feel personal.
            </p>
            <p>
              We&apos;re based in Madison, Wisconsin, and every project begins directly with us.
            </p>
            <a className="shop-text-link" href="mailto:lshangyanyan@gmail.com">lshangyanyan@gmail.com</a>
          </div>
        </div>
      </section>

      <CatalogFooter />
    </main>
  );
}
