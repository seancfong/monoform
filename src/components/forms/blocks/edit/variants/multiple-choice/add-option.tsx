import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import { MultipleChoiceBlock } from "@/lib/types/forms";
import { motion } from "framer-motion";
import { produce } from "immer";
import { forwardRef, startTransition, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type Props = {
  block: MultipleChoiceBlock;
};

const AddOption = forwardRef<HTMLButtonElement, Props>(
  ({ block }: Props, ref) => {
    const { setBlockDraft, optimisticBlock, setIsStale } = useBlockContext();

    return (
      <motion.button
        layout
        ref={ref}
        className="ml-5 rounded-md border-1 border-zinc-200 bg-zinc-50 px-4 py-2 text-left tracking-tight text-zinc-300"
        onClick={() => {
          const newId = uuidv4();
          setIsStale(true);

          startTransition(() => {
            setBlockDraft(
              produce(block, (draft) => {
                draft.multipleChoiceOptions.push({
                  id: newId,
                  text: "",
                  orderNum: draft.multipleChoiceOptions.length,
                  blockId: optimisticBlock.id,
                });
              }),
            );
          });
        }}
      >
        Add Option
      </motion.button>
    );
  },
);
AddOption.displayName = "AddOption";

export default AddOption;
