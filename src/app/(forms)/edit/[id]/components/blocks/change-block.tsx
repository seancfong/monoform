import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import { useSectionsContext } from "@/app/(forms)/edit/[id]/components/contexts/sections-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BlockVariant } from "@/db/schema";
import { variantIcon, variantName } from "@/lib/types/blockVariants";
import { produce } from "immer";
import { ChevronDown } from "lucide-react";

type Props = {};

export default function ChangeBlock({}: Props) {
  const { blockDraft, optimisticBlock, setBlockDraft } = useBlockContext();
  const { focusedBlockId } = useSectionsContext();

  return (
    <div className="border-zinc-200">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="gap-2">
            <span>{variantIcon[blockDraft.blockType]}</span>
            <span className="text-sm font-normal">
              {variantName[blockDraft.blockType]}
            </span>
            <span>
              <ChevronDown className="size-4 text-zinc-300" />
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56"
          onBlur={(e) => {
            e.stopPropagation();
          }}
          align="start"
        >
          {Object.values(BlockVariant).map((variant) => (
            <DropdownMenuCheckboxItem
              key={variant}
              checked={variant === blockDraft.blockType}
              onCheckedChange={() => {
                setBlockDraft(
                  produce(blockDraft, (draft) => {
                    draft.blockType = variant;
                  }),
                );
              }}
            >
              <span>{variantIcon[variant]}</span>
              <span>{variantName[variant]}</span>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
