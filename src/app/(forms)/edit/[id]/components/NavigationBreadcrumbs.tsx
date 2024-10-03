import { getFormWithWorkspaceFolder } from "@/lib/queries/forms";
import { Slash } from "lucide-react";
import React from "react";

type Props = {
  formId: string;
};

export default async function NavigationBreadcrumbs({ formId }: Props) {
  const { form, workspaceFolder } = await getFormWithWorkspaceFolder(formId);

  return (
    <div className="flex items-center gap-1">
      <span className="text-xl font-semibold text-zinc-600">m_</span>
      <Slash className="size-4 -rotate-[20deg] text-zinc-200" />
      <span className="text-sm text-zinc-400">{form.title}</span>
    </div>
  );
}
