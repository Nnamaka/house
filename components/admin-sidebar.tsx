"use client";

import Link from "next/link";
import {
  Sidebar,
  SidebarContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Users, Home } from "lucide-react";
import { NavMain } from "./nav-main";
import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";

const navItems = [
  {
    title: "Quotes",
    url: "/admin/dashboard/quotes",
    icon: Users,
    isActive: true,
  },
  { title: "Houses", url: "/admin/dashboard/houses", icon: Home },
];

export function AppSidebar({
  currentPath,
  ...props
}: React.ComponentProps<typeof Sidebar> & { currentPath: string }) {
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (pathname === "/admin/dashboard") {
      router.push("/admin/dashboard/quotes");
    }
  });
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarMenu>
        <SidebarMenuItem>
          <SidebarMenuButton size="lg" asChild>
            <Link href="/" className="flex items-center justify-center">
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">QualityProperty</span>
              </div>
            </Link>
          </SidebarMenuButton>
        </SidebarMenuItem>
      </SidebarMenu>
      <SidebarContent>
        <NavMain items={navItems} currentPath={currentPath} />
      </SidebarContent>
    </Sidebar>
  );
}
