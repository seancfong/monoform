import NavigationBreadcrumbs from "@/app/(forms)/edit/[id]/components/NavigationBreadcrumbs";
import React, { Suspense } from "react";

type Props = {
  formId: string;
};

export default function EditFormNavigation({ formId }: Props) {
  return (
    <div className="sticky top-0 flex items-center justify-between border-b-1 border-b-zinc-200 bg-zinc-50 px-4 py-2">
      <Suspense>
        <NavigationBreadcrumbs formId={formId} />
      </Suspense>
      <div>Profile</div>
    </div>
  );
}
