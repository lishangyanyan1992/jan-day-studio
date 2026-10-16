# Jan Day gift shop website

A responsive, browse-only website for Jan Day, a small design-led gift shop located inside China Wok in Stevens Point, Wisconsin.

## What is included

- Home, Shop, Jan Day Originals, Seasonal, Weddings, Visit, and Contact pages
- Product-category photography and typical price ranges
- Separate Weddings treatment with a complete quote inquiry form
- Holiday gift box and corporate gifting inquiry flow
- Responsive mobile navigation and accessible forms
- Owner-confirmation placeholders for the Jan Day name story, hours, parking, phone, Instagram, and wedding-package details
- Existing private inventory administration routes remain available under `/admin`

See [`docs/SITE_CONTENT.md`](docs/SITE_CONTENT.md) for the sitemap and page-copy handoff, and [`DESIGN.md`](DESIGN.md) for the design system.

## Run locally

Requires Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validate

```bash
npm test
```

The command runs the production Next.js build and the repository tests.

## Key files

- Global shell and navigation: `app/CatalogChrome.tsx`
- Main pages: `app/page.tsx`, `app/shop/`, `app/originals/`, `app/seasonal/`, `app/weddings/`, `app/visit/`, `app/contact/`
- Forms: `app/ContactForm.tsx`, `app/WeddingInquiryForm.tsx`
- Visual system: `app/globals.css`
- Generated product imagery: `public/images/shop/`

## Before launch

Search the codebase for `OWNER TO ADD`, `OWNER TO CONFIRM`, and `CONFIRM WITH OWNER`. Replace every marked item with approved information before making the site public. The inquiry forms currently prepare an email to `lshangyanyan@gmail.com`; confirm or replace that address as part of launch review.
