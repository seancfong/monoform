import PreviewBlockHeader from "@/components/forms/blocks/preview/variants/preview-block-header";
import PreviewBlockMultipleChoice from "@/components/forms/blocks/preview/variants/preview-block-multiple-choice";
import {
  FormBlock,
  isCheckboxBlock,
  isHeaderBlock,
  isMultipleChoiceBlock,
} from "@/lib/types/forms";
import React from "react";

type Props = {
  block: FormBlock;
};

export default function PreviewBlockFactory({ block }: Props) {
  if (isMultipleChoiceBlock(block)) {
    return <PreviewBlockMultipleChoice block={block} />;
  } else if (isHeaderBlock(block)) {
    return <PreviewBlockHeader block={block} />;
  } else if (isCheckboxBlock(block)) {
    return <div>Checkbox</div>;
  }

  return <></>;
}
