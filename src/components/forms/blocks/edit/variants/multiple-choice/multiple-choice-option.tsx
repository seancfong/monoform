import { useBlockContext } from "@/app/(forms)/console/[id]/(edit)/components/contexts/block-context";
import { Button } from "@/components/ui/button";
import { BlockVariant } from "@/db/schema";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { MultipleChoiceBlock } from "@/lib/types/forms";
import { cn } from "@/lib/utils";
import { motion, Reorder, useDragControls } from "framer-motion";
import { produce } from "immer";
import { Circle, GripVertical, Square, X } from "lucide-react";
import { Dispatch, forwardRef, SetStateAction, useEffect, useRef } from "react";

type Props = {
  index: number;
  option: MultipleChoiceBlock["multipleChoiceOptions"][number];
  draggingId: string | undefined;
  setDraggingId: Dispatch<SetStateAction<string | undefined>>;
  blockDraft: MultipleChoiceBlock;
  constraintRef: React.RefObject<HTMLDivElement>;
  deleteOption: () => void;
  shouldFocusNewOption: boolean;
};

const MultipleChoiceOption = forwardRef<HTMLButtonElement, Props>(
  (
    {
      index,
      option,
      draggingId,
      setDraggingId,
      blockDraft,
      deleteOption,
      constraintRef,
      shouldFocusNewOption,
    }: Props,
    ref,
  ) => {
    const controls = useDragControls();
    const { setIsStale, setBlockDraft } = useBlockContext();

    const inputRef = useRef<HTMLInputElement>(null);

    const debounceUpdate = useDebounce(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setIsStale(true);

        setBlockDraft(
          produce(blockDraft, (draft) => {
            draft.multipleChoiceOptions[index].text = e.target.value;
          }),
        );
      },
      50,
    );

    useEffect(() => {
      if (shouldFocusNewOption && inputRef.current) {
        inputRef.current.focus();
      }
    }, [shouldFocusNewOption]);

    return (
      <Reorder.Item
        value={option}
        dragControls={controls}
        dragListener={false}
        className={cn("cursor-auto", {
          relative: draggingId === option.id,
        })}
        dragConstraints={constraintRef}
        onDragEnd={() => {
          setDraggingId(undefined);
        }}
      >
        <motion.div
          layout
          className="group/option flex select-none items-center gap-1"
        >
          <button
            onPointerDown={(e) => {
              setDraggingId(option.id);
              controls.start(e);
            }}
            style={{
              touchAction: "none",
            }}
            className={cn("cursor-grab text-zinc-300 md:opacity-0", {
              "opacity-100": draggingId === option.id,
              "group-hover/option:opacity-100": !draggingId,
              "cursor-grabbing": draggingId,
            })}
            tabIndex={-1}
          >
            <GripVertical className="size-5" />
          </button>
          <div className="flex w-full items-center gap-2 rounded-md border-2 border-zinc-200/50 bg-zinc-50 px-4 py-2">
            {blockDraft.blockType === BlockVariant.CHECKBOX && (
              <Square className="size-6 text-zinc-300" />
            )}
            {blockDraft.blockType === BlockVariant.MULTIPLE_CHOICE && (
              <Circle className="size-6 text-zinc-300" />
            )}
            <input
              type="text"
              name="new-option"
              className="w-full bg-transparent text-zinc-600 outline-none placeholder:text-zinc-300"
              placeholder={`Option ${index + 1}`}
              defaultValue={option.text}
              onChange={debounceUpdate}
              onBlur={(e) => {
                e.stopPropagation();
              }}
              autoComplete="off"
              ref={inputRef}
            />
          </div>
          <Button
            className="h-fit w-fit p-1"
            variant="ghost"
            onClick={deleteOption}
            ref={ref}
          >
            <X className="size-4 text-zinc-300" />
          </Button>
        </motion.div>
      </Reorder.Item>
    );
  },
);
MultipleChoiceOption.displayName = "MultipleChoiceOption";

export default MultipleChoiceOption;
