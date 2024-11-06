import {
  BlockRef,
  useBlockContext,
} from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import { useSectionsContext } from "@/app/(forms)/edit/[id]/components/contexts/sections-context";
import mutateMultipleChoiceBlock from "@/lib/actions/forms/mutations/multiple-choice";
import { MultipleChoiceBlock } from "@/lib/types/forms";
import { motion } from "framer-motion";
import { produce } from "immer";
import {
  forwardRef,
  startTransition,
  useImperativeHandle,
  useState,
} from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  blockDraft: MultipleChoiceBlock;
};

const EditBlockMultipleChoice = forwardRef<BlockRef, Props>(
  ({ blockDraft }, ref) => {
    const { mutateBlock, formId } = useSectionsContext();

    useImperativeHandle(ref, () => ({
      invokeSave: (sectionIndex: number, blockIndex: number) => {
        console.log(blockDraft);
        mutateBlock(sectionIndex, blockIndex, blockDraft, async () => {
          await mutateMultipleChoiceBlock(formId, blockDraft);
        });
      },
    }));

    return (
      <div>
        <MultipleChoiceHeader blockDraft={blockDraft} />
        {blockDraft.description && (
          <p className="text-sm font-medium tracking-tight text-zinc-400">
            {blockDraft.description}
          </p>
        )}
        <motion.div layout className="flex max-w-80 flex-col pr-12">
          {blockDraft.multipleChoiceOptions.map((option) => (
            <MultipleChoiceOption key={option.id} option={option} />
          ))}
          <AddOption block={blockDraft} />
        </motion.div>
      </div>
    );
  },
);
EditBlockMultipleChoice.displayName = "EditBlockMultipleChoice";

const QUESTION_PLACEHOLDER = "Untitled Question" as const;

function MultipleChoiceHeader({
  blockDraft,
}: {
  blockDraft: MultipleChoiceBlock;
}) {
  const [isEditing, setIsEditing] = useState(false);

  const { setBlockDraft, setIsStale } = useBlockContext();

  return (
    <div className="text-lg font-medium tracking-tight">
      {isEditing ? (
        <input
          type="text"
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
          onBlur={() => {
            setIsEditing(false);
          }}
          autoFocus
        />
      ) : (
        <button onClick={() => setIsEditing(true)}>
          {blockDraft.text ? (
            <span className="text-zinc-600">{blockDraft.text}</span>
          ) : (
            <span className="text-zinc-300">{QUESTION_PLACEHOLDER}</span>
          )}
        </button>
      )}
    </div>
  );
}

function MultipleChoiceOption({
  option,
}: {
  option: MultipleChoiceBlock["multipleChoiceOptions"][number];
}) {
  const [isEditing, setIsEditing] = useState(false);

  return <motion.div layout>[] {option.text}</motion.div>;
}

function AddOption({ block }: { block: MultipleChoiceBlock }) {
  const [isEditing, setIsEditing] = useState(false);
  const { setBlockDraft, optimisticBlock, setIsStale } = useBlockContext();

  return (
    <div className="rounded-sm border-1 border-zinc-200 tracking-tight text-zinc-300">
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();

            setIsStale(true);

            const formData = new FormData(e.target as HTMLFormElement);
            const newOption = formData.get("new-option") as string;
            const newId = uuidv4();

            startTransition(() => {
              setBlockDraft(
                produce(block, (draft) => {
                  draft.multipleChoiceOptions.push({
                    id: newId,
                    text: newOption,
                    orderNum: draft.multipleChoiceOptions.length,
                    blockId: optimisticBlock.id,
                  });
                }),
              );
            });

            e.currentTarget.reset();
          }}
        >
          <input
            className="w-full rounded-sm text-zinc-600 placeholder:text-zinc-300"
            placeholder="Add Option"
            type="text"
            name="new-option"
            autoFocus
          />
        </form>
      ) : (
        <button onClick={() => setIsEditing(true)}>Add Option</button>
      )}
    </div>
  );
}

export default EditBlockMultipleChoice;
