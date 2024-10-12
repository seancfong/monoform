import "server-only";

import { db } from "@/db";
import {
  blocks,
  forms,
  sections,
  SelectForms,
  SelectSections,
  SelectWorkspaceFolders,
  usersOwnWorkspaces,
  workspaceFolders,
} from "@/db/schema";
import { and, asc, count, eq } from "drizzle-orm";
import { FormSection } from "@/lib/types/forms";

export async function getWorkspaceFormsCount(
  workspaceId: number,
): Promise<number> {
  return db
    .select({ count: count() })
    .from(usersOwnWorkspaces)
    .innerJoin(
      workspaceFolders,
      eq(usersOwnWorkspaces.workspaceId, workspaceFolders.workspaceId),
    )
    .innerJoin(forms, eq(workspaceFolders.id, forms.workspaceFolderId))
    .where(and(eq(usersOwnWorkspaces.workspaceId, workspaceId)))
    .then((rows) => rows[0].count);
}

export async function getFormWithWorkspaceFolder(formId: string): Promise<{
  form: SelectForms;
  workspaceFolder: SelectWorkspaceFolders;
}> {
  return db
    .select({
      form: forms,
      workspaceFolder: workspaceFolders,
    })
    .from(forms)
    .innerJoin(
      workspaceFolders,
      eq(forms.workspaceFolderId, workspaceFolders.id),
    )
    .where(and(eq(forms.id, formId)))
    .limit(1)
    .then((rows) => rows[0]);
}

export async function getFormSections(formId: string): Promise<FormSection[]> {
  return db.query.sections.findMany({
    columns: {
      id: true,
      title: true,
      orderNum: true,
    },
    where: eq(sections.formId, formId),
    orderBy: asc(sections.orderNum),
    with: {
      blocks: {
        columns: {
          id: true,
          text: true,
          blockType: true,
          description: true,
          orderNum: true,
          required: true,
        },
        orderBy: asc(blocks.orderNum),
      },
    },
  });
}
