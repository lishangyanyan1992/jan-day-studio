export interface PlaceholderSample {
  number: string;
  name: string;
  use: string;
  description: string;
  details: string[];
}

export interface PlaceholderCollection {
  eyebrow: string;
  title: string;
  intro: string;
  sectionLabel: string;
  ctaTitle: string;
  ctaBody: string;
  samples: PlaceholderSample[];
}

// Temporary public catalog content. Replace each object here when the exact
// product, customer price, rental price, image and supplier record are ready.
export const placeholderCollections = {
  personal: {
    eyebrow: "Personal flowers · coming soon",
    title: "Flowers made for the moments seen up close.",
    intro:
      "Bouquets and wearable flowers are next on our list. This preview shows the collection categories we plan to add as exact rental pieces are selected and photographed.",
    sectionLabel: "Personal flower preview",
    ctaTitle: "Have a bouquet in mind?",
    ctaBody:
      "Send us your palette, quantities and reference images. We can use your vision to guide what we source next.",
    samples: [
      {
        number: "01",
        name: "Bridal bouquets",
        use: "Ceremony · portraits · keepsakes",
        description: "Curated faux-floral bouquets designed to feel considered in hand and convincing in close-up photographs.",
        details: ["Exact styles coming soon", "Palettes to be announced", "Rental pricing pending"],
      },
      {
        number: "02",
        name: "Bridesmaid bouquets",
        use: "Wedding party · ceremony · portraits",
        description: "Coordinated smaller bouquets that complement the bridal piece without simply repeating it.",
        details: ["Set sizes coming soon", "Palettes to be announced", "Rental pricing pending"],
      },
      {
        number: "03",
        name: "Boutonnieres",
        use: "Wedding party · family · portraits",
        description: "Lightweight wearable flowers with secure mechanics and a finish designed for close-up moments.",
        details: ["Exact styles coming soon", "Attachment method pending", "Rental pricing pending"],
      },
      {
        number: "04",
        name: "Corsages & hair flowers",
        use: "Family · wedding party · personal styling",
        description: "Small floral accents that carry the event palette into personal details.",
        details: ["Exact styles coming soon", "Formats to be announced", "Rental pricing pending"],
      },
    ],
  },
  reception: {
    eyebrow: "Reception florals · placeholder edit",
    title: "Flowers that move through the whole celebration.",
    intro:
      "These temporary cards reserve space for the reception collection while exact products are selected. They show the kinds of pieces we plan to compare—not researched or available inventory.",
    sectionLabel: "Four reception placeholders",
    ctaTitle: "What belongs on your tables?",
    ctaBody:
      "Tell us the reception style, palette, table count and date you have in mind. We’ll use that interest to guide the products researched next.",
    samples: [
      {
        number: "01",
        name: "Centerpiece Sample 01",
        use: "Guest tables · round tables · long tables",
        description: "Placeholder for a finished centerpiece style with enough presence to anchor a table without interrupting conversation.",
        details: ["Final dimensions pending", "Palette pending", "Supplier pending"],
      },
      {
        number: "02",
        name: "Bud-Vase Cluster Sample 02",
        use: "Cocktail tables · dinner tables · bars",
        description: "Placeholder for a coordinated cluster that can be distributed across smaller surfaces or grouped for a fuller table moment.",
        details: ["Set quantity pending", "Stem mix pending", "Supplier pending"],
      },
      {
        number: "03",
        name: "Sweetheart Swag Sample 03",
        use: "Sweetheart tables · head tables · bars",
        description: "Placeholder for a flexible floral swag designed to soften the front edge of a focal table and move easily between spaces.",
        details: ["Final length pending", "Attachment pending", "Supplier pending"],
      },
      {
        number: "04",
        name: "Cake Flower Set Sample 04",
        use: "Wedding cakes · dessert tables · display plinths",
        description: "Placeholder for a small coordinated flower set intended for decorative placement around a cake or dessert display.",
        details: ["Piece count pending", "Food-safe method pending", "Supplier pending"],
      },
    ],
  },
  statement: {
    eyebrow: "Statement florals · placeholder edit",
    title: "The flower moments guests remember.",
    intro:
      "These temporary cards hold the shape of the future statement collection. No product, construction method or supplier has been selected yet.",
    sectionLabel: "Four statement placeholders",
    ctaTitle: "Where should the room change?",
    ctaBody:
      "Share the focal space, approximate dimensions, palette and venue rules. We’ll use those details when choosing statement pieces to research.",
    samples: [
      {
        number: "01",
        name: "Flower Wall Sample 01",
        use: "Photo backdrops · entrances · escort displays",
        description: "Placeholder for a modular flower-wall system that can create a full floral field while remaining practical to transport and install.",
        details: ["Panel size pending", "Coverage pending", "Supplier pending"],
      },
      {
        number: "02",
        name: "Hanging Installation Sample 02",
        use: "Dance floors · dining rooms · tent ceilings",
        description: "Placeholder for a lightweight overhead floral concept to be evaluated against venue rigging, fire-code and installation requirements.",
        details: ["Weight pending", "Rigging pending", "Supplier pending"],
      },
      {
        number: "03",
        name: "Moon Gate Kit Sample 03",
        use: "Ceremonies · photo moments · reception backdrops",
        description: "Placeholder for a coordinated floral kit designed to dress a circular frame with enough scale to read as a complete backdrop.",
        details: ["Frame excluded", "Cluster count pending", "Supplier pending"],
      },
      {
        number: "04",
        name: "Large Floral Cluster Sample 04",
        use: "Staircases · stages · welcome moments",
        description: "Placeholder for a freestanding or pedestal-based floral cluster that can create impact without requiring a permanent installation.",
        details: ["Support method pending", "Dimensions pending", "Supplier pending"],
      },
    ],
  },
  diy: {
    eyebrow: "Loose stems & DIY · placeholder edit",
    title: "A flexible starting point for making it your own.",
    intro:
      "These temporary cards reserve space for loose stems, bundles and flower-bar quantities. The exact stem quality, colors and pack sizes have not been researched yet.",
    sectionLabel: "Four DIY placeholders",
    ctaTitle: "What do you want to arrange?",
    ctaBody:
      "Tell us the flower types, palette, quantity and project you have in mind. That helps us prioritize the stem bundles and kits to research first.",
    samples: [
      {
        number: "01",
        name: "Rose Stem Bundle Sample 01",
        use: "Bouquets · centerpieces · flower bars",
        description: "Placeholder for a bundle of realistic individual rose stems available in coordinated wedding palettes and useful DIY quantities.",
        details: ["Stem count pending", "Colorways pending", "Supplier pending"],
      },
      {
        number: "02",
        name: "Peony Stem Bundle Sample 02",
        use: "Bouquets · statement arrangements · centerpieces",
        description: "Placeholder for a fuller focal-flower bundle with bloom size, petal density and stem flexibility still to be evaluated.",
        details: ["Stem count pending", "Bloom size pending", "Supplier pending"],
      },
      {
        number: "03",
        name: "Eucalyptus Bundle Sample 03",
        use: "Garlands · bouquets · table greenery",
        description: "Placeholder for a greenery bundle intended to add shape and volume while staying convincing in close-up arrangements.",
        details: ["Stem count pending", "Leaf finish pending", "Supplier pending"],
      },
      {
        number: "04",
        name: "DIY Flower-Bar Kit Sample 04",
        use: "Welcome events · showers · guest activities",
        description: "Placeholder for a mixed-stem kit sized for a self-serve flower bar, with palette, recipe and packaging still to be determined.",
        details: ["Recipe pending", "Guest count pending", "Supplier pending"],
      },
    ],
  },
} satisfies Record<string, PlaceholderCollection>;
