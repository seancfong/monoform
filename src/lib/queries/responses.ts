import "server-only";

import { db } from "@/db";
import { sections } from "@/db/schema";
import { eq } from "drizzle-orm";

export async function getFormResponsesSummary(formId: string) {
  return await db.query.sections.findMany({
    where: eq(sections.formId, formId),
    columns: { id: true, title: true },
    with: {
      blocks: {
        with: {
          // for multiple choice
          multipleChoiceOptions: {
            with: {
              multipleChoiceBlockResponses: {
                columns: {
                  responseId: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

export type FormResponseSummary = Awaited<
  ReturnType<typeof getFormResponsesSummary>
>;
