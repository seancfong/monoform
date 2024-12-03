import ChangeBlockPreview from "@/app/(forms)/console/[id]/(edit)/components/blocks/change-block-preview";
import ResponseBlockFactory from "@/components/forms/blocks/response/response-block-factory";
import { getFormResponsesSummary } from "@/lib/queries/responses";

type Props = {
  formId: string;
};

export default async function Responses({ formId }: Props) {
  const formSectionResponses = await getFormResponsesSummary(formId);

  return (
    <div>
      {formSectionResponses.map((section, sectionIndex) => (
        <div key={section.id} className="space-y-2">
          <div className="flex items-center gap-2 px-1">
            <h2 className="text-sm font-medium tracking-tight text-zinc-400">
              Section {sectionIndex + 1}: {section.title}
            </h2>
            <hr className="flex-grow border-zinc-300" />
          </div>
          <div className="space-y-2 rounded-lg bg-zinc-200/25 p-3">
            {section.blocks.map((block) => (
              <div
                key={block.id}
                className="space-y-1 rounded-md border-1 border-zinc-200 bg-zinc-50 pb-4 pt-3 md:pb-6"
              >
                <div className="px-3">
                  <ChangeBlockPreview blockDraft={block} />
                </div>
                <hr className="mx-2 border-0 border-t-1 border-zinc-200" />
                <div className="px-5 pt-4 md:px-9">
                  <ResponseBlockFactory block={block} />
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
