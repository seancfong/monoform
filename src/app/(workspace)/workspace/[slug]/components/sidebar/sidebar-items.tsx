"use client";

import { FoldersProvider } from "@/app/(workspace)/workspace/[slug]/components/contexts/folders-context";
import { useSidebarContext } from "@/app/(workspace)/workspace/[slug]/components/contexts/sidebar-context";
import { ChangeWorkspaces } from "@/app/(workspace)/workspace/[slug]/components/sidebar/change-workspaces";
import SidebarFolders from "@/app/(workspace)/workspace/[slug]/components/sidebar/sidebar-folders";
import SidebarNavigation from "@/app/(workspace)/workspace/[slug]/components/sidebar/sidebar-navigation";
import { Separator } from "@/components/ui/separator";
import { UserWorkspace, UserWorkspaceFolder } from "@/lib/queries/workspaces";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";

type Props = {
  currentWorkspace: UserWorkspace;
  otherWorkspaces: UserWorkspace[];
  foldersPromise: Promise<UserWorkspaceFolder[]>;
};

export default function SidebarItems({
  currentWorkspace,
  otherWorkspaces,
  foldersPromise,
}: Props) {
  const { isOpen } = useSidebarContext();

  return (
    <>
      <SidebarBackground />
      <div
        className={cn(
          "fixed left-0 top-0 z-50 flex min-h-screen min-w-80 -translate-x-full flex-col border-r-1 border-r-zinc-200 bg-zinc-100 py-1 duration-500 ease-out-quart lg:relative lg:translate-x-0 lg:duration-0",
          { "translate-x-0": isOpen },
        )}
      >
        <ChangeWorkspaces
          currentWorkspace={currentWorkspace}
          otherWorkspaces={otherWorkspaces}
        />
        <Separator />
        <SidebarNavigation slug={currentWorkspace.slug} />
        <FoldersProvider
          foldersPromise={foldersPromise}
          workspace={currentWorkspace}
        >
          <SidebarFolders workspace={currentWorkspace} />
        </FoldersProvider>
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
