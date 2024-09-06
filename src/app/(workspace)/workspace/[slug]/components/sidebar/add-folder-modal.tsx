import { useFoldersContext } from "@/app/(workspace)/workspace/[slug]/components/contexts/folders-context";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { UserWorkspace } from "@/lib/queries/workspaces";
import { useState } from "react";

const DEFAULT_FOLDER_NAME = "Untitled Folder";

type Props = {
  workspace: UserWorkspace;
};

export default function AddFolderModal({ workspace }: Props) {
  const { addFolder } = useFoldersContext();

  const [newFolderName, setNewFolderName] = useState(DEFAULT_FOLDER_NAME);

  return (
    <DialogContent className="mx-auto w-[calc(100vw-2rem)] rounded-md">
      <DialogHeader>
        <DialogTitle>
          Add a folder to{" "}
          <span className="rounded-md bg-zinc-100 px-2 py-1 font-mono text-base font-black tracking-wide">
            {workspace.title}
          </span>
        </DialogTitle>
        <DialogDescription>
          Keep your workspace tidy by organizing forms into folders.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <form
          className="grid grid-cols-4 items-center gap-4"
          onSubmit={(e: React.FormEvent) => {
            e.preventDefault();
            addFolder(newFolderName);
            setNewFolderName(DEFAULT_FOLDER_NAME);
          }}
        >
          <Input
            id="name"
            className="col-span-3"
            placeholder={DEFAULT_FOLDER_NAME}
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
          />
          <DialogClose asChild>
            <Button type="submit">Create</Button>
          </DialogClose>
        </form>
      </div>
    </DialogContent>
  );
}
