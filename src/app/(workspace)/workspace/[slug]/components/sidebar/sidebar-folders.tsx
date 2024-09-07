"use client";

import { useFoldersContext } from "@/app/(workspace)/workspace/[slug]/components/contexts/folders-context";
import AddFolderModal from "@/app/(workspace)/workspace/[slug]/components/sidebar/add-folder-modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { UserWorkspace, UserWorkspaceFolder } from "@/lib/queries/workspaces";
import { cn } from "@/lib/utils";
import { FolderClosed, FolderOpen, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  workspace: UserWorkspace;
};

export default function SidebarFolders({ workspace }: Props) {
  const { folders } = useFoldersContext();

  return (
    <div className="mt-6 px-3">
      <Dialog>
        <DialogTrigger asChild>
          <Button
            variant="ghost"
            className="group/add-folder flex size-fit w-full items-center justify-between px-3 py-1"
          >
            <p className="pl-1 text-xs font-medium text-zinc-400">Folders</p>
            <div className="size-fit rounded-sm p-1 transition-colors duration-150 group-hover/add-folder:bg-zinc-200/50">
              <Plus className="size-4 text-zinc-400" />
            </div>
          </Button>
        </DialogTrigger>
        <AddFolderModal workspace={workspace} />
      </Dialog>
      <div className="flex flex-col gap-1">
        {folders?.map((folder) => (
          <FolderItem key={folder.id} folder={folder} slug={workspace.slug} />
        ))}
      </div>
    </div>
  );
}

type FolderItemProps = {
  slug: string;
  folder: UserWorkspaceFolder;
};

function FolderItem({ slug, folder }: FolderItemProps) {
  const pathName = usePathname();
  const isActive = pathName === `/workspace/${slug}/folder/${folder.id}`;

  return (
    <Link
      className={cn(
        "flex items-center justify-start gap-3 rounded-md px-4 py-3 text-zinc-500",
        {
          "bg-zinc-200/50 text-zinc-800": isActive,
        },
      )}
      href={`/workspace/${slug}/folder/${folder.id}`}
    >
      <span>
        {isActive ? <FolderOpen size="20" /> : <FolderClosed size="20" />}
      </span>
      <span className="text-sm leading-tight">{folder.title}</span>
    </Link>
  );
}
