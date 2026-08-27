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
    const projectType = String(form.get("projectType") || "General inquiry");
    const date = String(form.get("date") || "Not provided");
    const budget = String(form.get("budget") || "Not provided");
    const message = String(form.get("message") || "");
    const subject = encodeURIComponent(`Jan Day inquiry · ${projectType}`);
    const body = encodeURIComponent(
      `Hi Jan Day Studio,\n\nI'd like to start a conversation about a project.\n\nName: ${name}\nEmail: ${email}\nProject: ${projectType}\nEvent or target date: ${date}\nBudget: ${budget}\n\nProject details:\n${message}`,
    );

    setStatus("Your email app is opening with your inquiry ready to send.");
    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
  }

  return (
    <form className="availability-form contact-form" onSubmit={submit}>
      <div className="availability-row">
        <label>
          Your name
          <input name="name" autoComplete="name" required />
        </label>
        <label>
          Email
          <input name="email" type="email" autoComplete="email" required />
        </label>
      </div>
      <label>
        What can we help with?
        <select name="projectType" defaultValue="" required>
          <option value="" disabled>Select a project type</option>
          <option>Floral rental</option>
          <option>Floral purchase or overseas sourcing</option>
          <option>Design Studio — presents and printed pieces</option>
          <option>Design Studio — maps and wayfinding</option>
          <option>Design Studio — stickers and small details</option>
          <option>Design Studio — something else</option>
          <option>General inquiry</option>
        </select>
      </label>
      <div className="availability-row">
        <label>
          Event or target date
          <input name="date" type="date" />
        </label>
        <label>
          Estimated budget
          <input name="budget" placeholder="A range is helpful" />
        </label>
      </div>
      <label>
        Tell us about the project
        <textarea
          name="message"
          rows={6}
          required
          placeholder="What are you making, who is it for, and what should it feel like?"
        />
      </label>
      <button className="shop-button shop-button--dark" type="submit">
        Prepare email <span aria-hidden="true">→</span>
      </button>
      <p className="availability-note">
        This opens a ready-to-send email so you can add reference images or files before sending.
      </p>
      <p className="availability-status" aria-live="polite">{status}</p>
    </form>
  );
}
