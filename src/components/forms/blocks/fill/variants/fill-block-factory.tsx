import FillBlockMultipleChoice from "@/components/forms/blocks/fill/variants/multiple-choice/fill-block-multiple-choice";
import PreviewBlockHeader from "@/components/forms/blocks/preview/variants/preview-block-header";
import {
  BlockVariantUnion,
  isCheckboxBlock,
  isHeaderBlock,
  isMultipleChoiceBlock,
} from "@/lib/types/forms";
import { Control, FieldValues } from "react-hook-form";

type Props<T> = {
  block: BlockVariantUnion;
  control: Control<FieldValues, T>;
};

export default function FillBlockFactory<T extends Record<string, unknown>>({
  block,
  control,
}: Props<T>) {
  if (isMultipleChoiceBlock(block)) {
    return <FillBlockMultipleChoice<T> block={block} control={control} />;
  } else if (isHeaderBlock(block)) {
    return <PreviewBlockHeader block={block} />;
  } else if (isCheckboxBlock(block)) {
    return <FillBlockMultipleChoice<T> block={block} control={control} />;
  }

  return <></>;
}
