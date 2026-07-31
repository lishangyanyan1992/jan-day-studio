# Jan Day Studio Design System

Version 1.0 — July 2026

## Brand foundation

Jan Day Studio is a Madison-area faux-floral sourcing studio. The brand should feel warm, artful, unhurried, and personal: elevated enough for a wedding, approachable enough for a local pickup.

The visual identity begins with two supplied marks:

- **Primary wordmark:** `public/brand/jan-day-wordmark.png`
- **Secondary monogram:** `public/brand/jan-day-mark.jpg`

The custom logo artwork is the source of truth. Never recreate, typeset, stretch, recolor, outline, shadow, or crop the letterforms.

## Brand principles

1. **Considered, not precious.** Use refined typography and spacing without making the experience feel exclusive or formal.
2. **Organic, not rustic.** Reference the monogram’s pebble shape through soft asymmetry and curved framing; avoid burlap, farmhouse clichés, or excessive botanical ornament.
3. **Warm, not sugary.** Favor clay, cream, walnut, and muted natural tones over bright pink or pure white.
4. **Editorial, not ornamental.** Let photography, typography, and negative space carry the design. Decorative flourishes should be rare.
5. **Clear, not salesy.** Explain overseas faux-floral sourcing, order approval, landed pricing, and Madison pickup in plain language with one obvious next step.

## Logo system

### Primary wordmark

Use the full “Jan Day Studio” artwork in navigation, footers, printed headers, proposals, social profiles, and brand introductions.

- Minimum digital width: `120px`
- Preferred navigation width: `148–170px`
- Clear space: at least the height of the lowercase “a” on every side
- Place on Canvas, Ivory, Ink, or photography with strong contrast
- Use the supplied transparent PNG; do not rebuild the wordmark with a font

### Secondary monogram

Use the JD pebble mark for favicons, social avatars, stickers, packaging labels, loading states, and small brand moments.

- Minimum digital size: `32 × 32px`
- Preferred supporting size: `72–120px`
- Keep its white field intact unless a future transparent master is provided
- Do not place additional text inside the pebble

## Color system

The primary clay is sampled directly from the supplied logo artwork.

| Token | Hex | Role |
| --- | --- | --- |
| `brand-clay` | `#B5876F` | Signature brand color, primary actions, key accents |
| `clay-deep` | `#875D4A` | Accessible small text, active states, fine rules |
| `clay-soft` | `#D7B9A8` | Tinted panels, subtle accents, hover states |
| `ink` | `#271C18` | Primary text, dark backgrounds, high-contrast UI |
| `walnut` | `#4A352D` | Secondary dark surface and supporting text |
| `canvas` | `#FBF7F2` | Default page background |
| `ivory` | `#F2E8DE` | Alternate section background and cards |
| `stone` | `#D8C8BC` | Borders, dividers, disabled states |
| `sage` | `#858774` | Sparing natural accent for sourcing and service cues |

### Color usage

- Use Canvas for most pages and Ink for primary copy.
- Use Brand Clay in focused moments, not as an all-over wash.
- On Brand Clay backgrounds, use Ink text—not white—for reliable contrast.
- Use Clay Deep for small labels on light backgrounds.
- Reserve Sage for no more than 10% of a composition.
- Avoid pure black and pure white; both feel too stark for the brand.

## Typography

### Display

**Bodoni Moda**, weights 400 and 500. Use for hero statements, page titles, collection names, pull quotes, and large numerals. Its high-contrast strokes echo the custom wordmark without imitating it.

- Hero: `clamp(4rem, 8vw, 7.8rem)` / `0.86` line-height
- Section title: `clamp(3rem, 5vw, 5.6rem)` / `0.92` line-height
- Card title: `1.8–2.2rem` / `1` line-height
- Letter spacing: `-0.035em` for large display only

### Interface and body

**DM Sans**, weights 400, 500, and 600. Use for navigation, paragraphs, forms, buttons, prices, policies, and operational details.

