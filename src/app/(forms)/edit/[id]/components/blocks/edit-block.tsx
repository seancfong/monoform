import ChangeBlock from "@/app/(forms)/edit/[id]/components/blocks/change-block";
import ChangeBlockPreview from "@/app/(forms)/edit/[id]/components/blocks/change-block-preview";
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
    <div
      className={cn("relative cursor-default", {
        "z-20 mb-4": focusedBlockId === optimisticBlock.id,
      })}
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
      <motion.div
        layout
        className={cn(
          "relative flex w-full flex-col overflow-hidden rounded-md border-1 border-zinc-200 bg-zinc-50 p-2 text-left",
          {
            "border-opacity-0 outline outline-2 -outline-offset-1 outline-slate-300":
              focusedBlockId === optimisticBlock.id,
          },
        )}
      >
        <motion.div layout="position" className="space-y-2">
          {focusedBlockId === optimisticBlock.id ? (
            <>
              <div className="flex w-full justify-between">
                <ChangeBlock />
              </div>
              <hr />
              <EditBlockFactory />
            </>
          ) : (
            <>
              <ChangeBlockPreview />
              <hr />
              <PreviewBlockFactory />
            </>
          )}
        </motion.div>
      </motion.div>
      {focusedBlockId === optimisticBlock.id && (
        <div className="absolute -bottom-2 left-1/2 z-20 duration-500 animate-in fade-in-50 zoom-in-90">
          <div className="relative">
            <div className="absolute z-20 -translate-x-1/2 rounded-sm bg-zinc-800 px-4 py-2 text-xs text-zinc-300 shadow-lg">
              Required
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
