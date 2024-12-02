import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { validateUser } from "@/lib/auth/validate-user";
import React from "react";

type Props = {};

export default async function UserAvatar({}: Props) {
  const { user } = await validateUser();

  return (
    <Avatar className="size-9">
      <AvatarFallback>{user.email.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  );
}
