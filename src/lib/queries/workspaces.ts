import "server-only";

import { db } from "@/db";
import {
  SelectUserOwnsWorkspaces,
  SelectWorkspaceFolders,
  SelectWorkspaces,
  users,
  usersOwnWorkspaces,
  workspaceFolders,
  workspaces,
} from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { User } from "lucia";

export type UserWorkspace = Pick<SelectWorkspaces, "id" | "title"> &
  Pick<SelectUserOwnsWorkspaces, "slug">;

export async function getUserWorkspaces(user: User): Promise<UserWorkspace[]> {
  return db
    .select({
      id: workspaces.id,
      title: workspaces.title,
      slug: usersOwnWorkspaces.slug,
    })
    .from(users)
    .innerJoin(usersOwnWorkspaces, eq(users.id, usersOwnWorkspaces.userId))
    .innerJoin(workspaces, eq(usersOwnWorkspaces.workspaceId, workspaces.id))
    .where(eq(users.id, user.id))
    .orderBy(asc(usersOwnWorkspaces.orderNum));
}

export type UserWorkspaceFolder = Pick<SelectWorkspaceFolders, "id" | "title">;

export async function getUserWorkspaceFolders(
  user: User,
  slug: string,
): Promise<UserWorkspaceFolder[]> {
  return db
    .select({
      id: workspaceFolders.id,
      title: workspaceFolders.title,
    })
    .from(users)
    .innerJoin(usersOwnWorkspaces, eq(users.id, user.id))
    .innerJoin(workspaces, eq(usersOwnWorkspaces.slug, slug))
    .innerJoin(
      workspaceFolders,
      eq(usersOwnWorkspaces.workspaceId, workspaceFolders.workspaceId),
    )
    .orderBy(asc(workspaceFolders.title));
}

export async function checkIfUserOwnsWorkspace(
  user: User,
  slug: string,
): Promise<boolean> {
  return db
    .select({ id: usersOwnWorkspaces.workspaceId })
    .from(users)
    .innerJoin(usersOwnWorkspaces, eq(users.id, user.id))
    .innerJoin(workspaces, eq(usersOwnWorkspaces.slug, slug))
    .limit(1)
    .then((rows) => rows.length > 0);
}
