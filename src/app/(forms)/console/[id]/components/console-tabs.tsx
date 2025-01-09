"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type Props = {
  formId: string;
};

export default function ConsoleTabs({ formId }: Props) {
  return (
    <div className="flex w-fit rounded-md bg-zinc-200/75 p-1">
      <TabLink href={`/console/${formId}`}>Questions</TabLink>
      <TabLink href={`/console/${formId}/responses`}>Responses</TabLink>
    </div>
  );
}

function TabLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  const pathName = usePathname();

  return (
    <Link
      className={cn("rounded-sm px-4 py-1.5 text-sm text-zinc-600", {
        "bg-zinc-50": pathName === href,
      })}
      href={href}
    >
      {children}
    </Link>
  );
}
