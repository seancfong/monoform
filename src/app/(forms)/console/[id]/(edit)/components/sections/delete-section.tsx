import { useSectionsContext } from "@/app/(forms)/console/[id]/(edit)/components/contexts/sections-context";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";

type Props = {
  sectionIndex: number;
};

export default function DeleteSection({ sectionIndex }: Props) {
  const { deleteSection } = useSectionsContext();

  return (
    <Button
      size="icon"
      variant="ghost"
      className="absolute right-0 top-1/2 -translate-y-1/2"
      onClick={() => deleteSection(sectionIndex)}
    >
      <Trash2 className="size-4 text-zinc-500" />
    </Button>
  );
}
