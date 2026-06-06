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

// Mock data for recent bookings
const recentBookings = [
  {
    id: "BKG-001",
    customer: "Rahul Sharma",
    service: "AC Repair",
    date: "2025-01-15",
    status: "Pending",
    amount: "₹1,500",
  },
  {
    id: "BKG-002",
    customer: "Priya Patel",
    service: "Plumbing",
    date: "2025-01-15",
    status: "Confirmed",
    amount: "₹800",
  },
  {
    id: "BKG-003",
    customer: "Amit Kumar",
    service: "Electrical",
    date: "2025-01-14",
    status: "In Progress",
    amount: "₹1,200",
  },
  {
    id: "BKG-004",
    customer: "Sneha Gupta",
    service: "Cleaning",
    date: "2025-01-14",
    status: "Completed",
    amount: "₹500",
  },
  {
    id: "BKG-005",
    customer: "Vikram Singh",
    service: "Painting",
    date: "2025-01-13",
    status: "Pending",
    amount: "₹5,000",
  },
]

// Helper function for status badge styling
function getStatusBadge(status: string) {
  switch (status) {
    case "Pending":
      return <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200">{status}</Badge>
    case "Confirmed":
      return <Badge className="bg-teal-100 text-teal-700 hover:bg-teal-200">{status}</Badge>
    case "In Progress":
      return <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200">{status}</Badge>
    case "Completed":
      return <Badge className="bg-green-100 text-green-700 hover:bg-green-200">{status}</Badge>
    default:
      return <Badge>{status}</Badge>
  }
}

export default function AdminDashboard() {
  return (
    <div className="p-6 space-y-6">
      <div>
        <h2 className="text-3xl font-bold text-teal-800">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening today.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-l-4 border-l-teal-600 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-teal-900">Total Users</CardTitle>
            <Users className="h-5 w-5 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-900">2,543</div>
            <p className="text-xs text-muted-foreground">+180 from last month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-teal-900">Active Bookings</CardTitle>
            <CalendarCheck className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-900">1,234</div>
            <p className="text-xs text-muted-foreground">+19% from last month</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-teal-600 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-teal-900">Active Services</CardTitle>
            <Wrench className="h-5 w-5 text-teal-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-900">48</div>
            <p className="text-xs text-muted-foreground">6 categories</p>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-orange-500 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-teal-900">Revenue</CardTitle>
            <DollarSign className="h-5 w-5 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-teal-900">₹4,23,400</div>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-teal-800">
            <Plus className="h-5 w-5 text-teal-600" />
            Quick Actions
          </CardTitle>
          <CardDescription>Frequently performed tasks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Link href="/admin/users">
              <Button 
                variant="outline" 
                className="w-full h-auto flex-col gap-2 py-4 border-teal-200 hover:border-teal-400 hover:bg-teal-50 group"
              >
                <UserPlus className="h-6 w-6 text-teal-600 group-hover:text-teal-700" />
                <span className="text-sm font-medium text-teal-900">Add New User</span>
              </Button>
            </Link>
            <Link href="/admin/bookings">
              <Button 
                variant="outline" 
                className="w-full h-auto flex-col gap-2 py-4 border-teal-200 hover:border-teal-400 hover:bg-teal-50 group"
              >
                <CalendarCheck className="h-6 w-6 text-teal-600 group-hover:text-teal-700" />
                <span className="text-sm font-medium text-teal-900">View Bookings</span>
              </Button>
            </Link>
            <Link href="/admin/categories">
              <Button 
                variant="outline" 
                className="w-full h-auto flex-col gap-2 py-4 border-teal-200 hover:border-teal-400 hover:bg-teal-50 group"
              >
                <Package className="h-6 w-6 text-teal-600 group-hover:text-teal-700" />
                <span className="text-sm font-medium text-teal-900">Add Service</span>
              </Button>
            </Link>
            <Link href="/admin/countries">
              <Button 
                variant="outline" 
                className="w-full h-auto flex-col gap-2 py-4 border-teal-200 hover:border-teal-400 hover:bg-teal-50 group"
              >
                <MapPin className="h-6 w-6 text-teal-600 group-hover:text-teal-700" />
                <span className="text-sm font-medium text-teal-900">Add Location</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>

      {/* Recent Bookings Table & Pending Actions */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-teal-800">
              <TrendingUp className="h-5 w-5 text-teal-600" />
              Recent Bookings
            </CardTitle>
            <CardDescription>Latest bookings received</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow className="hover:bg-transparent">
                  <TableHead className="text-teal-800">Booking ID</TableHead>
                  <TableHead className="text-teal-800">Customer</TableHead>
                  <TableHead className="text-teal-800">Service</TableHead>
                  <TableHead className="text-teal-800">Date</TableHead>
                  <TableHead className="text-teal-800">Status</TableHead>
                  <TableHead className="text-teal-800 text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentBookings.map((booking) => (
                  <TableRow key={booking.id} className="hover:bg-teal-50/50">
                    <TableCell className="font-medium text-teal-900">{booking.id}</TableCell>
                    <TableCell className="text-teal-900">{booking.customer}</TableCell>
                    <TableCell className="text-teal-900">{booking.service}</TableCell>
                    <TableCell className="text-teal-900">{booking.date}</TableCell>
                    <TableCell>{getStatusBadge(booking.status)}</TableCell>
                    <TableCell className="text-right font-medium text-teal-900">{booking.amount}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-teal-800">
              <AlertCircle className="h-5 w-5 text-orange-500" />
              Pending Actions
            </CardTitle>
            <CardDescription>Items requiring your attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Link href="/admin/bookings">
              <div className="flex items-center justify-between rounded-lg border border-orange-200 bg-orange-50 p-3 hover:bg-orange-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-orange-500">
                    <CalendarCheck className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-teal-900">12 Pending Bookings</p>
                    <p className="text-xs text-muted-foreground">Require assignment</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-orange-600">→</span>
              </div>
            </Link>
            <Link href="/admin/users">
              <div className="flex items-center justify-between rounded-lg border border-teal-200 bg-teal-50 p-3 hover:bg-teal-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600">
                    <Users className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-teal-900">5 New Users</p>
                    <p className="text-xs text-muted-foreground">Awaiting verification</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-teal-600">→</span>
              </div>
            </Link>
            <Link href="/admin/jobs">
              <div className="flex items-center justify-between rounded-lg border border-blue-200 bg-blue-50 p-3 hover:bg-blue-100 transition-colors cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600">
                    <Wrench className="h-4 w-4 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-teal-900">3 Jobs in Progress</p>
                    <p className="text-xs text-muted-foreground">Need monitoring</p>
                  </div>
                </div>
                <span className="text-sm font-medium text-blue-600">→</span>
              </div>
            </Link>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}