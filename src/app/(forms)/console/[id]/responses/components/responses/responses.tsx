import ResponseBlockFactory from "@/components/forms/blocks/response/response-block-factory";
import { getFormResponsesSummary } from "@/lib/queries/responses";
import React from "react";

type Props = {
  formId: string;
};

export default async function Responses({ formId }: Props) {
  // TODO: use cache
  const formSectionResponses = await getFormResponsesSummary(formId);

  // console.dir(formSectionResponses, { depth: null });

  console.log("fetching responses");

  return (
    <div className="pt-2">
      {formSectionResponses.map((section, index) => (
        <div key={section.id}>
          <div className="flex items-center gap-2 px-1">
            <h2 className="text-sm font-medium tracking-tight text-zinc-400">
              Section {index + 1}: {section.title}
            </h2>
            <hr className="flex-grow border-zinc-300" />
          </div>
          <div className="space-y-2">
            {section.blocks.map((block) => (
              <ResponseBlockFactory key={block.id} block={block} />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
