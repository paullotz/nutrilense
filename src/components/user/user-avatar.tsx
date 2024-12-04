"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { signOut } from "@/lib/auth-client";

export const UserAvatar = ({ session }: { session: any }) => {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarImage src="" alt="avatar" className="object-contain" />
          <AvatarFallback>
            {session.user.name &&
              session.user.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
            router.push("/profile");
          }}
        >
          Profile
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => {
            signOut();
            router.push("/signin");
          }}
          className="flex flex-row"
        >
          <LogOut className="h-4 w-4" />
          <span>Signout</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
