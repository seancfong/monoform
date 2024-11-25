import { Badge } from "@/components/ui/badge";
import { SelectForms } from "@/db/schema";
import { validateUser } from "@/lib/auth/validate-user";
import { getUserWorkspaceForms } from "@/lib/queries/workspaces";
import Link from "next/link";
import React from "react";

type Props = {
  slug: string;
};

export default async function FormsGrid({ slug }: Props) {
  const { user } = await validateUser();

  const workspaceForms = await getUserWorkspaceForms(user, slug);

  console.log(workspaceForms);

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Recent Forms</h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {workspaceForms.map((form) => (
          <FormCard key={form.id} form={form} />
        ))}
      </div>
    </div>
  );
}

type FormCardProps = {
  form: SelectForms;
};

function FormCard({ form }: FormCardProps) {
  return (
    <Link
      href={`/edit/${form.id}`}
      className="flex flex-col rounded-md border-1 border-zinc-200 bg-zinc-50"
    >
      <div className="relative h-36 overflow-hidden rounded-t-md">
        <div className="absolute bottom-0 right-0 h-5/6 w-5/6 rounded-tl-lg border-l-1 border-t-1 bg-white shadow-xl shadow-zinc-400/25" />
      </div>
      <div className="space-y-1 rounded-b-md border-t-1 border-zinc-200 bg-white px-4 py-3">
        <h3 className="font-medium text-zinc-600">{form.title}</h3>
        <div className="flex items-center gap-2">
          <Badge className="bg-zinc-100 font-medium text-zinc-500">Draft</Badge>
          <span className="text-xs text-zinc-400">Unscheduled</span>
        </div>
      </div>
    </Link>
  );
}
