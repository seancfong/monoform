"use server";

import { db } from "@/db";
import { workspaceFolders } from "@/db/schema";
import { validateUser } from "@/lib/auth/validate-user";
import {
  checkIfUserOwnsWorkspace,
  getWorkspaceFolderCount,
  UserWorkspace,
} from "@/lib/queries/workspaces";
import { revalidatePath } from "next/cache";

const MAX_FOLDERS_QTY = 5;

export default async function createFolder(
  folderId: string,
  title: string,
  workspace: UserWorkspace,
) {
  const { user } = await validateUser();

  const [userOwnsWorkspace, workspaceFoldersCount] = await Promise.all([
    checkIfUserOwnsWorkspace(user, workspace.slug),
    getWorkspaceFolderCount(user, workspace.slug),
  ]);

  if (!userOwnsWorkspace) {
    return;
  }

  if (workspaceFoldersCount >= MAX_FOLDERS_QTY) {
    return;
  }

  await db.insert(workspaceFolders).values({
    id: folderId,
    title,
    workspaceId: workspace.id,
  });

  revalidatePath("/workspace/[slug]", "layout");
}
