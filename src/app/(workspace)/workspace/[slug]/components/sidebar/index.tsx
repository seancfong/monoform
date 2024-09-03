import SidebarItems from "@/app/(workspace)/workspace/[slug]/components/sidebar/SidebarItems";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { validateUser } from "@/lib/auth/validate-user";
import {
  getUserWorkspaceFolders,
  getUserWorkspaces,
  UserWorkspace,
} from "@/lib/queries/workspaces";
import { cn } from "@/lib/utils";
import { notFound } from "next/navigation";

type Props = {
  slug: string;
};

export async function Sidebar({ slug }: Props) {
  const { user } = await validateUser();

  const [userWorkspaces, folders] = await Promise.all([
    getUserWorkspaces(user),
    getUserWorkspaceFolders(user, slug),
  ]);

  const { currentWorkspace, otherWorkspaces } = userWorkspaces.reduce<{
    currentWorkspace: UserWorkspace | null;
    otherWorkspaces: UserWorkspace[];
  }>(
    (acc, workspace) => {
      if (workspace.slug === slug) {
        acc.currentWorkspace = workspace;
      } else {
        acc.otherWorkspaces.push(workspace);
      }
      return acc;
    },
    {
      currentWorkspace: null,
      otherWorkspaces: [],
    },
  );

  if (!currentWorkspace) {
    notFound();
  }

  return (
    <>
      <SidebarItems
        currentWorkspace={currentWorkspace}
        otherWorkspaces={otherWorkspaces}
        folders={folders}
        slug={slug}
      />
      {/* <SidebarSkeleton overlay /> */}
    </>
  );
}

export function SidebarSkeleton({ overlay }: { overlay?: boolean }) {
  return (
    <div
      className={cn(
        "hidden min-h-screen w-80 border-r-1 border-r-zinc-200 bg-zinc-100 py-6 lg:block",
        { "absolute left-0 top-0 z-50 opacity-80": overlay },
      )}
    >
      <SelectWorkspaceSkeleton />
      <Separator className="my-3" />
      <div className="space-y-2 px-6">
        <NavigationSkeleton />
        <NavigationSkeleton />
      </div>
    </div>
  );
}

function SelectWorkspaceSkeleton() {
  return (
    <div className="flex items-center gap-3 px-6">
      <Skeleton className="size-10 bg-zinc-200" />
      <div className="space-y-2 text-left">
        <Skeleton className="h-4 w-32 bg-zinc-200" />
        <Skeleton className="h-2 w-32 bg-zinc-200" />
      </div>
    </div>
  );
}

function NavigationSkeleton() {
  return (
    <div className="flex items-center gap-2 py-2">
      <Skeleton className="size-8 bg-zinc-200" />
      <Skeleton className="h-4 w-20 bg-zinc-200" />
    </div>
  );
}
