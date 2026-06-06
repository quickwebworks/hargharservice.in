'use client';

import { useState, useEffect } from 'react';
import { DataTable, Column } from '@/components/admin/DataTable';
import { CRUDDialog, FormField } from '@/components/admin/CRUDDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Briefcase } from 'lucide-react';

interface Job {
  id: string;
  scheduledDate: string;
  scheduledTime: string;
  estimatedDuration: number;
  jobStatus: string;
  priority: string;
  booking: { bookingNo: string };
  customer: { name: string; phone: string };
  service: { title: string };
  executive?: { name: string; phone: string };
}

interface SelectOption {
  label: string;
  value: string;
}

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [users, setUsers] = useState<SelectOption[]>([]);
  const [bookings, setBookings] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: '10',
        ...(searchQuery && { search: searchQuery }),
        ...(statusFilter && { status: statusFilter }),
        ...(priorityFilter && { priority: priorityFilter }),
      });
      const res = await fetch(`/api/admin/jobs?${params}`);
      const json = await res.json();
      setJobs(json.data || []);
      setTotalCount(json.total || 0);
    } catch (error) { console.error('Failed to fetch jobs:', error); }
    finally { setLoading(false); }
  };

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/admin/users?role=EXECUTIVE&pageSize=1000');
      const json = await res.json();
      setUsers(json.data?.map((u: any) => ({ label: u.name, value: u.id })) || []);
    } catch (error) { console.error('Failed to fetch users:', error); }
  };

  const fetchBookings = async () => {
    try {
      const res = await fetch('/api/admin/bookings?pageSize=1000');
      const json = await res.json();
      setBookings(json.data?.map((b: any) => ({ label: `${b.bookingNo} - ${b.customer?.name}`, value: b.id })) || []);
    } catch (error) { console.error('Failed to fetch bookings:', error); }
  };

  useEffect(() => { fetchJobs(); fetchUsers(); fetchBookings(); }, [currentPage, searchQuery, statusFilter, priorityFilter]);

  const handleCreate = () => { setEditingJob(null); setDialogOpen(true); };
  const handleEdit = (job: Job) => { setEditingJob(job); setDialogOpen(true); };
  const handleDelete = async (job: Job) => {
    if (!confirm('Are you sure you want to delete this job?')) return;
    try {
      const res = await fetch(`/api/admin/jobs/${job.id}`, { method: 'DELETE' });
      if (res.ok) fetchJobs();
      else alert((await res.json()).error || 'Failed to delete job');
    } catch (error) { console.error('Failed to delete job:', error); alert('Failed to delete job'); }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    setSubmitting(true);
    try {
      const url = editingJob ? `/api/admin/jobs/${editingJob.id}` : '/api/admin/jobs';
      const method = editingJob ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (res.ok) { setDialogOpen(false); fetchJobs(); }
      else alert((await res.json()).error || 'Failed to save job');
    } catch (error) { console.error('Failed to save job:', error); alert('Failed to save job'); }
    finally { setSubmitting(false); }
  };

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    ASSIGNED: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200',
    IN_PROGRESS: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    COMPLETED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    CANCELLED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
    ON_HOLD: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
  };

  const priorityColors: Record<string, string> = {
    LOW: 'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200',
    MEDIUM: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    HIGH: 'bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200',
    URGENT: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const columns: Column<Job>[] = [
    { key: 'booking', header: 'Booking', render: (item) => <code className="text-xs bg-muted px-1 rounded">{item.booking.bookingNo}</code> },
    { key: 'customer', header: 'Customer', render: (item) => <span>{item.customer.name}<br/><small className="text-muted-foreground">{item.customer.phone}</small></span> },
    { key: 'service', header: 'Service', render: (item) => item.service.title },
    { key: 'scheduled', header: 'Scheduled', render: (item) => <>{new Date(item.scheduledDate).toLocaleDateString()}<br/><small className="text-muted-foreground">{item.scheduledTime} ({item.estimatedDuration} min)</small></> },
    { key: 'priority', header: 'Priority', render: (item) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${priorityColors[item.priority] || 'bg-gray-100'}`}>{item.priority}</span> },
    { key: 'jobStatus', header: 'Status', render: (item) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.jobStatus] || 'bg-gray-100'}`}>{item.jobStatus}</span> },
    { key: 'executive', header: 'Executive', render: (item) => item.executive?.name || '-' },
  ];

  const fields: FormField[] = [
    { name: 'bookingId', label: 'Booking', type: 'select', required: true, options: bookings },
    { name: 'executiveId', label: 'Executive', type: 'select', options: users },
    { name: 'scheduledDate', label: 'Scheduled Date', type: 'date', required: true },
    { name: 'scheduledTime', label: 'Scheduled Time', type: 'text', required: true, placeholder: '10:00 AM' },
    { name: 'estimatedDuration', label: 'Duration (minutes)', type: 'number', required: true, placeholder: '60' },
    { name: 'priority', label: 'Priority', type: 'select', options: [{ label: 'Low', value: 'LOW' }, { label: 'Medium', value: 'MEDIUM' }, { label: 'High', value: 'HIGH' }, { label: 'Urgent', value: 'URGENT' }] },
    { name: 'jobStatus', label: 'Status', type: 'select', options: [{ label: 'Pending', value: 'PENDING' }, { label: 'Assigned', value: 'ASSIGNED' }, { label: 'In Progress', value: 'IN_PROGRESS' }, { label: 'Completed', value: 'COMPLETED' }, { label: 'On Hold', value: 'ON_HOLD' }, { label: 'Cancelled', value: 'CANCELLED' }] },
    { name: 'notes', label: 'Notes', type: 'textarea', placeholder: 'Job notes...' },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Briefcase className="h-5 w-5 text-primary" />Jobs Management</CardTitle>
          <CardDescription>Manage job assignments to executives</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-wrap">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border rounded-md bg-background">
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="ASSIGNED">Assigned</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
              <option value="ON_HOLD">On Hold</option>
              <option value="CANCELLED">Cancelled</option>
            </select>
            <select value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)} className="px-3 py-2 border rounded-md bg-background">
              <option value="">All Priorities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
            {(statusFilter || priorityFilter) && <button onClick={() => { setStatusFilter(''); setPriorityFilter(''); }} className="px-3 py-2 border rounded-md hover:bg-muted">Clear Filters</button>}
          </div>
          <DataTable data={jobs} columns={columns} loading={loading} onCreate={handleCreate} onEdit={handleEdit} onDelete={handleDelete} searchValue={searchQuery} onSearchChange={setSearchQuery} currentPage={currentPage} onPageChange={setCurrentPage} totalCount={totalCount} searchPlaceholder="Search by booking, customer, or service..." createButtonText="Add Job" />
        </CardContent>
      </Card>
      <CRUDDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editingJob ? 'Edit Job' : 'Add Job'} fields={fields} data={editingJob || {}} onSubmit={handleSubmit} submitButtonText={editingJob ? 'Update' : 'Create'} loading={submitting} />
    </div>
  );
}