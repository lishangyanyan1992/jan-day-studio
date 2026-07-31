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
    const floralNeed = form.get("floralNeed")?.toString().trim() || "";
    const floralStyle = form.get("floralStyle")?.toString().trim() || "";
    const budget = form.get("budget")?.toString().trim() || "";
    const handoff = form.get("handoff")?.toString().trim() || "";
    const notes = form.get("notes")?.toString().trim() || "";
    const subject = encodeURIComponent(`Jan Day sourcing request from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEvent date: ${date}\nVenue or city: ${location}\nPrimary floral need: ${floralNeed}\nFloral direction: ${floralStyle}\nFlower budget: ${budget}\nPickup planning: ${handoff}\n\nQuantities, product links, palette, and references:\n${notes}\n\nPlease attach inspiration photos or product links before sending.`);

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
        Event date
        <input name="date" type="date" required />
      </label>
      <label>
        Venue or city
        <input name="location" required placeholder="Where are you celebrating?" />
      </label>
      <label>
        Primary floral need
        <select name="floralNeed" defaultValue="" required>
          <option value="" disabled>Select an option</option>
          <option>Personal flowers — bouquets and wearable flowers</option>
          <option>Ceremony florals — arches, meadows, and aisle flowers</option>
          <option>Reception florals — centerpieces, garlands, and accents</option>
          <option>Statement florals — walls, chandeliers, and hanging installs</option>
          <option>Loose stems or a DIY flower bar</option>
          <option>A whole-day floral package</option>
          <option>I&apos;m not sure yet</option>
        </select>
      </label>
      <label>
        Floral direction
        <select name="floralStyle" defaultValue="" required>
          <option value="" disabled>Select an option</option>
          <option>Classic ivory and blush</option>
          <option>Greenery-forward</option>
          <option>Wildflower or meadow</option>
          <option>Bold color</option>
          <option>Boho or dried-look</option>
          <option>I&apos;ll send a reference photo</option>
          <option>I&apos;m not sure yet</option>
        </select>
      </label>
      <label>
        Flower budget
        <select name="budget" defaultValue="" required>
          <option value="" disabled>Select an option</option>
          <option>Under $500</option>
          <option>$500–$1,000</option>
          <option>$1,000–$2,500</option>
          <option>$2,500–$5,000</option>
          <option>$5,000+</option>
          <option>I&apos;m not sure yet</option>
        </select>
      </label>
      <label>
        Pickup planning
        <select name="handoff" defaultValue="" required>
          <option value="" disabled>Select an option</option>
          <option>Pickup in Madison by appointment</option>
          <option>I need to discuss pickup options</option>
        </select>
      </label>
      <label>
        What should we source?
        <textarea name="notes" rows={5} placeholder="Quantities, colors, flower types, dimensions, product links, or anything we should match from your reference photos…" />
      </label>
      <button className="button button--dark" type="submit">
        Request sourcing help <span aria-hidden="true">→</span>
      </button>
      <p className="form-note">{submitted ? "Your email app should be ready—attach any inspiration photos before sending." : "This opens a pre-filled email so you can attach reference photos. Nothing is submitted until you send it."}</p>
    </form>
  );
}
