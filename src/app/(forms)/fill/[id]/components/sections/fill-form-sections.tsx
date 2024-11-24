"use client";

import FillBlockFactory from "@/components/forms/blocks/fill/variants/fill-block-factory";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import submitForm from "@/lib/actions/forms/submit/submit-form";
import { FormSection } from "@/lib/types/forms";
import generateZodSchema from "@/lib/utils/generate-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useMemo } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

type Props = {
  formId: string;
  sections: FormSection[];
};

export default function FillFormSections({ formId, sections }: Props) {
  const formSchema = useMemo(() => {
    return generateZodSchema(sections);
  }, [sections]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(async (data) => {
          console.log(data);
          await submitForm(formId, data);
        })}
      >
        {sections.map((section, index) => (
          <div key={section.id}>
            <div className="mb-4 flex items-center gap-2">
              <h2 className="text-sm font-medium tracking-tight text-zinc-400">
                Section {index + 1}
              </h2>
              <hr className="flex-grow border-zinc-300" />
            </div>
            <div className="space-y-6">
              {section.blocks.map((block) => (
                <div
                  key={block.id}
                  className="relative flex w-full flex-col overflow-hidden rounded-md border-1 border-zinc-200 bg-zinc-50 p-4 text-left sm:p-8 sm:pt-6"
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
        <div className="flex flex-wrap items-center justify-between gap-2 rounded-md bg-zinc-200/50 p-4 sm:flex-row sm:px-8">
          <Button
            type="submit"
            className="flex w-fit items-center justify-center gap-2 rounded-md bg-zinc-900 px-6 py-3 text-sm font-semibold text-zinc-50 hover:bg-zinc-800"
          >
            Submit
          </Button>
          <p className="font-mono text-xs text-zinc-400">
            Do not submit passwords or sensitive data.
          </p>
        </div>
      </form>
    </Form>
  );
}
