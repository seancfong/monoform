import { validateUser } from "@/lib/auth/validate-user";
import { getUserWorkspaces } from "@/lib/queries/workspaces";
import { redirect } from "next/navigation";

export async function GET() {
  const { user } = await validateUser();

  const [primaryWorkspace] = await getUserWorkspaces(user);

  if (primaryWorkspace) {
    return redirect(`/workspace/${primaryWorkspace.slug}`);
  }

  return redirect("/create-workspace");
}
