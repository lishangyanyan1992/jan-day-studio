export const purpleArch = {
  slug: "purple-arch",
  name: "Purple Arch",
  inventoryStatus: "active",
  featured: true,
  catalogRole: "Signature flower arch",
  shape: "Horn-shaped",
  shapeId: "horn-shaped",
  category: "Ceremony",
  categoryHref: "/ceremony-florals",
  href: "/ceremony-florals/purple-arch",
  rentalPrice: 275,
  priceLabel: "$275 / event",
  rentPriceLabel: "Rent · $275 / event",
  sellPriceLabel: "Buy · $TBD",
  palette: "Lavender · plum · soft ivory · garden green",
  description:
    "A romantic pair of asymmetrical faux-floral pillars filled with hydrangeas, roses, mums and airy greenery. Use them together as an open arch or separate them to frame an aisle, welcome sign or sweetheart table.",
  includes: [
    "Two freestanding floral pillars",
    "Coordinated purple, lavender and ivory palette",
    "Madison-area pickup and return",
    "One-event rental period",
  ],
  images: [
    {
      src: "/catalog/purple-arch/01-full-arch.jpg",
      alt: "Full Purple Arch pair with lavender, plum and ivory faux flowers",
    },
    {
      src: "/catalog/purple-arch/02-ceremony-setting.jpg",
      alt: "Purple Arch pillars framing a wooden ceremony easel",
    },
    {
      src: "/catalog/purple-arch/03-ground-pieces.jpg",
      alt: "Purple faux-floral pillars arranged as lower ground pieces",
    },
    {
      src: "/catalog/purple-arch/04-floral-detail.jpg",
      alt: "Close view of lavender roses, white mums and greenery",
    },
    {
      src: "/catalog/purple-arch/05-hydrangea-detail.jpg",
      alt: "Close view of lavender hydrangeas and mauve roses",
    },
    {
      src: "/catalog/purple-arch/06-rose-detail.jpg",
      alt: "Close view of lavender roses and cascading greenery",
    },
    {
      src: "/catalog/purple-arch/07-arrangement-overview.jpg",
      alt: "Overview of the Purple Arch floral composition",
    },
    {
      src: "/catalog/purple-arch/08-bloom-closeup.jpg",
      alt: "Close view of purple hydrangeas, mauve roses and white blooms",
    },
  ],
} as const;

export type FlowerArchShape = "Square" | "U-shaped" | "Horn-shaped";
export type FlowerArchColor = "Pink" | "White & ivory" | "Wine & burgundy" | "Green & white";

export interface FlowerArchVariation {
  slug: string;
  name: string;
  href: string;
  shape: FlowerArchShape;
  shapeId: "square" | "u-shaped" | "horn-shaped";
  color: FlowerArchColor;
  palette: string;
  rentPriceLabel: string;
  sellPriceLabel: string;
  image: { src: string; alt: string };
}

const archPricing = {
  rentPriceLabel: "Rent · $500",
  sellPriceLabel: "Buy · $1,000",
} as const;

