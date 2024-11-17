import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import EditBlockHeader from "@/components/forms/blocks/edit/variants/header/edit-block-header";
import EditBlockMultipleChoice from "@/components/forms/blocks/edit/variants/multiple-choice/edit-block-multiple-choice";
import {
  isCheckboxBlock,
  isHeaderBlock,
  isMultipleChoiceBlock,
} from "@/lib/types/forms";

export default function EditBlockFactory() {
  const { blockDraft, mutationRef } = useBlockContext();

  if (isMultipleChoiceBlock(blockDraft)) {
    return (
      <EditBlockMultipleChoice blockDraft={blockDraft} ref={mutationRef} />
    );
  } else if (isHeaderBlock(blockDraft)) {
    return <EditBlockHeader blockDraft={blockDraft} ref={mutationRef} />;
  } else if (isCheckboxBlock(blockDraft)) {
    return (
      <EditBlockMultipleChoice blockDraft={blockDraft} ref={mutationRef} />
    );
  }

  return <></>;
}
