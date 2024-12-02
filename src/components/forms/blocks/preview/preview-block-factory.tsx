import { useBlockContext } from "@/app/(forms)/console/[id]/@edit/components/contexts/block-context";
import PreviewBlockMultipleChoice from "@/components/forms/blocks/preview/variants/multiple-choice/preview-block-multiple-choice";
import PreviewBlockHeader from "@/components/forms/blocks/preview/variants/preview-block-header";
import { BlockVariant } from "@/db/schema";

export default function PreviewBlockFactory() {
  const { optimisticBlock } = useBlockContext();

  switch (optimisticBlock.blockType) {
    case BlockVariant.HEADER:
      return <PreviewBlockHeader block={optimisticBlock} />;
    case BlockVariant.MULTIPLE_CHOICE:
      return <PreviewBlockMultipleChoice block={optimisticBlock} />;
    case BlockVariant.CHECKBOX:
      return <PreviewBlockMultipleChoice block={optimisticBlock} />;
  }

  return <></>;
}
