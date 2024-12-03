import "server-only";

import { db } from "@/db";
import { multipleChoiceOptions, sections } from "@/db/schema";
import { asc, eq } from "drizzle-orm";

export async function getFormResponsesSummary(formId: string) {
  return await db.query.sections.findMany({
    where: eq(sections.formId, formId),
    columns: { id: true, title: true },
    with: {
      blocks: {
        orderBy: asc(sections.orderNum),
        with: {
          // for multiple choice
          multipleChoiceOptions: {
            orderBy: asc(multipleChoiceOptions.orderNum),
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
