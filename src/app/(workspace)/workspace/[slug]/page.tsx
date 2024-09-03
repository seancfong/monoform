import CreateNew from "@/app/(workspace)/workspace/[slug]/components/dashboard/create-new";
import { validateUser } from "@/lib/auth/validate-user";

type Props = {};

export default async function DashboardPage({}: Props) {
  const { user } = await validateUser();

  return (
    <div className="w-full px-4 py-4 lg:px-6 lg:py-8">
      <CreateNew />
    </div>
  );
}
