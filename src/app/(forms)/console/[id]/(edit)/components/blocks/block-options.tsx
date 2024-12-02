import { useBlockContext } from "@/app/(forms)/console/[id]/(edit)/components/contexts/block-context";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { produce } from "immer";
import React from "react";

type Props = {};

export default function BlockOptions({}: Props) {
  const { setIsStale, blockDraft, setBlockDraft } = useBlockContext();

  return (
    <motion.div
      layout="position"
      className="absolute -bottom-2 left-1/2 z-20 duration-500 animate-in fade-in-50 zoom-in-90"
    >
      <div className="relative">
        <div className="absolute z-20 -translate-x-1/2 rounded-sm bg-zinc-800 px-4 py-2 text-xs text-zinc-300 shadow-lg md:text-sm">
          <div className="flex items-center gap-2">
            <span
              className={cn("transition-colors duration-150 ease-in-out", {
                "text-zinc-50": blockDraft.required,
                "text-zinc-400": !blockDraft.required,
              })}
            >
              Required
            </span>
            <Switch
              className="scale-90 data-[state=checked]:bg-zinc-200 data-[state=unchecked]:bg-zinc-500"
              thumbClassName="bg-zinc-800"
              checked={blockDraft.required}
              onCheckedChange={(checked) => {
                setIsStale(true);
                setBlockDraft(
                  produce(blockDraft, (draft) => {
                    draft.required = checked;
                  }),
                );
              }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
}
