import EditFormNavigation from "@/app/(forms)/edit/[id]/components/EditFormNavigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: { id: string };
};

export default function Layout({ children, params }: Props) {
  const { id: formId } = params;

  return (
    <div className="min-h-screen w-full bg-zinc-100">
      <EditFormNavigation formId={formId} />
      <main className="h-[200vh] w-full">{children}</main>
    </div>
  );
}
