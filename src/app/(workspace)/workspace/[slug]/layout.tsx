import { SidebarProvider } from "@/app/(workspace)/workspace/[slug]/components/contexts/sidebar-context";
import NavigationBar from "@/app/(workspace)/workspace/[slug]/components/navigation-bar";
import {
  Sidebar,
  SidebarSkeleton,
} from "@/app/(workspace)/workspace/[slug]/components/sidebar";
import React, { Suspense } from "react";

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

export default async function DashboardLayout({ children, params }: Props) {
  const { slug } = params;

  return (
    <SidebarProvider>
      <div className="relative min-h-screen w-full overflow-x-hidden bg-zinc-50 lg:flex">
        <Suspense fallback={<SidebarSkeleton slug={slug} />}>
          <Sidebar slug={slug} />
        </Suspense>
        <div className="min-w-0 lg:flex-grow lg:px-6">
          <NavigationBar />
          <main className="w-full">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
