import type { Metadata } from "next";
import { PlaceholderSampleCatalog } from "../PlaceholderSampleCatalog";
import { placeholderCollections } from "@/lib/sourcing/placeholder-collections";

export const metadata: Metadata = {
  title: "Personal Flowers | Jan Day Studio",
  description: "Preview the personal faux-flower categories coming soon to Jan Day Studio.",
};

export default function PersonalFlowersPage() {
  return <PlaceholderSampleCatalog collection={placeholderCollections.personal} />;
}
