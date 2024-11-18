import NotificationMenu from "@/app/(workspace)/workspace/[slug]/components/navigation-bar/notification-menu";
import MobileSidebarToggle from "@/app/(workspace)/workspace/[slug]/components/sidebar/mobile-sidebar-toggle";

export default function NavigationBar() {
  return (
    <div className="sticky top-0 z-10 flex items-center justify-between border-b-1 border-b-zinc-200 px-4 py-2 lg:h-[76px] lg:px-6">
      <div>
        <MobileSidebarToggle />
        <h1 className="hidden text-xl font-semibold leading-loose text-zinc-800 lg:block lg:text-2xl">
          monoform
        </h1>
      </div>
      <div>
        <NotificationMenu />
      </div>
    </div>
  );
}
