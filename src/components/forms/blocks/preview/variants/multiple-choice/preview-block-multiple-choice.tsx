import OptionsLabel from "@/components/forms/blocks/preview/variants/multiple-choice/options-label";
import PreviewBlockHeader from "@/components/forms/blocks/preview/variants/preview-block-header";
import { BlockVariant } from "@/db/schema";
import { MultipleChoiceBlock } from "@/lib/types/forms";
import { Circle, Square } from "lucide-react";

type Props = {
  block: MultipleChoiceBlock;
};

export default function PreviewBlockMultipleChoice({ block }: Props) {
  return (
    <div className="space-y-2">
      <PreviewBlockHeader block={block} />
      <OptionsLabel block={block} />
      <div className="relative flex max-w-80 flex-col space-y-2 pr-12">
        {block.multipleChoiceOptions.map((option) => (
          <div
            key={option.id}
            className="flex w-full items-center gap-2 rounded-md border-2 border-zinc-200/50 bg-zinc-50 px-4 py-2"
          >
            {block.blockType === BlockVariant.CHECKBOX && (
              <Square className="size-5 text-zinc-300" />
            )}
            {block.blockType === BlockVariant.MULTIPLE_CHOICE && (
              <Circle className="size-5 text-zinc-300" />
            )}
            {option.text}
          </div>
        ))}
      </div>
    </div>
  );
}
