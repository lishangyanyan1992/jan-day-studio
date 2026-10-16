"use client";

import { FormEvent, useState } from "react";

const contactEmail = "lshangyanyan@gmail.com";

export function ContactForm() {
  const [status, setStatus] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const phone = String(form.get("phone") || "Not provided");
    const interests = form.getAll("interest").join(", ") || "General question";
    const quantity = String(form.get("quantity") || "Not provided");
    const budget = String(form.get("budget") || "Not provided");
    const neededBy = String(form.get("neededBy") || "Not provided");
    const message = String(form.get("message") || "");
    const subject = encodeURIComponent(`Jan Day inquiry · ${interests}`);
    const body = encodeURIComponent(`Hi Jan Day,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nInterested in: ${interests}\nQuantity: ${quantity}\nBudget: ${budget}\nNeeded by: ${neededBy}\n\nMessage:\n${message}`);

    setStatus("Your email app is opening with your inquiry ready to send.");
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="inquiry-form" onSubmit={submit}>
      <div className="form-row">
        <label>Your name<input name="name" autoComplete="name" required /></label>
        <label>Email<input name="email" type="email" autoComplete="email" required /></label>
      </div>
      <label>Phone <span>(optional)</span><input name="phone" type="tel" autoComplete="tel" /></label>
      <fieldset>
        <legend>I&apos;m interested in</legend>
        <div className="checkbox-grid">
          {["A product or stock question", "Holiday gift box pre-order", "Corporate gifts", "Jan Day Originals", "Wholesale or collaboration", "Something else"].map((item) => <label className="check-option" key={item}><input type="checkbox" name="interest" value={item} /><span>{item}</span></label>)}
        </div>
      </fieldset>
      <div className="form-row">
        <label>Approximate quantity<input name="quantity" placeholder="1, 12, 50…" /></label>
        <label>Budget range<input name="budget" placeholder="Total or per gift" /></label>
      </div>
      <label>Needed by <span>(optional)</span><input name="neededBy" type="date" /></label>
      <label>Tell us what you have in mind<textarea name="message" rows={6} required placeholder="The occasion, who it is for, any colors or products you like, and what would make it feel right…" /></label>
      <button className="button button--red" type="submit">Prepare email <span aria-hidden="true">→</span></button>
      <p className="form-note">This opens a ready-to-send email so you can review it and attach reference images before sending.</p>
      <p className="form-status" aria-live="polite">{status}</p>
    </form>
  );
}
