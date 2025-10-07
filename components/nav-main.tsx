"use client";

import type { LucideIcon } from "lucide-react";

import { usePathname } from "next/navigation";

import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useTheme } from "@/app/context/ThemeContext";

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
  const {theme} = useTheme();


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
                className={` gap-2 rounded-md ${item.url === pathname ? "bg-[#EDEEF0] dark:bg-[#1B1C20]" : "hover:bg-[#EDEEF0] dark:hover:bg-[#1B1C20]"} flex items-center px-3 py-2 transition-colors`}
              >
                <item.icon color={`${item.url === pathname ? theme === 'dark' ? '#FFFFFF' : '#072206' : "#667185"}`} strokeWidth={2} size={16}/>
                <span className={`text-sm text-black1 dark:text-white  ${item.url === pathname ? "font-semibold" : "font-medium"}`}>{item.title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
