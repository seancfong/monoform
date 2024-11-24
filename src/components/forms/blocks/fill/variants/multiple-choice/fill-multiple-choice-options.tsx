/* eslint-disable jsx-a11y/role-supports-aria-props */
"use client";

import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { BlockVariant } from "@/db/schema";
import { MultipleChoiceBlock } from "@/lib/types/forms";
import { cn } from "@/lib/utils";
import { produce } from "immer";
import { Circle, CircleCheckBig, Square, SquareCheckBig } from "lucide-react";
import React from "react";
import { Control, ControllerRenderProps, FieldValues } from "react-hook-form";

type Props<T> = {
  block: MultipleChoiceBlock;
  control: Control<FieldValues, T>;
};

export default function FillMultipleChoiceOptions<T>({
  block,
  control,
}: Props<T>) {
  return (
    <>
      {block.blockType === BlockVariant.CHECKBOX && (
        <FormField<Record<string, string[]>>
          control={control}
          name={block.id}
          render={({ field }) => {
            return (
              <>
                {block.multipleChoiceOptions.map((option) => (
                  <MultipleChoiceItem
                    key={option.id}
                    label={option.text}
                    isChecked={field.value?.includes(option.id) ?? false}
                    containsAnswer={field.value?.length > 0}
                  >
                    <MultipleChoiceInput
                      type="checkbox"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const checked = e.target.checked;

                        const newValue: string[] = checked
                          ? produce(field.value ?? [], (draft) => {
                              draft.push(option.id);
                            })
                          : produce(field.value ?? [], (draft) => {
                              if (block.required && draft.length === 1) return;

                              draft.splice(draft.indexOf(option.id), 1);
                            });

                        field.onChange(newValue);
                      }}
                      checkedIcon={<SquareCheckBig />}
                      uncheckedIcon={<Square />}
                    />
                  </MultipleChoiceItem>
                ))}
                <FormMessage />
              </>
            );
          }}
        />
      )}
      {block.blockType === BlockVariant.MULTIPLE_CHOICE && (
        <FormField<Record<string, string>>
          control={control}
          name={block.id}
          render={({ field }) => {
            return (
              <>
                {block.multipleChoiceOptions.map((option) => (
                  <MultipleChoiceItem
                    key={option.id}
                    label={option.text}
                    isChecked={field.value?.includes(option.id) ?? false}
                    containsAnswer={field.value !== undefined}
                  >
                    <MultipleChoiceInput
                      type="radio"
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        const checked = e.target.checked;

                        const uncheckedValue = block.required
                          ? field.value
                          : undefined;

                        const newValue = checked ? option.id : uncheckedValue;

                        field.onChange(newValue);
                      }}
                      className="peer sr-only"
                      checkedIcon={<CircleCheckBig className="rounded-full" />}
                      uncheckedIcon={<Circle />}
                    />
                  </MultipleChoiceItem>
                ))}
                {!block.required && field.value !== undefined && (
                  <button
                    className="font-mono text-xs tracking-tight text-zinc-400"
                    onClick={() => field.onChange(undefined)}
                  >
                    Reset
                  </button>
                )}
                <FormMessage />
              </>
            );
          }}
        />
      )}
    </>
  );
}

type MultipleChoiceItemProps = {
  isChecked: boolean;
  label: string;
  children: React.ReactElement;
  containsAnswer: boolean;
};

function MultipleChoiceItem({
  isChecked,
  label,
  children,
  containsAnswer,
}: MultipleChoiceItemProps) {
  const input = React.cloneElement(children, {
    isChecked,
  });

  return (
    <FormItem>
      <label
        className={cn(
          "group/label mb-2 flex w-full flex-grow cursor-pointer items-center gap-2 rounded-md border-2 border-zinc-200/50 bg-zinc-50 px-4 py-2 active:bg-zinc-200/25",
          isChecked && "bg-zinc-200/25",
        )}
      >
        {input}
        <span
          className={cn(
            "ml-2 flex-grow select-none text-zinc-500 transition-colors peer-focus-visible:text-zinc-600",
            isChecked && "text-zinc-800",
            containsAnswer && !isChecked && "text-zinc-400",
            containsAnswer && isChecked && "text-zinc-600",
          )}
        >
          {label}
        </span>
      </label>
    </FormItem>
  );
}

interface MultipleChoiceInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  isChecked?: boolean;
  checkedIcon: React.ReactElement;
  uncheckedIcon: React.ReactElement;
  type: "checkbox" | "radio";
}

function MultipleChoiceInput({
  isChecked = false,
  checkedIcon,
  uncheckedIcon,
  type,
  ...props
}: MultipleChoiceInputProps) {
  const checkedIconElement = React.cloneElement(checkedIcon, {
    className: "group-active/label:scale-90",
  });
  const uncheckedIconElement = React.cloneElement(uncheckedIcon, {
    className: "group-active/label:scale-90",
  });

  return (
    <>
      <input
        type={type}
        checked={isChecked}
        aria-checked={isChecked}
        className="peer sr-only"
        {...props}
      />
      <div
        className={cn(
          "flex size-5 items-center justify-center rounded-sm transition-all peer-focus-visible:ring-2",
          isChecked
            ? "border-zinc-500 text-zinc-600 peer-focus-visible:ring-zinc-500"
            : "border-gray-400 text-zinc-300 peer-focus-visible:ring-gray-400",
        )}
      >
        <>
          {isChecked && checkedIconElement}
          {!isChecked && uncheckedIconElement}
        </>
      </div>
    </>
  );
}
