import { SectionsProvider } from "@/app/(forms)/edit/[id]/components/contexts/sections-context";
import EditQuestions from "@/app/(forms)/edit/[id]/components/questions/edit-questions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { validateUser } from "@/lib/auth/validate-user";
import { getFormInformation, getFormSections } from "@/lib/queries/forms";
import { Metadata } from "next";
import { userOwnsForm } from "@/lib/queries/forms";
import { Suspense } from "react";
import { notFound } from "next/navigation";

type Props = {
  params: { id: string };
};

export const generateMetadata = async ({
  params,
}: Props): Promise<Metadata> => {
  const { id: formId } = params;

  const formData = await getFormInformation(formId);

  if (!formData) {
    notFound();
  }

  return {
    title: `Editing ${formData.title} | Monoform`,
  };
};

export default async function EditFormPage({ params }: Props) {
  const { id: formId } = params;

  const { user } = await validateUser();

  const [ownsForm] = await userOwnsForm.execute({
    formId,
    userId: user.id,
  });

  if (!ownsForm) {
    notFound();
  }

  const sectionsPromise = getFormSections(formId);

  return (
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
            <Suspense fallback={<></>}>
              <SectionsProvider
                formId={formId}
                sectionsPromise={sectionsPromise}
              >
                <EditQuestions />
              </SectionsProvider>
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
