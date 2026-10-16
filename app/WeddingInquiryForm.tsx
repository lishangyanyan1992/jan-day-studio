"use client";

import { FormEvent, useState } from "react";

const contactEmail = "lshangyanyan@gmail.com";

export function WeddingInquiryForm() {
  const [status, setStatus] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const fields = {
      name: String(form.get("name") || ""),
      email: String(form.get("email") || ""),
      date: String(form.get("date") || ""),
      venue: String(form.get("venue") || ""),
      guests: String(form.get("guests") || ""),
      items: form.getAll("items").join(", ") || "Not selected",
      budget: String(form.get("budget") || "Not provided"),
      message: String(form.get("message") || ""),
    };
    const subject = encodeURIComponent(`Jan Day wedding inquiry · ${fields.date || fields.name}`);
    const body = encodeURIComponent(`Hi Jan Day,\n\nName: ${fields.name}\nEmail: ${fields.email}\nWedding date: ${fields.date}\nVenue: ${fields.venue}\nGuest count: ${fields.guests}\nItems of interest: ${fields.items}\nBudget range: ${fields.budget}\n\nMessage:\n${fields.message}`);
    setStatus("Your email app is opening with your wedding inquiry ready to send.");
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="inquiry-form wedding-form" onSubmit={submit}>
      <div className="form-row"><label>Your name<input name="name" autoComplete="name" required /></label><label>Email<input name="email" type="email" autoComplete="email" required /></label></div>
      <div className="form-row"><label>Wedding date<input name="date" type="date" required /></label><label>Venue<input name="venue" required placeholder="Name and city" /></label></div>
      <label>Estimated guest count<input name="guests" type="number" min="1" required placeholder="100" /></label>
      <fieldset><legend>Items of interest</legend><div className="checkbox-grid">{["Bouquets & personal flowers", "Centerpieces & table decor", "Ceremony arches & backdrops", "Tea ceremony teaware", "Custom gift boxes", "Wedding favors & red envelopes", "Jan Day original cards"].map((item) => <label className="check-option" key={item}><input type="checkbox" name="items" value={item} /><span>{item}</span></label>)}</div></fieldset>
      <label>Budget range<select name="budget" defaultValue="" required><option value="" disabled>Select a range</option><option>Under $500</option><option>$500–$1,000</option><option>$1,000–$2,500</option><option>$2,500–$5,000</option><option>$5,000+</option><option>Not sure yet</option></select></label>
      <label>Tell us about the day<textarea name="message" rows={6} required placeholder="Your colors, style, priorities, and anything you already know you need…" /></label>
      <button className="button button--dark-red" type="submit">Contact us for a quote <span aria-hidden="true">→</span></button>
      <p className="form-note">Nothing is submitted until you send the email. You can attach inspiration photos before sending.</p>
      <p className="form-status" aria-live="polite">{status}</p>
    </form>
  );
}
