import { db } from "@/db";
import { userOwnsWorkspaces, users, workspaces } from "@/db/schema";
import { User } from "lucia";
import { eq } from "drizzle-orm";

export async function getWorkspaces(user: User): Promise<any> {
  return db
    .select({
      id: workspaces.id,
      title: workspaces.title,
    })
    .from(users)
    .innerJoin(userOwnsWorkspaces, eq(users.id, userOwnsWorkspaces.userId))
    .innerJoin(workspaces, eq(userOwnsWorkspaces.workspaceId, workspaces.id))
    .where(eq(users.id, user.id));
}
