import CreateNew from "@/app/(workspace)/workspace/[slug]/components/dashboard/create-new";
import FormsGrid from "@/app/(workspace)/workspace/[slug]/components/dashboard/forms-grid";
import { validateUser } from "@/lib/auth/validate-user";

type Props = {};

export default async function DashboardPage({}: Props) {
  const { user } = await validateUser();

  return (
    <div className="flex w-full flex-col gap-6 px-4 py-4 lg:px-6 lg:py-8">
      <CreateNew />
      <FormsGrid />
    </div>
  );
}
