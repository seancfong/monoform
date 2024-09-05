import { Button } from "@/components/ui/button";
import { Bell } from "lucide-react";
import React from "react";

type Props = {};

export default function NotificationMenu({}: Props) {
  return (
    <Button variant="ghost" size="icon" className="size-fit p-2">
      <Bell className="size-5 text-zinc-400" />
    </Button>
  );
}
