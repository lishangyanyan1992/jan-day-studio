import { InquiryForm } from "./InquiryForm";

const collections = [
  {
    title: "Personal flowers",
    description: "Real-touch bouquets and wearable flowers made for close-up moments and portraits.",
    items: "Bridal bouquets · bridesmaid bouquets · boutonnieres · corsages · flower crowns",
    image:
      "https://images.unsplash.com/photo-1487530811176-3780de880c2d?auto=format&fit=crop&w=1000&q=85",
    alt: "Wedding bouquet with ivory, peach, and plum flowers",
  },
  {
    title: "Ceremony florals",
    description: "Layered silk flowers that frame the vows without asking fresh stems to survive the day.",
    items: "Floral arches · meadow arrangements · altar flowers · aisle markers · petals",
    image:
      "https://images.unsplash.com/photo-1639986098217-17112e22f1ed?auto=format&fit=crop&w=1000&q=85",
    alt: "A floral designer arranging a flower-covered ceremony arch",
  },
  {
    title: "Reception florals",
    description: "Flexible arrangements that can move from cocktail hour to dinner and still look considered.",
    items: "Centerpieces · bud-vase clusters · garlands · sweetheart swags · cake flowers",
    image:
      "https://images.unsplash.com/photo-1749731894025-5eddb6b6efd8?auto=format&fit=crop&w=1000&q=85",
    alt: "Warm wedding reception table with small floral arrangements",
  },
  {
    title: "Statement florals",
    description: "Large-scale flower moments for the spaces guests remember and the photographs they keep.",
    items: "Flower walls · hanging installations · floral chandeliers · moon gates",
    image:
      "https://images.unsplash.com/photo-1705738482683-a8e583a976f7?auto=format&fit=crop&w=1100&q=85",
    alt: "Hanging floral installation with greenery and small flowers",
  },
  {
    title: "Loose stems & DIY",
    description: "Mix-and-match stems and flower-bar quantities for couples who want to arrange their own.",
    items: "Roses · peonies · hydrangeas · eucalyptus · baby’s breath · flower-bar kits",
    image:
      "https://images.unsplash.com/photo-1641871152478-80ee3d5e2dd9?auto=format&fit=crop&w=1100&q=85",
    alt: "Loose roses, greenery, and delicate filler flowers",
  },
];

