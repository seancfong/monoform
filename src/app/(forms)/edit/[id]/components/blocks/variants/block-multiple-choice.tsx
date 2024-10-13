import { useSectionsContext } from "@/app/(forms)/edit/[id]/components/contexts/sections-context";
import { FormBlock } from "@/lib/types/forms";
import React from "react";

type Props = {
  block: FormBlock;
};

export default function BlockMultipleChoice({ block }: Props) {
  const {} = useSectionsContext();

  return <div>BlockMultipleChoice</div>;
}
