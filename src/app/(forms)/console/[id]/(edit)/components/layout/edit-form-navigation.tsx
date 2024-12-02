import NavigationBreadcrumbs from "@/app/(forms)/console/[id]/(edit)/components/layout/navigation-breadcrumbs";
import UserAvatar from "@/app/(forms)/console/[id]/(edit)/components/layout/user-avatar";
import { Suspense } from "react";

type Props = {
  formId: string;
};

export default function EditFormNavigation({ formId }: Props) {
  return (
    <div className="sticky top-0 z-50 flex items-center justify-between border-b-1 border-b-zinc-200 bg-zinc-50 px-4 py-2 sm:px-8 sm:py-2.5">
      <div>
        <Suspense fallback={<></>}>
          <NavigationBreadcrumbs formId={formId} />
        </Suspense>
      </div>
      <div>
        <UserAvatar />
      </div>
    </div>
  );
}
