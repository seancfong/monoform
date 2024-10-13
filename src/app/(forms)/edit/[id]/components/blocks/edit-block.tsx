import BlockHeader from "@/app/(forms)/edit/[id]/components/blocks/variants/block-header";
import { BlockVariant } from "@/db/schema";
import { FormBlock } from "@/lib/types/forms";
import React from "react";

type Props = {
  block: FormBlock;
};

export default function EditBlock({ block }: Props) {
  switch (block.blockType) {
    case BlockVariant.HEADER:
      return <BlockHeader block={block} />;
  }

  return <div>EditBlock</div>;
}
