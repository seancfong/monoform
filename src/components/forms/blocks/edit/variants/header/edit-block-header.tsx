import { MutationRef } from "@/app/(forms)/console/[id]/(edit)/components/contexts/block-context";
import HeaderBlocks from "@/components/forms/blocks/edit/header-blocks";
import mutateHeaderBlock from "@/lib/actions/forms/mutations/blocks/header";
import { FormBlock } from "@/lib/types/forms";
import { forwardRef, useImperativeHandle } from "react";

type Props = {
  blockDraft: FormBlock;
  refocusBlock: () => void;
};

const EditBlockHeader = forwardRef<MutationRef, Props>(
  ({ blockDraft, refocusBlock }, ref) => {
    useImperativeHandle(ref, () => ({
      invokeSave: async (formId: string) => {
        await mutateHeaderBlock(formId, blockDraft);
      },
    }));

    return (
      <div>
        <HeaderBlocks blockDraft={blockDraft} refocusBlock={refocusBlock} />
      </div>
    );
  },
);
EditBlockHeader.displayName = "EditBlockHeader";

export default EditBlockHeader;
