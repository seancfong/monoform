import { useBlockContext } from "@/app/(forms)/console/[id]/(edit)/components/contexts/block-context";
import { BlockVariant } from "@/db/schema";
import { useDebounce } from "@/lib/hooks/useDebounce";
import { BlockVariantUnion, FormBlock } from "@/lib/types/forms";
import { produce } from "immer";
import { startTransition, useEffect, useRef } from "react";

const HEADER_PLACEHOLDER = "# Title\nDescription" as const;
const MULTIPLE_CHOICE_PLACEHOLDER =
  "# Question text\nDescription of the question with _italics_ or **bold**\n- Bullet point" as const;

export default function HeaderBlocks({
  blockDraft,
  refocusBlock,
}: {
  blockDraft: FormBlock;
  refocusBlock?: () => void;
}) {
  const { setBlockDraft, setIsStale } = useBlockContext();

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      const lineHeight =
        parseInt(window.getComputedStyle(textarea).lineHeight, 10) ?? 20;
      textarea.style.height = `${textarea.scrollHeight + lineHeight}px`;
    }
  };

  const debouncedResize = useDebounce(adjustHeight, 50);

  useEffect(() => {
    debouncedResize();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [blockDraft.text]);

  useEffect(() => {
    adjustHeight();
  }, []);

  return (
    <div className="font-medium tracking-tight sm:px-5">
      <p className="font-mono text-xs tracking-tight text-zinc-300">Markdown</p>
      <textarea
        className="w-full rounded-sm bg-zinc-200/50 p-2 pb-0 font-mono text-zinc-600 placeholder:text-zinc-300"
        placeholder={
          [BlockVariant.MULTIPLE_CHOICE, BlockVariant.CHECKBOX].includes(
            blockDraft.blockType,
          )
            ? MULTIPLE_CHOICE_PLACEHOLDER
            : HEADER_PLACEHOLDER
        }
        defaultValue={blockDraft.text}
        onChange={(e) => {
          startTransition(() => {
            setIsStale(true);
            setBlockDraft(
              produce(blockDraft as BlockVariantUnion, (draft) => {
                draft.text = e.target.value;
              }),
            );
          });
        }}
        onBlur={(e) => {
          e.stopPropagation();

          if (refocusBlock) {
            refocusBlock();
          }
        }}
        rows={1}
        ref={textareaRef}
      />
    </div>
  );
}
