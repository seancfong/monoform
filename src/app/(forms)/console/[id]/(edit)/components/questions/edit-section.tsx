"use client";

import AddBlock from "@/app/(forms)/console/[id]/(edit)/components/blocks/add-block";
import EditBlock from "@/app/(forms)/console/[id]/(edit)/components/blocks/edit-block";
import { BlockProvider } from "@/app/(forms)/console/[id]/(edit)/components/contexts/block-context";
import { useSectionsContext } from "@/app/(forms)/console/[id]/(edit)/components/contexts/sections-context";
import DeleteSection from "@/app/(forms)/console/[id]/(edit)/components/sections/delete-section";
import { FormSection } from "@/lib/types/forms";
import { cn } from "@/lib/utils";
import { motion, Reorder, useDragControls } from "framer-motion";
import isEqual from "lodash.isequal";
import { useEffect, useRef, useState } from "react";

type Props = {
  section: FormSection;
  index: number;
};

export default function EditSection({ section, index }: Props) {
  return (
    <motion.div layout="position" className="flex flex-col gap-2">
      <SectionHeading section={section} sectionIndex={index} />
      <SectionContent section={section} sectionIndex={index} />
    </motion.div>
  );
}

type SectionHeadingProps = {
  section: FormSection;
  sectionIndex: number;
};

function SectionHeading({ section, sectionIndex }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-2 px-1">
      <h2 className="text-sm font-medium tracking-tight text-zinc-400">
        Section {sectionIndex + 1}: {section.title}
      </h2>
      <hr className="flex-grow border-zinc-300" />
    </div>
  );
}

type SectionContentProps = {
  section: FormSection;
  sectionIndex: number;
};

function SectionContent({ section, sectionIndex }: SectionContentProps) {
  const { setReorderingBlockId, setSectionBlocks } = useSectionsContext();

  const [draggingBlocksClone, setDraggingBlocksClone] = useState(
    section.blocks.map((block) => block),
  );

  useEffect(() => {
    setDraggingBlocksClone(section.blocks.map((block) => block));
  }, [section.blocks]);

  const sectionConstraintsRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      layout
      className="space-y-2 rounded-lg bg-zinc-200/25 p-3"
      ref={sectionConstraintsRef}
    >
      <Reorder.Group
        axis="y"
        values={draggingBlocksClone}
        onReorder={(blocks: FormSection["blocks"]) => {
          console.log("reordering");
          setDraggingBlocksClone(blocks);
        }}
        className="space-y-2"
      >
        {draggingBlocksClone.map((block, blockIndex) => (
          <SectionItem
            key={block.id}
            block={block}
            blockIndex={blockIndex}
            sectionIndex={sectionIndex}
            sectionConstraintsRef={sectionConstraintsRef}
            dragEnd={() => {
              setReorderingBlockId(undefined);

              const draftIds = draggingBlocksClone.map((block) => block.id);
              const currentIds = section.blocks.map((block) => block.id);

              if (isEqual(draftIds, currentIds)) {
                console.log("Skipping reordering - no change detected");
                return;
              }

              setSectionBlocks(sectionIndex, draggingBlocksClone);
            }}
          />
        ))}
      </Reorder.Group>
      <div className="relative flex justify-center">
        <AddBlock section={section} />
        <DeleteSection sectionIndex={sectionIndex} />
      </div>
    </motion.div>
  );
}

function SectionItem({
  block,
  blockIndex,
  sectionIndex,
  sectionConstraintsRef,
  dragEnd,
}: {
  block: FormSection["blocks"][number];
  blockIndex: number;
  sectionIndex: number;
  sectionConstraintsRef: React.RefObject<HTMLDivElement>;
  dragEnd: () => void;
}) {
  const controls = useDragControls();
  const { focusedBlockId } = useSectionsContext();

  return (
    <Reorder.Item
      key={block.id}
      value={block}
      dragControls={controls}
      dragListener={false}
      className={cn("relative block", {
        "!z-20 mb-4": focusedBlockId === block.id,
      })}
      dragConstraints={sectionConstraintsRef}
      onDragEnd={dragEnd}
    >
      <BlockProvider
        sectionIndex={sectionIndex}
        blockIndex={blockIndex}
        optimisticBlock={block}
      >
        <EditBlock controls={controls} />
      </BlockProvider>
    </Reorder.Item>
  );
}
