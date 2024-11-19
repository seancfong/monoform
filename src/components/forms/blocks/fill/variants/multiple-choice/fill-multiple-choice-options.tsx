"use client";

import { BlockVariant } from "@/db/schema";
import { MultipleChoiceBlock } from "@/lib/types/forms";
import { cn } from "@/lib/utils";
import { Check, Square, SquareCheckBig } from "lucide-react";
import React from "react";

type Props = {
  block: MultipleChoiceBlock;
};

export default function FillMultipleChoiceOptions({ block }: Props) {
  return (
    <>
      {block.multipleChoiceOptions.map((option, index) => (
        <div key={option.id}>
          {block.blockType === BlockVariant.CHECKBOX && (
            <CustomCheckbox
              isChecked={true}
              onChange={() => {}}
              label={option.text}
            />
          )}
          {/* {block.blockType === BlockVariant.MULTIPLE_CHOICE && (
            <CustomRadio option={option} />
          )} */}
        </div>
      ))}
    </>
  );
}

type CustomCheckboxProps = {
  isChecked: boolean;
  onChange: () => void;
  label?: string;
};

function CustomCheckbox({ isChecked, onChange, label }: CustomCheckboxProps) {
  return (
    <label
      className={cn(
        "mb-2 flex w-full flex-grow cursor-pointer items-center gap-2 rounded-md border-2 border-zinc-200/50 bg-zinc-50 px-4 py-2",
        isChecked && "bg-zinc-100",
      )}
    >
      <input
        type="checkbox"
        checked={isChecked}
        onChange={onChange}
        className="peer sr-only"
        aria-checked={isChecked}
      />
      <div
        className={cn(
          "flex size-5 items-center justify-center rounded-sm transition-all peer-focus-visible:ring-2",
          isChecked
            ? "border-zinc-500 text-zinc-600 peer-focus-visible:ring-zinc-500"
            : "border-gray-400 text-zinc-300 peer-focus-visible:ring-gray-400",
        )}
      >
        {isChecked && <SquareCheckBig />}
        {!isChecked && <Square />}
      </div>
      {label && (
        <span
          className={cn(
            "ml-2 flex-grow select-none text-zinc-500 transition-colors peer-focus-visible:text-zinc-600",
            isChecked && "text-zinc-700",
          )}
        >
          {label}
        </span>
      )}
    </label>
  );
}
