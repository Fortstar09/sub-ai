"use client";

import type { LucideIcon } from "lucide-react";

import { usePathname } from "next/navigation";

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
  const pathname = usePathname();


  return (
    <SidebarGroup className="px-[14px] py-5 group-data-[collapsible=icon]:p-2">
      <SidebarMenu className="flex flex-col gap-2 w-full">
        {items.map((item) => (
          <SidebarMenuItem
            key={item.title}
            className="max-w-[204px] group-data-[collapsible=icon]:max-w-[50px]"
          >
            <SidebarMenuButton
              tooltip={item.title}
              asChild={!!item.url}
              isActive={item.isActive}
            >
              <a
                href={item.url}
                className={` gap-2 rounded-md ${item.url === pathname ? "bg-[#EDEEF0]" : "hover:bg-[#EDEEF0]"}`}
              >
                <item.icon color={`${item.url === pathname ? "#072206" : "#667185"}`} strokeWidth={2} size={16}/>
                <span className={`text-sm text-black1 ${item.url === pathname ? "font-semibold" : "font-medium"}`}>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
