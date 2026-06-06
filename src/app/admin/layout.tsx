"use client"

import * as React from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { signOut } from 'next-auth/react';
import {
  LayoutDashboard,
  Users,
  Map,
  Wrench,
  CalendarCheck,
  MessageSquare,
  UserCog,
  ChevronDown,
  ChevronRight,
  Bell,
  LogOut,
  User,
  Globe,
  Building,
  MapPin,
  Layers,
  Grid3x3,
  Briefcase
} from "lucide-react"

import { cn } from "@/lib/utils"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInset,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { toast } from "@/hooks/use-toast"
import { useSession } from 'next-auth/react';

// Define the sidebar menu items structure
const sidebarItems = [
  {
    title: "Dashboard",
    icon: LayoutDashboard,
    href: "/admin",
  },
  {
    title: "User Management",
    icon: Users,
    items: [
      { title: "User Types", icon: UserCog, href: "/admin/user-types" },
      { title: "Users", icon: Users, href: "/admin/users" },
    ],
  },
  {
    title: "Location Management",
    icon: Map,
    items: [
      { title: "Countries", icon: Globe, href: "/admin/countries" },
      { title: "States", icon: Building, href: "/admin/states" },
      { title: "Cities", icon: MapPin, href: "/admin/cities" },
      { title: "Areas", icon: Layers, href: "/admin/areas" },
      { title: "Sub Areas", icon: Grid3x3, href: "/admin/sub-areas" },
    ],
  },
  {
    title: "Service Management",
    icon: Wrench,
    items: [
      { title: "Categories", icon: Layers, href: "/admin/categories" },
      { title: "Services", icon: Wrench, href: "/admin/services" },
    ],
  },
  {
    title: "Booking Management",
    icon: CalendarCheck,
    items: [
      { title: "Bookings", icon: CalendarCheck, href: "/admin/bookings" },
      { title: "Jobs", icon: Briefcase, href: "/admin/jobs" },
    ],
  },
  {
    title: "Communication",
    icon: MessageSquare,
    items: [
      { title: "SMS Panel", icon: MessageSquare, href: "/admin/sms-panel" },
    ],
  },
]

