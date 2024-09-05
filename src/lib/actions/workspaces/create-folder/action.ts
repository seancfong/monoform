"use server";

import { db } from "@/db";
import { workspaceFolders } from "@/db/schema";
import { validateUser } from "@/lib/auth/validate-user";
import { revalidatePath } from "next/cache";

export default async function createFolder(
  folderId: string,
  title: string,
  workspaceId: number,
) {
  await validateUser();

  await db.insert(workspaceFolders).values({
    id: folderId,
    title,
    workspaceId,
  });

  revalidatePath("/workspace/[slug]", "layout");
}
