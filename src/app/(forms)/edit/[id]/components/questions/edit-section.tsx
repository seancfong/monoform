"use client";

import AddBlock from "@/app/(forms)/edit/[id]/components/blocks/add-block";
import EditBlock from "@/app/(forms)/edit/[id]/components/blocks/edit-block";
import { Button } from "@/components/ui/button";
import { FormSection } from "@/lib/types/forms";
import React from "react";

type Props = {
  section: FormSection;
};

export default function EditSection({ section }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <SectionHeading section={section} />
      <SectionContent section={section} />
    </div>
  );
}

type SectionHeadingProps = {
  section: FormSection;
};

function SectionHeading({ section }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-2 px-1">
      <h2 className="text-sm font-medium tracking-tight text-zinc-400">
        {section.title}
      </h2>
      <hr className="flex-grow border-zinc-300" />
    </div>
  );
}

type SectionContentProps = {
  section: FormSection;
};

function SectionContent({ section }: SectionContentProps) {
  return (
    <div className="rounded-lg bg-zinc-200/25 p-3">
      <div className="flex flex-col gap-2">
        {section.blocks.map((block) => (
          <EditBlock key={block.id} block={block} />
        ))}
      </div>
      <div className="flex justify-center">
        <AddBlock section={section} />
      </div>
    </div>
  );
}