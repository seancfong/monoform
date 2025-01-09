import CreateNew from "@/app/(workspace)/workspace/[slug]/components/dashboard/create-new";
import { FormCard } from "@/app/(workspace)/workspace/[slug]/components/dashboard/forms-grid";
import { validateUser } from "@/lib/auth/validate-user";
import { getUserWorkspaceFolderForms } from "@/lib/queries/workspaces";

type Props = {
  params: {
    slug: string;
    "folder-id": string;
  };
};

export default async function FolderPage({ params }: Props) {
  const { user } = await validateUser();

  const { slug, "folder-id": folderId } = params;

  const folderForms = await getUserWorkspaceFolderForms(user, slug, folderId);

  return (
    <div className="mx-auto flex w-full flex-col gap-6 px-4 py-4 lg:max-w-screen-lg lg:px-6 lg:py-8">
      <CreateNew slug={slug} />
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Recent Forms</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
          {folderForms.map((form) => (
            <FormCard key={form.id} form={form} />
          ))}
        </div>
      </div>
    </div>
  );
}
