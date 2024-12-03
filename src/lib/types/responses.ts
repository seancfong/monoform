import { FormResponseSummary } from "@/lib/queries/responses";
import { FormBlock } from "@/lib/types/forms";

export type FormResponseBlock = FormResponseSummary[number]["blocks"][number];

export const isHeaderResponseBlock = (block: FormBlock): block is FormBlock => {
  return block.blockType === "HEADER";
};

export type MultipleChoiceResponseBlock = FormBlock & {
  multipleChoiceOptions: FormResponseBlock["multipleChoiceOptions"];
};

export const isMultipleChoiceBlock = (
  block: FormBlock,
): block is MultipleChoiceResponseBlock => {
  return block.blockType === "MULTIPLE_CHOICE";
};

export const isCheckboxBlock = (
  block: FormBlock,
): block is MultipleChoiceResponseBlock => {
  return block.blockType === "CHECKBOX";
};
