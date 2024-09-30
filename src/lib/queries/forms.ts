import "server-only";

import { db } from "@/db";
import { forms, usersOwnWorkspaces, workspaceFolders } from "@/db/schema";
import { and, count, eq } from "drizzle-orm";

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
