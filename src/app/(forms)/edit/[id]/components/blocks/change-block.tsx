import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { BlockVariant } from "@/db/schema";
import {
  variantBackground,
  VariantIcon,
  variantName,
} from "@/lib/types/block-variants";
import { BlockVariantUnion } from "@/lib/types/forms";
import { cn } from "@/lib/utils";
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
            <span
              className={cn(
                "flex rounded-sm p-2",
                variantBackground[blockDraft.blockType],
              )}
            >
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
          <VariantDropdownItem
            variant={BlockVariant.HEADER}
            setIsStale={setIsStale}
            setBlockDraft={setBlockDraft}
            blockDraft={blockDraft}
          />
          <DropdownMenuSeparator />
          <VariantDropdownItem
            variant={BlockVariant.MULTIPLE_CHOICE}
            setIsStale={setIsStale}
            setBlockDraft={setBlockDraft}
            blockDraft={blockDraft}
          />
          <VariantDropdownItem
            variant={BlockVariant.CHECKBOX}
            setIsStale={setIsStale}
            setBlockDraft={setBlockDraft}
            blockDraft={blockDraft}
          />
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

type VariantDropdownItemProps = {
  variant: BlockVariant;
  setIsStale: React.Dispatch<React.SetStateAction<boolean>>;
  setBlockDraft: React.Dispatch<React.SetStateAction<BlockVariantUnion>>;
  blockDraft: BlockVariantUnion;
};

function VariantDropdownItem({
  variant,
  setIsStale,
  setBlockDraft,
  blockDraft,
}: VariantDropdownItemProps) {
  return (
    <DropdownMenuCheckboxItem
      checked={variant === blockDraft.blockType}
      onCheckedChange={() => {
        setIsStale(true);
        setBlockDraft(
          produce(blockDraft, (draft) => {
            draft.blockType = variant;
          }),
        );
      }}
      className="group/item cursor-pointer gap-2 focus:bg-transparent"
    >
      <span
        className={cn(
          "flex rounded-sm p-2 group-hover/item:outline group-hover/item:outline-1 group-hover/item:outline-zinc-200",
          variantBackground[variant],
        )}
      >
        <VariantIcon variant={variant} className="size-4" />
      </span>
      <span>{variantName[variant]}</span>
    </DropdownMenuCheckboxItem>
  );
}