// Header component with profile and actions
function AdminHeader() {
  const { data: session } = useSession();
  const router = useRouter();
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      // Clear localStorage
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_info');

      // Sign out from NextAuth
      await signOut({ redirect: false });

      // Call logout API
      await fetch('/api/auth/logout', { method: 'POST' });

      toast({
        title: 'Logged Out',
        description: 'You have been successfully logged out',
      });

      router.push('/login');
    } catch (error: any) {
      console.error('Logout error:', error);
      toast({
        title: 'Logout Failed',
        description: error.message || 'An error occurred during logout',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-teal-200 bg-white px-6">
      <div className="flex items-center gap-4">
        <SidebarTrigger className="text-teal-800 hover:bg-teal-50" />
        <h1 className="text-xl font-semibold text-teal-800">Admin Dashboard</h1>
      </div>

      <div className="flex items-center gap-4">
        {/* Notifications */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="relative text-teal-700 hover:bg-teal-50 hover:text-teal-800"
            >
              <Bell className="h-5 w-5" />
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-5 w-5 flex items-center justify-center p-0 text-xs bg-orange-500 hover:bg-orange-600"
              >
                3
              </Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-2">
              <div className="flex items-start gap-3 rounded-md p-3 hover:bg-teal-50 cursor-pointer">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-orange-100 flex items-center justify-center">
                  <CalendarCheck className="h-4 w-4 text-orange-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-teal-900">New booking received</p>
                  <p className="text-xs text-muted-foreground">5 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-md p-3 hover:bg-teal-50 cursor-pointer">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
                  <User className="h-4 w-4 text-teal-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-teal-900">New user registered</p>
                  <p className="text-xs text-muted-foreground">15 minutes ago</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-md p-3 hover:bg-teal-50 cursor-pointer">
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
                  <MessageSquare className="h-4 w-4 text-teal-600" />
                </div>
                <div className="flex-1 space-y-1">
                  <p className="text-sm font-medium text-teal-900">SMS campaign sent</p>
                  <p className="text-xs text-muted-foreground">1 hour ago</p>
                </div>
              </div>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-center text-teal-600 hover:text-teal-800 hover:bg-teal-50">
              View all notifications
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Separator orientation="vertical" className="h-6" />

        {/* User Profile */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              className="gap-2 text-teal-700 hover:bg-teal-50 hover:text-teal-800"
            >
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-800">
                  <User className="h-4 w-4 text-white" />
                </div>
                <div className="text-left">
                  <p className="text-sm font-medium text-teal-900">
                    {session?.user?.name || 'Admin'}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {session?.user?.email || 'admin@harghar.com'}
                  </p>
                </div>
              </div>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-teal-700 hover:text-teal-800 hover:bg-teal-50 cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-teal-700 hover:text-teal-800 hover:bg-teal-50 cursor-pointer">
              <Bell className="mr-2 h-4 w-4" />
              <span>Notifications</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className="text-orange-600 hover:text-orange-700 hover:bg-orange-50 cursor-pointer"
              onClick={handleLogout}
              disabled={isLoading}
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>{isLoading ? 'Logging out...' : 'Logout'}</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

// Main Sidebar component
function AdminSidebar() {
  const pathname = usePathname()

  // Helper function to check if a path is active
  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === href
    }
    return pathname.startsWith(href)
  }

  return (
    <Sidebar
      className="border-r border-teal-200"
      style={{
        "--sidebar-background": "#115E59",
        "--sidebar-foreground": "#FEF3C7",
        "--sidebar-primary": "#2DD4BF",
        "--sidebar-primary-foreground": "#115E59",
        "--sidebar-accent": "#0D9488",
        "--sidebar-accent-foreground": "#FEF3C7",
        "--sidebar-border": "#14B8A6",
        "--sidebar-ring": "#2DD4BF",
      } as React.CSSProperties}
    >
      <SidebarHeader className="border-b border-teal-700 p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-500">
            <Wrench className="h-6 w-6 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-cream-100">Har Ghar</h2>
            <p className="text-xs text-cream-200">Admin Panel</p>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {sidebarItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                {item.items ? (
                  <>
                    <SidebarMenuButton
                      tooltip={item.title}
                      className="text-cream-100 hover:bg-teal-700 hover:text-white data-[active=true]:bg-teal-700 data-[active=true]:text-white"
                    >
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                      <ChevronRight className="ml-auto h-4 w-4" />
                    </SidebarMenuButton>
                    <SidebarMenuSub>
                      {item.items.map((subItem) => (
                        <SidebarMenuSubItem key={subItem.title}>
                          <SidebarMenuSubButton
                            asChild
                            isActive={isActive(subItem.href)}
                            className="text-cream-200 hover:bg-teal-700 hover:text-white data-[active=true]:bg-teal-600 data-[active=true]:text-white"
                          >
                            <Link href={subItem.href}>
                              {subItem.icon && <subItem.icon className="h-4 w-4" />}
                              <span>{subItem.title}</span>
                            </Link>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </>
                ) : (
                  <SidebarMenuButton
                    asChild
                    tooltip={item.title}
                    isActive={isActive(item.href!)}
                    className="text-cream-100 hover:bg-teal-700 hover:text-white data-[active=true]:bg-teal-600 data-[active=true]:text-white"
                  >
                    <Link href={item.href!}>
                      {item.icon && <item.icon className="h-4 w-4" />}
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                )}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-teal-700 p-4">
        <div className="text-xs text-cream-200">
          <p>© 2025 Har Ghar Services</p>
          <p className="mt-1">Version 1.0.0</p>
        </div>
      </SidebarFooter>
    </Sidebar>
  )
}

export default function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider defaultOpen={true}>
      <AdminSidebar />
      <SidebarInset className="bg-cream-100">
        <AdminHeader />
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}