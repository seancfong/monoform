import CreateNewModal from "@/app/(workspace)/workspace/[slug]/components/dashboard/create-new-modal";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { validateUser } from "@/lib/auth/validate-user";
import {
  getUserWorkspaceFolders,
  UserWorkspaceFolder,
} from "@/lib/queries/workspaces";
import { cn } from "@/lib/utils";
import { FilePen, Plus } from "lucide-react";
import { Suspense } from "react";

type Props = {
  slug: string;
};

export default async function CreateNew({ slug }: Props) {
  const { user } = await validateUser();

  const workspaceFoldersPromise = getUserWorkspaceFolders(user, slug);

  return (
    <div className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto">
      <CreateNewCard
        primary
        title="New form"
        icon={<FilePen />}
        workspaceFoldersPromise={workspaceFoldersPromise}
      />
      {/* <CreateNewCard title="Quiz template" icon={<Lightbulb />} href="/new" />
      <CreateNewCard title="Event template" icon={<Calendar />} href="/new" /> */}
    </div>
  );
}

type CreateNewCardProps = {
  primary?: boolean;
  title: string;
  icon: React.ReactNode;
  workspaceFoldersPromise: Promise<UserWorkspaceFolder[]>;
};

function CreateNewCard({
  title,
  icon,
  primary = false,
  workspaceFoldersPromise,
}: CreateNewCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="group flex h-fit min-w-52 snap-start items-start justify-between rounded-lg border-1 border-zinc-200 bg-white p-5 text-zinc-600 transition-colors duration-150 hover:bg-white/50 lg:min-w-60">
          <div className="space-y-2">
            <div
              className={cn(
                "w-fit rounded-md border-1 border-zinc-200 bg-zinc-100 p-2",
                {
                  "bg-zinc-800": primary,
                },
              )}
            >
              <span className={cn({ "text-zinc-100": primary })}>{icon}</span>
            </div>
            <h3 className="font-medium">{title}</h3>
          </div>
          <span>
            <Plus
              className="text-zinc-400 transition-colors duration-150 group-hover:scale-105 group-hover:text-zinc-500"
              size="18"
            />
          </span>
        </Button>
      </DialogTrigger>
      <Suspense>
        <CreateNewModal workspaceFoldersPromise={workspaceFoldersPromise} />
      </Suspense>
    </Dialog>
  );
}
