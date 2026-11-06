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
    const message = String(form.get("message") || "");
    const subject = encodeURIComponent(`Jan Day inquiry from ${name}`);
    const body = encodeURIComponent(`Hi Jan Day,\n\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\n\nMessage:\n${message}`);

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
      <label>Tell us what you have in mind<textarea name="message" rows={6} required placeholder="The occasion, who it is for, any colors or products you like, and what would make it feel right…" /></label>
      <button className="button button--red" type="submit">Prepare email <span aria-hidden="true">→</span></button>
      <p className="form-note">This opens a ready-to-send email so you can review it and attach reference images before sending.</p>
      <p className="form-status" aria-live="polite">{status}</p>
    </form>
  );
}
