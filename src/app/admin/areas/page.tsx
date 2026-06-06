'use client';

import { useState, useEffect } from 'react';
import { DataTable, Column } from '@/components/admin/DataTable';
import { CRUDDialog, FormField } from '@/components/admin/CRUDDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Map } from 'lucide-react';

interface Area {
  id: string;
  name: string;
  isActive: boolean;
  order: number;
  city: { name: string; state: { name: string } };
  createdAt: string;
}

interface SelectOption {
  label: string;
  value: string;
}

export default function AreasPage() {
  const [areas, setAreas] = useState<Area[]>([]);
  const [cities, setCities] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingArea, setEditingArea] = useState<Area | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const fetchAreas = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: '10',
        ...(searchQuery && { search: searchQuery }),
        ...(cityFilter && { cityId: cityFilter }),
      });
      const res = await fetch(`/api/admin/areas?${params}`);
      const json = await res.json();
      setAreas(json.data || []);
      setTotalCount(json.total || 0);
    } catch (error) {
      console.error('Failed to fetch areas:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCities = async () => {
    try {
      const res = await fetch('/api/admin/cities?pageSize=1000');
      const json = await res.json();
      setCities(json.data?.map((c: any) => ({ label: c.name, value: c.id })) || []);
    } catch (error) {
      console.error('Failed to fetch cities:', error);
    }
  };

  useEffect(() => {
    fetchAreas();
    fetchCities();
  }, [currentPage, searchQuery, cityFilter]);

  const handleCreate = () => {
    setEditingArea(null);
    setDialogOpen(true);
  };

  const handleEdit = (area: Area) => {
    setEditingArea(area);
    setDialogOpen(true);
  };

  const handleDelete = async (area: Area) => {
    if (!confirm('Are you sure you want to delete this area?')) return;

    try {
      const res = await fetch(`/api/admin/areas/${area.id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchAreas();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to delete area');
      }
    } catch (error) {
      console.error('Failed to delete area:', error);
      alert('Failed to delete area');
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    setSubmitting(true);
    try {
      const url = editingArea ? `/api/admin/areas/${editingArea.id}` : '/api/admin/areas';
      const method = editingArea ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setDialogOpen(false);
        fetchAreas();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to save area');
      }
    } catch (error) {
      console.error('Failed to save area:', error);
      alert('Failed to save area');
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<Area>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (item) => <span className="font-medium">{item.name}</span>,
    },
    {
      key: 'location',
      header: 'Location',
      render: (item) => (
        <span>{item.city.name}, {item.city.state.name}</span>
      ),
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (item) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
        }`}>
          {item.isActive ? 'Active' : 'Inactive'}
        </span>
      ),
    },
    { key: 'order', header: 'Order', render: (item) => item.order },
  ];

  const fields: FormField[] = [
    {
      name: 'cityId',
      label: 'City',
      type: 'select',
      required: true,
      options: cities,
    },
    { name: 'name', label: 'Area Name', type: 'text', required: true, placeholder: 'e.g., Ranjit Avenue' },
    { name: 'isActive', label: 'Active', type: 'switch' },
    { name: 'order', label: 'Display Order', type: 'number', placeholder: '0' },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Map className="h-5 w-5 text-primary" />
            Areas Management
          </CardTitle>
          <CardDescription>Manage areas (filter by city)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <select value={cityFilter} onChange={(e) => setCityFilter(e.target.value)} className="px-3 py-2 border rounded-md bg-background">
            <option value="">All Cities</option>
            {cities.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
          </select>

          <DataTable
            data={areas}
            columns={columns}
            loading={loading}
            onCreate={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchValue={searchQuery}
            onSearchChange={setSearchQuery}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalCount={totalCount}
            searchPlaceholder="Search by area name..."
            createButtonText="Add Area"
          />
        </CardContent>
      </Card>

      <CRUDDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editingArea ? 'Edit Area' : 'Add Area'} fields={fields} data={editingArea || {}} onSubmit={handleSubmit} submitButtonText={editingArea ? 'Update' : 'Create'} loading={submitting} />
    </div>
  );
}