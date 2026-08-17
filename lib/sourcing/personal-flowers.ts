export interface PersonalFlowerSample {
  number: string;
  slug: string;
  name: string;
  use: string;
  image: string;
  alt: string;
  palette: string[];
  description: string;
  details: string[];
  buy: string;
  rent: string;
  priceUnit: string;
  status: string;
  quality: string;
  sourcing: {
    marketplace: "1688" | "Taobao";
    listingId: string;
    listingTitle: string;
    exactVariant: string;
    supplier: string;
    sourcePrice: string;
    moq: string;
    originalUrl: string;
    researchUrl: string;
    permissionStatus: "Not requested";
    checkedOn: string;
    evidence: string;
  };
}

export const personalFlowerSamples: PersonalFlowerSample[] = [
  {
    number: "01",
    slug: "ivory-rose-lily-bridal-bouquet",
    name: "Ivory Rose & Lily Bridal Bouquet",
    use: "Bridal portraits · ceremonies · reception entrances",
    image: "/samples/ivory-rose-lily-bouquet.png",
    alt: "Compact ivory rose and white lily bridal bouquet with a champagne ribbon handle",
    palette: ["#f6f1e8", "#ded3bd", "#7d846f"],
    description:
      "A clean, rounded bouquet that keeps the flower mix familiar while letting the lilies add a little movement. The restrained palette is designed to work across warm-ivory and bright-white gowns.",
    details: ["12 rose-and-lily flower heads", "Silk and plastic construction", "Champagne-wrapped handle"],
    buy: "$85",
    rent: "$45",
    priceUnit: "each",
    status: "Supplier listing verified",
    quality:
      "We’ll order the exact listing and assess petal edges, lily shape, leaf finish, stem comfort and how well the bouquet recovers after shipping.",
    sourcing: {
      marketplace: "1688",
      listingId: "596830995329",
      listingTitle: "Artificial flower 12 rose lily bouquet",
      exactVariant: "Finished 12-rose-and-lily bouquet; stock color to be confirmed with seller",
      supplier: "mazhaoping88",
      sourcePrice: "US$0.82 shown by research mirror",
      moq: "2 pieces",
      originalUrl: "https://detail.1688.com/offer/596830995329.html",
      researchUrl: "https://www.1688wholesale.com/en/1688/china_alibaba_item/596830995329.html",
      permissionStatus: "Not requested",
      checkedOn: "July 31, 2026",
      evidence: "Exact offer ID, title, supplier handle, listed price and MOQ captured. Physical quality is not yet verified.",
    },
  },
  {
    number: "02",
    slug: "lavender-rose-bridesmaid-bouquet",
    name: "Lavender Rose Bridesmaid Bouquet",
    use: "Bridesmaids · attendants · toss bouquets",
    image: "/samples/lavender-rose-bouquet.png",
    alt: "Dusty lavender artificial rose bouquet with soft greenery and a mauve ribbon handle",
    palette: ["#c8acc7", "#9e7e9a", "#89917b"],
    description:
      "A compact, single-flower bouquet for a softer color story. Repeating one rose tone keeps a wedding party coordinated without making every bouquet feel visually heavy.",
    details: ["Lavender rose bouquet", "European-style rounded shape", "Soft green leaf accents"],
    buy: "$55",
    rent: "$30",
    priceUnit: "each",
    status: "Supplier listing verified",
    quality:
      "We’ll confirm the real color in daylight, count usable flower heads and test whether the petals crease, fray or transfer dye during handling.",
    sourcing: {
      marketplace: "1688",
      listingId: "635156377689",
      listingTitle: "European-style artificial lavender rose bouquet",
      exactVariant: "Lavender rose finished bouquet",
      supplier: "lushaowei201188",
      sourcePrice: "US$0.37 shown by research mirror",
      moq: "10 pieces",
      originalUrl: "https://detail.1688.com/offer/635156377689.html",
      researchUrl: "https://www.1688wholesale.com/en/1688/china_alibaba_item/635156377689.html",
      permissionStatus: "Not requested",
      checkedOn: "July 31, 2026",
      evidence: "Exact offer ID, translated title and displayed wholesale terms captured. Physical quality is not yet verified.",
    },
  },
  {
    number: "03",
    slug: "xiuhe-bridal-fan-bouquet",
    name: "Xiuhe Bridal Fan Bouquet",
    use: "Chinese weddings · tea ceremonies · bridal portraits",
    image: "/samples/xiuhe-bridal-fan-bouquet.png",
    alt: "Ivory and gold Chinese Xiuhe bridal round fan bouquet with pearl flowers, a phoenix, and a red tassel",
    palette: ["#f4ead7", "#c6983f", "#ab2727"],
    description:
      "A ceremonial alternative to a hand-tied bouquet, built around a circular gold frame with pearl flowers, butterflies and a phoenix ornament. The single red tassel gives it a clear wedding accent without overwhelming the ivory-and-gold finish.",
    details: ["Finished round fan bouquet", "Pearl, metal and fabric ornamentation", "Gold handle and red tassel"],
    buy: "$125",
    rent: "$70",
    priceUnit: "each",
    status: "Exact Taobao variant selected",
    quality:
      "We’ll check frame rigidity, bead and ornament attachment, sharp edges, balance in the hand and whether the white floral pieces arrive clean and intact.",
    sourcing: {
      marketplace: "Taobao",
      listingId: "622350912331",
      listingTitle: "Ancient-style Xiuhe round fan bridal bouquet",
      exactVariant: "White finished product, five-piece set, without fan holder",
      supplier: "XiaoDian family",
      sourcePrice: "US$41.26 shown by research mirror",
      moq: "1 piece",
      originalUrl: "https://item.taobao.com/item.htm?id=622350912331",
      researchUrl: "https://www.yoycart.com/Product/622350912331/",
      permissionStatus: "Not requested",
      checkedOn: "July 31, 2026",
      evidence: "Exact Taobao item number, finished-product variant list, brand and listing photographs captured.",
    },
  },
  {
    number: "04",
    slug: "double-tassel-wedding-corsage-pair",
    name: "Double-Tassel Wedding Corsage Pair",
    use: "Newlyweds · wedding party · family flowers",
    image: "/samples/double-tassel-corsage-pair.png",
    alt: "Pair of burgundy Chinese wedding corsages with satin roses, gold leaves, double-happiness charms, and tassels",
    palette: ["#751a31", "#bd9655", "#eee4d7"],
    description:
      "A coordinated pair of deep-burgundy wearable flowers with satin rose centers, gold foliage and traditional double-happiness charms. The long tails make them feel ceremonial rather than like ordinary lapel flowers.",
    details: ["Coordinated pair", "Satin rose and ribbon loops", "Gold charms and burgundy tassels"],
    buy: "$28",
    rent: "$16",
    priceUnit: "per pair",
    status: "Taobao listing verified",
    quality:
      "We’ll test the pin or wrist attachment, inspect ribbon edges and hardware plating, and confirm that the two pieces arrive symmetrical and presentation-ready.",
    sourcing: {
      marketplace: "Taobao",
      listingId: "Hooos djdRXmRtZtdjPYdTjontet3-xzQZZ4sOyK9Jmj7Hq",
      listingTitle: "Chinese double-tassel wedding corsage and wrist-flower set",
      exactVariant: "Burgundy bride-and-groom double-tassel corsage pair",
      supplier: "禧文化原创饰品 · Shandong, Dongying",
      sourcePrice: "CNY 12.98 displayed sale price",
      moq: "Confirm with seller",
      originalUrl: "https://tao.hooos.com/static/go.html?id=djdRXmRtZtdjPYdTjontet3-xzQZZ4sOyK9Jmj7Hq",
      researchUrl: "https://tao.hooos.com/goods_djdRXmRtZtdjPYdTjontet3-xzQZZ4sOyK9Jmj7Hq.html",
      permissionStatus: "Not requested",
      checkedOn: "July 31, 2026",
      evidence: "Exact Taobao-sourced mirror page, shop name, current listing photography and displayed sale price captured; direct Taobao item number is not exposed by the mirror.",
    },
  },
];
