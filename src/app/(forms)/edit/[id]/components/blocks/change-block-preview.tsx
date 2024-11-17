import { useBlockContext } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import { variantIcon, variantName } from "@/lib/types/blockVariants";
import React from "react";

type Props = {};

export default function ChangeBlockPreview({}: Props) {
  const { blockDraft } = useBlockContext();

  return (
    <div className="flex gap-2 py-2 pl-4">
      <p>{variantIcon[blockDraft.blockType]}</p>
      <p>{variantName[blockDraft.blockType]}</p>
    </div>
  );
}
