import Sidebar from "@/app/dashboard/components/sidebar";
import { validateRequest } from "@/lib/auth/validate-user";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default async function DashboardLayout({ children }: Props) {
  const { user } = await validateRequest();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="relative min-h-screen w-full bg-zinc-50">
      <Sidebar user={user} />
      {children}
    </div>
  );
}
