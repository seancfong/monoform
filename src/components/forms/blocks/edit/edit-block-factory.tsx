import EditBlockHeader from "@/components/forms/blocks/edit/variants/edit-block-header";
import EditBlockMultipleChoice from "@/components/forms/blocks/edit/variants/edit-block-multiple-choice";
import {
  FormBlock,
  isCheckboxBlock,
  isHeaderBlock,
  isMultipleChoiceBlock,
} from "@/lib/types/forms";

type Props = {
  block: FormBlock;
};

export default function EditBlockFactory({ block }: Props) {
  if (isMultipleChoiceBlock(block)) {
    return <EditBlockMultipleChoice block={block} />;
  } else if (isHeaderBlock(block)) {
    return <EditBlockHeader block={block} />;
  } else if (isCheckboxBlock(block)) {
    return <div>Checkbox</div>;
  }

  return <></>;
}
