import { BlockVariant } from "@/db/schema";
import { FormSection, MultipleChoiceBlock } from "@/lib/types/forms";
import { z } from "zod";

type MultipleChoiceOption =
  MultipleChoiceBlock["multipleChoiceOptions"][number];

const isNonEmptyStringArray = (
  value: unknown[],
): value is [string, ...string[]] => {
  if (!Array.isArray(value)) return false;

  if (value.length === 0) return false;

  return value.every((item) => typeof item === "string");
};

const generateZodSchema = (sections: FormSection[]) => {
  const schemaShape: Record<string, z.ZodSchema> = {};

  sections.map(({ blocks }) => {
    blocks.forEach(
      ({ id: blockId, blockType, required, multipleChoiceOptions }) => {
        let zodField: z.ZodSchema | undefined = undefined;

        switch (blockType) {
          case BlockVariant.MULTIPLE_CHOICE: {
            const optionIds: string[] =
              multipleChoiceOptions.map(
                (opt: MultipleChoiceOption) => opt.id,
              ) ?? [];

            if (isNonEmptyStringArray(optionIds)) {
              zodField = z.enum(optionIds, {
                required_error: "This field is required",
              });
            }

            break;
          }
          case BlockVariant.CHECKBOX: {
            const optionIds: string[] =
              multipleChoiceOptions.map(
                (opt: MultipleChoiceOption) => opt.id,
              ) ?? [];

            if (isNonEmptyStringArray(optionIds)) {
              zodField = z.array(z.enum(optionIds), {
                required_error: "This field is required",
              });
            }

            break;
          }
          default:
            break;
        }

        if (!zodField) {
          return;
        }

        schemaShape[blockId] = required ? zodField : zodField.optional();
      },
    );
  });

  return z.object(schemaShape);
};

export default generateZodSchema;
