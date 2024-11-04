import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import EditBlockHeader from "@/components/forms/blocks/edit/variants/edit-block-header";
import EditBlockMultipleChoice from "@/components/forms/blocks/edit/variants/edit-block-multiple-choice";
import {
  isCheckboxBlock,
  isHeaderBlock,
  isMultipleChoiceBlock,
} from "@/lib/types/forms";

export default function EditBlockFactory() {
  const { block } = useBlockContext();

  if (isMultipleChoiceBlock(block)) {
    return <EditBlockMultipleChoice block={block} />;
  } else if (isHeaderBlock(block)) {
    return <EditBlockHeader block={block} />;
  } else if (isCheckboxBlock(block)) {
    return <div>Checkbox</div>;
  }

  return <></>;
}
