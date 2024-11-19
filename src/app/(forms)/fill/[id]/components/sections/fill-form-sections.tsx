import FillBlockFactory from "@/components/forms/blocks/fill/variants/fill-block-factory";
import { Form } from "@/components/ui/form";
import { FormSection } from "@/lib/types/forms";
import React from "react";
import { useForm } from "react-hook-form";

type Props = {
  sections: FormSection[];
};

export default function FillFormSections({ sections }: Props) {
  const form = useForm();

  return (
    <Form {...form}>
      <form className="flex flex-col gap-8">
        {sections.map((section, index) => (
          <div key={section.id}>
            <div className="mb-2 flex items-center gap-2">
              <h2 className="text-sm font-medium tracking-tight text-zinc-400">
                Section {index + 1}
              </h2>
              <hr className="flex-grow border-zinc-300" />
            </div>
            <div className="space-y-2">
              {section.blocks.map((block) => (
                <div
                  key={block.id}
                  className="relative flex w-full flex-col overflow-hidden rounded-md border-1 border-zinc-200 bg-zinc-50 p-2 text-left sm:p-8"
                >
                  <FillBlockFactory block={block} />
                </div>
              ))}
            </div>
          </div>
        ))}
      </form>
    </Form>
  );
}
