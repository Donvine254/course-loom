"use client";

import * as React from "react";
import {
  Activity,
  TvMinimalPlay,
  Settings,
  Mails,
  HandCoins,
  Wrench,
  CircleHelp,
} from "lucide-react";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";

import Link from "next/link";
import { sessionUser } from "@/types";
import { NavUser } from "./nav-user";
import { NavItems } from "./nav-items";

const data = {
  items: [
    {
      name: "Courses",
      url: "/admin/courses",
      title: "Your courses",
      icon: TvMinimalPlay,
    },
    {
      name: "Communication",
      url: "/admin/communication",
      title: "Manage communications",
      icon: Mails,
    },
    {
      name: "Performance",
      url: "/admin/performance",
      title: "View performance",
      icon: Activity,
    },
    {
      name: "Earnings",
      url: "/admin/earnings",
      title: "view your earnings",
      icon: HandCoins,
    },
    {
      name: "Tools",
      url: "/admin/earnings",
      title: "Useful tools",
      icon: Wrench,
    },
    {
      name: "Resources",
      url: "/admin/resources",
      title: "Useful resources",
      icon: CircleHelp,
    },

    {
      name: "Settings",
      title: "Adjust settings",
      url: "/admin/settings",
      icon: Settings,
    },
  ],
};
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: sessionUser | undefined;
}
//TODO: Pass user props to AppSidebarProps
export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-[#F8F9FA] dark:bg-black transition-colors duration-300 border-b border-input h-20">
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent className="dark:bg-none  bg-gradient-to-b from-[#f6faff] via-[#f8f9fa] to-[#eaf3ff]  transition-colors duration-300 border-r border-input">
        <NavItems items={data.items} />
      </SidebarContent>
      <SidebarFooter className="border-t  border-input">
        <Link
          href="/"
          prefetch={false}
          className="flex items-center gap-2 text-indigo-600 mb-8 md:mb-0 xsm:hidden">
          <Image
            src="https://res.cloudinary.com/dipkbpinx/image/upload/v1737068784/logos/uxdt5wtwbk0qctgm5qbe.png"
            width={24}
            height={24}
            alt="Course Loom"
            priority
            className="h-6 w-6"
          />
          <span className="block group-has-[[data-collapsible=icon]]/sidebar-wrapper:hidden">
            CourseLoom
          </span>
        </Link>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
