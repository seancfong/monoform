import CreateWorkspaceForm from "@/app/(auth)/create-workspace/components/create-workspace-form";
import { validateUser } from "@/lib/auth/validate-user";

type Props = {};

export default async function WorkspaceRedirect({}: Props) {
  await validateUser();

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
      <div className="grid max-w-screen-sm gap-4">
        <h1 className="text-2xl font-semibold text-zinc-800">
          Create your first workspace
        </h1>
        <CreateWorkspaceForm />
      </div>
    </div>
  );
}
