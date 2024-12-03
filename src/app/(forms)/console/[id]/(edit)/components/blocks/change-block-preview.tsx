import { useBlockContext } from "@/app/(forms)/console/[id]/(edit)/components/contexts/block-context";
import {
  variantBackground,
  VariantIcon,
  variantName,
} from "@/lib/types/block-variants";
import { FormBlock } from "@/lib/types/forms";
import { cn } from "@/lib/utils";

type Props = {
  blockDraft: FormBlock;
};

export default function ChangeBlockPreview({ blockDraft }: Props) {
  return (
    <div className="flex items-center gap-2 py-2 pl-4">
      <span
        className={cn(
          "flex rounded-sm p-2",
          variantBackground[blockDraft.blockType],
        )}
      >
        <VariantIcon variant={blockDraft.blockType} className="size-4" />
      </span>
      <p>{variantName[blockDraft.blockType]}</p>
    </div>
  );
}
