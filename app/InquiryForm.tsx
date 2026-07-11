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
    const requestType = form.get("requestType")?.toString().trim() || "";
    const fulfillment = form.get("fulfillment")?.toString().trim() || "";
    const notes = form.get("notes")?.toString().trim() || "";
    const subject = encodeURIComponent(`Jan Day inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nWedding date: ${date}\nVenue or city: ${location}\nI’m looking for: ${requestType}\nRental fulfillment: ${fulfillment}\n\nA little more about the day:\n${notes}`);

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
        Madison-area venue or city
        <input name="location" required placeholder="Where are you celebrating?" />
      </label>
      <label>
        I&apos;m looking for
        <select name="requestType" defaultValue="" required>
          <option value="" disabled>Select an option</option>
          <option>Rentals from the Jan Day collection</option>
          <option>Products Jan Day can source and order</option>
          <option>A mix of rentals and sourced products</option>
          <option>I&apos;m not sure yet</option>
        </select>
      </label>
      <label>
        Rental fulfillment
        <select name="fulfillment" defaultValue="" required>
          <option value="" disabled>Select an option</option>
          <option>Pickup in Madison by appointment</option>
          <option>Ask for a delivery quote</option>
          <option>Not sure yet</option>
        </select>
      </label>
      <label>
        A little more about the day
        <textarea name="notes" rows={5} placeholder="Guest count, pieces or products you’re looking for, the feeling you’re after…" />
      </label>
      <button className="button button--dark" type="submit">
        Begin your inquiry <span aria-hidden="true">→</span>
      </button>
      <p className="form-note">{submitted ? "Your email app should be ready with your inquiry." : "This opens a pre-filled email—nothing is submitted until you send it."}</p>
    </form>
  );
}
