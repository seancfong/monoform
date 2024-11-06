"use client";

import AddBlock from "@/app/(forms)/edit/[id]/components/blocks/add-block";
import EditBlock from "@/app/(forms)/edit/[id]/components/blocks/edit-block";
import { BlockProvider } from "@/app/(forms)/edit/[id]/components/contexts/block-context";
import { FormSection } from "@/lib/types/forms";
import { motion } from "framer-motion";

type Props = {
  section: FormSection;
  index: number;
};

export default function EditSection({ section, index }: Props) {
  return (
    <motion.div layout="position" className="flex flex-col gap-2">
      <SectionHeading section={section} />
      <SectionContent section={section} sectionIndex={index} />
    </motion.div>
  );
}

type SectionHeadingProps = {
  section: FormSection;
};

function SectionHeading({ section }: SectionHeadingProps) {
  return (
    <div className="flex items-center gap-2 px-1">
      <h2 className="text-sm font-medium tracking-tight text-zinc-400">
        {section.title}
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
  return (
    <motion.div layout className="rounded-lg bg-zinc-200/25 p-3">
      <div className="flex flex-col gap-2">
        {section.blocks.map((block, blockIndex) => (
          <BlockProvider
            key={block.id}
            sectionIndex={sectionIndex}
            blockIndex={blockIndex}
            optimisticBlock={block}
          >
            <EditBlock />
          </BlockProvider>
        ))}
      </div>
      <div className="flex justify-center">
        <AddBlock section={section} />
      </div>
    </motion.div>
  );
}
