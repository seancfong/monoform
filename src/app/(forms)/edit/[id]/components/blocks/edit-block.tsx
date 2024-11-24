import BlockOptions from "@/app/(forms)/edit/[id]/components/blocks/block-options";
import ChangeBlock from "@/app/(forms)/edit/[id]/components/blocks/change-block";
import ChangeBlockPreview from "@/app/(forms)/edit/[id]/components/blocks/change-block-preview";
import DeleteBlock from "@/app/(forms)/edit/[id]/components/blocks/delete-block";
import ReorderBlock from "@/app/(forms)/edit/[id]/components/blocks/reorder-block";
import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import { useSectionsContext } from "@/app/(forms)/edit/[id]/components/contexts/sections-context";
import EditBlockFactory from "@/components/forms/blocks/edit/edit-block-factory";
import PreviewBlockFactory from "@/components/forms/blocks/preview/preview-block-factory";
import { cn } from "@/lib/utils";
import { DragControls, motion } from "framer-motion";
import { useRef } from "react";

type Props = {
  controls: DragControls;
};

export default function EditBlock({ controls }: Props) {
  const { focusedBlockId, setFocusedBlockId, reorderingBlockId } =
    useSectionsContext();
  const { optimisticBlock, saveCallback } = useBlockContext();

  const blockRef = useRef<HTMLDivElement>(null);

  const refocusBlock = () => {
    if (!blockRef.current) return;

    blockRef.current.focus();
  };

  return (
    <motion.div
      layout
      className="relative cursor-default"
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
          "relative flex w-full flex-col overflow-hidden rounded-md border-1 border-zinc-200 bg-zinc-50 p-2 pb-4 text-left duration-300 [transition:opacity_200ms,box-shadow_200ms] md:pb-8",
          {
            "border-opacity-0 outline outline-2 -outline-offset-1 outline-slate-300":
              focusedBlockId === optimisticBlock.id,
            "cursor-grabbing shadow-lg shadow-zinc-400/25":
              reorderingBlockId === optimisticBlock.id,
            "opacity-50":
              reorderingBlockId !== undefined &&
              reorderingBlockId !== optimisticBlock.id,
          },
        )}
      >
        <motion.div layout="position" className="space-y-1">
          {focusedBlockId === optimisticBlock.id ? (
            <>
              <div className="flex w-full justify-between">
                <ChangeBlock refocusBlock={refocusBlock} />
              </div>
              <hr />
              <EditBlockFactory refocusBlock={refocusBlock} />
            </>
          ) : (
            <>
              <div className="relative flex w-full items-center justify-between">
                <ChangeBlockPreview />
                <ReorderBlock controls={controls} block={optimisticBlock} />
                <DeleteBlock />
              </div>
              <hr />
              <div className="px-2 pt-4 md:px-6">
                <PreviewBlockFactory />
              </div>
            </>
          )}
        </motion.div>
      </motion.div>
      {focusedBlockId === optimisticBlock.id && <BlockOptions />}
    </motion.div>
  );
}
