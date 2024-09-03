import SidebarItems from "@/app/(workspace)/workspace/[slug]/components/sidebar/SidebarItems";
import { validateUser } from "@/lib/auth/validate-user";
import {
  getUserWorkspaceFolders,
  getUserWorkspaces,
} from "@/lib/queries/workspaces";

type Props = {
  slug: string;
};

export async function Sidebar({ slug }: Props) {
  const { user } = await validateUser();

  const [userWorkspaces, folders] = await Promise.all([
    getUserWorkspaces(user),
    getUserWorkspaceFolders(user, slug),
  ]);

  console.log({ userWorkspaces, folders });

  return <SidebarItems />;
}

export function SidebarSkeleton() {
  return (
    <div className="hidden min-h-screen min-w-80 bg-zinc-100 lg:block">
      SidebarSkeleton
    </div>
  );
}
