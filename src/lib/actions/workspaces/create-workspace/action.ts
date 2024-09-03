"use server";

import { db } from "@/db";
import { usersOwnWorkspaces, workspaces } from "@/db/schema";
import {
  createWorkspaceFormSchema,
  CreateWorkspaceFormState,
} from "@/lib/actions/workspaces/create-workspace/schema";
import { validateUser } from "@/lib/auth/validate-user";
import { and, count, eq, max } from "drizzle-orm";
import { redirect } from "next/navigation";

const MAX_WORKSPACES_QTY = 2;

export default async function createWorkspace(
  _: CreateWorkspaceFormState,
  formData: FormData,
): Promise<CreateWorkspaceFormState> {
  const parsed = createWorkspaceFormSchema.safeParse({
    slug: formData.get("slug"),
    title: formData.get("title"),
  });

  if (!parsed.success) {
    return {
      error: "Invalid title or URL path",
    };
  }

  const { slug, title } = parsed.data;

  const { user } = await validateUser();

  // TODO: optimize this flow :nerd:
  const [[existingWorkspaceSlug], [{ maxOrderNum, workspacesCount }]] =
    await Promise.all([
      db
        .select()
        .from(usersOwnWorkspaces)
        .where(
          and(
            eq(usersOwnWorkspaces.userId, user.id),
            eq(usersOwnWorkspaces.slug, slug),
          ),
        )
        .limit(1),
      db
        .select({
          maxOrderNum: max(usersOwnWorkspaces.orderNum),
          workspacesCount: count(),
        })
        .from(usersOwnWorkspaces)
        .where(eq(usersOwnWorkspaces.userId, user.id)),
    ]);

  if (existingWorkspaceSlug) {
    return {
      error: "Workspace URL already exists",
    };
  }

  if (workspacesCount >= MAX_WORKSPACES_QTY) {
    return {
      error: `Maximum workspaces quantity reached (${MAX_WORKSPACES_QTY})`,
    };
  }

  try {
    const [{ insertedId }] = await db
      .insert(workspaces)
      .values({ title })
      .returning({ insertedId: workspaces.id });

    await db.insert(usersOwnWorkspaces).values({
      userId: user.id,
      slug,
      workspaceId: insertedId,
      orderNum: (maxOrderNum ?? 0) + 1,
    });
  } catch (error) {
    return {
      error: "Failed to create workspace",
    };
  }

  redirect(`/workspace/${slug}`);
}
