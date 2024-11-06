import { db } from "@/db";
import {
  blocks,
  forms,
  sections,
  usersOwnWorkspaces,
  workspaceFolders,
} from "@/db/schema";
import { and, eq, sql } from "drizzle-orm";

export const userOwnsBlock = db
  .select({ blockId: blocks.id })
  .from(usersOwnWorkspaces)
  .innerJoin(
    workspaceFolders,
    eq(usersOwnWorkspaces.workspaceId, workspaceFolders.workspaceId),
  )
  .innerJoin(forms, eq(workspaceFolders.id, forms.workspaceFolderId))
  .innerJoin(sections, eq(forms.id, sections.formId))
  .innerJoin(blocks, eq(sections.id, blocks.sectionId))
  .where(
    and(
      eq(usersOwnWorkspaces.userId, sql.placeholder("userId")),
      eq(forms.id, sql.placeholder("formId")),
      eq(blocks.id, sql.placeholder("blockId")),
    ),
  )
  .limit(1)
  .prepare("userOwnsBlock");
