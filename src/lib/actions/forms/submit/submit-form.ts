"use server";

import { db } from "@/db";
import * as schema from "@/db/schema";
import {
  BlockVariant,
  forms,
  InsertMultipleChoiceResponses,
  multipleChoiceResponses,
  responses,
} from "@/db/schema";
import { FormSection } from "@/lib/types/forms";
import generateZodSchema from "@/lib/utils/generate-schema";
import { Pool } from "@neondatabase/serverless";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/neon-serverless";

export default async function submitForm(
  formId: string,
  formData: Record<string, any>,
) {
  console.log("submitting", formData);

  const existingForm = await fetchExistingForm(formId);

  if (!existingForm) {
    return;
  }

  const formSchema = generateZodSchema(existingForm.sections);
  const parsed = await formSchema.safeParseAsync(formData);

  if (!parsed.success) {
    return; // TODO: return error on server
  }

  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const dbPool = drizzle(pool, { schema: schema });

  try {
    await dbPool.transaction(async (tx) => {
      const responseId = await insertFormResponse(tx, formId);
      const { multipleChoice, checkbox } = processFormData(
        existingForm.sections,
        formData,
        responseId,
      );

      await saveResponses(tx, multipleChoice, checkbox);
    });
  } finally {
    await pool.end();
  }
}

async function fetchExistingForm(formId: string) {
  return await db.query.forms.findFirst({
    where: eq(forms.id, formId),
    with: {
      sections: {
        with: {
          blocks: {
            with: {
              multipleChoiceOptions: true,
            },
          },
        },
      },
    },
  });
}

async function insertFormResponse(tx: any, formId: string): Promise<number> {
  const [{ id: responseId }] = await tx
    .insert(responses)
    .values({ formId, submittedAt: new Date() })
    .returning({ id: responses.id });
  return responseId;
}

function processFormData(
  sections: FormSection[],
  formData: Record<string, any>,
  responseId: number,
) {
  const multipleChoice: InsertMultipleChoiceResponses[] = [];
  const checkbox: InsertMultipleChoiceResponses[] = [];

  sections.forEach((section) =>
    section.blocks.forEach((block) => {
      if (!(block.id in formData)) return;

      switch (block.blockType) {
        case BlockVariant.MULTIPLE_CHOICE:
          const selectedOptionId: string | undefined = formData[block.id];

          if (selectedOptionId) {
            multipleChoice.push({ responseId, selectedOptionId });
          }
          break;

        case BlockVariant.CHECKBOX:
          const selectedOptionIds: string[] | undefined = formData[block.id];

          if (selectedOptionIds) {
            selectedOptionIds.forEach((selectedOptionId) =>
              checkbox.push({ responseId, selectedOptionId }),
            );
          }
          break;

        default:
          break;
      }
    }),
  );

  return { multipleChoice, checkbox };
}

async function saveResponses(
  tx: any,
  multipleChoice: InsertMultipleChoiceResponses[],
  checkbox: InsertMultipleChoiceResponses[],
) {
  await Promise.all([
    multipleChoice.length > 0 &&
      tx.insert(multipleChoiceResponses).values(multipleChoice),
    checkbox.length > 0 && tx.insert(multipleChoiceResponses).values(checkbox),
  ]);
}
