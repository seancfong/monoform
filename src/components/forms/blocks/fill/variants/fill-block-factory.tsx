import FillBlockMultipleChoice from "@/components/forms/blocks/fill/variants/multiple-choice/fill-block-multiple-choice";
import PreviewBlockHeader from "@/components/forms/blocks/preview/variants/preview-block-header";
import {
  BlockVariantUnion,
  isCheckboxBlock,
  isHeaderBlock,
  isMultipleChoiceBlock,
} from "@/lib/types/forms";

type Props = {
  block: BlockVariantUnion;
};

export default function FillBlockFactory({ block }: Props) {
  if (isMultipleChoiceBlock(block)) {
    return <FillBlockMultipleChoice block={block} />;
  } else if (isHeaderBlock(block)) {
    return <PreviewBlockHeader block={block} />;
  } else if (isCheckboxBlock(block)) {
    return <FillBlockMultipleChoice block={block} />;
  }

  return <></>;
}
