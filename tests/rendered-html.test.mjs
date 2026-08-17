import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("the landing page is an open boutique catalog with the sourcing value proposition", async () => {
  const [page, layout, chrome, catalog] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/CatalogChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/catalog.ts", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /Faux flower rentals & sourcing in Madison/i);
  assert.match(layout, /VERCEL_PROJECT_PRODUCTION_URL/i);
  assert.match(chrome, /\/brand\/jan-day-wordmark\.png/i);
  assert.match(page, /Beautiful faux flowers, thoughtfully within reach/i);
  assert.match(page, /trusted makers in China/i);
  assert.match(page, /We handle the distance/i);
  assert.match(page, /Pick up in Madison/i);
  assert.match(page, /Purple Arch/i);
  assert.match(page, /\/ceremony-florals\/purple-arch/i);
  assert.match(catalog, /Personal flowers/i);
  assert.match(catalog, /Reception florals/i);
  assert.match(catalog, /Statement florals/i);
  assert.match(catalog, /Loose stems & DIY/i);
  assert.doesNotMatch(page + chrome, /log in|chatbot/i);
});

test("brand guide is a standalone HTML document", async () => {
  const html = await readFile(new URL("../public/brand-guide.html", import.meta.url), "utf8");

  assert.match(html, /^<!doctype html>/i);
  assert.match(html, /<title>Jan Day Studio Brand Guide<\/title>/i);
  assert.match(html, /\/brand\/jan-day-wordmark\.png/i);
  assert.match(html, /\/brand\/jan-day-mark\.jpg/i);
  assert.match(html, /#b5876f/i);
  assert.match(html, /Bodoni Moda/i);
});

test("the founders' story is preserved but hidden from the public catalog", async () => {
  const [chrome, about] = await Promise.all([
    readFile(new URL("../app/CatalogChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/about/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(chrome, /href="\/about"/i);
  assert.match(about, /notFound\(\)/i);
  assert.match(about, /index: false/i);
  assert.match(about, /Yanyan and Jen/i);
  assert.match(about, /our own wedding/i);
  assert.match(about, /yanyan-and-jen-wedding\.jpg/i);
});

test("Purple Arch is the single real ceremony listing with eight photos and rental pricing", async () => {
  const [category, product, data, form] = await Promise.all([
    readFile(new URL("../app/ceremony-florals/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ceremony-florals/purple-arch/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/catalog.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/AvailabilityForm.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(category, /purpleArch/i);
  assert.match(category, /View details/i);
  assert.match(product, /Purple Arch photo gallery/i);
  assert.match(product, /Check availability/i);
  assert.match(data, /priceLabel: "\$275 \/ event"/i);
  assert.match(form, /eventDate/i);
  assert.match(form, /lshangyanyan@gmail\.com/i);

  for (let index = 1; index <= 8; index += 1) {
    const number = String(index).padStart(2, "0");
    assert.match(data, new RegExp(`/catalog/purple-arch/${number}-`));
  }

  const filenames = [
    "01-full-arch.jpg",
    "02-ceremony-setting.jpg",
    "03-ground-pieces.jpg",
    "04-floral-detail.jpg",
    "05-hydrangea-detail.jpg",
    "06-rose-detail.jpg",
    "07-arrangement-overview.jpg",
    "08-bloom-closeup.jpg",
  ];
  await Promise.all(filenames.map((filename) => access(new URL(`../public/catalog/purple-arch/${filename}`, import.meta.url))));
});

test("the other four collection routes are clearly labeled previews", async () => {
  const [personal, reception, statement, diy, component, data] = await Promise.all([
    readFile(new URL("../app/personal-flowers/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/reception-florals/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/statement-florals/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/loose-stems-diy/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/PlaceholderSampleCatalog.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/sourcing/placeholder-collections.ts", import.meta.url), "utf8"),
  ]);

  assert.match(personal, /placeholderCollections\.personal/i);
  assert.match(reception, /placeholderCollections\.reception/i);
  assert.match(statement, /placeholderCollections\.statement/i);
  assert.match(diy, /placeholderCollections\.diy/i);
  assert.match(component, /Image coming soon/i);
  assert.match(component, /Collection preview/i);
  assert.match(data, /Bridal bouquets/i);
  assert.match(data, /Centerpiece Sample 01/i);
  assert.match(data, /Flower Wall Sample 01/i);
  assert.match(data, /Rose Stem Bundle Sample 01/i);
});

test("private sourcing records remain available to the admin workspace", async () => {
  const [data, admin] = await Promise.all([
    readFile(new URL("../lib/sourcing/personal-flowers.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/admin/(protected)/sourcing/page.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(data, /596830995329/i);
  assert.match(data, /635156377689/i);
  assert.match(admin, /Open original listing/i);
});
