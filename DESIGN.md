# Jan Day web design direction

## Core idea: paper, lacquer, and ink

Jan Day should feel like a tiny, beautifully edited shop—not a catalog template and not a themed restaurant gift counter. The visual system pairs tactile paper neutrals with lacquer red, deep tea green, editorial typography, and product still lifes. It is warm and recognizably Asian-inspired without leaning on decorative clichés.

## Experience principles

1. **Small is a feature.** The layout openly describes Jan Day as a shop corner inside China Wok. It never implies a separate storefront or large inventory.
2. **Designed, not precious.** Generous white space and large typography create confidence; practical price ranges and visit details keep the shop accessible.
3. **Cultural, not costume.** References come through material, color, product, and festival context rather than ornamental fonts or generic motifs.
4. **Browse first.** There is no cart. Every path leads toward an in-person visit, Instagram for arrivals, or a focused inquiry.
5. **Originals are distinct.** Jan Day Originals receives more graphic compositions, abstract shapes, and a clear “made by us” voice.

## Visual system

| Token | Value | Use |
| --- | --- | --- |
| Paper | `#F7F1E7` | Main page field |
| Deep paper | `#EBE1D2` | Section contrast and forms |
| Cream | `#FFFAF0` | Cards and light-on-dark text |
| Ink | `#201E19` | Type and footer |
| Persimmon | `#CF3F2E` | Primary action and signature accent |
| Oxblood | `#8C271D` | Weddings and small labels |
| Tea green | `#263F35` | Anchoring dark panels |
| Peach | `#E6A88E` | Friendly supporting accent |

### Type

- **Bodoni Moda** for large display type, section titles, numerals, and expressive italics.
- **DM Sans** for navigation, body copy, forms, prices, and utility labels.
- Large headlines use tight tracking and short line lengths. Interface text stays compact, direct, and highly legible.

### Photography

Product imagery uses warm daylight, handmade paper, wood, ceramic, linen, lacquer red, and tea green. It should feel editorial but touchable. The four custom still lifes cover lifestyle gifts, teaware/home, Lunar New Year, and Jan Day Originals. Wedding photography is treated with a warmer, lower-saturation grade.

### Layout and motion

- Maximum content width: 1320px.
- Desktop compositions are asymmetrical and image-led; mobile collapses into a clear vertical reading order.
- Fine rules organize information in place of rounded cards and shadows.
- Interaction motion uses `cubic-bezier(0.23, 1, 0.32, 1)`, 200ms entry / 140ms exit, and respects `prefers-reduced-motion`.

## Weddings sub-brand

Weddings keeps the same wordmark, fonts, spacing, and navigation but shifts the page field toward warm blush paper and oxblood. This makes the service feel ceremonial without presenting it as a separate business. Prices are intentionally omitted; the page uses “Contact us for a quote” and a visible owner-confirmation label.

## Content rules

- Never imply online ordering or reliable item-level stock.
- Keep “inside China Wok” visible on Home, Visit, and the global footer.
- Mark unknown hours, parking, phone, Instagram, wedding-package details, and the name story as owner-confirmation items.
- Use practical examples instead of invented testimonials, sales figures, or product claims.
- Describe the pilot positively and plainly.

## Accessibility baseline

- Semantic landmarks and heading hierarchy on every page.
- Visible focus rings and minimum 44px interactive targets.
- Labels for all form fields and accessible checkbox groups.
- Color contrast chosen for WCAG AA at body sizes.
- Mobile navigation exposes `aria-expanded` and closes after a route choice.
- Motion reduction supported globally.
