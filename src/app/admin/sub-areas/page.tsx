'use client';

import { useState, useEffect } from 'react';
import { DataTable, Column } from '@/components/admin/DataTable';
import { CRUDDialog, FormField } from '@/components/admin/CRUDDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPinOff } from 'lucide-react';

interface SubArea {
  id: string;
  name: string;
  isActive: boolean;
  order: number;
  area: { name: string; city: { name: string } };
  createdAt: string;
}

interface SelectOption {
  label: string;
  value: string;
}

export default function SubAreasPage() {
  const [subAreas, setSubAreas] = useState<SubArea[]>([]);
  const [areas, setAreas] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingSubArea, setEditingSubArea] = useState<SubArea | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [areaFilter, setAreaFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const fetchSubAreas = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: currentPage.toString(), pageSize: '10', ...(searchQuery && { search: searchQuery }), ...(areaFilter && { areaId: areaFilter }) });
      const res = await fetch(`/api/admin/sub-areas?${params}`);
      const json = await res.json();
      setSubAreas(json.data || []);
      setTotalCount(json.total || 0);
    } catch (error) {
      console.error('Failed to fetch sub-areas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAreas = async () => {
    try {
      const res = await fetch('/api/admin/areas?pageSize=1000');
      const json = await res.json();
      setAreas(json.data?.map((a: any) => ({ label: a.name, value: a.id })) || []);
    } catch (error) {
      console.error('Failed to fetch areas:', error);
    }
  };

  useEffect(() => { fetchSubAreas(); fetchAreas(); }, [currentPage, searchQuery, areaFilter]);

  const handleCreate = () => { setEditingSubArea(null); setDialogOpen(true); };
  const handleEdit = (subArea: SubArea) => { setEditingSubArea(subArea); setDialogOpen(true); };
  const handleDelete = async (subArea: SubArea) => {
    if (!confirm('Are you sure you want to delete this sub-area?')) return;
    try {
      const res = await fetch(`/api/admin/sub-areas/${subArea.id}`, { method: 'DELETE' });
      if (res.ok) fetchSubAreas();
      else alert((await res.json()).error || 'Failed to delete sub-area');
    } catch (error) {
      console.error('Failed to delete sub-area:', error);
      alert('Failed to delete sub-area');
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    setSubmitting(true);
    try {
      const url = editingSubArea ? `/api/admin/sub-areas/${editingSubArea.id}` : '/api/admin/sub-areas';
      const method = editingSubArea ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (res.ok) { setDialogOpen(false); fetchSubAreas(); }
      else alert((await res.json()).error || 'Failed to save sub-area');
    } catch (error) {
      console.error('Failed to save sub-area:', error);
      alert('Failed to save sub-area');
    } finally { setSubmitting(false); }
  };

  const columns: Column<SubArea>[] = [
    { key: 'name', header: 'Name', render: (item) => <span className="font-medium">{item.name}</span> },
    { key: 'location', header: 'Location', render: (item) => <span>{item.area.name}, {item.area.city.name}</span> },
    { key: 'isActive', header: 'Status', render: (item) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>{item.isActive ? 'Active' : 'Inactive'}</span> },
    { key: 'order', header: 'Order', render: (item) => item.order },
  ];

  const fields: FormField[] = [
    { name: 'areaId', label: 'Area', type: 'select', required: true, options: areas },
    { name: 'name', label: 'Sub-Area Name', type: 'text', required: true, placeholder: 'e.g., Block A' },
    { name: 'isActive', label: 'Active', type: 'switch' },
    { name: 'order', label: 'Display Order', type: 'number', placeholder: '0' },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><MapPinOff className="h-5 w-5 text-primary" />Sub-Areas Management</CardTitle>
          <CardDescription>Manage sub-areas (filter by area)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <select value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)} className="px-3 py-2 border rounded-md bg-background"><option value="">All Areas</option>{areas.map((a) => <option key={a.value} value={a.value}>{a.label}</option>)}</select>
          <DataTable data={subAreas} columns={columns} loading={loading} onCreate={handleCreate} onEdit={handleEdit} onDelete={handleDelete} searchValue={searchQuery} onSearchChange={setSearchQuery} currentPage={currentPage} onPageChange={setCurrentPage} totalCount={totalCount} searchPlaceholder="Search by sub-area name..." createButtonText="Add Sub-Area" />
        </CardContent>
      </Card>
      <CRUDDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editingSubArea ? 'Edit Sub-Area' : 'Add Sub-Area'} fields={fields} data={editingSubArea || {}} onSubmit={handleSubmit} submitButtonText={editingSubArea ? 'Update' : 'Create'} loading={submitting} />
    </div>
  );
}