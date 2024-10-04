"use client";

import { useSectionsContext } from "@/app/(forms)/edit/[id]/components/contexts/sections-context";
import { Button } from "@/components/ui/button";

type Props = {};

export default function EditQuestions({}: Props) {
  const { sections, addSection } = useSectionsContext();

  return (
    <div>
      <div>
        {sections.map((section) => (
          <div key={section.id}>{section.title}</div>
        ))}
      </div>
      <div>
        {/* TODO: add section */}
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
