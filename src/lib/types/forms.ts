import { SelectBlocks, SelectSections } from "@/db/schema";

export type FormSection = Pick<SelectSections, "id" | "title" | "orderNum"> & {
  blocks: FormBlock[];
};

export type FormBlock = Pick<
  SelectBlocks,
  "id" | "text" | "blockType" | "description" | "required" | "orderNum"
>;
