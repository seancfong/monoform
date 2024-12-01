import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { validateUser } from "@/lib/auth/validate-user";
import { getFormWithWorkspaceFolder } from "@/lib/queries/forms";
import { ChevronLeft, Slash } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  formId: string;
};

export default async function NavigationBreadcrumbs({ formId }: Props) {
  const { user } = await validateUser();

  const formData = await getFormWithWorkspaceFolder(formId, user.id);

  if (!formData) notFound();

  const { form, workspace, folders } = formData;

  return (
    <div className="flex items-center gap-1">
      <HoverCard>
        <HoverCardTrigger asChild>
          <Link
            href={`/workspace/${workspace.slug}`}
            className="text-xl font-semibold text-zinc-600 sm:text-2xl"
          >
            m_
          </Link>
        </HoverCardTrigger>
        <HoverCardContent className="flex w-fit items-center gap-1 bg-zinc-800 px-3 py-1 text-sm text-zinc-200">
          <ChevronLeft className="size-3 text-zinc-400" />
          <span>{workspace.title}</span>
        </HoverCardContent>
      </HoverCard>
      <Slash className="size-4 -rotate-[20deg] text-zinc-200" />
      <span className="text-sm text-zinc-400 sm:text-base">
        {workspace.title}
      </span>
      <Slash className="size-4 -rotate-[20deg] text-zinc-200" />
      <span className="text-sm text-zinc-400 sm:text-base">{form.title}</span>
    </div>
  );
}
