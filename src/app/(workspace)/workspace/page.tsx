import { validateUser } from "@/lib/auth/validate-user";
import { getUserWorkspaces } from "@/lib/queries/workspaces";
import { redirect } from "next/navigation";

type Props = {};

export default async function WorkspaceRedirect({}: Props) {
  const { user } = await validateUser();

  const [primaryWorkspace] = await getUserWorkspaces(user);

  if (primaryWorkspace) {
    return redirect(`/workspace/${primaryWorkspace.slug}`);
  }

  return <div>No workspace</div>;
}
