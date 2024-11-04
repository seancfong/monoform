import { useSectionsContext } from "@/app/(forms)/edit/[id]/components/contexts/sections-context";
import { MultipleChoiceBlock } from "@/lib/types/forms";
import { useState } from "react";

type Props = {
  block: MultipleChoiceBlock;
};

export default function EditBlockMultipleChoice({ block }: Props) {
  return (
    <div>
      <MultipleChoiceHeader block={block} />
      {block.description && (
        <p className="text-sm font-medium tracking-tight text-zinc-400">
          {block.description}
        </p>
      )}
      <div className="flex max-w-80 flex-col pr-12">
        {block.multipleChoiceOptions.map((option) => (
          <MultipleChoiceOption key={option.id} option={option} />
        ))}
        <AddOption block={block} />
      </div>
    </div>
  );
}

const QUESTION_PLACEHOLDER = "Untitled Question" as const;

function MultipleChoiceHeader({ block }: { block: MultipleChoiceBlock }) {
  const [isEditing, setIsEditing] = useState(false);

  const {} = useSectionsContext();

  const updateTitle = () => {
    console.log("update title");

    setIsEditing(false);
  };

  return (
    <div
      className="text-lg font-medium tracking-tight"
      onBlur={() => {
        updateTitle();
      }}
    >
      {isEditing ? (
        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateTitle();
          }}
        >
          <input
            className="w-full bg-transparent text-zinc-600 placeholder:text-zinc-300"
            defaultValue={block.text}
            placeholder={QUESTION_PLACEHOLDER}
            autoFocus
          />
        </form>
      ) : (
        <button onClick={() => setIsEditing(true)}>
          {block.text ? (
            <span className="text-zinc-600">{block.text}</span>
          ) : (
            <span className="text-zinc-300">{QUESTION_PLACEHOLDER}</span>
          )}
        </button>
      )}
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

function AddOption({ block }: { block: MultipleChoiceBlock }) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="rounded-sm border-1 border-zinc-200 tracking-tight text-zinc-300">
      {isEditing ? (
        <form
          onSubmit={(e) => {
            console.log("add optino");
            e.preventDefault();
          }}
        >
          <input
            className="w-full rounded-sm text-zinc-600 placeholder:text-zinc-300"
            placeholder="Add Option"
            autoFocus
          />
        </form>
      ) : (
        <button onClick={() => setIsEditing(true)}>Add Option</button>
      )}
    </div>
  );
}
