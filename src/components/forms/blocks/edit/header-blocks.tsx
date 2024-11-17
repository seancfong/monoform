import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import { MultipleChoiceBlock } from "@/lib/types/forms";
import { produce } from "immer";
import { startTransition } from "react";

const QUESTION_PLACEHOLDER = "Untitled Question" as const;

export default function HeaderBlocks({
  blockDraft,
}: {
  blockDraft: MultipleChoiceBlock;
}) {
  const { setBlockDraft, setIsStale } = useBlockContext();

  return (
    <div className="text-lg font-medium tracking-tight">
      <textarea
        className="w-full bg-zinc-100 text-zinc-600 placeholder:text-zinc-300"
        placeholder={QUESTION_PLACEHOLDER}
        value={blockDraft.text}
        onChange={(e) => {
          startTransition(() => {
            setIsStale(true);
            setBlockDraft(
              produce(blockDraft, (draft) => {
                draft.text = e.target.value;
              }),
            );
          });
        }}
        rows={7}
      />
    </div>
  );
}
