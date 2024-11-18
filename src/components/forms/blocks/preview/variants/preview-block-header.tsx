import { FormBlock } from "@/lib/types/forms";
import Markdown from "react-markdown";

type Props = {
  block: FormBlock;
};

export default function PreviewBlockHeader({ block }: Props) {
  return (
    <div>
      <div className="text-lg font-medium tracking-tight">
        <Markdown>{block.text}</Markdown>
      </div>
    </div>
  );
}