const steps = [
  ["01", "Share your vision", "Send your reference photos, quantities, budget, event date, and the details that matter."],
  ["02", "Compare sourced options", "We find promising faux florals from vetted makers in China and other overseas markets."],
  ["03", "Approve the order", "Review the materials, colors, quantities, timeline, and landed quote before anything is ordered."],
  ["04", "Pick up in Madison", "We manage the overseas order and freight, check what arrives, and prepare your flowers for pickup."],
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
            <a href="#collections">Faux flowers</a>
            <a href="/about">About us</a>
            <a href="#inquire">Contact</a>
          </div>
          <a className="nav-cta" href="#inquire">
            Start a sourcing request <span aria-hidden="true">→</span>
          </a>
        </nav>

        <div className="hero-content page-shell">
          <div className="hero-copy reveal">
            <p className="eyebrow eyebrow--light">Faux flowers, sourced for Madison weddings</p>
            <h1>The flowers you want.<br />Without the traditional markup.</h1>
            <p className="hero-intro">
              Show us the look. We&apos;ll find high-quality options overseas, manage the order and freight, and have your flowers ready for pickup in Madison.
            </p>
            <a className="button button--cream" href="#inquire">
              Start your sourcing request <span aria-hidden="true">→</span>
            </a>
          </div>
          <figure className="hero-visual">
            <img
              src="/og-faux-florals.png"
              alt="Blush and ivory faux roses, peonies, hydrangeas, and eucalyptus"
            />
          </figure>
        </div>
      </section>

      <section className="intro page-shell" id="our-story">
        <p className="eyebrow">A more direct way to buy wedding flowers</p>
        <div className="intro-grid">
          <h2>You bring the vision.<br />We handle the distance.</h2>
          <div className="intro-text">
            <p>
              Jan Day helps Madison-area couples source premium faux florals directly from overseas makers, including specialists in China. We translate your inspiration into product details, compare quality and pricing, and manage the parts of international ordering that are hardest to navigate alone.
            </p>
            <a className="text-link" href="/about">Meet Yanyan &amp; Jen <span aria-hidden="true">↗</span></a>
          </div>
        </div>
      </section>

      <section className="collections-section" id="collections">
        <div className="page-shell section-heading">
          <div>
            <p className="eyebrow">What we can source</p>
            <h2>Start with the floral moment.</h2>
          </div>
          <p>These categories are inspiration, not a fixed in-stock catalog. Tell us the color, material, quantity, and scale you want—we&apos;ll source options for your approval.</p>
        </div>
        <div className="collection-grid page-shell">
          {collections.map((collection) => (
            <article className="collection-card" key={collection.title}>
              <div className="collection-image-wrap">
                <img src={collection.image} alt={collection.alt} className="collection-image" />
              </div>
              <div className="collection-copy">
                <h3>{collection.title}</h3>
                <p>{collection.description}</p>
                <p className="collection-items">{collection.items}</p>
                <a href="#inquire" className="text-link">Ask us to source this <span aria-hidden="true">→</span></a>
              </div>
            </article>
          ))}
        </div>
        <div className="service-options page-shell" aria-label="What Jan Day handles for a sourcing order">
          <article>
            <h3>Options worth choosing</h3>
            <p>We turn reference photos into useful specifications, then compare materials, construction, supplier fit, and pricing.</p>
          </article>
          <article>
            <h3>A clear landed quote</h3>
            <p>You review the product cost, estimated freight, sourcing support, quantities, and timing before you approve the order.</p>
          </article>
          <article>
            <h3>Checked, then local</h3>
            <p>We confirm the order details, follow the shipment, inspect what arrives, and prepare everything for Madison pickup.</p>
          </article>
        </div>
      </section>

      <section className="process page-shell" aria-labelledby="process-title">
        <div className="process-heading">
          <p className="eyebrow">How it works</p>
          <h2 id="process-title">From reference photo to Madison pickup.</h2>
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
        <div className="feature-image" role="img" aria-label="A floral designer setting up a flower-covered ceremony arch" />
        <div className="feature-copy">
          <p className="eyebrow eyebrow--on-clay">Direct sourcing, made manageable</p>
          <h2>Overseas value.<br />Local handoff.</h2>
          <p>
            We work with makers in China and other overseas markets so you can reach better product options and pricing without managing an international order alone. Once they arrive, the flowers are yours to keep, reuse, or resell.
          </p>
          <a className="button button--cream" href="#inquire">Ask us to source your flowers <span aria-hidden="true">→</span></a>
        </div>
      </section>

      <section className="inquire page-shell" id="inquire">
        <div className="inquire-intro">
          <p className="eyebrow">Start here</p>
          <h2>Show us what<br />you&apos;re looking for.</h2>
          <p>
            Share your date, budget, quantities, palette, and reference photos. We&apos;ll come back with the questions and starting specifications needed to source it well.
          </p>
          <div className="contact-detail">
            <span>Overseas sourcing &amp; Madison pickup</span>
            <a href="mailto:hello@jandayrentals.com">hello@jandayrentals.com</a>
          </div>
        </div>
        <InquiryForm />
      </section>

      <footer className="footer page-shell">
        <a className="footer-logo" href="#top" aria-label="Jan Day Studio home">
          <img src="/brand/jan-day-wordmark.png" alt="" />
        </a>
        <p>High-quality faux florals, sourced overseas and picked up in Madison.</p>
        <div className="footer-links">
          <a href="#collections">Faux flowers</a>
          <a href="/about">About us</a>
          <a href="#inquire">Inquire</a>
        </div>
      </footer>
    </main>
  );
}
