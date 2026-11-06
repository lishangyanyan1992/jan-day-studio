import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("the site is a single page with no links to removed pages", async () => {
  const [layout, chrome, home] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/CatalogChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /design-led gift shop in Stevens Point/i);
  for (const route of ["/shop", "/originals", "/seasonal", "/visit", "/weddings", "/contact"]) {
    assert.doesNotMatch(chrome, new RegExp(`"${route}"`));
    assert.doesNotMatch(home, new RegExp(`"${route}"`));
  }
  assert.match(home, /Small gifts\./i);
  assert.match(home, /Good days\./i);
  assert.match(home, /Opening<br \/><em>soon\.<\/em>/);
  assert.match(home, /Inside China Wok and Online/);
  assert.match(home, /Asian-inspired gifts/i);
});

test("home page shows the three launch categories", async () => {
  const home = await readFile(new URL("../app/page.tsx", import.meta.url), "utf8");
  for (const name of ["Jewelry", "Decorations", "Jan Day Originals"]) {
    assert.match(home, new RegExp(`title: "${name}"`));
  }
  for (const image of ["jewelry.jpg", "decorations.jpg", "originals.jpg"]) {
    assert.match(home, new RegExp(`/images/shop/${image}`));
  }
  assert.doesNotMatch(home, /Coming to the shop/);
  assert.doesNotMatch(home, /Meet Jan Day Originals/);
});

test("removed pages stay removed", async () => {
  for (const route of ["shop", "originals", "seasonal", "visit", "weddings", "contact"]) {
    await assert.rejects(access(new URL(`../app/${route}/page.tsx`, import.meta.url)));
  }
});

test("home page ends with the contact form and links Instagram", async () => {
  const [chrome, contact, form] = await Promise.all([
    readFile(new URL("../app/CatalogChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ContactForm.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(chrome, /135 Division St N/i);
  assert.match(chrome, /google\.com\/maps/i);
  assert.match(contact, /instagram\.com\/shopjanday/);
  assert.match(chrome, /instagram\.com\/shopjanday/);
  assert.match(contact, /id="contact"/);
  assert.match(contact, /<ContactForm \/>\s*<\/div>\s*<\/section>\s*<\/SiteFrame>/);
  assert.match(chrome, /href="\/#contact"/);
  for (const field of ["name", "email", "phone", "message"]) {
    assert.match(form, new RegExp(`name="${field}"`));
  }
  for (const removed of ["interest", "quantity", "budget", "neededBy"]) {
    assert.doesNotMatch(form, new RegExp(`name="${removed}"`));
  }
});

test("custom product images are present", async () => {
  const files = ["lifestyle-gifts.jpg", "jewelry.jpg", "decorations.jpg", "originals.jpg"];
  await Promise.all(files.map((name) => access(new URL(`../public/images/shop/${name}`, import.meta.url))));
});

test("sitemap and design handoffs are included", async () => {
  const [content, design] = await Promise.all([
    readFile(new URL("../docs/SITE_CONTENT.md", import.meta.url), "utf8"),
    readFile(new URL("../DESIGN.md", import.meta.url), "utf8"),
  ]);
  assert.match(content, /## Sitemap/i);
  assert.match(content, /Owner confirmation checklist/i);
  assert.match(design, /paper, lacquer, and ink/i);
  assert.match(design, /Weddings sub-brand/i);
});

test("private inventory administration remains available", async () => {
  const [migration, admin] = await Promise.all([
    readFile(new URL("../supabase/migrations/202607150001_inventory_backend.sql", import.meta.url), "utf8"),
    readFile(new URL("../app/admin/(protected)/inventory/page.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(migration, /enable row level security/i);
  assert.match(admin, /InventoryPage/i);
  assert.match(admin, /Track every rentable style/i);
});
