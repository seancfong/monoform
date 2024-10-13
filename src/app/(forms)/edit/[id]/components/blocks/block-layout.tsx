import ChangeBlock from "@/app/(forms)/edit/[id]/components/blocks/change-block";
import { FormBlock } from "@/lib/types/forms";
import React from "react";

type Props = {
  children: React.ReactNode;
  block: FormBlock;
};

export default function BlockLayout({ children, block }: Props) {
  return (
    <div className="w-full rounded-md border-1 border-zinc-200 bg-zinc-50 p-2">
      <ChangeBlock block={block} />
      {children}
    </div>
  );
}
