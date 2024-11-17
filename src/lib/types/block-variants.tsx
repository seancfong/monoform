import { BlockVariant } from "@/db/schema";
import { CircleCheckBig, SquareCheckBig, Type } from "lucide-react";

export const variantName: Record<BlockVariant, string> = {
  [BlockVariant.HEADER]: "Header",
  [BlockVariant.CHECKBOX]: "Checkbox",
  [BlockVariant.MULTIPLE_CHOICE]: "Multiple Choice",
};

export const VariantIcon = ({
  variant,
  className,
}: {
  variant: BlockVariant;
  className?: string;
}): JSX.Element => {
  switch (variant) {
    case BlockVariant.HEADER:
      return <Type className={className} />;
    case BlockVariant.CHECKBOX:
      return <SquareCheckBig className={className} />;
    case BlockVariant.MULTIPLE_CHOICE:
      return <CircleCheckBig className={className} />;
  }
};

export const variantBackground = {
  [BlockVariant.HEADER]: "bg-slate-100",
  [BlockVariant.CHECKBOX]: "bg-zinc-100",
  [BlockVariant.MULTIPLE_CHOICE]: "bg-zinc-100",
};
