import { BlockVariant } from "@/db/schema";
import { MultipleChoiceBlock } from "@/lib/types/forms";

type Props = {
  block: MultipleChoiceBlock;
};

export default function OptionsLabel({ block }: Props) {
  return (
    <div className="flex items-center gap-2 pb-1 pt-2">
      <p className="font-mono text-xs tracking-tight text-zinc-400">
        {block.multipleChoiceOptions.length > 0 ? (
          <>
            {block.blockType === BlockVariant.MULTIPLE_CHOICE && "Select one"}
            {block.blockType === BlockVariant.CHECKBOX &&
              (block.required
                ? "Select one or more"
                : "Select none or multiple")}
            {block.required && (
              <span className="ml-1 text-sm text-rose-400">*</span>
            )}
          </>
        ) : (
          <>Edit this question to add options</>
        )}
      </p>
    </div>
  );
}
