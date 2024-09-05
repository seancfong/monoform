import { validateUser } from "@/lib/auth/validate-user";
import { getUserWorkspaces } from "@/lib/queries/workspaces";
import { notFound, redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: {
    "workspace-slug": string;
  };
};

export default async function NewFormPage({ searchParams }: Props) {
  const { user } = await validateUser();

  let { "workspace-slug": workspaceSlug } = searchParams;

  const workspaces = await getUserWorkspaces(user);

  if (workspaces.length === 0) {
    redirect("/create-workspace");
  }

  let selectedWorkspace = workspaces.find(
    (workspace) => workspace.slug === workspaceSlug,
  );

  if (!selectedWorkspace) {
    selectedWorkspace = workspaces[0];
  }

  console.log(workspaces, selectedWorkspace);

  return (
    <main className="flex min-h-screen w-full items-center justify-center bg-zinc-50">
      NewFormPage
    </main>
  );
}
