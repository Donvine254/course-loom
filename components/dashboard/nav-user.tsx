"use client";

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  Home,
  LogOut,
  TvMinimalPlay,
} from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "@clerk/nextjs";
import { sessionUser } from "@/types";

export function NavUser({ user }: { user?: sessionUser | undefined }) {
  const { isMobile } = useSidebar();

  return (
    <SidebarMenu className="h-full flex items-center justify-center">
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              {user?.hasImage ? (
                <Image
                  className="h-8 w-8 rounded-lg"
                  alt={user?.firstName || "User Avatar"}
                  height={32}
                  width={32}
                  priority
                  src={user?.imageUrl || ""}
                />
              ) : (
                <Image
                  className="h-8 w-8 rounded-lg"
                  alt={user?.firstName || "User Avatar"}
                  priority
                  height={32}
                  width={32}
                  src={
                    user?.imageUrl ??
                    `https://ui-avatars.com/api/?background=007bff&color=fff&name=${user?.firstName}+${user?.lastName}`
                  }
                />
              )}

              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate capitalize font-semibold">
                  {`${user?.firstName} ${user?.lastName}`}
                </span>
                <span className="truncate text-xs">{user?.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-4" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}>
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                {user?.hasImage ? (
                  <Image
                    className="h-8 w-8 rounded-lg"
                    alt={user?.firstName || "User Avatar"}
                    height={32}
                    width={32}
                    priority
                    src={user?.imageUrl || ""}
                  />
                ) : (
                  <Image
                    className="h-8 w-8 rounded-lg"
                    alt={user?.firstName || "User Avatar"}
                    priority
                    height={32}
                    width={32}
                    src={
                      user?.imageUrl ??
                      `https://ui-avatars.com/api/?background=007bff&color=fff&name=${user?.firstName}+${user?.lastName}`
                    }
                  />
                )}
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold capitalize">
                    {" "}
                    {`${user?.firstName} ${user?.lastName}`}
                  </span>
                  <span className="truncate text-xs">{user?.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem asChild>
                <Link href="/">
                  <Home />
                  Home
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile">
                  <BadgeCheck />
                  My Account
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/learn">
                  <TvMinimalPlay />
                  My Learning
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/profile/settings#notifications">
                  <Bell />
                  Notifications
                </Link>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <SignOutButton>
              <button
                type="button"
                className="w-full text-destructive hover:bg-destructive hover:text-destructive-foreground flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50">
                <LogOut className="h-4 w-4" /> Sign Out
              </button>
            </SignOutButton>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
