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
      url: "/dashboard",
      icon: Plus,
    },
    {
      title: "History",
      url: "/history",
      icon: History,
    },
    {
      title: "Starred",
      url: "/starred",
      icon: Star,
    },
    {
      title: "Settings",
      url: "/setting",
      icon: Settings,
    },
    {
      title: "Profile",
      url: "/profile",
      icon: CircleUserRound,
    },
  ],
}


type AppSidebarProps = React.ComponentProps<typeof Sidebar>;

export function AppSidebar({ ...props }: AppSidebarProps) {

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
      <NavUser />
    </SidebarFooter>
    <SidebarRail />
  </Sidebar>
  )
}
