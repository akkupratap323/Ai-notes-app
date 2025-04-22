"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Home, Plus } from "lucide-react"

export function Sidebar() {
  const pathname = usePathname()

  const routes = [
    {
      href: "/dashboard",
      label: "Dashboard",
      icon: Home,
      exact: true,
    },
    {
      href: "/dashboard/notes/new",
      label: "New Note",
      icon: Plus,
    },
  ]

  return (
    <div className="flex h-full flex-col border-r bg-gray-50/40">
      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 gap-1">
          {routes.map((route, index) => (
            <Button
              key={index}
              asChild
              variant="ghost"
              className={cn("justify-start gap-2 px-3", {
                "bg-gray-100": route.exact ? pathname === route.href : pathname.startsWith(route.href),
              })}
            >
              <Link href={route.href}>
                <route.icon className="h-4 w-4" />
                {route.label}
              </Link>
            </Button>
          ))}
        </nav>
      </div>
    </div>
  )
}
