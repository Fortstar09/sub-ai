"use client";

import type { LucideIcon } from "lucide-react";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

export function NavMain({
  items,
}: {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
    isActive?: boolean;
    items?: {
      title: string;
      url: string;
    }[];
  }[];
}) {
  return (
    <SidebarGroup className="px-[14px] py-5 group-data-[collapsible=icon]:p-2">
      <SidebarMenu className="flex flex-col gap-2">
        {items.map((item) => (
          <SidebarMenuItem key={item.title} className={` rounded-[8px] ${item.isActive ? "bg-brand" : "bg-[#EDEEF0]"} hover:bg-gray-600`}>
            <SidebarMenuButton
              tooltip={item.title}
              asChild={!!item.url}
              isActive={item.isActive}
            >
              <a href={item.url} className="text-black1 gap-2"> 
                <item.icon />
                <span>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
