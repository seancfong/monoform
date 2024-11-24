import FillFormSections from "@/app/(forms)/fill/[id]/components/sections/fill-form-sections";
import { getFormInformation, getFormSections } from "@/lib/queries/forms";
import { notFound } from "next/navigation";
import React from "react";

type Props = {
  params: { id: string };
};

export const generateMetadata = async ({ params }: Props) => {
  const { id: formId } = params;

  const formInformation = await getFormInformation(formId);

  if (!formInformation) {
    notFound();
  }

  return {
    title: `${formInformation.title} | Monoform`,
  };
};

export default async function Page({ params }: Props) {
  const { id: formId } = params;

  //   TODO: add loading page
  // TODO: verify form exists
  // TODO: verify id is uuid

  const sections = await getFormSections(formId);

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-12">
      <div className="w-full max-w-screen-sm lg:max-w-screen-md">
        <FillFormSections formId={formId} sections={sections} />
      </div>
    </div>
  );
}
