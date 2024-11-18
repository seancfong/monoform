import FillFormSections from "@/app/(forms)/fill/[id]/components/sections/fill-form-sections";
import { getFormSections } from "@/lib/queries/forms";
import React from "react";

type Props = {
  params: { id: string };
};

export default async function Page({ params }: Props) {
  const { id: formId } = params;

  //   TODO: add loading page
  const sections = await getFormSections(formId);

  return (
    <div className="flex flex-col items-center justify-center p-4 sm:p-12">
      <div className="w-full max-w-screen-sm lg:max-w-screen-md">
        <FillFormSections sections={sections} />
      </div>
    </div>
  );
}
