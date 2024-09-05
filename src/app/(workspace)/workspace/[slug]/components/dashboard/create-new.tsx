import { cn } from "@/lib/utils";
import { buildUrl } from "@/lib/utils/url";
import { Calendar, FilePen, Lightbulb, Plus } from "lucide-react";
import Link from "next/link";

type Props = {
  slug: string;
};

export default function CreateNew({ slug }: Props) {
  return (
    <div className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto">
      <CreateNewCard
        primary
        title="New form"
        icon={<FilePen />}
        href={buildUrl("/new", { "workspace-slug": slug })}
      />
      <CreateNewCard title="Quiz template" icon={<Lightbulb />} href="/new" />
      <CreateNewCard title="Event template" icon={<Calendar />} href="/new" />
    </div>
  );
}

type CreateNewCardProps = {
  title: string;
  icon: React.ReactNode;
  primary?: boolean;
  href: string;
};

function CreateNewCard({
  title,
  icon,
  primary = false,
  href,
}: CreateNewCardProps) {
  return (
    <Link
      href={href}
      className="group flex min-w-52 snap-start items-start justify-between rounded-lg border-1 border-zinc-200 bg-white p-5 transition-colors duration-150 hover:bg-white/50 lg:min-w-60"
    >
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
    </Link>
  );
}
