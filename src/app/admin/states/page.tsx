'use client';

import { useState, useEffect } from 'react';
import { DataTable, Column } from '@/components/admin/DataTable';
import { CRUDDialog, FormField } from '@/components/admin/CRUDDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapPin } from 'lucide-react';

interface State {
  id: string;
  name: string;
  code: string | null;
  isActive: boolean;
  order: number;
  country: { name: string; code: string };
  createdAt: string;
}

interface SelectOption {
  label: string;
  value: string;
}

export default function StatesPage() {
  const [states, setStates] = useState<State[]>([]);
  const [countries, setCountries] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingState, setEditingState] = useState<State | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const fetchStates = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: '10',
        ...(searchQuery && { search: searchQuery }),
        ...(countryFilter && { countryId: countryFilter }),
      });
      const res = await fetch(`/api/admin/states?${params}`);
      const json = await res.json();
      setStates(json.data || []);
      setTotalCount(json.total || 0);
    } catch (error) {
      console.error('Failed to fetch states:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCountries = async () => {
    try {
      const res = await fetch('/api/admin/countries?pageSize=1000');
      const json = await res.json();
      setCountries(json.data?.map((c: any) => ({ label: c.name, value: c.id })) || []);
    } catch (error) {
      console.error('Failed to fetch countries:', error);
    }
  };

  useEffect(() => {
    fetchStates();
    fetchCountries();
  }, [currentPage, searchQuery, countryFilter]);

  const handleCreate = () => {
    setEditingState(null);
    setDialogOpen(true);
  };

  const handleEdit = (state: State) => {
    setEditingState(state);
    setDialogOpen(true);
  };

  const handleDelete = async (state: State) => {
    if (!confirm('Are you sure you want to delete this state?')) return;

    try {
      const res = await fetch(`/api/admin/states/${state.id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchStates();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to delete state');
      }
    } catch (error) {
      console.error('Failed to delete state:', error);
      alert('Failed to delete state');
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    setSubmitting(true);
    try {
      const url = editingState ? `/api/admin/states/${editingState.id}` : '/api/admin/states';
      const method = editingState ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setDialogOpen(false);
        fetchStates();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to save state');
      }
    } catch (error) {
      console.error('Failed to save state:', error);
      alert('Failed to save state');
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<State>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (item) => <span className="font-medium">{item.name}</span>,
    },
    { key: 'code', header: 'Code', render: (item) => item.code || '-' },
    {
      key: 'country',
      header: 'Country',
      render: (item) => (
        <span>{item.country.name} ({item.country.code})</span>
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
      name: 'countryId',
      label: 'Country',
      type: 'select',
      required: true,
      options: countries,
    },
    { name: 'name', label: 'State Name', type: 'text', required: true, placeholder: 'e.g., Punjab' },
    { name: 'code', label: 'State Code', type: 'text', placeholder: 'e.g., PB' },
    { name: 'isActive', label: 'Active', type: 'switch' },
    { name: 'order', label: 'Display Order', type: 'number', placeholder: '0' },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5 text-primary" />
            States Management
          </CardTitle>
          <CardDescription>Manage states (filter by country)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <select
              value={countryFilter}
              onChange={(e) => setCountryFilter(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="">All Countries</option>
              {countries.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>

            {countryFilter && (
              <Button variant="outline" size="sm" onClick={() => setCountryFilter('')}>
                Clear Filter
              </Button>
            )}
          </div>

          <DataTable
            data={states}
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
            searchPlaceholder="Search by state name..."
            createButtonText="Add State"
          />
        </CardContent>
      </Card>

      <CRUDDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingState ? 'Edit State' : 'Add State'}
        description={editingState ? 'Update state details' : 'Create a new state'}
        fields={fields}
        data={editingState || {}}
        onSubmit={handleSubmit}
        submitButtonText={editingState ? 'Update' : 'Create'}
        loading={submitting}
      />
    </div>
  );
}