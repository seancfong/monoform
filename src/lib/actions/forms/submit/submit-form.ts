"use server";

import { db } from "@/db";
import { forms, responses } from "@/db/schema";
import generateZodSchema from "@/lib/utils/generate-schema";
import { eq } from "drizzle-orm";

export default async function submitForm(
  formId: string,
  formData: Record<string, any>,
) {
  console.log("submitting", formData);

  const existingForm = await db.query.forms.findFirst({
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

  if (!existingForm) {
    return;
  }

  const formSchema = generateZodSchema(existingForm.sections);

  const parsed = await formSchema.safeParseAsync(formData);

  if (!parsed.success) {
    // TODO: return error on server
    return;
  }

  const [{ id: responseId }] = await db
    .insert(responses)
    .values({
      formId,
      submittedAt: new Date(),
    })
    .returning({
      id: responses.id,
    });
}
