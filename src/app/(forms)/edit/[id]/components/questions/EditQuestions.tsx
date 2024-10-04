import { Button } from "@/components/ui/button";
import { getFormSections } from "@/lib/queries/forms";
import React from "react";

type Props = {
  formId: string;
};

export default async function EditQuestions({ formId }: Props) {
  const sections = await getFormSections(formId);

  return (
    <div>
      <div>
        {sections.map((section) => (
          <div key={section.id}>{section.title}</div>
        ))}
      </div>
      <div>
        {/* TODO: add section */}
        <Button size="sm">Add Section</Button>
      </div>
    </div>
  );
}
