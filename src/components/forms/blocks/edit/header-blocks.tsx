import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import { BlockVariantUnion, FormBlock } from "@/lib/types/forms";
import { produce } from "immer";
import { startTransition } from "react";

const QUESTION_PLACEHOLDER = "Untitled" as const;

export default function HeaderBlocks({
  blockDraft,
}: {
  blockDraft: FormBlock;
}) {
  const { setBlockDraft, setIsStale } = useBlockContext();

  return (
    <div className="text-lg font-medium tracking-tight">
      <textarea
        className="w-full bg-zinc-100 text-zinc-600 placeholder:text-zinc-300"
        placeholder={QUESTION_PLACEHOLDER}
        defaultValue={blockDraft.text}
        onChange={(e) => {
          startTransition(() => {
            setIsStale(true);
            setBlockDraft(
              produce(blockDraft as BlockVariantUnion, (draft) => {
                draft.text = e.target.value;
              }),
            );
          });
        }}
        onBlur={(e) => {
          e.stopPropagation();
        }}
        rows={4}
      />
    </div>
  );
}
