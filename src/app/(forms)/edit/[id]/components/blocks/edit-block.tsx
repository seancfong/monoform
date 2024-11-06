import ChangeBlock from "@/app/(forms)/edit/[id]/components/blocks/change-block";
import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import { useSectionsContext } from "@/app/(forms)/edit/[id]/components/contexts/sections-context";
import EditBlockFactory from "@/components/forms/blocks/edit/edit-block-factory";
import PreviewBlockFactory from "@/components/forms/blocks/preview/preview-block-factory";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function EditBlock() {
  const { focusedBlockId, setFocusedBlockId } = useSectionsContext();
  const { optimisticBlock, saveCallback } = useBlockContext();

  return (
    <motion.div
      layout
      className={cn(
        "relative cursor-default rounded-md border-1 border-zinc-200 bg-zinc-50",
        {
          "z-20 mb-4 border-opacity-0 outline outline-2 -outline-offset-1 outline-slate-300":
            focusedBlockId === optimisticBlock.id,
        },
      )}
      onFocus={() => {
        setFocusedBlockId(optimisticBlock.id);
      }}
      onBlur={async (event) => {
        if (event.currentTarget.contains(event.relatedTarget)) return;

        await saveCallback();
      }}
      tabIndex={0}
      role="button"
    >
      <div className="flex w-full flex-col overflow-hidden p-2 text-left">
        <motion.div layout="position" className="relative z-10">
          <ChangeBlock />
          {focusedBlockId === optimisticBlock.id && <EditBlockFactory />}
          {focusedBlockId !== optimisticBlock.id && <PreviewBlockFactory />}
        </motion.div>
      </div>
      {focusedBlockId === optimisticBlock.id && (
        <div className="absolute -bottom-2 left-1/2 duration-500 animate-in fade-in-50 zoom-in-90">
          <div className="relative">
            <div className="absolute -translate-x-1/2 rounded-sm bg-zinc-800 px-4 py-2 text-xs text-zinc-300 shadow-lg">
              Required
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}
