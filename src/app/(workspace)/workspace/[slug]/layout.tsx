import NavigationBar from "@/app/(workspace)/workspace/[slug]/components/navigation-bar";
import {
  Sidebar,
  SidebarSkeleton,
} from "@/app/(workspace)/workspace/[slug]/components/sidebar";
import { SidebarProvider } from "@/app/(workspace)/workspace/[slug]/components/sidebar/sidebar-context";
import React, { Suspense } from "react";

type Props = {
  children: React.ReactNode;
  params: { slug: string };
};

export default function DashboardLayout({ children, params }: Props) {
  const { slug } = params;

  return (
    <SidebarProvider>
      <div className="relative min-h-screen w-full bg-zinc-50 lg:flex">
        <Suspense fallback={<SidebarSkeleton />}>
          <Sidebar slug={slug} />
        </Suspense>
        <div className="lg:flex-grow lg:px-8">
          <NavigationBar />
          <main>{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
