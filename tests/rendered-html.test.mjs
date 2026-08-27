import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";

test("the landing page gives equal weight to Florals and Design Studio", async () => {
  const [page, layout, chrome, catalog] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/CatalogChrome.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/catalog.ts", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /Florals & custom design in Madison/i);
  assert.match(layout, /VERCEL_PROJECT_PRODUCTION_URL/i);
  assert.match(chrome, /\/brand\/jan-day-wordmark\.png/i);
  assert.match(page, /We make the details feel like yours/i);
  assert.match(page, /Rent · Buy · Source/i);
  assert.match(page, /Imagine · Design · Make/i);
  assert.match(page, /href="\/ceremony-florals"/i);
  assert.match(page, /href="\/design-studio"/i);
  assert.match(page, /One small studio\. Two ways/i);
  assert.doesNotMatch(page, /trusted makers in China|We handle the distance|Pick up in Madison/i);
  assert.match(page, /Design Studio/i);
  assert.match(chrome, /href="\/design-studio"/i);
  assert.match(chrome, /href="\/contact"/i);
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

test("Purple Arch remains a ceremony listing with eight photos and rental pricing", async () => {
  const [category, product, data, form] = await Promise.all([
    readFile(new URL("../app/ceremony-florals/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ceremony-florals/purple-arch/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/catalog.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/AvailabilityForm.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(category, /purpleArch/i);
  assert.match(category, /purpleArch\.shape/i);
  assert.match(product, /purpleArch\.category/i);
  assert.match(category, /View product/i);
  assert.match(product, /Purple Arch photo gallery/i);
  assert.match(product, /Check availability/i);
  assert.match(data, /priceLabel: "\$275 \/ event"/i);
  assert.match(data, /featured: true/i);
  assert.match(data, /inventoryStatus: "active"/i);
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

test("every flower arch appears in one flat Florals catalog", async () => {
  const [category, collection, data] = await Promise.all([
    readFile(new URL("../app/ceremony-florals/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ceremony-florals/flower-arches/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/catalog.ts", import.meta.url), "utf8"),
  ]);

  assert.match(category, /All products/i);
  assert.match(category, /Every design is presented at the same catalog level/i);
  assert.match(category, /purpleArch\.images\[0\]/i);
  assert.match(category, /flowerArchVariations\.filter/i);
  assert.match(category, /archShapeGroups\.map/i);
  assert.match(category, /Square arches/i);
  assert.match(category, /U-shaped arches/i);
  assert.doesNotMatch(category, /title: "Horn-shaped arches"/i);
  assert.match(category, /group\.id === "u-shaped".*purpleArch/is);
  assert.match(category, /shapeId === "horn-shaped"/i);
  assert.match(category, /purpleArch\.rentPriceLabel/i);
  assert.match(category, /arch\.rentPriceLabel/i);
  assert.match(category, /arch\.sellPriceLabel/i);
  assert.doesNotMatch(category, /Matching aluminum alloy stand|Buy stand/i);
  assert.doesNotMatch(category, /Flower Arch Collection/i);
  assert.match(collection, /redirect\("\/ceremony-florals#floral-catalog"\)/i);
  assert.match(data, /shape: "Square"/i);
  assert.match(data, /shape: "U-shaped"/i);
  assert.match(data, /shape: "Horn-shaped"/i);
  assert.match(data, /Matching aluminum alloy stand is purchased separately/i);
  assert.match(data, /Stands are included with the floral arch pair/i);
  assert.match(data, /Wine & burgundy/i);
  assert.match(data, /Green & white/i);
  assert.match(data, /shape: "Horn-shaped"/i);
  assert.match(data, /Rose Parlor/i);
  assert.match(data, /Merlot Bloom/i);
  assert.match(data, /Crimson Vow/i);
  assert.match(data, /rentPriceLabel: "Rent · \$500"/i);
  assert.match(data, /sellPriceLabel: "Buy · \$1,000"/i);
  assert.match(data, /sellPriceLabel: "Buy stand · \$TBD"/i);

  const filenames = [
    "00-square-aluminum-stand.jpg",
    "01-square-pink-rose.jpg",
    "02-horn-burgundy-rose.jpg",
    "03-u-pink-garden.jpg",
    "04-horn-pink-rose.jpg",
    "05-horn-white-garden.jpg",
    "06-horn-white-rose.jpg",
    "07-u-white-rose.jpg",
    "08-square-white-blossom.jpg",
    "09-horn-ivory-greenery.jpg",
    "10-square-blush-blossom.jpg",
    "11-horn-forest-green.jpg",
    "12-square-ivory-greenery.jpg",
    "13-u-ivory-greenery.jpg",
    "14-u-wine-blush.jpg",
  ];
  await Promise.all(filenames.map((filename) => access(new URL(`../public/catalog/flower-arches/${filename}`, import.meta.url))));
});

test("every arch links to a dedicated product page and square arches use confirmed pricing and specifications", async () => {
  const [category, productPage, data, form] = await Promise.all([
    readFile(new URL("../app/ceremony-florals/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ceremony-florals/[slug]/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/catalog.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/AvailabilityForm.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(category, /href=\{arch\.href\}/i);
  assert.doesNotMatch(category, /contact\?service=florals&product=\$\{arch\.slug\}/i);
  assert.match(productPage, /generateStaticParams/i);
  assert.match(productPage, /flowerArchVariations\.find/i);
  assert.match(productPage, /Height \(top to bottom\).*8 ft/is);
  assert.match(productPage, /Item width \(side to side\).*8 ft/is);
  assert.match(productPage, /Material.*Silk/is);
  assert.match(productPage, /Model number.*WFA009/is);
  assert.match(productPage, /Shandong, China/i);
  assert.match(productPage, /Backdrop decor/i);
  assert.match(productPage, /Eco-friendly, customizable/i);
  assert.match(productPage, /RFA027/i);
  assert.doesNotMatch(productPage, /MOQ|Payment|Single package size|gross weight|10-15Days/i);
  assert.match(data, /rentPriceLabel: "Rent · \$500"/i);
  assert.match(data, /sellPriceLabel: "Buy · \$1,000"/i);
  assert.match(form, /productName = "Purple Arch"/i);
  assert.match(form, /\$\{productName\} availability/i);
});

test("the Design Studio and shared Contact page support the second line of business", async () => {
  const [design, contact, form] = await Promise.all([
    readFile(new URL("../app/design-studio/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/contact/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/ContactForm.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(design, /Design for the details people keep/i);
  assert.match(design, /Presents & printed pieces/i);
  assert.match(design, /Maps & wayfinding/i);
  assert.match(design, /Stickers & small details/i);
  assert.match(design, /Sample work coming soon/i);
  assert.match(design, /href="\/contact\?service=design"/i);
  assert.match(contact, /One studio · Two offerings/i);
  assert.match(contact, /Yanyan and Jen/i);
  assert.match(contact, /ContactForm/i);
  assert.match(form, /Floral rental/i);
  assert.match(form, /Design Studio — maps and wayfinding/i);
  assert.match(form, /lshangyanyan@gmail\.com/i);
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
