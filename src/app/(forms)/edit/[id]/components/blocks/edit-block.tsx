import BlockLayout from "@/app/(forms)/edit/[id]/components/blocks/block-layout";
import BlockHeader from "@/app/(forms)/edit/[id]/components/blocks/variants/block-header";
import BlockMultipleChoice from "@/app/(forms)/edit/[id]/components/blocks/variants/block-multiple-choice";
import { BlockVariant } from "@/db/schema";
import { FormBlock } from "@/lib/types/forms";
import React from "react";

type Props = {
  block: FormBlock;
};

function EditBlockFactory({ block }: Props) {
  switch (block.blockType) {
    case BlockVariant.HEADER:
      return <BlockHeader block={block} />;
    case BlockVariant.CHECKBOX:
      return <></>;
    case BlockVariant.MULTIPLE_CHOICE:
      return <BlockMultipleChoice block={block} />;
    default:
      return <></>;
  }
}

export default function EditBlock({ block }: Props) {
  return (
    <BlockLayout block={block}>
      <EditBlockFactory block={block} />
    </BlockLayout>
  );
}
