import LogoutMenuItem from "@/app/(forms)/console/[id]/(edit)/components/layout/logout-menu-item";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { validateUser } from "@/lib/auth/validate-user";
import { Diamond, User } from "lucide-react";
import Link from "next/link";

type Props = {};

export default async function UserAvatar({}: Props) {
  const { user } = await validateUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="rounded-full">
        <Avatar className="size-9 border-1 border-zinc-200">
          <AvatarFallback className="font-mono font-medium text-zinc-500">
            {user.email.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="min-w-56 pt-2">
        <DropdownMenuLabel className="pb-1 pt-2 text-base leading-none">
          Untitled User
        </DropdownMenuLabel>
        <span className="block px-2 pb-2 text-sm font-light leading-none text-zinc-400">
          {user.email}
        </span>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/settings">
            <User className="mr-3 size-4" />
            <span>Account Settings</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/">
            <Diamond className="mr-3 size-4" />
            <span>Home Page</span>
          </Link>
        </DropdownMenuItem>
        <LogoutMenuItem />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
