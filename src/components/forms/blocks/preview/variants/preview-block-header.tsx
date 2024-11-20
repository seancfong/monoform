import { BlockVariant } from "@/db/schema";
import { FormBlock } from "@/lib/types/forms";
import { cn } from "@/lib/utils";
import Markdown from "react-markdown";

type Props = {
  block: FormBlock;
};

export default function PreviewBlockHeader({ block }: Props) {
  return (
    <div tabIndex={0}>
      <div
        className={cn(
          "prose prose-zinc tracking-tight md:prose-lg",
          "prose-headings:mb-0 prose-headings:font-medium prose-headings:text-zinc-600",
          "prose-p:m-0 prose-p:text-base prose-p:text-zinc-500",
          "prose-ul:m-0 prose-li:m-0 prose-li:text-base prose-li:text-zinc-500",
          "prose-code:rounded-sm prose-code:bg-zinc-200/75 prose-code:px-1.5 prose-code:py-0.5 prose-code:text-sm prose-code:before:content-none prose-code:after:content-none",
          {
            "prose-h2:text-xl prose-h3:text-lg md:prose-h2:text-2xl md:prose-h3:text-xl":
              block.blockType !== BlockVariant.HEADER,
          },
        )}
      >
        {block.text.split("\n").map((line, index) => (
          <Markdown
            key={index}
            components={{
              h1: ({ children, node, ...props }) => (
                <h2 {...props}>{children}</h2>
              ),
              h2: ({ children, node, ...props }) => (
                <h3 {...props}>{children}</h3>
              ),
            }}
          >
            {line}
          </Markdown>
        ))}
      </div>
    </div>
  );
}
