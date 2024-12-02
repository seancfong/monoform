import { useSectionsContext } from "@/app/(forms)/edit/[id]/components/contexts/sections-context";
import { Button } from "@/components/ui/button";
import { FormSection } from "@/lib/types/forms";
import { cn } from "@/lib/utils";
import { DragControls } from "framer-motion";
import { GripHorizontal } from "lucide-react";
import { set } from "zod";

type Props = {
  block: FormSection["blocks"][number];
  controls: DragControls;
};

export default function ReorderBlock({ block, controls }: Props) {
  const { setReorderingBlockId, reorderingBlockId } = useSectionsContext();

  return (
    <Button
      tabIndex={-1}
      size="icon"
      variant="ghost"
      className={cn(
        "absolute left-1/2 top-2 hidden size-8 -translate-x-1/2 cursor-grab active:cursor-grabbing sm:flex",
        { "bg-zinc-100": block.id === reorderingBlockId },
      )}
      onPointerDown={(e) => {
        e.stopPropagation();
        controls.start(e);
        setReorderingBlockId(block.id);
      }}
      style={{
        touchAction: "none",
      }}
      onFocus={(e) => e.stopPropagation()}
    >
      <GripHorizontal className="size-5 text-zinc-400" />
    </Button>
  );
}
