import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import { MultipleChoiceBlock } from "@/lib/types/forms";
import { produce } from "immer";
import { startTransition } from "react";

const QUESTION_PLACEHOLDER = "Untitled Question" as const;

export default function MultipleChoiceHeader({
  blockDraft,
}: {
  blockDraft: MultipleChoiceBlock;
}) {
  const { setBlockDraft, setIsStale } = useBlockContext();

  return (
    <div className="text-lg font-medium tracking-tight">
      <textarea
        className="w-full bg-transparent text-zinc-600 placeholder:text-zinc-300"
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
      />
    </div>
  );
}
