"use client";

import { useSidebarContext } from "@/app/(workspace)/workspace/[slug]/components/contexts/sidebar-context";
import { Button } from "@/components/ui/button";
import { PanelLeft } from "lucide-react";

type Props = {};

export default function MobileSidebarToggle({}: Props) {
  const { toggleSidebar } = useSidebarContext();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleSidebar}
      className="size-fit p-2 lg:hidden"
    >
      <PanelLeft className="size-5 text-zinc-400" />
    </Button>
  );
}
