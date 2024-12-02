import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import EditBlockHeader from "@/components/forms/blocks/edit/variants/header/edit-block-header";
import EditBlockMultipleChoice from "@/components/forms/blocks/edit/variants/multiple-choice/edit-block-multiple-choice";
import { BlockVariant } from "@/db/schema";
import {
  isCheckboxBlock,
  isHeaderBlock,
  isMultipleChoiceBlock,
} from "@/lib/types/forms";

type Props = {
  refocusBlock: () => void;
};

export default function EditBlockFactory({ refocusBlock }: Props) {
  const { blockDraft, mutationRef } = useBlockContext();

  switch (blockDraft.blockType) {
    case BlockVariant.HEADER:
      return (
        <EditBlockHeader
          blockDraft={blockDraft}
          refocusBlock={refocusBlock}
          ref={mutationRef}
        />
      );
    case BlockVariant.MULTIPLE_CHOICE:
      return (
        <EditBlockMultipleChoice
          blockDraft={blockDraft}
          refocusBlock={refocusBlock}
          ref={mutationRef}
        />
      );
    case BlockVariant.CHECKBOX:
      return (
        <EditBlockMultipleChoice
          blockDraft={blockDraft}
          refocusBlock={refocusBlock}
          ref={mutationRef}
        />
      );
  }

  return <></>;
}
