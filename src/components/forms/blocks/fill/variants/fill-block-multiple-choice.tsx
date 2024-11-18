import PreviewBlockHeader from "@/components/forms/blocks/preview/variants/preview-block-header";
import { MultipleChoiceBlock } from "@/lib/types/forms";
import React from "react";

type Props = {
  block: MultipleChoiceBlock;
};

export default function FillBlockMultipleChoice({ block }: Props) {
  return (
    <div>
      <PreviewBlockHeader block={block} />
      {block.multipleChoiceOptions.map((option) => (
        <div key={option.id}>{option.text}</div>
      ))}
    </div>
  );
}
