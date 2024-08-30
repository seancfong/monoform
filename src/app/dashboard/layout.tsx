import Sidebar from "@/app/dashboard/components/sidebar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function DashboardLayout({ children }: Props) {
  return (
    <div className="relative min-h-screen w-full bg-zinc-50">
      <Sidebar />
      {children}
    </div>
  );
}
