import { useBlockContext } from "@/app/(forms)/console/[id]/(edit)/components/contexts/block-context";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function DeleteBlock() {
  const { deleteCurrentBlock } = useBlockContext();

  return (
    <Button
      size="icon"
      variant="ghost"
      onClick={(e) => {
        deleteCurrentBlock();
      }}
      onFocus={(e) => {
        e.stopPropagation();
      }}
    >
      <Trash2 className="size-4 text-zinc-400" />
    </Button>
  );
}
