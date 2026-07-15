import { InquiryForm } from "./InquiryForm";

const collections = [
  {
    number: "01",
    title: "Tabletop",
    description: "Linens, glassware, candles, and thoughtful details for a table worth lingering over.",
    image:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "02",
    title: "Ceremony",
    description: "Arches, aisles, and focal pieces that make the first moment feel unmistakably yours.",
    image:
      "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=900&q=85",
  },
  {
    number: "03",
    title: "Lounge",
    description: "Comfortable gathering spaces layered with soft seating, texture, and beautiful light.",
    image:
      "https://images.unsplash.com/photo-1618220179428-22790b461013?auto=format&fit=crop&w=900&q=85",
  },
];

const steps = [
  ["01", "Explore", "Browse rentals or tell us what you would like us to source."],
  ["02", "Choose your way", "Pick up in Madison by appointment, or ask us about delivery."],
  ["03", "Receive your quote", "We confirm availability, sourcing, and the details that make it work."],
  ["04", "Celebrate", "Your pieces are prepared with care, ready for your day."],
];

export default function Home() {
  return (
    <main>
      <section className="hero" id="top">
        <nav className="nav page-shell" aria-label="Main navigation">
          <a className="brand-logo" href="#top" aria-label="Jan Day Studio home">
            <img src="/brand/jan-day-wordmark.png" alt="" />
          </a>
          <div className="nav-links">
            <a href="#collections">Rentals &amp; sourcing</a>
            <a href="#our-story">Our approach</a>
            <a href="#inquire">Contact</a>
          </div>
          <a className="button button--small" href="#inquire">
            Build your wishlist <span aria-hidden="true">→</span>
          </a>
        </nav>

        <div className="hero-content page-shell">
          <div className="hero-copy reveal">
            <p className="eyebrow eyebrow--light">Thoughtful rentals for Madison celebrations</p>
            <h1>Every detail.<br />Beautifully considered.</h1>
            <p className="hero-intro">
              Thoughtful pieces for Madison-area wedding days that feel relaxed, personal, and entirely your own.
            </p>
            <a className="button button--cream" href="#collections">
              Explore the collection <span aria-hidden="true">→</span>
            </a>
          </div>
          <div className="hero-note" aria-label="Jan Day promise">
            <img src="/brand/jan-day-mark.jpg" alt="" />
            <div>
              <span>Pick up in Madison.</span>
              <i />
              <span>Or let us bring it to you.</span>
            </div>
          </div>
        </div>
      </section>

      <section className="intro page-shell" id="our-story">
        <p className="eyebrow">A more considered way to gather</p>
        <div className="intro-grid">
          <h2>Create a setting<br />that feels like you.</h2>
          <div className="intro-text">
            <p>
              Jan Day brings softly layered furnishings and tabletop pieces to Madison-area celebrations with a point of view. Rent from our collection, pick up by appointment, or ask us to source the pieces you have been looking for.
            </p>
            <a className="text-link" href="#inquire">Meet Jan Day <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="collections-section" id="collections">
        <div className="page-shell section-heading">
          <div>
            <p className="eyebrow">Rentals &amp; sourcing</p>
            <h2>Pieces with presence.</h2>
          </div>
          <p>Begin with our collection, or bring us the reference photo, detail, or feeling you have in mind. We&apos;ll help you find the right fit.</p>
        </div>
        <div className="collection-grid page-shell">
          {collections.map((collection) => (
            <article className="collection-card" key={collection.title}>
              <div className="collection-image-wrap">
                <img src={collection.image} alt="" className="collection-image" />
                <span className="collection-number">{collection.number}</span>
              </div>
              <div className="collection-copy">
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
                <a href="#inquire" className="text-link">View pieces <span aria-hidden="true">→</span></a>
              </div>
            </article>
          ))}
        </div>
        <div className="service-options page-shell" aria-label="Rental and sourcing options">
          <article>
            <span>01</span>
            <h3>Rent from the collection</h3>
            <p>Choose the furniture, tabletop, and ceremony pieces that are ready for your celebration.</p>
          </article>
          <article>
            <span>02</span>
            <h3>Pick up in Madison</h3>
            <p>Keep things simple with scheduled pickup in Madison, arranged around your event timeline.</p>
          </article>
          <article>
            <span>03</span>
            <h3>Let us source it</h3>
            <p>Have a specific item in mind? We can source and order products that complete your vision.</p>
          </article>
        </div>
      </section>

      <section className="process page-shell" aria-labelledby="process-title">
        <div className="process-heading">
          <p className="eyebrow">How it works</p>
          <h2 id="process-title">A simple path to a beautiful day.</h2>
        </div>
        <ol className="steps">
          {steps.map(([number, title, description]) => (
            <li key={number}>
              <span>{number}</span>
              <h3>{title}</h3>
              <p>{description}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="feature">
        <div className="feature-image" role="img" aria-label="An intimate garden wedding reception" />
        <div className="feature-copy">
          <p className="eyebrow eyebrow--on-clay">For celebrations that feel lived in</p>
          <h2>Let&apos;s create<br />something beautiful.</h2>
          <p>
            Whether you are planning an intimate dinner or a full weekend celebration, we&apos;ll help you rent, source, and gather the pieces that carry the feeling through.
          </p>
          <a className="button button--cream" href="#inquire">Start your wishlist <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="inquire page-shell" id="inquire">
        <div className="inquire-intro">
          <p className="eyebrow">Start here</p>
          <h2>Tell us about<br />your day.</h2>
          <p>
            Share the date, Madison-area venue or pickup timeline, and the feeling you&apos;re hoping to create. We&apos;ll be in touch with a thoughtful starting point.
          </p>
          <div className="contact-detail">
            <span>Madison pickup &amp; sourcing requests</span>
            <a href="mailto:hello@jandayrentals.com">hello@jandayrentals.com</a>
          </div>
        </div>
        <InquiryForm />
      </section>

      <footer className="footer page-shell">
        <a className="footer-logo" href="#top" aria-label="Jan Day Studio home">
          <img src="/brand/jan-day-wordmark.png" alt="" />
        </a>
        <p>Thoughtful rentals and sourcing for Madison gatherings.</p>
        <div className="footer-links">
          <a href="#collections">Rentals &amp; sourcing</a>
          <a href="#our-story">Our approach</a>
          <a href="#inquire">Inquire</a>
        </div>
      </footer>
    </main>
  );
}
