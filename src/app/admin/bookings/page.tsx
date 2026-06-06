'use client';

import { useState, useEffect } from 'react';
import { DataTable, Column } from '@/components/admin/DataTable';
import { CRUDDialog, FormField } from '@/components/admin/CRUDDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck } from 'lucide-react';

interface Booking {
  id: string;
  bookingNo: string;
  bookingDate: string;
  timeSlot: string;
  totalAmount: number;
  bookingStatus: string;
  paymentStatus: string;
  customer: { name: string; email: string; phone: string };
  service: { title: string };
  executive?: { name: string; phone: string };
}

export default function BookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingBooking, setEditingBooking] = useState<Booking | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [paymentFilter, setPaymentFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: '10',
        ...(searchQuery && { search: searchQuery }),
        ...(statusFilter && { status: statusFilter }),
        ...(paymentFilter && { paymentStatus: paymentFilter }),
      });
      const res = await fetch(`/api/admin/bookings?${params}`);
      const json = await res.json();
      setBookings(json.data || []);
      setTotalCount(json.total || 0);
    } catch (error) { console.error('Failed to fetch bookings:', error); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchBookings(); }, [currentPage, searchQuery, statusFilter, paymentFilter]);

  const handleCreate = () => { setEditingBooking(null); setDialogOpen(true); };
  const handleEdit = (booking: Booking) => { setEditingBooking(booking); setDialogOpen(true); };
  const handleDelete = async (booking: Booking) => {
    if (!confirm('Are you sure you want to delete this booking?')) return;
    try {
      const res = await fetch(`/api/admin/bookings/${booking.id}`, { method: 'DELETE' });
      if (res.ok) fetchBookings();
      else alert((await res.json()).error || 'Failed to delete booking');
    } catch (error) { console.error('Failed to delete booking:', error); alert('Failed to delete booking'); }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    setSubmitting(true);
    try {
      const url = editingBooking ? `/api/admin/bookings/${editingBooking.id}` : '/api/admin/bookings';
      const method = editingBooking ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (res.ok) { setDialogOpen(false); fetchBookings(); }
      else alert((await res.json()).error || 'Failed to save booking');
    } catch (error) { console.error('Failed to save booking:', error); alert('Failed to save booking'); }
    finally { setSubmitting(false); }
  };

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    CONFIRMED: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    ASSIGNED: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    IN_PROGRESS: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const paymentColors: Record<string, string> = {
    PAID: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    FAILED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    REFUNDED: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
  };

  const columns: Column<Booking>[] = [
    { key: 'bookingNo', header: 'Booking #', render: (item) => <code className="text-xs bg-muted px-1 rounded">{item.bookingNo}</code> },
    { key: 'customer', header: 'Customer', render: (item) => <span>{item.customer.name}<br/><small className="text-muted-foreground">{item.customer.phone}</small></span> },
    { key: 'service', header: 'Service', render: (item) => item.service.title },
    { key: 'bookingDate', header: 'Date & Time', render: (item) => <>{new Date(item.bookingDate).toLocaleDateString()}<br/><small className="text-muted-foreground">{item.timeSlot}</small></> },
    { key: 'totalAmount', header: 'Amount', render: (item) => <span className="font-mono">₹{item.totalAmount}</span> },
    { key: 'paymentStatus', header: 'Payment', render: (item) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${paymentColors[item.paymentStatus] || 'bg-gray-100'}`}>{item.paymentStatus}</span> },
    { key: 'bookingStatus', header: 'Status', render: (item) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.bookingStatus] || 'bg-gray-100'}`}>{item.bookingStatus}</span> },
  ];

  const fields: FormField[] = [
    {
      name: 'bookingStatus',
      label: 'Booking Status',
      type: 'select',
      options: [
        { label: 'Pending', value: 'PENDING' },
        { label: 'Confirmed', value: 'CONFIRMED' },
        { label: 'Assigned', value: 'ASSIGNED' },
        { label: 'In Progress', value: 'IN_PROGRESS' },
        { label: 'Completed', value: 'COMPLETED' },
        { label: 'Cancelled', value: 'CANCELLED' },
      ],
    },
    {
      name: 'paymentStatus',
      label: 'Payment Status',
      type: 'select',
      options: [
        { label: 'Paid', value: 'PAID' },
        { label: 'Pending', value: 'PENDING' },
        { label: 'Failed', value: 'FAILED' },
        { label: 'Refunded', value: 'REFUNDED' },
      ],
    },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><CalendarCheck className="h-5 w-5 text-primary" />Bookings Management</CardTitle>
          <CardDescription>Manage bookings with status updates</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-wrap">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border rounded-md bg-background">
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="CONFIRMED">Confirmed</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <select value={paymentFilter} onChange={(e) => setPaymentFilter(e.target.value)} className="px-3 py-2 border rounded-md bg-background">
              <option value="">All Payment Status</option>
              <option value="PAID">Paid</option>
              <option value="PENDING">Pending</option>
              <option value="FAILED">Failed</option>
              <option value="REFUNDED">Refunded</option>
            </select>
            {(statusFilter || paymentFilter) && <button onClick={() => { setStatusFilter(''); setPaymentFilter(''); }} className="px-3 py-2 border rounded-md hover:bg-muted">Clear Filters</button>}
          </div>
          <DataTable data={bookings} columns={columns} loading={loading} onCreate={handleCreate} onEdit={handleEdit} onDelete={handleDelete} searchValue={searchQuery} onSearchChange={setSearchQuery} currentPage={currentPage} onPageChange={setCurrentPage} totalCount={totalCount} searchPlaceholder="Search by booking number or customer..." createButtonText="Add Booking" />
        </CardContent>
      </Card>
      <CRUDDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editingBooking ? 'Update Booking Status' : 'Add Booking'} fields={fields} data={editingBooking || {}} onSubmit={handleSubmit} submitButtonText={editingBooking ? 'Update' : 'Create'} loading={submitting} />
    </div>
  );
}