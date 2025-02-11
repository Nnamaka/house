"use client";

import { AppSidebar } from "@/components/admin-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        {/* Top Header */}
        <header className="flex h-16 items-center gap-2 border-b px-4 bg-white shadow-sm">
          <SidebarTrigger className="" />
          <Separator orientation="vertical" className="h-6" />

          {/* Breadcrumbs */}
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem className="hidden md:block">
                <BreadcrumbLink href="/admin">Dashboard</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="hidden md:block" />
              <BreadcrumbItem>
                <BreadcrumbPage>
                  {pathname.replace("/admin/", "").toUpperCase()}
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </header>

        {/* Page Content */}
        <div className="flex flex-1 flex-col gap-4 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
              <p className="text-gray-500">Metric 1</p>
            </div>
            <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
              <p className="text-gray-500">Metric 2</p>
            </div>
            <div className="aspect-video rounded-xl bg-muted/50 flex items-center justify-center">
              <p className="text-gray-500">Metric 3</p>
            </div>
          </div>

          {/* Main Page Section */}
          <div className="min-h-[80vh] rounded-xl bg-muted/50 p-6">
            {children}
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
