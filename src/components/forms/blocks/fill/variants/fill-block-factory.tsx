import FillBlockMultipleChoice from "@/components/forms/blocks/fill/variants/multiple-choice/fill-block-multiple-choice";
import PreviewBlockHeader from "@/components/forms/blocks/preview/variants/preview-block-header";
import { BlockVariant } from "@/db/schema";
import { BlockVariantUnion } from "@/lib/types/forms";
import { Control, FieldValues } from "react-hook-form";

type Props<T> = {
  block: BlockVariantUnion;
  control: Control<FieldValues, T>;
};

export default function FillBlockFactory<T extends Record<string, unknown>>({
  block,
  control,
}: Props<T>) {
  switch (block.blockType) {
    case BlockVariant.MULTIPLE_CHOICE:
      return <FillBlockMultipleChoice block={block} control={control} />;
    case BlockVariant.HEADER:
      return <PreviewBlockHeader block={block} />;
    case BlockVariant.CHECKBOX:
      return <FillBlockMultipleChoice block={block} control={control} />;
  }

  return <></>;
}
