"use client";
import { type LucideIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import Link from "next/link";

export function NavItems({
  items,
}: {
  items: {
    name: string;
    url: string;
    title: string;
    icon: LucideIcon;
    target?: string;
  }[];
}) {
  const pathname = usePathname();
  return (
    <SidebarGroup>
      <SidebarMenu className="space-y-2">
        {items.map((item) => (
          <SidebarMenuItem key={item.name}>
            <SidebarMenuButton
              tooltip={item.title}
              asChild
              className={`hover:bg-indigo-400 hover:text-white dark:hover:bg-indigo-600  ${
                pathname === item.url ? "bg-indigo-600 text-white" : ""
              }`}>
              <Link
                href={item.url}
                title={item.title}
                prefetch={false}
                target={item.target ?? "_parent"}>
                <item.icon />
                <span>{item.name}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
