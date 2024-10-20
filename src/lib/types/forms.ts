import {
  SelectBlocks,
  SelectMultipleChoiceOptions,
  SelectSections,
} from "@/db/schema";

export type FormBlock = SelectBlocks;

export type BlockVariantUnion = MultipleChoiceBlock;

export type FormSection = Omit<SelectSections, "formId"> & {
  blocks: BlockVariantUnion[];
};

export const isHeaderBlock = (block: FormBlock): block is FormBlock => {
  return block.blockType === "HEADER";
};

export const isCheckboxBlock = (block: FormBlock): block is FormBlock => {
  return block.blockType === "CHECKBOX";
};

export type MultipleChoiceBlock = FormBlock & {
  multipleChoiceOptions: Omit<SelectMultipleChoiceOptions, "blockId">[];
};

export const isMultipleChoiceBlock = (
  block: FormBlock,
): block is MultipleChoiceBlock => {
  return block.blockType === "MULTIPLE_CHOICE";
};
