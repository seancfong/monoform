import PreviewBlockHeader from "@/components/forms/blocks/preview/variants/preview-block-header";
import ResponseBlockMultipleChoice from "@/components/forms/blocks/response/variants/response-block-multiple-choice";
import { BlockVariant } from "@/db/schema";
import { FormBlock } from "@/lib/types/forms";
import {
  FormResponseBlock,
  MultipleChoiceResponseBlock,
} from "@/lib/types/responses";

type Props = {
  block: FormResponseBlock;
};

export default function ResponseBlockFactory({ block }: Props) {
  switch (block.blockType) {
    case BlockVariant.MULTIPLE_CHOICE: {
      return (
        <ResponseBlockMultipleChoice
          block={block as MultipleChoiceResponseBlock}
        />
      );
    }
    case BlockVariant.HEADER: {
      return <PreviewBlockHeader block={block as FormBlock} />;
    }
  }

  return <></>;
}
