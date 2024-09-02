import { db } from "@/db";
import {
  SelectUserOwnsWorkspaces,
  SelectWorkspaces,
  users,
  usersOwnWorkspaces,
  workspaces,
} from "@/db/schema";
import { asc, eq } from "drizzle-orm";
import { User } from "lucia";

export type UserWorkspaces = Pick<SelectWorkspaces, "id" | "title"> &
  Pick<SelectUserOwnsWorkspaces, "slug">;

export async function getUserWorkspaces(user: User): Promise<UserWorkspaces[]> {
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
