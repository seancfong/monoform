import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import {
  variantBackground,
  VariantIcon,
  variantName,
} from "@/lib/types/block-variants";
import { cn } from "@/lib/utils";

type Props = {};

export default function ChangeBlockPreview({}: Props) {
  const { blockDraft } = useBlockContext();

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
