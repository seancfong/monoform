"use client";

import { useFoldersContext } from "@/app/(workspace)/workspace/[slug]/components/contexts/folders-context";
import { Button } from "@/components/ui/button";
import { UserWorkspaceFolder } from "@/lib/queries/workspaces";
import { cn } from "@/lib/utils";
import { FolderClosed, FolderOpen, Plus } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  slug: string;
};

export default function SidebarFolders({ slug }: Props) {
  const { folders, addFolder } = useFoldersContext();

  return (
    <div className="mt-6 px-3">
      <div className="flex items-center justify-between px-3">
        <p className="pl-1 text-xs font-medium text-zinc-400">Folders</p>
        <Button
          variant="ghost"
          size="icon"
          className="size-fit p-1 hover:bg-zinc-200/50"
          onClick={() => {
            addFolder("Untitled Folder");
          }}
        >
          <Plus className="size-4 text-zinc-400" />
        </Button>
      </div>
      {folders?.map((folder) => (
        <FolderItem key={folder.id} folder={folder} slug={slug} />
      ))}
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
