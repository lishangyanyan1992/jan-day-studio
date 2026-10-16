import type { Metadata } from "next";
import { CatalogFooter, CatalogHeader } from "../CatalogChrome";
import { ContactForm } from "../ContactForm";

export const metadata: Metadata = { title: "Contact | Jan Day", description: "Contact Jan Day about products, holiday gift boxes, corporate gifts, and collaborations." };

export default function ContactPage() {
  return (
    <main className="site-page contact-page">
      <CatalogHeader />
      <section className="contact-hero page-shell"><div><p className="eyebrow">Questions, gifts, good ideas</p><h1>Let&apos;s make it<br /><em>thoughtful.</em></h1><p>Ask about an item, tell us what you&apos;re shopping for, or start an inquiry for holiday boxes and corporate gifts.</p></div><div className="contact-details"><p><span>Visit</span>Inside China Wok<br />135 Division St N<br />Stevens Point, WI</p><p><span>Phone</span>[OWNER TO ADD]</p><p><span>Instagram</span>[OWNER TO ADD LINK + HANDLE]</p><p><span>Email</span><a href="mailto:lshangyanyan@gmail.com">lshangyanyan@gmail.com</a></p></div></section>
      <section className="contact-form-section"><div className="page-shell contact-form-grid"><div><p className="section-number">General & gifting inquiry</p><h2>Tell us what you need.</h2><p>Gift box and corporate gifting plans are still being shaped. Your inquiry helps us understand timing, quantity, and what local teams are looking for.</p></div><ContactForm /></div></section>
      <section className="response-note page-shell"><p className="eyebrow">Good to know</p><div><h2>We&apos;re a tiny team.</h2><p>We&apos;ll reply as soon as we can around restaurant and shop hours. For time-sensitive stock questions, include the item, quantity, and the day you plan to visit.</p></div></section>
      <CatalogFooter />
    </main>
  );
}
