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
  CompassIcon,
  LandmarkIcon,
  LayoutDashboard,
  GraduationCap,
  Users,
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
import { ThemeToggleButton } from "../ui/theme-toggle";
const sidebarData = {
  admin: [
    {
      name: "Overview",
      url: "/admin",
      title: "Overview",
      icon: LayoutDashboard,
    },
    {
      name: "Courses",
      url: "/admin/courses",
      title: "Manage courses",
      icon: TvMinimalPlay,
    },
    {
      name: "Revenue",
      url: "/admin/revenue",
      title: "Manage communications",
      icon: LandmarkIcon,
    },
    {
      name: "Students",
      url: "/admin/students",
      title: "Manage students",
      icon: GraduationCap,
    },
    {
      name: "Instructors",
      url: "/admin/instructors",
      title: "Manage instructors",
      icon: Users,
    },
    { name: "Tools", url: "/admin/tools", title: "Useful tools", icon: Wrench },
    {
      name: "Resources",
      url: "/admin/resources",
      title: "Useful resources",
      icon: CircleHelp,
    },
    {
      name: "Settings",
      url: "/admin/settings",
      title: "Adjust settings",
      icon: Settings,
    },
  ],
  instructor: [
    {
      name: "Courses",
      url: "/instructor/courses",
      title: "Your instructor courses",
      icon: TvMinimalPlay,
    },
    {
      name: "Performance",
      url: "/instructor/performance",
      title: "View your performance",
      icon: Activity,
    },
    {
      name: "Communication",
      url: "/instructor/communication",
      title: "Manage communications",
      icon: Mails,
    },
    {
      name: "Earnings",
      url: "/instructor/earnings",
      title: "Track your earnings",
      icon: HandCoins,
    },
    {
      name: "Tools",
      url: "/instructor/tools",
      title: "Useful tools",
      icon: Wrench,
    },
    {
      name: "Resources",
      url: "/instructor/resources",
      title: "Useful resources",
      icon: CircleHelp,
    },
    {
      name: "Settings",
      url: "/instructor/settings",
      title: "Adjust settings",
      icon: Settings,
    },
  ],
  student: [
    {
      name: "My Courses",
      url: "/learn/courses",
      title: "Your enrolled courses",
      icon: TvMinimalPlay,
    },
    {
      name: "Browse Courses",
      url: "/courses",
      title: "browse available courses",
      icon: CompassIcon,
    },
    {
      name: "Performance",
      url: "/learn/performance",
      title: "View your performance",
      icon: Activity,
    },
    {
      name: "Learning Tools",
      url: "/learn/tools",
      title: "Learning tools",
      icon: Wrench,
    },
    {
      name: "Resources",
      url: "/learn/resources",
      title: "Access resources",
      icon: CircleHelp,
    },
    {
      name: "Settings",
      url: "/learn/settings",
      title: "Adjust settings",
      icon: Settings,
    },
  ],
};

interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: sessionUser | undefined;
  path: "admin" | "instructor" | "student";
}
//TODO: Pass user props to AppSidebarProps
export function AppSidebar({ user, path, ...props }: AppSidebarProps) {
  const navItems = React.useMemo(() => sidebarData[path], [path]);
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-[#F8F9FA] dark:bg-black transition-colors duration-300 border-b border-input h-20 shadow dark:shadow-gray-600">
        <NavUser user={user} />
      </SidebarHeader>
      <SidebarContent className="dark:bg-none dark:bg-indigo-950/50  bg-gradient-to-b from-indigo-100 via-gray-50 to-indigo-100 transition-colors duration-300 border-r border-input">
        <NavItems items={navItems} />
      </SidebarContent>
      <SidebarFooter className="border-t  border-input dark:bg-background">
        <ThemeToggleButton className="md:hidden mx-auto" />
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
