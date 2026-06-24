'use client';

import { useState, useEffect } from 'react';
import { DataTable, Column } from '@/components/admin/DataTable';
import { CRUDDialog, FormField } from '@/components/admin/CRUDDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Building2 } from 'lucide-react';

interface City {
  id: string;
  name: string;
  isActive: boolean;
  order: number;
  state: { name: string; country: { name: string } };
  createdAt: string;
}

interface SelectOption {
  label: string;
  value: string;
}

export default function CitiesPage() {
  const [cities, setCities] = useState<City[]>([]);
  const [states, setStates] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCity, setEditingCity] = useState<City | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [stateFilter, setStateFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const fetchCities = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: '10',
        ...(searchQuery && { search: searchQuery }),
        ...(stateFilter && { stateId: stateFilter }),
      });
      const res = await fetch(`/api/admin/cities?${params}`);
      const json = await res.json();
      setCities(json.data || []);
      setTotalCount(json.total || 0);
    } catch (error) {
      console.error('Failed to fetch cities:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchStates = async () => {
    try {
      const res = await fetch('/api/admin/states?pageSize=1000');
      const json = await res.json();
      setStates(json.data?.map((s: any) => ({ label: s.name, value: s.id })) || []);
    } catch (error) {
      console.error('Failed to fetch states:', error);
    }
  };

  useEffect(() => {
    fetchCities();
    fetchStates();
  }, [currentPage, searchQuery, stateFilter]);

  const handleCreate = () => {
    setEditingCity(null);
    setDialogOpen(true);
  };

  const handleEdit = (city: City) => {
    setEditingCity(city);
    setDialogOpen(true);
  };

  const handleDelete = async (city: City) => {
    if (!confirm('Are you sure you want to delete this city?')) return;

    try {
      const res = await fetch(`/api/admin/cities/${city.id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCities();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to delete city');
      }
    } catch (error) {
      console.error('Failed to delete city:', error);
      alert('Failed to delete city');
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    setSubmitting(true);
    try {
      const url = editingCity ? `/api/admin/cities/${editingCity.id}` : '/api/admin/cities';
      const method = editingCity ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setDialogOpen(false);
        fetchCities();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to save city');
      }
    } catch (error) {
      console.error('Failed to save city:', error);
      alert('Failed to save city');
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<City>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (item) => <span className="font-medium">{item.name}</span>,
    },
    {
      key: 'state',
      header: 'State',
      render: (item) => (
        <span>{item.state.name}, {item.state.country.name}</span>
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
    {
      key: 'order',
      header: 'Order',
      render: (item) => item.order,
    },
  ];

  const fields: FormField[] = [
    {
      name: 'stateId',
      label: 'State',
      type: 'select',
      required: true,
      options: states,
    },
    { name: 'name', label: 'City Name', type: 'text', required: true, placeholder: 'e.g., Amritsar' },
    { name: 'isActive', label: 'Active', type: 'switch' },
    { name: 'order', label: 'Display Order', type: 'number', placeholder: '0' },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            Cities Management
          </CardTitle>
          <CardDescription>Manage cities (filter by state)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <select
              value={stateFilter}
              onChange={(e) => setStateFilter(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="">All States</option>
              {states.map((s) => (
                <option key={s.value} value={s.value}>{s.label}</option>
              ))}
            </select>

            {stateFilter && (
              <button onClick={() => setStateFilter('')} className="px-3 py-2 border rounded-md hover:bg-muted">
                Clear Filter
              </button>
            )}
          </div>

          <DataTable
            data={cities}
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
            searchPlaceholder="Search by city name..."
            createButtonText="Add City"
          />
        </CardContent>
      </Card>

      <CRUDDialog
        key={editingCity?.id ?? 'create'}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingCity ? 'Edit City' : 'Add City'}
        description={editingCity ? 'Update city details' : 'Create a new city'}
        fields={fields}
        data={editingCity || {}}
        onSubmit={handleSubmit}
        submitButtonText={editingCity ? 'Update' : 'Create'}
        loading={submitting}
      />
    </div>
  );
}