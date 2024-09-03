"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { UserWorkspace } from "@/lib/queries/workspaces";
import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

type Props = {
  currentWorkspace: UserWorkspace;
  otherWorkspaces: UserWorkspace[];
};

export function ChangeWorkspaces({ currentWorkspace, otherWorkspaces }: Props) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  return (
    <div className="flex h-fit w-full flex-col px-3">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="ghost"
            role="combobox"
            aria-expanded={open}
            className="group h-fit justify-between p-3"
          >
            <WorkspaceCard workspace={currentWorkspace} />
            <div className="ml-2 shrink-0 rounded-md p-1 text-zinc-400 transition-colors duration-200 group-hover:bg-zinc-200/50">
              <ChevronsUpDown className="size-5" strokeWidth="1.5" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[295px] p-0 shadow-sm">
          <Command className="bg-zinc-50">
            <CommandInput placeholder="Search workspaces" />
            <CommandList>
              <CommandGroup>
                {[currentWorkspace, ...otherWorkspaces].map((workspace) => (
                  <CommandItem
                    key={workspace.id}
                    value={workspace.slug}
                    onSelect={(selectedSlug) => {
                      if (selectedSlug === currentWorkspace.slug) return;
                      setOpen(false);
                      router.push(`/workspace/${selectedSlug}`);
                    }}
                    className="p-3"
                  >
                    {workspace.title}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

function WorkspaceCard({ workspace }: { workspace: UserWorkspace }) {
  return (
    <div className="flex items-center gap-3">
      <div className="size-10 rounded-md bg-gradient-to-bl from-slate-500 to-zinc-950" />
      <div className="space-y-1 text-left">
        <h2 className="text-base font-semibold leading-tight text-zinc-800">
          {workspace.title}
        </h2>
        <p className="text-xs font-medium text-zinc-400">{workspace.slug}</p>
      </div>
    </div>
  );
}
