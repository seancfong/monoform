import { Button } from "@/components/ui/button";
import { MultipleChoiceBlock } from "@/lib/types/forms";
import { cn } from "@/lib/utils";
import { motion, Reorder, useDragControls } from "framer-motion";
import { Circle, GripVertical, X } from "lucide-react";
import { Dispatch, forwardRef, SetStateAction } from "react";

type Props = {
  index: number;
  option: MultipleChoiceBlock["multipleChoiceOptions"][number];
  draggingId: string | undefined;
  setDraggingId: Dispatch<SetStateAction<string | undefined>>;
  deleteOption: () => void;
  onBlur: (e: React.FocusEvent<HTMLInputElement>) => void;
};

const MultipleChoiceOption = forwardRef<HTMLInputElement, Props>(
  (
    { index, option, draggingId, setDraggingId, deleteOption, onBlur }: Props,
    ref,
  ) => {
    const controls = useDragControls();

    return (
      <Reorder.Item
        value={option}
        dragControls={controls}
        dragListener={false}
        className={cn("cursor-auto", {
          relative: draggingId === option.id,
        })}
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
            onPointerUp={() => {
              setDraggingId(undefined);
            }}
            className={cn("cursor-grab text-zinc-300 opacity-0", {
              "opacity-100": draggingId === option.id,
              "group-hover/option:opacity-100": !draggingId,
              "cursor-grabbing": draggingId,
            })}
            tabIndex={-1}
          >
            <GripVertical className="size-5" />
          </button>
          <div className="flex w-full items-center gap-2 rounded-md border-1 border-zinc-200 bg-zinc-50 px-4 py-2">
            <Circle className="size-5 text-zinc-300" />
            <input
              type="text"
              name="new-option"
              className="w-full bg-transparent text-zinc-600 outline-none placeholder:text-zinc-300"
              placeholder={`Option ${index + 1}`}
              ref={ref}
              defaultValue={option.text}
              onBlur={onBlur}
              autoFocus
              autoComplete="off"
            />
          </div>
          <Button
            className="h-fit w-fit p-1"
            variant="ghost"
            onClick={deleteOption}
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
