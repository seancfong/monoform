import FillMultipleChoiceOptions from "@/components/forms/blocks/fill/variants/multiple-choice/fill-multiple-choice-options";
import OptionsLabel from "@/components/forms/blocks/preview/variants/multiple-choice/options-label";
import PreviewBlockHeader from "@/components/forms/blocks/preview/variants/preview-block-header";
import { BlockVariant } from "@/db/schema";
import { MultipleChoiceBlock } from "@/lib/types/forms";
import { Circle, Square } from "lucide-react";
import React from "react";

type Props = {
  block: MultipleChoiceBlock;
};

export default function FillBlockMultipleChoice({ block }: Props) {
  return (
    <div className="space-y-2">
      <PreviewBlockHeader block={block} />
      <hr className="-mx-4 border-zinc-200" />
      <OptionsLabel block={block} />
      <div className="max-w-72">
        <FillMultipleChoiceOptions block={block} />
      </div>
    </div>
  );
}
