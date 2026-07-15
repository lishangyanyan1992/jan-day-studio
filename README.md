# Jan Day Studio

The main Jan Day Studio website for Madison-area wedding rentals, local pickup,
delivery inquiries, and product sourcing. It is a standard Next.js application
ready for zero-configuration deployment on Vercel.

## Run locally

Requirements: Node.js 20.9 or newer.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Validate a production build

```bash
npm test
```

The test command creates the same optimized Next.js build Vercel will use and
checks the landing page and standalone brand guide.

## Deploy to Vercel

1. Push this folder to a GitHub, GitLab, or Bitbucket repository.
2. In Vercel, choose **Add New → Project** and import that repository.
3. Leave the detected framework as **Next.js** and keep the default build settings.
4. Select **Deploy**.

No environment variables are required. Vercel supplies the production hostname
used by the site's social sharing metadata.

## Content and assets

- Main landing page: `app/page.tsx`
- Inquiry form: `app/InquiryForm.tsx`
- Visual styling: `app/globals.css`
- Brand documentation: `DESIGN.md`
- HTML brand guide: `public/brand-guide.html`
- Logo artwork: `public/brand/`

The inquiry form opens a pre-filled email to `hello@jandayrentals.com`; it does
not require a database or third-party form service.
