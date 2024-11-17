import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BlockVariant } from "@/db/schema";
import { VariantIcon, variantName } from "@/lib/types/block-variants";
import { produce } from "immer";
import { ChevronDown } from "lucide-react";

type Props = {
  refocusBlock: () => void;
};

export default function ChangeBlock({}: Props) {
  const { blockDraft, setIsStale, setBlockDraft } = useBlockContext();

  return (
    <div className="border-zinc-200">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="gap-2"
            onBlur={(e) => {
              if (e.target.getAttribute("data-state") === "open") {
                e.stopPropagation();
              }
            }}
          >
            <span className="flex rounded-sm bg-slate-100 p-2">
              <VariantIcon variant={blockDraft.blockType} className="size-4" />
            </span>
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
                setIsStale(true);
                setBlockDraft(
                  produce(blockDraft, (draft) => {
                    draft.blockType = variant;
                  }),
                );
              }}
              className="gap-2"
            >
              <span className="flex rounded-sm bg-slate-100 p-2">
                <VariantIcon variant={variant} className="size-4" />
              </span>
              <span>{variantName[variant]}</span>
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
