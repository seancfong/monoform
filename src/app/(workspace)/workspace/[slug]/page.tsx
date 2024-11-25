import CreateNew from "@/app/(workspace)/workspace/[slug]/components/dashboard/create-new";
import FormsGrid from "@/app/(workspace)/workspace/[slug]/components/dashboard/forms-grid";
import { Suspense } from "react";

type Props = {
  params: { slug: string };
};

export default async function DashboardPage({ params }: Props) {
  const { slug } = params;

  return (
    <div className="mx-auto flex w-full flex-col gap-6 px-4 py-4 lg:max-w-screen-lg lg:px-6 lg:py-8">
      <CreateNew slug={slug} />
      <Suspense>
        <FormsGrid slug={slug} />
      </Suspense>
    </div>
  );
}
