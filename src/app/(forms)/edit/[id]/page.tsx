import EditQuestions from "@/app/(forms)/edit/[id]/components/questions/EditQuestions";
import EditQuestionsSkeleton from "@/app/(forms)/edit/[id]/components/questions/EditQuestionsSkeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { validateUser } from "@/lib/auth/validate-user";
import { Suspense } from "react";

type Props = {
  params: { id: string };
};

export default async function EditFormPage({ params }: Props) {
  const { id: formId } = params;

  const { user } = await validateUser();

  // TODO: check if user owns form

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-6">
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
          <TabsContent value="questions">
            <Suspense fallback={<EditQuestionsSkeleton />}>
              <EditQuestions formId={formId} />
            </Suspense>
          </TabsContent>
          <TabsContent value="responses">
            Change your responses here.
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
