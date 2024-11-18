import { FormBlock } from "@/lib/types/forms";
import Markdown from "react-markdown";

type Props = {
  block: FormBlock;
};

export default function PreviewBlockHeader({ block }: Props) {
  return (
    <div>
      <div className="prose prose-zinc prose-headings:text-zinc-600 prose-headings:font-semibold prose-headings:mb-0 prose-p:mb-0 prose-li:m-0 prose-ul:m-0 tracking-tight">
        <Markdown>{block.text}</Markdown>
      </div>
    </div>
  );
}
