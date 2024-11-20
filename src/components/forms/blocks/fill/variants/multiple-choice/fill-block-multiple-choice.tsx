import FillMultipleChoiceOptions from "@/components/forms/blocks/fill/variants/multiple-choice/fill-multiple-choice-options";
import OptionsLabel from "@/components/forms/blocks/preview/variants/multiple-choice/options-label";
import PreviewBlockHeader from "@/components/forms/blocks/preview/variants/preview-block-header";
import { MultipleChoiceBlock } from "@/lib/types/forms";
import { Control, FieldValues } from "react-hook-form";

type Props<T> = {
  block: MultipleChoiceBlock;
  control: Control<FieldValues, T>;
};

export default function FillBlockMultipleChoice<T>({
  block,
  control,
}: Props<T>) {
  return (
    <div className="space-y-2">
      <PreviewBlockHeader block={block} />
      <hr className="-mx-4 border-zinc-200" />
      <OptionsLabel block={block} />
      <div className="max-w-72">
        <FillMultipleChoiceOptions<T> block={block} control={control} />
      </div>
    </div>
  );
}
