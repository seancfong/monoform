import EditFormNavigation from "@/app/(forms)/edit/[id]/components/layout/edit-form-navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: { id: string };
};

export default function Layout({ children, params }: Props) {
  const { id: formId } = params;

  return (
    <div className="min-h-screen w-full bg-zinc-100">
      <main className="w-full">{children}</main>
    </div>
  );
}
