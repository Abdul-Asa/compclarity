import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";
import { User } from "@/lib/validation/types";
import { Badge } from "@/components/ui/badge";
import { SignOutButton } from "./sign-out";
import { MessageSquare, Settings, User2 } from "lucide-react";
import { capitalize } from "@/lib/utils";

export function AccountMenu({ user }: { user: User }) {
  const fullName = capitalize(user.first_name, user.last_name);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size={"lg"}>
          Account
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[240px] rounded-sm" sideOffset={10} align="end">
        <DropdownMenuLabel>
          <div className="flex justify-between items-center">
            <div className="flex flex-col">
              <span className="truncate line-clamp-1 max-w-[155px] block">{fullName ? fullName : "New User"}</span>
              <span className="truncate text-xs text-[#606060] font-normal">{user.email}</span>
            </div>
            <Badge variant="outline">Beta</Badge>
          </div>
        </DropdownMenuLabel>

        <DropdownMenuSeparator />

        {/* <DropdownMenuGroup>
          <Link prefetch href="/account">
            <DropdownMenuItem>
              <User2 className="w-4 h-4" /> Profile
            </DropdownMenuItem>
          </Link>

          <DropdownMenuItem>
            <MessageSquare className="w-4 h-4" /> Feedback
          </DropdownMenuItem>

          <Link prefetch href="/account">
            <DropdownMenuItem>
              <Settings className="w-4 h-4" /> Settings
            </DropdownMenuItem>
          </Link>
        </DropdownMenuGroup> */}

        {/* <DropdownMenuSeparator /> */}

        <SignOutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
