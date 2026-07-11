"use client";

import { FormEvent, useState } from "react";

const contactEmail = "hello@jandayrentals.com";

export function InquiryForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = form.get("name")?.toString().trim() || "";
    const date = form.get("date")?.toString().trim() || "";
    const location = form.get("location")?.toString().trim() || "";
    const notes = form.get("notes")?.toString().trim() || "";
    const subject = encodeURIComponent(`Jan Day inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nWedding date: ${date}\nVenue or city: ${location}\n\nA little more about the day:\n${notes}`);

    window.location.href = `mailto:${contactEmail}?subject=${subject}&body=${body}`;
    setSubmitted(true);
  }

  return (
    <form className="inquiry-form" onSubmit={handleSubmit}>
      <label>
        Your name
        <input name="name" autoComplete="name" required placeholder="First and last name" />
      </label>
      <label>
        Wedding date
        <input name="date" type="date" required />
      </label>
      <label>
        Venue or city
        <input name="location" required placeholder="Where are you celebrating?" />
      </label>
      <label>
        A little more about the day
        <textarea name="notes" rows={5} placeholder="Guest count, pieces you’re looking for, the feeling you’re after…" />
      </label>
      <button className="button button--dark" type="submit">
        Begin your inquiry <span aria-hidden="true">→</span>
      </button>
      <p className="form-note">{submitted ? "Your email app should be ready with your inquiry." : "This opens a pre-filled email—nothing is submitted until you send it."}</p>
    </form>
  );
}
