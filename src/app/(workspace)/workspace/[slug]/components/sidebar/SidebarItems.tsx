"use client";

import { ChangeWorkspaces } from "@/app/(workspace)/workspace/[slug]/components/sidebar/ChangeWorkspaces";
import { useSidebarContext } from "@/app/(workspace)/workspace/[slug]/components/sidebar/SidebarContext";
import { UserWorkspace, UserWorkspaceFolder } from "@/lib/queries/workspaces";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  currentWorkspace: UserWorkspace;
  otherWorkspaces: UserWorkspace[];
  folders: UserWorkspaceFolder[];
  slug: string;
};

export default function SidebarItems({
  currentWorkspace,
  otherWorkspaces,
  folders,
  slug,
}: Props) {
  const { isOpen } = useSidebarContext();

  return (
    <>
      <SidebarBackground />
      <div
        className={cn(
          "fixed left-0 top-0 z-50 flex min-h-screen min-w-80 -translate-x-full flex-col border-r-1 border-r-zinc-200 bg-zinc-100 py-3 duration-500 ease-out-quart lg:relative lg:translate-x-0 lg:duration-0",
          { "translate-x-0": isOpen },
        )}
      >
        <ChangeWorkspaces
          currentWorkspace={currentWorkspace}
          otherWorkspaces={otherWorkspaces}
        />
      </div>
    </>
  );
}

function SidebarBackground() {
  const { isOpen, toggleSidebar } = useSidebarContext();

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0, transition: { duration: 0.3 } }}
          className="fixed left-0 top-0 h-full w-full bg-zinc-400 bg-opacity-25 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </AnimatePresence>
  );
}
