"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Sidebar } from "@/components/ui/sidebar";
import { Users, Home, LogOut } from "lucide-react";

const navItems = [
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Houses", href: "/admin/houses", icon: Home },
];

export function AppSidebar() {
  const pathname = usePathname();

  return (
    <Sidebar className="bg-gray-900 text-white w-64">
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-6">Admin</h2>
        <nav>
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-2 p-3 rounded-lg transition ${
                pathname === item.href ? "bg-gray-700" : "hover:bg-gray-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.name}
            </Link>
          ))}
        </nav>
        <div className="mt-6">
          <Link href="/logout" className="flex items-center gap-2 p-3 rounded-lg transition hover:bg-red-600">
            <LogOut className="w-5 h-5" />
            Logout
          </Link>
        </div>
      </div>
    </Sidebar>
  );
}
