import type { Metadata } from "next";
import { PlaceholderSampleCatalog } from "../PlaceholderSampleCatalog";
import { placeholderCollections } from "@/lib/sourcing/placeholder-collections";

export const metadata: Metadata = {
  title: "Statement Floral Samples | Jan Day Studio",
  description: "Preview the large-scale statement floral categories Jan Day Studio plans to source next.",
};

export default function StatementFloralsPage() {
  return <PlaceholderSampleCatalog collection={placeholderCollections.statement} />;
}
