import { MutationRef } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import { useSectionsContext } from "@/app/(forms)/edit/[id]/components/contexts/sections-context";
import { FormBlock } from "@/lib/types/forms";
import React, { forwardRef, useImperativeHandle } from "react";

type Props = {
  blockDraft: FormBlock;
};

const EditBlockHeader = forwardRef<MutationRef, Props>(
  ({ blockDraft }, ref) => {
    // const {  } = useSectionsContext();

    // useImperativeHandle(ref, () => ({
    //   invokeSave: (sectionIndex: number, blockIndex: number) => {
    //     mutateBlock(sectionIndex, blockIndex, blockDraft, async () => {
    //       await mutateMultipleChoiceBlock(formId, blockDraft);
    //     });
    //   },
    // }));

    return <div>BlockHeader</div>;
  },
);
EditBlockHeader.displayName = "EditBlockHeader";

export default EditBlockHeader;
