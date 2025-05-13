"use client"
import type * as React from "react"
import {CircleUserRound, History, Plus, Settings, Star } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
// import Image from "next/image"
import { NavMain } from "./nav-main"
import { NavUser } from "./nav-user"
import Image from "next/image"

// Menu items.
const data = {
  navMain: [
    {
      title: "New",
      url: "#",
      icon: Plus,
    },
    {
      title: "History",
      url: "#",
      icon: History,
    },
    {
      title: "Starred",
      url: "#",
      icon: Star,
    },
    {
      title: "Settings",
      url: "#",
      icon: Settings,
    },
    {
      title: "Profile",
      url: "#",
      icon: CircleUserRound,
    },
  ],
}

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user: {
    name: string;
    email: string;
    avatar: string;
  };
}

export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
    <SidebarHeader className=" flex justify-center items-start border-b group-data-[collapsible=icon]:items-center px-[14px] py-5 group-data-[collapsible=icon]:p-0 group-data-[collapsible=icon]:py-4">
    <span className="flex juustify-center items-center gap-2">
    <Image src='/logo/logo.svg' alt='logo' width={24} height={24} className=""  />
    <p className="text-sm font-semibold text-brand group-data-[collapsible=icon]:hidden">sub-ai</p>
    </span>
    </SidebarHeader>
    <SidebarContent>
      <NavMain items={data.navMain} />
    </SidebarContent>
    <SidebarFooter>
      <NavUser user={user} />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
  )
}
