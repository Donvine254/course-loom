"use client";

import * as React from "react";
// import {
//   Activity,
//   Box,
//   FileText,
//   Landmark,
//   LayoutDashboard,
//   LucideTruck,
//   PieChart,
//   Settings,
//   Users,
// } from "lucide-react";

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

import Link from "next/link";

// This is sample data.
// const data = {
//   items: [
//     {
//       name: "Courses",
//       url: "/admin/courses",
//       title: "Overview",
//       icon: LayoutDashboard,
//     },
//     {
//       name: "Deliveries",
//       url: "/admin/dashboard/deliveries",
//       title: "Manage Deliveries",
//       icon: Box,
//     },
//     {
//       name: "Invoices",
//       url: "/admin/dashboard/invoices",
//       title: "Manage Invoices",
//       icon: FileText,
//     },
//     {
//       name: "Customers",
//       url: "/admin/dashboard/customers",
//       title: "Manage Customers",
//       icon: Users,
//     },
//     {
//       name: "Web Analytics",
//       url: "https://vercel.com/donvine254s-projects/sendit/analytics",
//       title: "View website performance",
//       icon: Activity,
//       target: "_blank",
//     },
//     {
//       name: "Riders",
//       url: "#",
//       title: "Manage Riders",
//       icon: LucideTruck,
//     },
//     {
//       name: "Finances",
//       url: "https://dashboard.stripe.com/test/payments",
//       title: "Manage Finances",
//       icon: Landmark,
//       target: "_blank",
//     },
//     {
//       name: "Sales & Marketing",
//       title: "Sales & Marketing",
//       url: "#",
//       icon: PieChart,
//     },
//     {
//       name: "Settings",
//       title: "Adjust settings",
//       url: "/admin/dashboard/settings",
//       icon: Settings,
//     },
//   ],
// };
// interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
//   user?: UserJSON | null;
// }
//TODO: Pass user props to AppSidebarProps
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader className="bg-[#F8F9FA] dark:bg-black transition-colors duration-300 border-b border-input h-20">
        {/* <NavUser user={user} /> */}
      </SidebarHeader>
      <SidebarContent className="dark:bg-none  bg-gradient-to-b from-[#f6faff] via-[#f8f9fa] to-[#eaf3ff]  transition-colors duration-300 border-r border-input">
        {/* <NavItems items={data.items} /> */}
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
