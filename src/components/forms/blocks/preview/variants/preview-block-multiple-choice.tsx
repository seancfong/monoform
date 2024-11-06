import { MultipleChoiceBlock } from "@/lib/types/forms";

type Props = {
  block: MultipleChoiceBlock;
};

const QUESTION_PLACEHOLDER = "Untitled Question" as const;

export default function PreviewBlockMultipleChoice({ block }: Props) {
  return (
    <div>
      <div className="text-lg font-medium tracking-tight">
        <span className="text-zinc-600">
          {block.text || QUESTION_PLACEHOLDER}
        </span>
        {block.multipleChoiceOptions.map((option) => (
          <div key={option.id}>{option.text}</div>
        ))}
      </div>
    </div>
  );
}
