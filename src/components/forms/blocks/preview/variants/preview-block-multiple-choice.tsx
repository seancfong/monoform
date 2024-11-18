import { MultipleChoiceBlock } from "@/lib/types/forms";
import Markdown from "react-markdown";

type Props = {
  block: MultipleChoiceBlock;
};

export default function PreviewBlockMultipleChoice({ block }: Props) {
  return (
    <div>
      <div className="text-lg font-medium tracking-tight">
        <Markdown>{block.text}</Markdown>
      </div>
      {block.multipleChoiceOptions.map((option) => (
        <div key={option.id}>{option.text}</div>
      ))}
    </div>
  );
}
