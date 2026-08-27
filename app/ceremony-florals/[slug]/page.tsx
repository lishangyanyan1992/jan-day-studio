import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { AvailabilityForm } from "../../AvailabilityForm";
import { CatalogFooter, CatalogHeader } from "../../CatalogChrome";
import { flowerArchVariations } from "@/lib/catalog";

type ProductPageProps = {
  params: Promise<{ slug: string }>;
};

const squareAttributes = [
  ["Height (top to bottom)", "8 ft"],
  ["Item width (side to side)", "8 ft"],
  ["Material", "Silk"],
  ["Type", "Classic style"],
  ["Shape", "Square"],
  ["Feature", "Durable, adjustable, soft, handmade, natural"],
  ["Model number", "WFA009"],
  ["Place of origin", "Shandong, China"],
  ["Brand name", "Irand"],
  ["Usage", "Home, party and wedding decoration"],
  ["Size", "8 ft × 8 ft; customized sizes available"],
  ["Style", "Romantic wedding decoration"],
] as const;

export function generateStaticParams() {
  return flowerArchVariations.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = flowerArchVariations.find((item) => item.slug === slug);
  if (!product) return {};

  return {
    title: `${product.name} | Jan Day Studio`,
    description: `${product.name}, a ${product.color.toLowerCase()} ${product.shape.toLowerCase()} faux-flower arch from Jan Day Studio.`,
    openGraph: {
      title: `${product.name} | Jan Day Studio`,
      description: `${product.palette} faux-flower arch for weddings and celebrations.`,
      images: [{ url: product.image.src, alt: product.image.alt }],
    },
  };
}

function SpecificationList({ items }: { items: readonly (readonly [string, string])[] }) {
  return (
    <dl className="product-spec-list">
      {items.map(([label, value]) => (
        <div key={label}>
          <dt>{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

export default async function FlowerArchProductPage({ params }: ProductPageProps) {
  const { slug } = await params;
  const product = flowerArchVariations.find((item) => item.slug === slug);
  if (!product) notFound();

  const isSquare = product.shapeId === "square";
  const productAttributes = isSquare
    ? [
        ["Product name", product.name],
        ...squareAttributes.map(([label, value]) => label === "Shape" ? [label, product.shape] as const : [label, value] as const),
        ["Color", `${product.color}; customized colors available`],
      ] as const
    : [
        ["Product name", product.name],
        ["Type", "Backdrop decor"],
        ["Style", "3D"],
        ["Material", "Silk"],
        ["Shape", product.shape],
        ["Color", product.color],
        ["Feature", "Eco-friendly, customizable"],
        ["Place of origin", "Shandong, China"],
        ["Brand name", "Irand"],
        ["Model number", "RFA027"],
      ] as const;

  return (
    <main className="shop-page product-page">
      <CatalogHeader />
      <div className="product-breadcrumb page-shell">
        <Link href="/">Home</Link><span>/</span><Link href="/ceremony-florals">Florals</Link><span>/</span><span>{product.name}</span>
      </div>

      <section className="product-layout page-shell product-layout--single-image">
        <div className="product-gallery product-gallery--single" aria-label={`${product.name} photo`}>
          <figure className="product-gallery-feature">
            <img src={product.image.src} alt={product.image.alt} />
          </figure>
        </div>

        <aside className="product-details">
          <p className="product-category">Ceremony · {product.shape}</p>
          <h1>{product.name}</h1>
          <div className="product-price-pair" aria-label="Product pricing">
            <span>{product.sellPriceLabel}</span>
            <span>{product.rentPriceLabel}</span>
          </div>
          <p className="product-description">
            A reusable silk faux-flower arch designed for wedding ceremonies, parties and statement event backdrops.
          </p>
          <p className="product-palette">Color · {product.color}<br />Palette · {product.palette}</p>
          <a className="shop-button shop-button--dark" href="#availability">Check availability <span aria-hidden="true">↓</span></a>

          <div className="product-includes product-key-attributes">
            <h2>Key attributes</h2>
            <SpecificationList items={productAttributes} />
          </div>
        </aside>
      </section>

      <section className="availability-section" id="availability">
        <div className="page-shell availability-inner">
          <div>
            <p className="shop-kicker">{product.name} availability</p>
            <h2>Tell us about your date.</h2>
            <p>We’ll confirm availability and help you choose between rental and purchase.</p>
          </div>
          <AvailabilityForm productName={product.name} />
        </div>
      </section>
      <CatalogFooter />
    </main>
  );
}
