import { UserWorkspaceFolder } from "@/lib/queries/workspaces";
import React from "react";

type Props = {
  folders: UserWorkspaceFolder[];
};

export default function SidebarFolders({ folders }: Props) {
  return (
    <div className="mt-6">
      <div className="px-7">
        <p className="text-xs font-medium text-zinc-400">Folders</p>
      </div>
    </div>
  );
}
