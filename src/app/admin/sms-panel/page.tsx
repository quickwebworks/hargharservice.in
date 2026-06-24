'use client';

import { useState, useEffect } from 'react';
import { DataTable, Column } from '@/components/admin/DataTable';
import { CRUDDialog, FormField } from '@/components/admin/CRUDDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, Send } from 'lucide-react';

interface SMS {
  id: string;
  phoneNumber: string;
  message: string;
  status: string;
  sentAt: string | null;
  deliveredAt: string | null;
  provider: string | null;
  createdAt: string;
}

export default function SMSPanelPage() {
  const [smsList, setSmsList] = useState<SMS[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [bulkDialogOpen, setBulkDialogOpen] = useState(false);
  const [editingSMS, setEditingSMS] = useState<SMS | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const fetchSMS = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: '10',
        ...(searchQuery && { search: searchQuery }),
        ...(statusFilter && { status: statusFilter }),
      });
      const res = await fetch(`/api/admin/sms-panel?${params}`);
      const json = await res.json();
      setSmsList(json.data || []);
      setTotalCount(json.total || 0);
    } catch (error) { console.error('Failed to fetch SMS:', error); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchSMS(); }, [currentPage, searchQuery, statusFilter]);

  const handleCreate = () => { setEditingSMS(null); setDialogOpen(true); };
  const handleBulkSend = () => { setBulkDialogOpen(true); };
  const handleEdit = (sms: SMS) => { setEditingSMS(sms); setDialogOpen(true); };
  const handleDelete = async (sms: SMS) => {
    if (!confirm('Are you sure you want to delete this SMS record?')) return;
    try {
      const res = await fetch(`/api/admin/sms-panel/${sms.id}`, { method: 'DELETE' });
      if (res.ok) fetchSMS();
      else alert((await res.json()).error || 'Failed to delete SMS');
    } catch (error) { console.error('Failed to delete SMS:', error); alert('Failed to delete SMS'); }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    setSubmitting(true);
    try {
      const url = editingSMS ? `/api/admin/sms-panel/${editingSMS.id}` : '/api/admin/sms-panel';
      const method = editingSMS ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (res.ok) { setDialogOpen(false); fetchSMS(); }
      else alert((await res.json()).error || 'Failed to save SMS');
    } catch (error) { console.error('Failed to save SMS:', error); alert('Failed to save SMS'); }
    finally { setSubmitting(false); }
  };

  const handleBulkSubmit = async (data: Record<string, any>) => {
    setSubmitting(true);
    try {
      const phoneNumbers = data.phoneNumbers?.split('\n').map((p: string) => p.trim()).filter((p: string) => p);
      const message = data.message;

      if (!phoneNumbers?.length || !message) {
        alert('Please provide phone numbers and message');
        setSubmitting(false);
        return;
      }

      for (const phone of phoneNumbers) {
        await fetch('/api/admin/sms-panel', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ phoneNumber: phone, message, provider: data.provider }),
        });
      }

      setBulkDialogOpen(false);
      fetchSMS();
      alert(`SMS sent to ${phoneNumbers.length} recipients`);
    } catch (error) { console.error('Failed to send bulk SMS:', error); alert('Failed to send bulk SMS'); }
    finally { setSubmitting(false); }
  };

  const statusColors: Record<string, string> = {
    PENDING: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    SENT: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200',
    DELIVERED: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
    FAILED: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
  };

  const columns: Column<SMS>[] = [
    { key: 'phoneNumber', header: 'Phone Number', render: (item) => <span className="font-mono">{item.phoneNumber}</span> },
    { key: 'message', header: 'Message', render: (item) => <span className="max-w-xs truncate block" title={item.message}>{item.message}</span> },
    { key: 'status', header: 'Status', render: (item) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${statusColors[item.status] || 'bg-gray-100'}`}>{item.status}</span> },
    { key: 'provider', header: 'Provider', render: (item) => item.provider || '-' },
    { key: 'createdAt', header: 'Created At', render: (item) => <>{new Date(item.createdAt).toLocaleString()}</> },
    { key: 'sentAt', header: 'Sent At', render: (item) => item.sentAt ? <>{new Date(item.sentAt).toLocaleString()}</> : '-' },
  ];

  const fields: FormField[] = [
    { name: 'phoneNumber', label: 'Phone Number', type: 'tel', required: true, placeholder: '+91 9876543210' },
    { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Enter your message here...', description: 'SMS character limit: 160' },
    { name: 'provider', label: 'SMS Provider', type: 'select', options: [{ label: 'MSG91', value: 'MSG91' }, { label: 'Twilio', value: 'Twilio' }, { label: 'Other', value: 'Other' }] },
  ];

  const bulkFields: FormField[] = [
    { name: 'phoneNumbers', label: 'Phone Numbers (one per line)', type: 'textarea', required: true, placeholder: '+91 9876543210\n+91 9876543211\n+91 9876543212', description: 'Enter multiple phone numbers, one on each line' },
    { name: 'message', label: 'Message', type: 'textarea', required: true, placeholder: 'Enter your message here...', description: 'SMS character limit: 160' },
    { name: 'provider', label: 'SMS Provider', type: 'select', options: [{ label: 'MSG91', value: 'MSG91' }, { label: 'Twilio', value: 'Twilio' }, { label: 'Other', value: 'Other' }] },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MessageSquare className="h-5 w-5 text-primary" />SMS Panel</CardTitle>
          <CardDescription>Send bulk SMS and view SMS history</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-4 flex-wrap">
            <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-3 py-2 border rounded-md bg-background">
              <option value="">All Status</option>
              <option value="PENDING">Pending</option>
              <option value="SENT">Sent</option>
              <option value="DELIVERED">Delivered</option>
              <option value="FAILED">Failed</option>
            </select>
            {statusFilter && <button onClick={() => setStatusFilter('')} className="px-3 py-2 border rounded-md hover:bg-muted">Clear Filter</button>}
          </div>
          <DataTable data={smsList} columns={columns} loading={loading} onCreate={handleCreate} onEdit={handleEdit} onDelete={handleDelete} searchValue={searchQuery} onSearchChange={setSearchQuery} currentPage={currentPage} onPageChange={setCurrentPage} totalCount={totalCount} searchPlaceholder="Search by phone number or message..." createButtonText="Send SMS" />
        </CardContent>
      </Card>

      <CRUDDialog key={editingSMS?.id ?? 'create'} open={dialogOpen} onOpenChange={setDialogOpen} title={editingSMS ? 'Edit SMS' : 'Send SMS'} fields={fields} data={editingSMS || {}} onSubmit={handleSubmit} submitButtonText={editingSMS ? 'Update' : 'Send'} loading={submitting} />

      <CRUDDialog key='bulk' open={bulkDialogOpen} onOpenChange={setBulkDialogOpen} title="Send Bulk SMS" fields={bulkFields} data={{}} onSubmit={handleBulkSubmit} submitButtonText="Send Bulk SMS" loading={submitting} />
    </div>
  );
}