"use client";

import { useUser } from "@/app/context/UserContext";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavUser() {
  const { user } = useUser();
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton size="lg">
          <span className="text-base font-semibold text-white bg-green-600 rounded-full flex items-center justify-center w-8 h-8">
            {user?.name ? user.name[0].toUpperCase() : "S"}
          </span>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">{user?.name ?? ""}</span>
            <span className="truncate text-xs">{user?.email ?? ""}</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
