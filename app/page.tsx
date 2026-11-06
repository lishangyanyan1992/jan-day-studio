import { SiteFrame } from "./CatalogChrome";
import { ContactForm } from "./ContactForm";

const categories = [
  {
    title: "Jewelry",
    subtitle: "Bracelets & charms",
    copy: "Beaded bracelets, charms, and small pieces to wear every day or give to someone you love.",
    image: "/images/shop/jewelry.jpg",
    imagePosition: "50% 55%",
  },
  {
    title: "Decorations",
    subtitle: "For home & celebrations",
    copy: "Lanterns, paper cuts, knots, and festive pieces that bring warmth to a room or a gathering.",
    image: "/images/shop/decorations.jpg",
    imagePosition: "50% 55%",
  },
  {
    title: "Jan Day Originals",
    subtitle: "Designed by us",
    copy: "Illustrated cards, tote bags, prints, and gift boxes designed in-house.",
    image: "/images/shop/originals.jpg",
    imagePosition: "50% 55%",
  },
] as const;

export default function Home() {
  return (
    <SiteFrame className="home-page">
      <section className="hero hero--opening page-shell">
        <div className="hero-copy">
          <h1>Opening<br /><em>soon.</em></h1>
          <p className="opening-location">Inside China Wok and Online <span aria-hidden="true">·</span> Stevens Point, Wisconsin</p>
          <p className="hero-lede"><strong>Small gifts. Good days.</strong> Jan Day is a design-led gift shop featuring Asian-inspired gifts.</p>
        </div>
        <figure className="hero-image image-frame">
          <img src="/images/shop/lifestyle-gifts.jpg" alt="A plush rabbit, lucky cat, illustrated card, charm, and keychain arranged on a wood shelf" />
          <p className="opening-stamp" aria-hidden="true"><span>Opening</span><strong>soon</strong><span>Stevens Point</span></p>
        </figure>
      </section>

      <section className="category-section page-shell">
        <header className="section-heading">
          <h2>Gifts with a point of view.</h2>
        </header>
        <div className="category-grid">
          {categories.map((category, index) => (
            <article className="category-card" key={category.title}>
              <figure><img src={category.image} alt="" style={{ objectPosition: category.imagePosition }} /></figure>
              <div className="category-card-copy">
                <p>{String(index + 1).padStart(2, "0")} · {category.subtitle}</p>
                <h3>{category.title}</h3>
                <span>{category.copy}</span>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="contact-form-section" id="contact">
        <div className="page-shell contact-form-grid">
          <div>
            <p className="section-number">Get in touch</p>
            <h2>Tell us what you need.</h2>
            <div className="contact-details">
              <p><span>Instagram</span><a href="https://www.instagram.com/shopjanday/" target="_blank" rel="noreferrer">@shopjanday</a></p>
              <p><span>Email</span><a href="mailto:lshangyanyan@gmail.com">lshangyanyan@gmail.com</a></p>
              <p><span>Find us</span>Inside China Wok<br />135 Division St N<br />Stevens Point, WI</p>
            </div>
          </div>
          <ContactForm />
        </div>
      </section>
    </SiteFrame>
  );
}
