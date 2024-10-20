import ChangeBlock from "@/app/(forms)/edit/[id]/components/blocks/change-block";
import { useSectionsContext } from "@/app/(forms)/edit/[id]/components/contexts/sections-context";
import EditBlockFactory from "@/components/forms/blocks/edit/edit-block-factory";
import PreviewBlockFactory from "@/components/forms/blocks/preview/preview-block-factory";
import { FormBlock } from "@/lib/types/forms";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

type Props = {
  block: FormBlock;
};

export default function EditBlock({ block }: Props) {
  const { focusedBlockId, setFocusedBlockId } = useSectionsContext();

  return (
    <motion.button
      layout
      className={cn(
        "flex w-full flex-col rounded-md border-1 border-zinc-200 bg-zinc-50 p-2 text-left",
        {
          "border-opacity-0 outline outline-2 -outline-offset-1 outline-slate-300":
            focusedBlockId === block.id,
        },
      )}
      onFocus={() => {
        setFocusedBlockId(block.id);
      }}
      // onBlur={() => {
      //   setFocusedBlockId(undefined);
      // }}
    >
      <motion.div layout="position">
        <ChangeBlock block={block} />
        {focusedBlockId === block.id && <EditBlockFactory block={block} />}
        {focusedBlockId !== block.id && <PreviewBlockFactory block={block} />}
      </motion.div>
    </motion.button>
  );
}
