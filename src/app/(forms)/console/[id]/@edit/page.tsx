import { SectionsProvider } from "@/app/(forms)/console/[id]/@edit/components/contexts/sections-context";
import EditQuestions from "@/app/(forms)/console/[id]/@edit/components/questions/edit-questions";
import { validateUser } from "@/lib/auth/validate-user";
import {
  getFormInformation,
  getFormSections,
  userOwnsForm,
} from "@/lib/queries/forms";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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
    <Suspense fallback={<></>}>
      <SectionsProvider formId={formId} sectionsPromise={sectionsPromise}>
        <EditQuestions />
      </SectionsProvider>
    </Suspense>
  );
}
