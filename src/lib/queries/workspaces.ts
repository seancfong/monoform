import "server-only";

import { db } from "@/db";
import {
  SelectUserOwnsWorkspaces,
  SelectWorkspaceFolders,
  SelectWorkspaces,
  usersOwnWorkspaces,
  workspaceFolders,
  workspaces,
} from "@/db/schema";
import { and, asc, count, eq } from "drizzle-orm";
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

export async function checkIfUserOwnsWorkspaceFolder(
  user: User,
  folderId: string,
): Promise<boolean> {
  return db
    .select({ id: usersOwnWorkspaces.workspaceId })
    .from(usersOwnWorkspaces)
    .innerJoin(
      workspaceFolders,
      eq(usersOwnWorkspaces.workspaceId, workspaceFolders.workspaceId),
    )
    .where(
      and(
        eq(usersOwnWorkspaces.userId, user.id),
        eq(workspaceFolders.id, folderId),
      ),
    )
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

type UserWorkspaceWithFolders = UserWorkspace & {
  folders: UserWorkspaceFolder[];
};

export async function getUserWorkspacesAndFolders(
  user: User,
): Promise<UserWorkspaceWithFolders[]> {
  const rows = await db
    .select({
      id: workspaces.id,
      title: workspaces.title,
      slug: usersOwnWorkspaces.slug,
      folders: {
        id: workspaceFolders.id,
        title: workspaceFolders.title,
      },
    })
    .from(usersOwnWorkspaces)
    .innerJoin(workspaces, eq(usersOwnWorkspaces.workspaceId, workspaces.id))
    .leftJoin(
      workspaceFolders,
      eq(usersOwnWorkspaces.workspaceId, workspaceFolders.workspaceId),
    )
    .where(eq(usersOwnWorkspaces.userId, user.id))
    .orderBy(asc(usersOwnWorkspaces.orderNum));

  const workspaceMap = new Map<number, UserWorkspaceWithFolders>();

  rows.forEach((row) => {
    if (!workspaceMap.has(row.id)) {
      workspaceMap.set(row.id, {
        id: row.id,
        title: row.title,
        slug: row.slug,
        folders: [],
      });
    }

    if (row.folders) {
      workspaceMap.get(row.id)!.folders.push(row.folders);
    }
  });

  return Array.from(workspaceMap.values());
}

export async function getWorkspaceIdByFolderId(
  folderId: string,
): Promise<number> {
  return db
    .select({ id: usersOwnWorkspaces.workspaceId })
    .from(usersOwnWorkspaces)
    .innerJoin(
      workspaceFolders,
      eq(usersOwnWorkspaces.workspaceId, workspaceFolders.workspaceId),
    )
    .where(eq(workspaceFolders.id, folderId))
    .limit(1)
    .then((rows) => rows?.[0].id);
}
