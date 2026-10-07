'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Calendar, Clock, MapPin, Phone, Mail, User,
  Package, CreditCard, Settings, LogOut, Bell,
  ChevronRight, Star, Download, Eye, ArrowLeft,
} from 'lucide-react';
import { useState } from 'react';

interface Booking {
  id: string;
  bookingNo: string;
  service: { title: string; category: { title: string } };
  bookingDate: string;
  timeSlot: string;
  totalAmount: number;
  bookingStatus: string;
  paymentStatus: string;
}

export function CustomerDashboard({ onBack }: { onBack: () => void }) {
  const [activeTab, setActiveTab] = useState('bookings');

  const bookings: Booking[] = [
    { id: '1', bookingNo: 'HGS12345678', service: { title: 'Kitchen Deep Cleaning', category: { title: 'Cleaning' } }, bookingDate: '2025-05-25', timeSlot: '09:00', totalAmount: 1178, bookingStatus: 'CONFIRMED', paymentStatus: 'PAID' },
    { id: '2', bookingNo: 'HGS12345679', service: { title: 'AC Service & Repair', category: { title: 'Appliances' } }, bookingDate: '2025-05-20', timeSlot: '14:00', totalAmount: 825, bookingStatus: 'COMPLETED', paymentStatus: 'PAID' },
    { id: '3', bookingNo: 'HGS12345680', service: { title: 'Sofa Cleaning', category: { title: 'Cleaning' } }, bookingDate: '2025-05-18', timeSlot: '11:00', totalAmount: 1769, bookingStatus: 'CANCELLED', paymentStatus: 'REFUNDED' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'PENDING': return 'bg-amber-100 text-amber-800';
      case 'CONFIRMED': return 'bg-sky-light text-sky';
      case 'ASSIGNED': return 'bg-lilac-light text-lilac';
      case 'IN_PROGRESS': return 'bg-brand-100 text-brand-700';
      case 'COMPLETED': return 'bg-mint-light text-mint';
      case 'CANCELLED': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Sticky header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur-lg border-b safe-top">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-14 items-center justify-between">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" onClick={onBack} className="-ml-2">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold">My Dashboard</h1>
            </div>
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Profile card */}
        <Card className="mb-6 border-border/60">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-xl font-bold text-white shadow-md shadow-brand-500/25 shrink-0">JD</div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold truncate">John Doe</h2>
                <div className="flex flex-wrap gap-x-4 gap-y-1 mt-1 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5" />john.doe@example.com</span>
                  <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" />+91 98765 43210</span>
                </div>
              </div>
              <Button variant="outline" size="sm" className="shrink-0 h-9"><Settings className="h-4 w-4 mr-1.5" />Edit</Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats — horizontal scroll on mobile */}
        <div className="flex gap-3 overflow-x-auto scrollbar-hide pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:grid sm:grid-cols-4 sm:gap-4 sm:overflow-visible mb-6">
          {[
            { label: 'Bookings', value: '12', icon: <Package className="h-5 w-5" />, iconBg: 'bg-sky-light text-sky' },
            { label: 'Completed', value: '9', icon: <Package className="h-5 w-5" />, iconBg: 'bg-mint-light text-mint' },
            { label: 'In Progress', value: '2', icon: <Clock className="h-5 w-5" />, iconBg: 'bg-brand-100 text-brand-600' },
            { label: 'Total Spent', value: '₹15,420', icon: <CreditCard className="h-5 w-5" />, iconBg: 'bg-lilac-light text-lilac' },
          ].map((stat) => (
            <div key={stat.label} className="shrink-0 w-[150px] sm:w-auto">
              <Card className="border-border/60">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className={`p-2.5 rounded-xl ${stat.iconBg} shrink-0`}>{stat.icon}</div>
                  <div className="min-w-0">
                    <p className="text-xs text-muted-foreground">{stat.label}</p>
                    <p className="text-lg font-bold truncate">{stat.value}</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="bookings" className="text-xs sm:text-sm"><Package className="h-4 w-4 mr-1 sm:mr-1.5 hidden sm:inline-flex" />Bookings</TabsTrigger>
            <TabsTrigger value="addresses" className="text-xs sm:text-sm"><MapPin className="h-4 w-4 mr-1 sm:mr-1.5 hidden sm:inline-flex" />Address</TabsTrigger>
            <TabsTrigger value="payments" className="text-xs sm:text-sm"><CreditCard className="h-4 w-4 mr-1 sm:mr-1.5 hidden sm:inline-flex" />Pay</TabsTrigger>
            <TabsTrigger value="profile" className="text-xs sm:text-sm"><User className="h-4 w-4 mr-1 sm:mr-1.5 hidden sm:inline-flex" />Profile</TabsTrigger>
          </TabsList>

          {/* Bookings Tab */}
          <TabsContent value="bookings" className="space-y-3">
            {bookings.map((booking) => (
              <Card key={booking.id} className="border-border/60">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="min-w-0">
                      <h4 className="font-semibold text-sm sm:text-base truncate">{booking.service.title}</h4>
                      <p className="text-xs text-muted-foreground">{booking.service.category.title}</p>
                    </div>
                    <Badge className={`${getStatusColor(booking.bookingStatus)} text-[11px] shrink-0`}>
                      {booking.bookingStatus.replace('_', ' ')}
                    </Badge>
                  </div>
                  <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{new Date(booking.bookingDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                    <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{booking.timeSlot}</span>
                    <span className="flex items-center gap-1"><Package className="h-3.5 w-3.5" />{booking.bookingNo}</span>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t">
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold">₹{booking.totalAmount}</span>
                      <Badge variant="outline" className={`${getStatusColor(booking.paymentStatus)} text-[10px]`}>{booking.paymentStatus}</Badge>
                    </div>
                    <Button variant="ghost" size="sm" className="h-9"><Eye className="h-4 w-4 mr-1" />View</Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Addresses Tab */}
          <TabsContent value="addresses" className="space-y-3">
            <Button className="w-full btn-brand h-12 rounded-xl font-medium shadow-lg shadow-brand-500/25" onClick={() => {}}>
              <MapPin className="h-4 w-4 mr-2" />Add New Address
            </Button>
            <Card className="border-2 border-brand-500/30 bg-brand-50 shadow-sm shadow-brand-500/10">
              <CardContent className="p-4 sm:p-6">
                <div className="flex items-start justify-between mb-2">
                  <Badge className="bg-brand-500 text-white text-[10px]">Default</Badge>
                </div>
                <h4 className="font-semibold mb-1.5">Home</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">John Doe<br />+91 98765 43210<br />123, Model Town, Ludhiana, Punjab - 141001</p>
              </CardContent>
            </Card>
            <Card className="border-border/60">
              <CardContent className="p-4 sm:p-6">
                <Badge variant="outline" className="text-[10px] mb-2">Office</Badge>
                <h4 className="font-semibold mb-1.5">Office</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">John Doe<br />+91 98765 43210<br />456, Industrial Area, Ludhiana, Punjab - 141002</p>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Payments Tab */}
          <TabsContent value="payments" className="space-y-3">
            {bookings.filter(b => b.paymentStatus !== 'PENDING').map((booking) => (
              <Card key={booking.id} className="border-border/60">
                <CardContent className="p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="p-2.5 rounded-xl bg-mint-light text-mint shrink-0"><CreditCard className="h-5 w-5" /></div>
                      <div className="min-w-0">
                        <h4 className="font-semibold text-sm truncate">{booking.service.title}</h4>
                        <p className="text-xs text-muted-foreground">{booking.bookingNo} · {new Date(booking.bookingDate).toLocaleDateString('en-IN')}</p>
                      </div>
                    </div>
                    <div className="text-right shrink-0 ml-3">
                      <p className="text-lg font-bold">₹{booking.totalAmount}</p>
                      <Badge className={`${getStatusColor(booking.paymentStatus)} text-[10px]`}>{booking.paymentStatus}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card className="border-border/60">
              <CardHeader><CardTitle>Edit Profile</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5"><Label>Full Name</Label><Input defaultValue="John Doe" className="h-12 rounded-xl" /></div>
                  <div className="space-y-1.5"><Label>Email</Label><Input defaultValue="john.doe@example.com" type="email" className="h-12 rounded-xl" /></div>
                  <div className="space-y-1.5"><Label>Phone</Label><Input defaultValue="+91 98765 43210" className="h-12 rounded-xl" /></div>
                  <div className="space-y-1.5"><Label>Date of Birth</Label><Input type="date" className="h-12 rounded-xl" /></div>
                </div>
                <div className="space-y-1.5"><Label>Address</Label><Textarea placeholder="Enter your complete address" rows={3} className="rounded-xl" /></div>
                <div className="flex gap-3 pt-2">
                  <Button className="btn-brand h-12 px-6 font-medium rounded-xl shadow-lg shadow-brand-500/25">Save Changes</Button>
                  <Button variant="outline" className="h-12 px-6 rounded-xl">Cancel</Button>
                </div>
                <Separator className="my-2" />
                <div>
                  <h4 className="font-semibold mb-4">Change Password</h4>
                  <div className="space-y-3 max-w-md">
                    <div className="space-y-1.5"><Label>Current Password</Label><Input type="password" className="h-12 rounded-xl" /></div>
                    <div className="space-y-1.5"><Label>New Password</Label><Input type="password" className="h-12 rounded-xl" /></div>
                    <div className="space-y-1.5"><Label>Confirm New Password</Label><Input type="password" className="h-12 rounded-xl" /></div>
                    <Button variant="outline" className="h-12 px-6 rounded-xl">Update Password</Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}