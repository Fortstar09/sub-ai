"use client";

import { useUser } from "@/app/context/UserContext";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavUser() {
  const { user } = useUser();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg" className="cursor-pointer">
          <Link
            href="/setting"
            className="flex gap-3 items-center w-full"
          >
            <span className="text-base font-semibold text-white bg-green-600 rounded-full flex items-center justify-center w-8 h-8">
              {user?.username ? user.username[0].toUpperCase() : user?.name[0].toUpperCase()}
            </span>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">{user?.name ?? ""}</span>
              <span className="truncate text-xs dark:text-[#98A2B3F5]">
                {user?.email ?? ""}
              </span>
            </div>
          </Link>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
