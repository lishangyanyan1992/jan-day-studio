import type { Metadata } from "next";
import { PlaceholderSampleCatalog } from "../PlaceholderSampleCatalog";
import { placeholderCollections } from "@/lib/sourcing/placeholder-collections";

export const metadata: Metadata = {
  title: "Loose Stems & DIY Samples | Jan Day Studio",
  description: "Preview the loose stem bundles and DIY floral kits Jan Day Studio plans to source next.",
};

export default function LooseStemsDiyPage() {
  return <PlaceholderSampleCatalog collection={placeholderCollections.diy} />;
}
