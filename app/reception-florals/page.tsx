import type { Metadata } from "next";
import { PlaceholderSampleCatalog } from "../PlaceholderSampleCatalog";
import { placeholderCollections } from "@/lib/sourcing/placeholder-collections";

export const metadata: Metadata = {
  title: "Reception Floral Samples | Jan Day Studio",
  description: "Preview the reception floral categories Jan Day Studio plans to source next.",
};

export default function ReceptionFloralsPage() {
  return <PlaceholderSampleCatalog collection={placeholderCollections.reception} />;
}
