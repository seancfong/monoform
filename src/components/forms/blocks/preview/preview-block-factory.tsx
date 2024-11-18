import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import PreviewBlockHeader from "@/components/forms/blocks/preview/variants/preview-block-header";
import PreviewBlockMultipleChoice from "@/components/forms/blocks/preview/variants/preview-block-multiple-choice";
import {
  isCheckboxBlock,
  isHeaderBlock,
  isMultipleChoiceBlock,
} from "@/lib/types/forms";

export default function PreviewBlockFactory() {
  const { optimisticBlock } = useBlockContext();

  if (isMultipleChoiceBlock(optimisticBlock)) {
    return <PreviewBlockMultipleChoice block={optimisticBlock} />;
  } else if (isHeaderBlock(optimisticBlock)) {
    return <PreviewBlockHeader block={optimisticBlock} />;
  } else if (isCheckboxBlock(optimisticBlock)) {
    return <PreviewBlockMultipleChoice block={optimisticBlock} />;
  }

  return <></>;
}
