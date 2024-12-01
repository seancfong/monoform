import "server-only";

import { db } from "@/db";
import {
  blocks,
  forms,
  multipleChoiceOptions,
  sections,
  SelectForms,
  SelectWorkspaceFolders,
  usersOwnWorkspaces,
  workspaceFolders,
} from "@/db/schema";
import { FormSection } from "@/lib/types/forms";
import { and, asc, count, eq, sql } from "drizzle-orm";
import { cache } from "react";

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

export async function getFormWithWorkspaceFolder(
  formId: string,
  userId: string,
): Promise<
  | {
      form: SelectForms;
      workspace: {
        title: string;
        slug: string;
      };
      folders: SelectWorkspaceFolders[];
    }
  | undefined
> {
  const rows = await db.query.usersOwnWorkspaces.findFirst({
    columns: {
      slug: true,
    },
    where: eq(usersOwnWorkspaces.userId, userId),
    with: {
      workspace: {
        columns: {
          title: true,
        },
        with: {
          folders: {
            with: {
              forms: {
                where: eq(workspaceFolders.id, formId),
              },
            },
          },
        },
      },
    },
  });

  if (!rows) {
    return undefined;
  }

  const slug = rows.slug;
  const folders = rows.workspace.folders;
  const workspaceTitle = rows.workspace.title;

  const [form] = folders.reduce(
    (acc, folder) => [...acc, ...folder.forms],
    [] as SelectForms[],
  );

  if (!form || !slug || !folders.length) {
    return undefined;
  }

  return {
    form,
    workspace: {
      title: workspaceTitle,
      slug,
    },
    folders,
  };
}

export async function getFormSections(formId: string): Promise<FormSection[]> {
  return await db.query.sections.findMany({
    columns: {
      formId: false,
    },
    where: eq(sections.formId, formId),
    orderBy: asc(sections.orderNum),
    with: {
      blocks: {
        orderBy: asc(blocks.orderNum),
        with: {
          multipleChoiceOptions: {
            orderBy: asc(multipleChoiceOptions.orderNum),
          },
        },
      },
    },
  });
}

export const getFormInformation = cache(async (formId: string) => {
  return db.query.forms.findFirst({
    where: eq(forms.id, formId),
  });
});

export const userOwnsSection = db
  .select({ sectionId: sections.id })
  .from(usersOwnWorkspaces)
  .innerJoin(
    workspaceFolders,
    eq(usersOwnWorkspaces.workspaceId, workspaceFolders.workspaceId),
  )
  .innerJoin(forms, eq(workspaceFolders.id, forms.workspaceFolderId))
  .innerJoin(sections, eq(forms.id, sections.formId))
  .where(
    and(
      eq(usersOwnWorkspaces.userId, sql.placeholder("userId")),
      eq(forms.id, sql.placeholder("formId")),
      eq(sections.id, sql.placeholder("sectionId")),
    ),
  )
  .limit(1)
  .prepare("userOwnsSection");

export const userOwnsForm = db
  .select({ formId: forms.id })
  .from(usersOwnWorkspaces)
  .innerJoin(
    workspaceFolders,
    eq(usersOwnWorkspaces.workspaceId, workspaceFolders.workspaceId),
  )
  .innerJoin(forms, eq(workspaceFolders.id, forms.workspaceFolderId))
  .where(
    and(
      eq(usersOwnWorkspaces.userId, sql.placeholder("userId")),
      eq(forms.id, sql.placeholder("formId")),
    ),
  )
  .limit(1)
  .prepare("userOwnsForm");
