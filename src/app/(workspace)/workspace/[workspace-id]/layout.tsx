import Sidebar from "@/app/(workspace)/workspace/[workspace-id]/components/sidebar";
import { validateUser } from "@/lib/auth/validate-user";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  const { user } = await validateUser();

  // TODO: check if user owns workspace

  return (
    <div className="relative min-h-screen w-full bg-zinc-50">
      <Sidebar user={user} />
      {children}
    </div>
  );
}
