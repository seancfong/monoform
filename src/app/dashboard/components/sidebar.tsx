import { db } from "@/db";
import { userOwnsWorkspaces, users, workspaces } from "@/db/schema";
import { validateRequest } from "@/lib/auth/validate-user";
import { eq } from "drizzle-orm";
import { redirect } from "next/navigation";

type Props = {};

export default async function Sidebar({}: Props) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

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
