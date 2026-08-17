export const purpleArch = {
  slug: "purple-arch",
  name: "Purple Arch",
  category: "Ceremony",
  categoryHref: "/ceremony-florals",
  href: "/ceremony-florals/purple-arch",
  rentalPrice: 275,
  priceLabel: "$275 / event",
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
    status: "1 piece available",
    image: purpleArch.images[1],
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
