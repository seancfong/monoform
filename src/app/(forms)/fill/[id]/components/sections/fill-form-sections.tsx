"use client";

import FillBlockFactory from "@/components/forms/blocks/fill/variants/fill-block-factory";
import { Form } from "@/components/ui/form";
import { FormSection } from "@/lib/types/forms";
import generateZodSchema from "@/lib/utils/generate-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  sections: FormSection[];
};

export default function FillFormSections({ sections }: Props) {
  const formSchema = useMemo(() => {
    return generateZodSchema(sections);
  }, [sections]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-8"
        onSubmit={form.handleSubmit((data) => {
          console.log(data);
        })}
      >
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
                  <FillBlockFactory<z.infer<typeof formSchema>>
                    block={block}
                    control={form.control}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
        <button
          type="submit"
          className="flex items-center justify-center gap-2 rounded-md bg-zinc-900 px-4 py-2 text-sm font-semibold text-zinc-50 hover:bg-zinc-800"
        >
          Submit
        </button>
      </form>
    </Form>
  );
}
