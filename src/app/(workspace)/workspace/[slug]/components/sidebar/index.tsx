import SidebarItems from "@/app/(workspace)/workspace/[slug]/components/sidebar/sidebar-items";
import SidebarNavigation from "@/app/(workspace)/workspace/[slug]/components/sidebar/sidebar-navigation";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import { validateUser } from "@/lib/auth/validate-user";
import {
  getUserWorkspaceFolders,
  getUserWorkspaces,
  UserWorkspace,
} from "@/lib/queries/workspaces";
import { cn } from "@/lib/utils";
import { FolderClosed, Plus } from "lucide-react";
import { notFound } from "next/navigation";

type Props = {
  slug: string;
};

export async function Sidebar({ slug }: Props) {
  const { user } = await validateUser();

  const userWorkspaces = await getUserWorkspaces(user);

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

  const foldersPromise = getUserWorkspaceFolders(user, slug);

  return (
    <SidebarItems
      currentWorkspace={currentWorkspace}
      otherWorkspaces={otherWorkspaces}
      foldersPromise={foldersPromise}
    />
  );
}

type SidebarSkeletonProps = {
  overlay?: boolean;
  slug: string;
};

export function SidebarSkeleton({ overlay, slug }: SidebarSkeletonProps) {
  return (
    <div
      className={cn(
        "hidden min-h-screen min-w-80 border-r-1 border-r-zinc-200 bg-zinc-100 py-6 lg:block",
        { "absolute left-0 top-0 z-50 opacity-80": overlay },
      )}
    >
      <SelectWorkspaceSkeleton />
      <Separator className="my-3" />
      <SidebarNavigation slug={slug} />
      <SidebarFoldersSkeleton />
    </div>
  );
}

function SelectWorkspaceSkeleton() {
  return (
    <div className="flex items-center gap-3 px-6">
      <Skeleton className="size-10 bg-zinc-200/50" />
      <div className="space-y-2 text-left">
        <Skeleton className="h-4 w-32 bg-zinc-200/50" />
        <Skeleton className="h-2 w-32 bg-zinc-200/50" />
      </div>
    </div>
  );
}

function SidebarFoldersSkeleton() {
  return (
    <div className="mt-6 flex flex-col px-3">
      <div className="flex w-full items-center justify-between px-3 py-1">
        <p className="pl-1 text-xs font-medium text-zinc-400">Folders</p>
        <div className="size-fit p-1">
          <Plus className="size-4 text-zinc-400" />
        </div>
      </div>
      <div className="flex flex-col gap-1 gradient-mask-b-0">
        <SidebarFolderSkeletonItem />
        <SidebarFolderSkeletonItem />
        <SidebarFolderSkeletonItem />
        <SidebarFolderSkeletonItem />
      </div>
    </div>
  );
}

function SidebarFolderSkeletonItem() {
  return (
    <div className="flex items-center justify-start gap-3 px-4 py-3 text-zinc-400">
      <FolderClosed size="20" />
      <Skeleton className="h-4 w-32 bg-zinc-200/50" />
    </div>
  );
}
