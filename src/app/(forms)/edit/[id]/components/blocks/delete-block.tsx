import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import React from "react";

type Props = {};

export default function DeleteBlock({}: Props) {
  return (
    <Button size="icon" variant="ghost">
      <Trash2 className="size-4 text-zinc-400" />
    </Button>
  );
}
