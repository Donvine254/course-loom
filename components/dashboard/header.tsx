
import React from "react";
import { SidebarHeader, SidebarTrigger } from "../ui/sidebar";
import { Separator } from "../ui/separator";
import { Bell } from "lucide-react";
import { sessionUser } from "@/types";
import { ThemeSwitch } from "./theme-switch";
import Link from "next/link";
import RoleSwitchButton from "./role-switch";
export default function Header({ user }: { user?: sessionUser }) {

  return (
    <SidebarHeader className="fixed top-0 h-20 z-10 bg-white dark:bg-black transition-colors duration-300 w-full border-b border-input shadow dark:shadow-gray-600">
      <div className="flex items-center justify-between xsm:gap-4 h-full  px-4 transition-[width,height] ease-linear min-h-12 md:max-w-[calc(100%-250px)] md:group-has-[[data-collapsible=icon]]/sidebar-wrapper:max-w-[calc(100%-50px)]">
        {/* Left Section */}
        <div className="flex flex-grow items-center gap-2  min-w-0">
          <SidebarTrigger className="-ml-1" title="collapse menu" />
          <Separator orientation="vertical" className="mr-2 h-4" />
          <p className="tracking-tight leading-tight inline-flex flex-col py-2">
            {/* account for when users have a really long name */}
            <span className="font-semibold leading-tight truncate capitalize">
              Hello {user?.firstName || "User"}!
            </span>
            <span className="text-muted-foreground text-xs sm:text-sm">
              {new Date().toLocaleDateString(undefined, {
                weekday: "long",
                month: "short",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </p>
        </div>

        {/* Right Section */}
        <div className="flex items-center gap-4 xsm:gap-2 justify-end  flex-shrink-0">
          <RoleSwitchButton  />
          <ThemeSwitch className="xsm:hidden" />
          <Link
            href="/admin/user/notifications"
            className="hover:bg-indigo-100 hover:text-indigo-500 dark:hover:bg-indigo-950 dark:hover:text-indigo-50 p-1 rounded-md">
            <Bell className="h-5 w-5" />
          </Link>
        </div>
      </div>
    </SidebarHeader>
  );
}
