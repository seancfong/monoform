"use client";

import { FormSection } from "@/lib/types/forms";
import React from "react";

type Props = {
  section: FormSection;
};

export default function SectionList({ section }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-2 px-1">
        <h2 className="text-sm font-medium tracking-tight text-zinc-400">
          {section.title}
        </h2>
        <hr className="flex-grow border-zinc-300" />
      </div>
      <div className="rounded-lg bg-zinc-200/50 p-4">hellos!</div>
    </div>
  );
}
