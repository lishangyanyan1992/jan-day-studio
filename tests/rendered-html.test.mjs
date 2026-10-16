import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("the public shell exposes the full gift-shop sitemap", async () => {
  const [layout, chrome, home] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/CatalogChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /design-led gift shop in Stevens Point/i);
  for (const route of ["/shop", "/originals", "/seasonal", "/weddings", "/visit", "/contact"]) {
    assert.match(chrome, new RegExp(route.replace("/", "\\/")));
  }
  assert.match(home, /Small gifts\./i);
  assert.match(home, /Good days\./i);
  assert.match(home, /inside our family&apos;s restaurant/i);
  assert.match(home, /meaning behind “Jan Day” goes here/i);
  assert.match(home, /OWNER TO ADD/i);
  assert.match(home, /no online checkout/i);
});

test("shop categories and price ranges match the business brief", async () => {
  const page = await readFile(new URL("../app/shop/page.tsx", import.meta.url), "utf8");
  const expectations = [
    ["Lifestyle gifts", "$5–$30"],
    ["Teaware & tableware", "$8–$45"],
    ["Seasonal & festival", "$3–$40"],
    ["Home & decor", "$10–$50"],
    ["Jan Day Originals", "$5–$35"],
  ];
  for (const [name, price] of expectations) {
    assert.match(page, new RegExp(name.replace("&", "&"), "i"));
    assert.ok(page.includes(price));
  }
  assert.match(page, /browse-only online/i);
  assert.match(page, /No cart/i);
});

test("originals and seasonal pages carry their complete propositions", async () => {
  const [originals, seasonal] = await Promise.all([
    readFile(new URL("../app/originals/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/seasonal/page.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(originals, /Made by Jan Day/i);
  assert.match(originals, /Illustrated cards/i);
  assert.match(originals, /Tote bags/i);
  assert.match(originals, /Small prints/i);
  assert.match(originals, /Gift boxes/i);
  assert.match(seasonal, /Lunar New Year/i);
  assert.match(seasonal, /Mid-Autumn/i);
  assert.match(seasonal, /corporate gifts/i);
  assert.match(seasonal, /gift-boxes/i);
});

test("weddings has a separate quote flow with every requested field", async () => {
  const [page, form] = await Promise.all([
    readFile(new URL("../app/weddings/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/WeddingInquiryForm.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(page, /Flowers that last/i);
  assert.match(page, /No wilting/i);
  assert.match(page, /Camera-ready/i);
  assert.match(page, /Reusable/i);
  assert.match(page, /Budget-aware/i);
  assert.match(page, /Contact us for a quote/i);
  assert.doesNotMatch(page, /Packages from \$/i);
  for (const field of ["date", "venue", "guests", "items", "budget", "message"]) {
    assert.match(form, new RegExp(`name=\\"${field}\\"`));
  }
});

test("visit and contact preserve explicit owner confirmation markers", async () => {
  const [visit, contact, form] = await Promise.all([
    readFile(new URL("../app/visit/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/contact/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ContactForm.tsx", import.meta.url), "utf8"),
  ]);
  assert.match(visit, /135 Division St N/i);
  assert.match(visit, /Roughly 10:30 AM–9:00 PM/i);
  assert.match(visit, /CONFIRM WITH OWNER/i);
  assert.match(visit, /Parking/i);
  assert.match(contact, /OWNER TO ADD LINK \+ HANDLE/i);
  assert.match(form, /Holiday gift box pre-order/i);
  assert.match(form, /Corporate gifts/i);
});

test("custom product images are present", async () => {
  const files = ["lifestyle-gifts.jpg", "teaware-home.jpg", "lunar-new-year.jpg", "jan-day-originals.jpg", "weddings.jpg"];
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
