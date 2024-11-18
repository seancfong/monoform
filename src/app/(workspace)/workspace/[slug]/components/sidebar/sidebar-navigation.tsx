"use client";

import { cn } from "@/lib/utils";
import { Inbox, LayoutGrid } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

interface NavigationItem {
  title: string;
  relativePath: string;
  icon: React.ReactNode;
}

const navigationItems: NavigationItem[] = [
  {
    title: "Dashboard",
    relativePath: "",
    icon: <LayoutGrid size="20" />,
  },
  {
    title: "Responses",
    relativePath: "/responses",
    icon: <Inbox size="20" />,
  },
];

type Props = {
  slug: string;
};

export default function SidebarNavigation({ slug }: Props) {
  const pathName = usePathname();

  return (
    <div className="mt-3 flex flex-col gap-1 px-3">
      {navigationItems.map((item) => {
        const isActive = pathName === `/workspace/${slug}${item.relativePath}`;

        return (
          <Link
            className={cn(
              "flex items-center justify-start gap-3 rounded-md px-4 py-3 text-zinc-500",
              {
                "bg-zinc-200/50 text-zinc-800": isActive,
              },
            )}
            key={item.relativePath}
            href={`/workspace/${slug}${item.relativePath}`}
          >
            <span>{item.icon}</span>
            <span className="text-sm leading-tight">{item.title}</span>
          </Link>
        );
      })}
    </div>
  );
}
