import { FormBlock } from "@/lib/types/forms";
import React from "react";

type Props = {
  block: FormBlock;
};

const QUESTION_PLACEHOLDER = "Untitled Question" as const;

export default function PreviewBlockMultipleChoice({ block }: Props) {
  return (
    <div>
      <div className="text-lg font-medium tracking-tight">
        <span className="text-zinc-600">
          {block.text || QUESTION_PLACEHOLDER}
        </span>
      </div>
    </div>
  );
}
