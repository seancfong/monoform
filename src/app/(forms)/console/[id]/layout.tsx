import EditFormNavigation from "@/app/(forms)/console/[id]/@edit/components/layout/edit-form-navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: { id: string };
  edit: React.ReactNode;
  responses: React.ReactNode;
};

export default function Layout({ children, params, edit, responses }: Props) {
  const { id: formId } = params;

  return (
    <div className="min-h-screen w-full bg-zinc-100">
      <EditFormNavigation formId={formId} />
      <main className="w-full">
        <div className="flex flex-col items-center justify-center p-2 py-6 sm:p-12">
          <div className="w-full max-w-screen-sm lg:max-w-screen-md">
            <Tabs defaultValue="questions" className="w-full">
              <TabsList className="bg-zinc-200/75">
                <TabsTrigger
                  value="questions"
                  className="data-[state=active]:bg-zinc-50"
                >
                  Questions
                </TabsTrigger>
                <TabsTrigger
                  value="responses"
                  className="data-[state=active]:bg-zinc-50"
                >
                  Responses
                </TabsTrigger>
              </TabsList>
              <TabsContent value="questions" className="relative mt-4">
                {edit}
              </TabsContent>
              <TabsContent value="responses">{responses}</TabsContent>
            </Tabs>
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
