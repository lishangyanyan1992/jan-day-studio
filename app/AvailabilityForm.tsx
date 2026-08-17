"use client";

import { FormEvent, useState } from "react";

export function AvailabilityForm() {
  const [status, setStatus] = useState("");

  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") || "");
    const email = String(form.get("email") || "");
    const date = String(form.get("eventDate") || "Date not set");
    const venue = String(form.get("venue") || "Venue not set");
    const message = String(form.get("message") || "");
    const subject = encodeURIComponent(`Purple Arch availability — ${date}`);
    const body = encodeURIComponent(
      `Hi Jan Day Studio,\n\nI'd like to check whether the Purple Arch is available.\n\nName: ${name}\nEmail: ${email}\nEvent date: ${date}\nVenue: ${venue}\n\nNotes:\n${message}`,
    );

    setStatus("Your email app is opening with your request ready to send.");
    window.location.href = `mailto:lshangyanyan@gmail.com?subject=${subject}&body=${body}`;
  }

  return (
    <form className="availability-form" onSubmit={submit}>
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
      <div className="availability-row">
        <label>
          Event date
          <input name="eventDate" type="date" required />
        </label>
        <label>
          Venue or city
          <input name="venue" autoComplete="street-address" placeholder="Madison, WI" />
        </label>
      </div>
      <label>
        Anything else we should know?
        <textarea
          name="message"
          rows={4}
          placeholder="Your ceremony setup, timing, or questions"
        />
      </label>
      <button className="shop-button shop-button--dark" type="submit">
        Check availability <span aria-hidden="true">→</span>
      </button>
      <p className="availability-note">
        No account needed. This opens a ready-to-send email to Jan Day Studio.
      </p>
      <p className="availability-status" aria-live="polite">{status}</p>
    </form>
  );
}
