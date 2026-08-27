import type { Metadata } from "next";
import Link from "next/link";
import { CatalogFooter, CatalogHeader } from "../CatalogChrome";

export const metadata: Metadata = {
  title: "Design Studio | Jan Day Studio",
  description: "Custom presents, maps, stickers and thoughtful visual details designed by Jan Day Studio in Madison, Wisconsin.",
};

const services = [
  ["01", "Presents & printed pieces", "Personalized pieces that make a gift, gathering or announcement feel considered from the first look."],
  ["02", "Maps & wayfinding", "Illustrated maps, venue guides and practical signage that help people understand where to go."],
  ["03", "Stickers & small details", "Custom stickers, labels, tags and finishing touches designed as part of one visual story."],
  ["04", "Something entirely yours", "If it can be designed, printed or assembled, bring us the idea and we’ll help define the right format."],
] as const;

const sampleCategories = ["Presents", "Maps", "Stickers", "Event details", "Printed pieces", "Custom ideas"] as const;

const process = [
  ["01", "Share the idea", "Tell us what you need, who it is for, your timing and any references you already love."],
  ["02", "Shape the direction", "We clarify the format, visual direction, scope and budget before design begins."],
  ["03", "Review and refine", "You review a focused concept and we refine the details toward a final, useful design."],
] as const;

export default function DesignStudioPage() {
  return (
    <main className="shop-page design-studio-page">
      <CatalogHeader />

      <section className="design-hero page-shell">
        <div className="design-hero-copy">
          <p className="shop-kicker">Jan Day · Design Studio</p>
          <h1>Design for the details people keep.</h1>
          <p>
            From personalized presents and illustrated maps to stickers and everything in between, we create thoughtful pieces with a clear point of view.
          </p>
          <Link className="shop-button shop-button--dark" href="/contact?service=design">
            Start a design project <span aria-hidden="true">→</span>
          </Link>
        </div>
        <div className="design-hero-composition" aria-label="Jan Day Design Studio sample-work placeholder">
          <div className="design-paper design-paper--large"><span>JD</span><small>Maps · print · details</small></div>
          <div className="design-paper design-paper--small"><span>01</span><small>Made for your story</small></div>
          <div className="design-sticker-mark">Jan<br />Day</div>
        </div>
      </section>

      <section className="design-services page-shell" aria-labelledby="design-services-title">
        <div className="design-section-heading">
          <p className="shop-kicker">What we design</p>
          <h2 id="design-services-title">A studio for all the pieces around the moment.</h2>
        </div>
        <div className="design-services-grid">
          {services.map(([number, title, description]) => (
            <article key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="design-work" aria-labelledby="design-work-title">
        <div className="page-shell">
          <div className="design-work-heading">
            <div>
              <p className="shop-kicker">Selected work</p>
              <h2 id="design-work-title">A place for what comes next.</h2>
            </div>
            <p>Your sample projects will live here. The layout is ready for photographs, mockups and short project stories as you add them.</p>
          </div>
          <div className="design-work-grid">
            {sampleCategories.map((category, index) => (
              <article key={category}>
                <div className={`design-sample-placeholder design-sample-placeholder--${(index % 3) + 1}`}>
                  <span>{String(index + 1).padStart(2, "0")}</span>
                  <small>Sample work coming soon</small>
                </div>
                <h3>{category}</h3>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="design-process page-shell" aria-labelledby="design-process-title">
        <div className="design-section-heading">
          <p className="shop-kicker">How we work</p>
          <h2 id="design-process-title">Simple, collaborative, personal.</h2>
        </div>
        <ol>
          {process.map(([number, title, description]) => (
            <li key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="design-contact">
        <div className="page-shell design-contact-inner">
          <p className="shop-kicker">Have something in mind?</p>
          <h2>Tell us what you want to make.</h2>
          <p>Every design project begins with a conversation. Share the idea, timing and any references you have—we’ll help define the next step.</p>
          <Link className="shop-button shop-button--light" href="/contact?service=design">
            Contact the studio <span aria-hidden="true">→</span>
          </Link>
        </div>
      </section>

      <CatalogFooter />
    </main>
  );
}
