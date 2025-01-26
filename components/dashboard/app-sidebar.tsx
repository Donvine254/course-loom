"use client";

import * as React from "react";
import {
  Activity,
  Box,
  FileText,
  Landmark,
  LayoutDashboard,
  LucideTruck,
  PieChart,
  Settings,
  Users,
} from "lucide-react";

// import { NavItems } from "./nav-items";
// import { NavUser } from "./nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import {ThemeToggleButton} from "../ui/theme-toggle";
import Link from "next/link";
import { UserJSON } from "@clerk/nextjs/server";

// This is sample data.
const data = {
  items: [
    {
      name: "Overview",
      url: "/admin/dashboard",
      title: "Overview",
      icon: LayoutDashboard,
    },
    {
      name: "Deliveries",
      url: "/admin/dashboard/deliveries",
      title: "Manage Deliveries",
      icon: Box,
    },
    {
      name: "Invoices",
      url: "/admin/dashboard/invoices",
      title: "Manage Invoices",
      icon: FileText,
    },
    {
      name: "Customers",
      url: "/admin/dashboard/customers",
      title: "Manage Customers",
      icon: Users,
    },
    {
      name: "Web Analytics",
      url: "https://vercel.com/donvine254s-projects/sendit/analytics",
      title: "View website performance",
      icon: Activity,
      target: "_blank",
    },
    {
      name: "Riders",
      url: "#",
      title: "Manage Riders",
      icon: LucideTruck,
    },
    {
      name: "Finances",
      url: "https://dashboard.stripe.com/test/payments",
      title: "Manage Finances",
      icon: Landmark,
      target: "_blank",
    },
    {
      name: "Sales & Marketing",
      title: "Sales & Marketing",
      url: "#",
      icon: PieChart,
    },
    {
      name: "Settings",
      title: "Adjust settings",
      url: "/admin/dashboard/settings",
      icon: Settings,
    },
  ],
};
interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  user?: UserJSON;
}
export function AppSidebar({ user, ...props }: AppSidebarProps) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-[#F8F9FA] dark:bg-black transition-colors duration-300 border-b border-input h-20">
        {/* <NavUser user={user} /> */}
      </SidebarHeader>
      <SidebarContent className="dark:bg-none  bg-gradient-to-b from-[#f6faff] via-[#f8f9fa] to-[#eaf3ff]  transition-colors duration-300 border-r border-input">
        {/* <NavItems items={data.items} /> */}
      </SidebarContent>
      <SidebarFooter className="border-t  border-input">
        <ThemeToggleButton />
        <Link
          href="/"
          prefetch={false}
          className="flex items-center gap-1 text-indigo-600 space-x-2 mb-8 md:mb-0">
          <Image
            src="https://res.cloudinary.com/dipkbpinx/image/upload/v1737068784/logos/uxdt5wtwbk0qctgm5qbe.png"
            height={32}
            width={32}
            alt="Course Loom"
            priority
            className="h-8 w-8 xsm:h-6 xsm:w-6 "
          />
        </Link>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
