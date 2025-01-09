import EditFormNavigation from "@/app/(forms)/console/[id]/(edit)/components/layout/edit-form-navigation";
import ConsoleTabs from "@/app/(forms)/console/[id]/components/console-tabs";
import { Button } from "@/components/ui/button";
import { ExternalLink, Eye } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: { id: string };
};

export default function Layout({ children, params }: Props) {
  const { id: formId } = params;

  return (
    <div className="min-h-screen w-full bg-zinc-100">
      <EditFormNavigation formId={formId} />
      <main className="w-full">
        <div className="flex flex-col items-center justify-center p-2 py-6 sm:p-12">
          <div className="w-full max-w-screen-sm lg:max-w-screen-md">
            <div className="mb-2 flex items-center justify-between sm:mb-6">
              <ConsoleTabs formId={formId} />
              <Button
                asChild
                variant="outline"
                className="bg-zinc-50 font-normal"
              >
                <Link href={`/fill/${formId}`} target="_blank" rel="noreferrer">
                  <ExternalLink className="size-4 text-zinc-500 sm:mr-2 sm:hidden" />
                  <Eye className="hidden size-4 text-zinc-500 sm:mr-2 sm:inline-block" />
                  <span className="hidden sm:inline-block">Preview</span>
                </Link>
              </Button>
            </div>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
