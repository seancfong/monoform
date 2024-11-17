import { BlockVariant } from "@/db/schema";
import { Type } from "lucide-react";

export const variantName: Record<BlockVariant, string> = {
  [BlockVariant.HEADER]: "Header",
  [BlockVariant.CHECKBOX]: "Checkbox",
  [BlockVariant.MULTIPLE_CHOICE]: "Multiple Choice",
};

export const variantIcon: Record<BlockVariant, React.ReactNode> = {
  [BlockVariant.HEADER]: <Type />,
  [BlockVariant.CHECKBOX]: <Type />,
  [BlockVariant.MULTIPLE_CHOICE]: <Type />,
};
