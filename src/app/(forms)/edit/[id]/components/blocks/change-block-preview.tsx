import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import { VariantIcon, variantName } from "@/lib/types/block-variants";

type Props = {};

export default function ChangeBlockPreview({}: Props) {
  const { blockDraft } = useBlockContext();

  return (
    <div className="flex items-center gap-2 py-2 pl-4">
      <span className="flex rounded-sm bg-slate-100 p-2">
        <VariantIcon variant={blockDraft.blockType} className="size-4" />
      </span>
      <p>{variantName[blockDraft.blockType]}</p>
    </div>
  );
}
