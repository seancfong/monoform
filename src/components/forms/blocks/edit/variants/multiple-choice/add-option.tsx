import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import { MultipleChoiceBlock } from "@/lib/types/forms";
import { motion } from "framer-motion";
import { produce } from "immer";
import { Plus } from "lucide-react";
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
        className="ml-5 flex items-center gap-2 rounded-md bg-zinc-50 px-4 py-2 text-left tracking-tight text-zinc-300 outline-dashed outline-2 -outline-offset-2 outline-zinc-200 transition-colors duration-150 hover:outline hover:outline-1 hover:-outline-offset-1"
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
        <Plus className="size-5" />
        Add Option
      </motion.button>
    );
  },
);
AddOption.displayName = "AddOption";

export default AddOption;
