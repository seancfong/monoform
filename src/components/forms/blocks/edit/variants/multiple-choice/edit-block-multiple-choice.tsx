import {
  MutationRef,
  useBlockContext,
} from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import HeaderBlocks from "@/components/forms/blocks/edit/header-blocks";
import AddOption from "@/components/forms/blocks/edit/variants/multiple-choice/add-option";
import MultipleChoiceOption from "@/components/forms/blocks/edit/variants/multiple-choice/multiple-choice-option";
import mutateMultipleChoiceBlock from "@/lib/actions/forms/mutations/blocks/multiple-choice";
import { MultipleChoiceBlock } from "@/lib/types/forms";
import { motion, Reorder } from "framer-motion";
import { produce } from "immer";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

type Props = {
  // Can be either radio or checkbox
  blockDraft: MultipleChoiceBlock;
};

const EditBlockMultipleChoice = forwardRef<MutationRef, Props>(
  ({ blockDraft }, ref) => {
    const { setBlockDraft, setIsStale } = useBlockContext();
    const [draggingId, setDraggingId] = useState<string | undefined>(undefined);

    useImperativeHandle(ref, () => ({
      invokeSave: async (formId: string) => {
        await mutateMultipleChoiceBlock(formId, blockDraft);
      },
    }));

    const optionRefs = useRef<HTMLButtonElement[]>([]);
    const addButtonRef = useRef<HTMLButtonElement>(null);
    const constraintRef = useRef<HTMLDivElement>(null);

    // Reassign inputRefs whenever the options change
    useEffect(() => {
      optionRefs.current = optionRefs.current.slice(
        0,
        blockDraft.multipleChoiceOptions.length,
      );
    }, [blockDraft.multipleChoiceOptions]);

    const deleteOption = useCallback(
      (index: number) => {
        setIsStale(true);
        setBlockDraft(
          produce(blockDraft, (draft) => {
            draft.multipleChoiceOptions.splice(index, 1);
          }),
        );

        const indexToFocus =
          index < blockDraft.multipleChoiceOptions.length - 1
            ? index + 1
            : index - 1;

        if (optionRefs.current[indexToFocus]) {
          optionRefs.current[indexToFocus].focus();
        } else if (addButtonRef.current) {
          addButtonRef.current.focus();
        }
      },
      [blockDraft, setBlockDraft, setIsStale],
    );

    return (
      <div
        onPointerUp={() => {
          setDraggingId(undefined);
        }}
        className="space-y-4"
      >
        <HeaderBlocks blockDraft={blockDraft} />
        <motion.div layout className="flex max-w-80 flex-col pr-12">
          <Reorder.Group
            axis="y"
            values={blockDraft.multipleChoiceOptions}
            onReorder={(newOrder) => {
              setIsStale(true);

              setBlockDraft(
                produce(blockDraft, (draft) => {
                  draft.multipleChoiceOptions = newOrder;
                }),
              );
            }}
            className="-ml-1 mb-2 space-y-2"
            ref={constraintRef}
          >
            {blockDraft.multipleChoiceOptions.map((option, index) => (
              <MultipleChoiceOption
                key={option.id}
                index={index}
                option={option}
                draggingId={draggingId}
                setDraggingId={setDraggingId}
                deleteOption={() => deleteOption(index)}
                ref={(el) => {
                  if (el) {
                    optionRefs.current[index] = el;
                  }
                }}
                constraintRef={constraintRef}
                blockDraft={blockDraft}
              />
            ))}
          </Reorder.Group>
          <AddOption block={blockDraft} ref={addButtonRef} />
        </motion.div>
      </div>
    );
  },
);
EditBlockMultipleChoice.displayName = "EditBlockMultipleChoice";

export default EditBlockMultipleChoice;
