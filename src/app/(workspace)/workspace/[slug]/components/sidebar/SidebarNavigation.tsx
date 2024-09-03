import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Inbox, LayoutGrid } from "lucide-react";
import Link from "next/link";
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
    icon: <LayoutGrid />,
  },
  {
    title: "Responses",
    relativePath: "responses",
    icon: <Inbox />,
  },
];

type Props = {
  slug: string;
};

export default function SidebarNavigation({ slug }: Props) {
  return (
    <div className="mt-3 flex flex-col px-3">
      {navigationItems.map((item) => (
        <Link
          className="flex items-center justify-start gap-3 px-4 py-3 text-zinc-500"
          key={item.title}
          href={`/workspace/${slug}/${item.relativePath}`}
        >
          <span className="text-sm">{item.icon}</span>
          <span className="text-sm font-medium leading-tight">
            {item.title}
          </span>
        </Link>
      ))}
    </div>
  );
}
