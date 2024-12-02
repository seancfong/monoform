import EditFormNavigation from "@/app/(forms)/console/[id]/(edit)/components/layout/edit-form-navigation";
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
            <Link href={`/console/${formId}`}>Questions</Link>
            <Link href={`/console/${formId}/responses`}>Responses</Link>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
