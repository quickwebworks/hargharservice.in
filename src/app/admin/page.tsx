"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Users,
  CalendarCheck,
  Wrench,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Plus,
  UserPlus,
  MapPin,
  Package,
} from "lucide-react"
import Link from "next/link"

const recentBookings = [
  { id: "BKG-001", customer: "Rahul Sharma", service: "AC Repair", date: "2025-01-15", status: "Pending", amount: "₹1,500" },
  { id: "BKG-002", customer: "Priya Patel", service: "Plumbing", date: "2025-01-15", status: "Confirmed", amount: "₹800" },
  { id: "BKG-003", customer: "Amit Kumar", service: "Electrical", date: "2025-01-14", status: "In Progress", amount: "₹1,200" },
  { id: "BKG-004", customer: "Sneha Gupta", service: "Cleaning", date: "2025-01-14", status: "Completed", amount: "₹500" },
  { id: "BKG-005", customer: "Vikram Singh", service: "Painting", date: "2025-01-13", status: "Pending", amount: "₹5,000" },
]

function getStatusBadge(status: string) {
  switch (status) {
    case "Pending":
      return <Badge className="bg-[#f5ebe0] text-[#8a5a2b] hover:bg-[#ede0d0]">{status}</Badge>
    case "Confirmed":
      return <Badge className="bg-[#e8f5e9] text-[#2e7d32] hover:bg-[#d5ead6]">{status}</Badge>
    case "In Progress":
      return <Badge className="bg-[#e3f2fd] text-[#1565c0] hover:bg-[#d0e8f9]">{status}</Badge>
    case "Completed":
      return <Badge className="bg-[#e8f5e9] text-[#2e7d32] hover:bg-[#d5ead6]">{status}</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-2">Welcome back! Here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-[#d4a869] shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Users</CardTitle>
            <Users className="h-5 w-5 text-[#d4a869]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,543</div>
            <p className="text-xs text-muted-foreground">+180 from last month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#35363a] shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Bookings</CardTitle>
            <CalendarCheck className="h-5 w-5 text-[#c49555]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#d4a869] shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Services</CardTitle>
            <Wrench className="h-5 w-5 text-[#d4a869]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">6 categories</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-[#35363a] shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-[#c49555]" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">₹4,23,400</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5 text-[#d4a869]" />
            Quick Actions
          </CardTitle>
          <CardDescription>Frequently performed tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/users">
              <Button variant="outline" className="w-full h-auto flex-col gap-2 py-4 border-border hover:border-[#d4a869] hover:bg-[#faf8f5] group">
                <UserPlus className="h-6 w-6 text-[#d4a869] group-hover:text-[#c49555]" />
                <span className="text-sm font-medium">Add New User</span>
              </Button>
            </Link>
            <Link href="/admin/bookings">
              <Button variant="outline" className="w-full h-auto flex-col gap-2 py-4 border-border hover:border-[#d4a869] hover:bg-[#faf8f5] group">
                <CalendarCheck className="h-6 w-6 text-[#d4a869] group-hover:text-[#c49555]" />
                <span className="text-sm font-medium">View Bookings</span>
              </Button>
            </Link>
            <Link href="/admin/categories">
              <Button variant="outline" className="w-full h-auto flex-col gap-2 py-4 border-border hover:border-[#d4a869] hover:bg-[#faf8f5] group">
                <Package className="h-6 w-6 text-[#d4a869] group-hover:text-[#c49555]" />
                <span className="text-sm font-medium">Add Service</span>
              </Button>
            </Link>
            <Link href="/admin/countries">
              <Button variant="outline" className="w-full h-auto flex-col gap-2 py-4 border-border hover:border-[#d4a869] hover:bg-[#faf8f5] group">
                <MapPin className="h-6 w-6 text-[#d4a869] group-hover:text-[#c49555]" />
                <span className="text-sm font-medium">Add Location</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings Table & Pending Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-[#d4a869]" />
              Recent Bookings
            </CardTitle>
            <CardDescription>Latest bookings received</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead>Booking ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Service</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-[#faf8f5]">
                    <TableCell className="font-medium">{booking.id}</TableCell>
                    <TableCell>{booking.customer}</TableCell>
                    <TableCell>{booking.service}</TableCell>
                    <TableCell>{booking.date}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell className="text-right font-medium">{booking.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-[#c49555]" />
              Pending Actions
            </CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/bookings">
              <div className="flex items-center justify-between rounded-lg border border-[#e8ddd0] bg-[#faf3e8] p-3 hover:bg-[#f5ebe0] transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#d4a869]">
                    <CalendarCheck className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">12 Pending Bookings</p>
                    <p className="text-xs text-muted-foreground">Require assignment</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-[#c49555]">→</span>
              </div>
            </Link>
            <Link href="/admin/users">
              <div className="flex items-center justify-between rounded-lg border border-border bg-[#faf8f5] p-3 hover:bg-[#f0ece5] transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#35363a]">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">5 New Users</p>
                    <p className="text-xs text-muted-foreground">Awaiting verification</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-[#d4a869]">→</span>
              </div>
            </Link>
            <Link href="/admin/jobs">
              <div className="flex items-center justify-between rounded-lg border border-[#d0e8f9] bg-[#e3f2fd] p-3 hover:bg-[#bbdefb] transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#1565c0]">
                    <Wrench className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">3 Jobs in Progress</p>
                    <p className="text-xs text-muted-foreground">Need monitoring</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-[#1565c0]">→</span>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}