import BlockOptions from "@/app/(forms)/edit/[id]/components/blocks/block-options";
import ChangeBlock from "@/app/(forms)/edit/[id]/components/blocks/change-block";
import ChangeBlockPreview from "@/app/(forms)/edit/[id]/components/blocks/change-block-preview";
import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import { useSectionsContext } from "@/app/(forms)/edit/[id]/components/contexts/sections-context";
import EditBlockFactory from "@/components/forms/blocks/edit/edit-block-factory";
import PreviewBlockFactory from "@/components/forms/blocks/preview/preview-block-factory";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { useRef } from "react";

export default function EditBlock() {
  const { focusedBlockId, setFocusedBlockId } = useSectionsContext();
  const { optimisticBlock, saveCallback } = useBlockContext();

  const blockRef = useRef<HTMLDivElement>(null);

  const refocusBlock = () => {
    if (!blockRef.current) return;

    blockRef.current.focus();
  };

  return (
    <motion.div
      layout
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
      ref={blockRef}
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
                <ChangeBlock refocusBlock={refocusBlock} />
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
      {focusedBlockId === optimisticBlock.id && <BlockOptions />}
    </motion.div>
  );
}
