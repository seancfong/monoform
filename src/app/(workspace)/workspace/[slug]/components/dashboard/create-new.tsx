import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Calendar, FilePen, Lightbulb, Plus } from "lucide-react";
import Link from "next/link";

type Props = {};

export default function CreateNew({}: Props) {
  return (
    <div className="flex w-full snap-x snap-mandatory gap-4 overflow-x-auto">
      <CreateNewCard
        primary
        title="New form"
        icon={<FilePen />}
        href="/forms/new"
      />
      <CreateNewCard
        title="Quiz template"
        icon={<Lightbulb />}
        href="/forms/new"
      />
      <CreateNewCard
        title="Event template"
        icon={<Calendar />}
        href="/forms/new"
      />
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
      className="flex min-w-52 snap-start items-start justify-between rounded-lg border-1 border-zinc-200 bg-white p-5 transition-colors duration-150 hover:bg-white/50 lg:min-w-60"
    >
      <div className="space-y-2">
        <div
          className={cn("w-fit rounded-md bg-zinc-100 p-2", {
            "bg-zinc-800": primary,
          })}
        >
          <span className={cn({ "text-zinc-100": primary })}>{icon}</span>
        </div>
        <p>{title}</p>
      </div>
      <span>
        <Plus className="text-zinc-400" size="18" />
      </span>
    </Link>
  );
}
