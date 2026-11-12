"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main";
import { TeamSwitcher } from "@/components/team-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar"
import { GalleryVerticalEndIcon, AudioLinesIcon, TerminalIcon, TerminalSquareIcon, BotIcon, Settings2Icon} from "lucide-react"
import { usePathname } from "next/navigation";

// This is sample data.
const data = {
  user: {
    name: "shadcn",
    email: "m@example.com",
    avatar: "/avatars/shadcn.jpg",
  },
  teams: [
    {
      name: "Acme Inc",
      logo: (
        <GalleryVerticalEndIcon
        />
      ),
      plan: "Enterprise",
    },
    {
      name: "Acme Corp.",
      logo: (
        <AudioLinesIcon
        />
      ),
      plan: "Startup",
    },
    {
      name: "Evil Corp.",
      logo: (
        <TerminalIcon
        />
      ),
      plan: "Free",
    },
  ],
  navMain: [
    {
      title: "Categories",
      url: "#",
      icon: (
        <TerminalSquareIcon
        />
      ),
      items: [
        {
          title: "Dresses",
          url: "#",
        },
        {
          title: "Snacks",
          url: "#",
        }
      ],
    },
    {
      title: "Products",
      url: "#",
      icon: (
        <TerminalSquareIcon
        />
      ),
      isActive: true,
      items: [
        {
          title: "Dresses",
          url: "#",
        },
        {
          title: "Snacks",
          url: "#",
        }
      ],
    },
    {
      title: "Users",
      url: "#",
      icon: (
        <BotIcon
        />
      ),
      items: [
        {
          title: "Users List",
          url: "/users",
        }
      ],
    },
    {
      title: "Settings",
      url: "#",
      icon: (
        <Settings2Icon
        />
      ),
      items: [
        {
          title: "General",
          url: "#",
        },
        {
          title: "Profile",
          url: "/profile",
        }
      ],
    },
  ]
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const pathname = usePathname();

  const navItems = data.navMain.map((item) => ({
    ...item,
    isActive: item.items?.some(
      (subItem) =>
        pathname === subItem.url ||
        pathname.startsWith(`${subItem.url}/`)
    ),
    items: item.items?.map((subItem) => ({
      ...subItem,
      isActive:
        pathname === subItem.url ||
        pathname.startsWith(`${subItem.url}/`),
    })),
  }));

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={navItems} />
      </SidebarContent>

      <SidebarRail />
    </Sidebar>
  );
}