export const flowerArchVariations: readonly FlowerArchVariation[] = [
  {
    slug: "pink-rose-square",
    name: "Rose Parlor",
    href: "/ceremony-florals/pink-rose-square",
    shape: "Square",
    shapeId: "square",
    color: "Pink",
    palette: "Blush · petal pink · rose",
    ...archPricing,
    image: {
      src: "/catalog/flower-arches/01-square-pink-rose.jpg",
      alt: "Square faux-flower arch covered in blush and bright pink roses",
    },
  },
  {
    slug: "white-blossom-square",
    name: "Snowfall",
    href: "/ceremony-florals/white-blossom-square",
    shape: "Square",
    shapeId: "square",
    color: "White & ivory",
    palette: "White · ivory · soft cream",
    ...archPricing,
    image: {
      src: "/catalog/flower-arches/08-square-white-blossom.jpg",
      alt: "Square faux-flower arch filled with white roses and blossoms",
    },
  },
  {
    slug: "blush-blossom-square",
    name: "Blush Canopy",
    href: "/ceremony-florals/blush-blossom-square",
    shape: "Square",
    shapeId: "square",
    color: "Pink",
    palette: "Blush · pink · soft lavender",
    ...archPricing,
    image: {
      src: "/catalog/flower-arches/10-square-blush-blossom.jpg",
      alt: "Square faux-flower arch with pink blossoms, roses and lavender accents",
    },
  },
  {
    slug: "ivory-greenery-square",
    name: "Ivory Grove",
    href: "/ceremony-florals/ivory-greenery-square",
    shape: "Square",
    shapeId: "square",
    color: "Green & white",
    palette: "Ivory · garden green",
    ...archPricing,
    image: {
      src: "/catalog/flower-arches/12-square-ivory-greenery.jpg",
      alt: "Square faux-flower arch with ivory roses and abundant green foliage",
    },
  },
  {
    slug: "pink-garden-u",
    name: "Petal Blush",
    href: "/ceremony-florals/pink-garden-u",
    shape: "U-shaped",
    shapeId: "u-shaped",
    color: "Pink",
    palette: "Blush · fuchsia · white",
    ...archPricing,
    image: {
      src: "/catalog/flower-arches/03-u-pink-garden.jpg",
      alt: "U-shaped pink faux-flower arch with hydrangeas, roses and ground florals",
    },
  },
  {
    slug: "white-rose-u",
    name: "Moonlit Rose",
    href: "/ceremony-florals/white-rose-u",
    shape: "U-shaped",
    shapeId: "u-shaped",
    color: "White & ivory",
    palette: "Pure white · soft ivory",
    ...archPricing,
    image: {
      src: "/catalog/flower-arches/07-u-white-rose.jpg",
      alt: "U-shaped faux-flower arch made with white roses and blossoms",
    },
  },
  {
    slug: "ivory-greenery-u",
    name: "Garden Vow",
    href: "/ceremony-florals/ivory-greenery-u",
    shape: "U-shaped",
    shapeId: "u-shaped",
    color: "Green & white",
    palette: "Ivory · cream · garden green",
    ...archPricing,
    image: {
      src: "/catalog/flower-arches/13-u-ivory-greenery.jpg",
      alt: "Wide U-shaped faux-flower arch with ivory flowers and layered greenery",
    },
  },
  {
    slug: "wine-blush-u",
    name: "Merlot Bloom",
    href: "/ceremony-florals/wine-blush-u",
    shape: "U-shaped",
    shapeId: "u-shaped",
    color: "Wine & burgundy",
    palette: "Wine · burgundy · blush · champagne",
    ...archPricing,
    image: {
      src: "/catalog/flower-arches/14-u-wine-blush.jpg",
      alt: "U-shaped faux-flower arch in wine, burgundy, blush and champagne tones",
    },
  },
  {
    slug: "burgundy-rose-horn",
    name: "Crimson Vow",
    href: "/ceremony-florals/burgundy-rose-horn",
    shape: "Horn-shaped",
    shapeId: "horn-shaped",
    color: "Wine & burgundy",
    palette: "Burgundy · wine · deep red · green",
    ...archPricing,
    image: {
      src: "/catalog/flower-arches/02-horn-burgundy-rose.jpg",
      alt: "Horn-shaped faux-flower arch with deep burgundy and red roses",
    },
  },
  {
    slug: "pink-rose-horn",
    name: "Rosewater",
    href: "/ceremony-florals/pink-rose-horn",
    shape: "Horn-shaped",
    shapeId: "horn-shaped",
    color: "Pink",
    palette: "Blush · petal pink · rose",
    ...archPricing,
    image: {
      src: "/catalog/flower-arches/04-horn-pink-rose.jpg",
      alt: "Horn-shaped faux-flower arch covered in soft and bright pink roses",
    },
  },
  {
    slug: "white-garden-horn",
    name: "White Meadow",
    href: "/ceremony-florals/white-garden-horn",
    shape: "Horn-shaped",
    shapeId: "horn-shaped",
    color: "Green & white",
    palette: "White · ivory · fresh green",
    ...archPricing,
    image: {
      src: "/catalog/flower-arches/05-horn-white-garden.jpg",
      alt: "Horn-shaped faux-flower arch with layered white flowers and greenery",
    },
  },
  {
    slug: "white-rose-horn",
    name: "Porcelain Rose",
    href: "/ceremony-florals/white-rose-horn",
    shape: "Horn-shaped",
    shapeId: "horn-shaped",
    color: "White & ivory",
    palette: "White · warm ivory · leaf green",
    ...archPricing,
    image: {
      src: "/catalog/flower-arches/06-horn-white-rose.jpg",
      alt: "Horn-shaped faux-flower arch filled with white roses and delicate greenery",
    },
  },
  {
    slug: "ivory-greenery-horn",
    name: "Ivory Vine",
    href: "/ceremony-florals/ivory-greenery-horn",
    shape: "Horn-shaped",
    shapeId: "horn-shaped",
    color: "Green & white",
    palette: "Ivory · white · garden green",
    ...archPricing,
    image: {
      src: "/catalog/flower-arches/09-horn-ivory-greenery.jpg",
      alt: "Horn-shaped faux-flower arch with ivory roses, white blooms and green leaves",
    },
  },
  {
    slug: "forest-garden-horn",
    name: "Evergreen Lace",
    href: "/ceremony-florals/forest-garden-horn",
    shape: "Horn-shaped",
    shapeId: "horn-shaped",
    color: "Green & white",
    palette: "Forest green · moss · white",
    ...archPricing,
    image: {
      src: "/catalog/flower-arches/11-horn-forest-green.jpg",
      alt: "Horn-shaped faux-flower arch with forest greenery, white flowers and ground florals",
    },
  },
];

export const squareArchStand = {
  name: "Square Arch Aluminum Stand",
  sellPriceLabel: "Buy stand · $TBD",
  image: {
    src: "/catalog/flower-arches/00-square-aluminum-stand.jpg",
    alt: "Matching aluminum alloy stand for square faux-flower arches",
  },
} as const;

export const flowerArchShapes = [
  {
    id: "square",
    name: "Square",
    note: "Matching aluminum alloy stand is purchased separately.",
  },
  {
    id: "u-shaped",
    name: "U-shaped",
    note: "Stand is included with the floral arch design.",
  },
  {
    id: "horn-shaped",
    name: "Horn-shaped",
    note: "Stands are included with the floral arch pair.",
  },
] as const;

interface CatalogCollection {
  name: string;
  title: string;
  href: string;
  status: string;
  image?: { src: string; alt: string };
}

export const catalogCollections: readonly CatalogCollection[] = [
  {
    name: "Ceremony",
    title: "Ceremony florals",
    href: "/ceremony-florals",
    status: "Purple Arch · 14 more styles",
    image: purpleArch.images[0],
  },
  {
    name: "Personal",
    title: "Personal flowers",
    href: "/personal-flowers",
    status: "Collection coming soon",
  },
  {
    name: "Reception",
    title: "Reception florals",
    href: "/reception-florals",
    status: "Collection coming soon",
  },
  {
    name: "Statement",
    title: "Statement florals",
    href: "/statement-florals",
    status: "Collection coming soon",
  },
  {
    name: "DIY",
    title: "Loose stems & DIY",
    href: "/loose-stems-diy",
    status: "Collection coming soon",
  },
];
