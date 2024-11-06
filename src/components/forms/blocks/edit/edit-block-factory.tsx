import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import EditBlockHeader from "@/components/forms/blocks/edit/variants/edit-block-header";
import EditBlockMultipleChoice from "@/components/forms/blocks/edit/variants/edit-block-multiple-choice";
import {
  isCheckboxBlock,
  isHeaderBlock,
  isMultipleChoiceBlock,
} from "@/lib/types/forms";

export default function EditBlockFactory() {
  const { blockDraft, blockRef } = useBlockContext();

  if (isMultipleChoiceBlock(blockDraft)) {
    return <EditBlockMultipleChoice blockDraft={blockDraft} ref={blockRef} />;
  } else if (isHeaderBlock(blockDraft)) {
    return <EditBlockHeader block={blockDraft} />;
  } else if (isCheckboxBlock(blockDraft)) {
    return <div>Checkbox</div>;
  }

  return <></>;
}