- Body: `1rem` / `1.7` line-height
- Small body: `0.84–0.9rem` / `1.6` line-height
- Eyebrow: `0.68rem`, 600, uppercase, `0.14em` tracking
- Button: `0.68rem`, 600, uppercase, `0.1em` tracking

Do not use more than these two type families in branded digital work. The supplied wordmark counts as artwork, not a third font.

## Layout and spacing

- Maximum content width: `1180px`
- Desktop page gutter: `28px` minimum
- Mobile page gutter: `18px`
- Section spacing: `96–148px` desktop; `72–90px` mobile
- Base spacing unit: `4px`
- Common gaps: `12, 20, 28, 40, 56, 76px`
- Favor asymmetrical editorial compositions with one strong focal point and generous negative space.

## Shape language

The JD monogram’s irregular pebble is the reference shape.

- Use soft asymmetric curves for a hero badge, image mask, or occasional background field.
- Use restrained radii on functional elements: `2–6px` for forms and buttons.
- Avoid applying rounded cards everywhere; the pebble loses meaning when every object is organic.
- Use thin `1px` rules in Stone or Clay Deep at reduced opacity.

## Imagery

Photography should feel lived-in, natural, and editorial.

- Prefer natural daylight, candlelight, tactile linens, wood, glass, ceramics, and small human details.
- Show complete settings as well as close product details.
- Favor warm neutrals with a restrained green component.
- Avoid heavy presets, bright white ballroom lighting, stiff catalog cutouts, and generic stock-photo poses.
- When text overlays photography, add a warm Ink-to-transparent gradient and verify readable contrast.

## Components

### Buttons

- Primary: Brand Clay background, Ink text
- Secondary: Canvas background, Ink text, thin Stone border
- Dark: Ink background, Canvas text
- Minimum touch target: `44px`
- Motion: translate upward by no more than `2px` on hover

### Cards

- Use Canvas or Ivory backgrounds.
- Keep card borders minimal; use spacing or a top rule for separation.
- Product images may use one subtle arch or asymmetrical top edge.
- Titles remain editorial; descriptions remain practical.

### Forms

- Labels use Clay Deep, uppercase DM Sans.
- Inputs use an Ink text color and a Stone bottom border.
- Focus states use a visible `2px` Brand Clay outline with offset.
- Error and success messages must be written in plain language.

## Voice and messaging

Jan Day sounds like a thoughtful local creative partner.

- Warm, specific, and calm
- Short sentences; contractions are welcome
- Prefer “your day,” “pieces,” “gather,” “pick up,” and “we’ll help”
- Say “Madison-area” when geographic clarity matters
- Explain custom faux-floral sourcing as a collaborative service, not a concierge luxury
- Avoid “perfect,” “dream wedding,” “one-stop shop,” “magical,” and urgency-based sales language

### Core message

**High-quality faux florals, sourced overseas and picked up in Madison.**

### Primary call to action

**Start a sourcing request**

### Supporting calls to action

- See what we can source
- Ask us to source your flowers
- Plan your pickup
- Share your reference photos

## Accessibility baseline

- Meet WCAG AA contrast for all functional text.
- Never use Brand Clay for small text on white; use Clay Deep.
- All logo images require descriptive alternative text unless an adjacent accessible name already supplies it.
- Maintain visible keyboard focus states.
- Respect `prefers-reduced-motion`.
- Preserve semantic headings, landmarks, labels, and minimum touch targets.

## Do / do not

### Do

- Use the supplied logo files unchanged.
- Let the clay color and typography establish recognition.
- Keep the sourcing steps, order approval, landed quote, and Madison pickup easy to find.
- Pair poetic headlines with concrete supporting copy.

### Do not

- Recreate the logo in live text.
- Add gold gradients, scripts, floral clip art, or drop shadows.
- Use bright blush pink as the dominant color.
- Put white body text on Brand Clay.
- Overload the page with rounded boxes or decorative icons.
