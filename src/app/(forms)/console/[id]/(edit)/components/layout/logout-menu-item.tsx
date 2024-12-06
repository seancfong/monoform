"use client";

import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/actions/auth/logout/action";
import { LogOut } from "lucide-react";
import React from "react";

type Props = {};

export default function LogoutMenuItem({}: Props) {
  return (
    <DropdownMenuItem
      onClick={() => {
        logout();
      }}
    >
      <LogOut className="mr-3 size-4" />
      <span>Sign out</span>
    </DropdownMenuItem>
  );
}
