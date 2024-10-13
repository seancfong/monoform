import { useSectionsContext } from "@/app/(forms)/edit/[id]/components/contexts/sections-context";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BlockVariant } from "@/db/schema";
import { FormSection } from "@/lib/types/forms";
import { ChevronsUpDown } from "lucide-react";
import { useState } from "react";

type Props = {
  section: FormSection;
};

const variantName: Record<BlockVariant, string> = {
  [BlockVariant.HEADER]: "Header",
  [BlockVariant.CHECKBOX]: "Checkbox",
  [BlockVariant.MULTIPLE_CHOICE]: "Multiple Choice",
};

export default function AddBlock({ section }: Props) {
  const { appendBlock } = useSectionsContext();
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" role="combobox" aria-expanded={open}>
          Add Block
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              {Object.values(BlockVariant).map((variant) => (
                <CommandItem
                  key={variant}
                  value={variant}
                  onSelect={() => {
                    appendBlock(section, variant);
                    setOpen(false);
                  }}
                >
                  {variantName[variant]}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
