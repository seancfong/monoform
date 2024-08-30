import { getWorkspaces } from "@/lib/queries/workspaces";
import { User } from "lucia";

type Props = {
  user: User;
};

export default async function Sidebar({ user }: Props) {
  // TODO: fetch workspace and its folders
  const workspaces = await getWorkspaces(user);

  console.log("workspaces", workspaces);

  return <div className="">Sidebar</div>;
}
