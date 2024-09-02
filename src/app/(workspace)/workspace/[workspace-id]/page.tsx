import { validateUser } from "@/lib/auth/validate-user";

type Props = {};

export default async function DashboardPage({}: Props) {
  const { user } = await validateUser();

  return <div>DashboardPage</div>;
}
