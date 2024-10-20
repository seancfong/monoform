import { useSectionsContext } from "@/app/(forms)/edit/[id]/components/contexts/sections-context";
import { MultipleChoiceBlock } from "@/lib/types/forms";
import { useState } from "react";

type Props = {
  block: MultipleChoiceBlock;
};

export default function EditBlockMultipleChoice({ block }: Props) {
  return (
    <div>
      <div>
        <h3 className="text-lg font-medium tracking-tight text-zinc-600">
          {block.text || "Question"}
        </h3>
        {block.description && (
          <p className="text-sm font-medium tracking-tight text-zinc-400">
            {block.description}
          </p>
        )}
      </div>
      <div>
        {block.multipleChoiceOptions.map((option) => (
          <MultipleChoiceOption key={option.id} option={option} />
        ))}
      </div>
    </div>
  );
}

function MultipleChoiceOption({
  option,
}: {
  option: MultipleChoiceBlock["multipleChoiceOptions"][number];
}) {
  const {} = useSectionsContext();
  const [isEditing, setIsEditing] = useState(false);

  return <div>MultipleChoiceOption</div>;
}
