import {
  SelectBlocks,
  SelectMultipleChoiceOptions,
  SelectSections,
} from "@/db/schema";

export type FormBlock = SelectBlocks;

/* TypeScript assertation functions for blocks will limit the scope to
 * certain fields, depending on the block.
 *
 * Example:
 *  isMultipleChoiceBlock(block): block is MultipleChoiceBlock
 *    > This asserts that the block is a MultipleChoiceBlock and can
 *    > access the multipleChoiceOptions field.
 */

// GENERIC VARIANTS
// These blocks do not require additional options and can be typed as FormBlock.
export const isHeaderBlock = (block: FormBlock): block is FormBlock => {
  return block.blockType === "HEADER";
};

// MULTIPLE CHOICE VARIANTS
type MultipleChoiceOptions = {
  multipleChoiceOptions: SelectMultipleChoiceOptions[];
};

export type MultipleChoiceBlock = FormBlock & MultipleChoiceOptions;

export const isMultipleChoiceBlock = (
  block: FormBlock,
): block is MultipleChoiceBlock => {
  return block.blockType === "MULTIPLE_CHOICE";
};

export const isCheckboxBlock = (
  block: FormBlock,
): block is MultipleChoiceBlock => {
  return block.blockType === "CHECKBOX";
};

// Combine all variants into one type to match DB fetch.
export type BlockVariantUnion = FormBlock & MultipleChoiceOptions;

export type FormSection = Omit<SelectSections, "formId"> & {
  blocks: BlockVariantUnion[];
};
