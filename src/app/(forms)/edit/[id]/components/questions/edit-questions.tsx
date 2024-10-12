"use client";

import { useSectionsContext } from "@/app/(forms)/edit/[id]/components/contexts/sections-context";
import SectionList from "@/app/(forms)/edit/[id]/components/questions/edit-section";
import { Button } from "@/components/ui/button";

type Props = {};

export default function EditQuestions({}: Props) {
  const { sections, appendSection: addSection } = useSectionsContext();

  console.log(sections);

  return (
    <div>
      <div className="flex flex-col gap-8">
        {sections.map((section) => (
          <SectionList key={section.id} section={section} />
        ))}
      </div>
      <div>
        <Button
          size="sm"
          onClick={() => {
            addSection("New Section");
          }}
        >
          Add Section
        </Button>
      </div>
    </div>
  );
}
