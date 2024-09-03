"use client";

import { useSidebarContext } from "@/app/(workspace)/workspace/[slug]/components/sidebar/SidebarContext";
import { cn } from "@/lib/utils";
import React from "react";
import { AnimatePresence, motion } from "framer-motion";

type Props = {};

export default function SidebarItems({}: Props) {
  const { isOpen } = useSidebarContext();

  return (
    <>
      <SidebarBackground />
      <div
        className={cn(
          "ease-out-quart fixed left-0 top-0 z-50 min-h-screen min-w-80 -translate-x-full border-r-1 border-r-zinc-200 bg-zinc-100 duration-500 lg:relative lg:translate-x-0 lg:duration-0",
          { "translate-x-0": isOpen },
        )}
      >
        SidebarItems
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
