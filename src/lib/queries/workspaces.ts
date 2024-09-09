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
import { asc, and, eq, count } from "drizzle-orm";
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
    .from(usersOwnWorkspaces)
    .innerJoin(workspaces, eq(usersOwnWorkspaces.workspaceId, workspaces.id))
    .where(eq(usersOwnWorkspaces.userId, user.id))
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
    .from(usersOwnWorkspaces)
    .innerJoin(
      workspaceFolders,
      eq(usersOwnWorkspaces.workspaceId, workspaceFolders.workspaceId),
    )
    .where(
      and(
        eq(usersOwnWorkspaces.userId, user.id),
        eq(usersOwnWorkspaces.slug, slug),
      ),
    )
    .orderBy(asc(workspaceFolders.createdAt));
}

export async function checkIfUserOwnsWorkspace(
  user: User,
  slug: string,
): Promise<boolean> {
  return db
    .select({ id: usersOwnWorkspaces.workspaceId })
    .from(usersOwnWorkspaces)
    .innerJoin(workspaces, eq(usersOwnWorkspaces.slug, slug))
    .where(eq(usersOwnWorkspaces.userId, user.id))
    .limit(1)
    .then((rows) => rows.length > 0);
}

export async function getWorkspaceFolderCount(
  user: User,
  slug: string,
): Promise<number> {
  return db
    .select({ count: count() })
    .from(usersOwnWorkspaces)
    .innerJoin(
      workspaceFolders,
      eq(usersOwnWorkspaces.workspaceId, workspaceFolders.workspaceId),
    )
    .where(
      and(
        eq(usersOwnWorkspaces.userId, user.id),
        eq(usersOwnWorkspaces.slug, slug),
      ),
    )
    .then((rows) => rows[0].count);
}
