import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import PreviewBlockHeader from "@/components/forms/blocks/preview/variants/preview-block-header";
import PreviewBlockMultipleChoice from "@/components/forms/blocks/preview/variants/preview-block-multiple-choice";
import {
  isCheckboxBlock,
  isHeaderBlock,
  isMultipleChoiceBlock,
} from "@/lib/types/forms";

export default function PreviewBlockFactory() {
  const { block } = useBlockContext();

  if (isMultipleChoiceBlock(block)) {
    return <PreviewBlockMultipleChoice block={block} />;
  } else if (isHeaderBlock(block)) {
    return <PreviewBlockHeader block={block} />;
  } else if (isCheckboxBlock(block)) {
    return <div>Checkbox</div>;
  }

  return <></>;
}
