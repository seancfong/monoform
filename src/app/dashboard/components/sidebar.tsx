import { db } from "@/db";
import { userOwnsWorkspaces, users, workspaces } from "@/db/schema";
import { User } from "lucia";
import { eq } from "drizzle-orm";

type Props = {
  user: User;
};

export default async function Sidebar({ user }: Props) {
  // TODO: fetch workspace and its folders
  const ownedWorkspaces = await db
    .select()
    .from(users)
    .innerJoin(userOwnsWorkspaces, eq(users.id, userOwnsWorkspaces.userId))
    .innerJoin(workspaces, eq(userOwnsWorkspaces.workspaceId, workspaces.id))
    .where(eq(users.id, user.id));

  console.log("workspaceData", ownedWorkspaces);

  return <div className="">Sidebar</div>;
}
