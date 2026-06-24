'use client';

import { useState, useEffect } from 'react';
import { DataTable, Column } from '@/components/admin/DataTable';
import { CRUDDialog, FormField } from '@/components/admin/CRUDDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Globe } from 'lucide-react';

interface Country {
  id: string;
  name: string;
  code: string;
  callingCode: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
}

export default function CountriesPage() {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCountry, setEditingCountry] = useState<Country | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const fetchCountries = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: '10',
        ...(searchQuery && { search: searchQuery }),
      });
      const res = await fetch(`/api/admin/countries?${params}`);
      const json = await res.json();
      setCountries(json.data || []);
      setTotalCount(json.total || 0);
    } catch (error) {
      console.error('Failed to fetch countries:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, [currentPage, searchQuery]);

  const handleCreate = () => {
    setEditingCountry(null);
    setDialogOpen(true);
  };

  const handleEdit = (country: Country) => {
    setEditingCountry(country);
    setDialogOpen(true);
  };

  const handleDelete = async (country: Country) => {
    if (!confirm('Are you sure you want to delete this country?')) return;

    try {
      const res = await fetch(`/api/admin/countries/${country.id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchCountries();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to delete country');
      }
    } catch (error) {
      console.error('Failed to delete country:', error);
      alert('Failed to delete country');
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    setSubmitting(true);
    try {
      const url = editingCountry ? `/api/admin/countries/${editingCountry.id}` : '/api/admin/countries';
      const method = editingCountry ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setDialogOpen(false);
        fetchCountries();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to save country');
      }
    } catch (error) {
      console.error('Failed to save country:', error);
      alert('Failed to save country');
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<Country>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (item) => <span className="font-medium">{item.name}</span>,
    },
    { key: 'code', header: 'ISO Code' },
    {
      key: 'callingCode',
      header: 'Calling Code',
      render: (item) => item.callingCode || '-',
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
    { name: 'name', label: 'Country Name', type: 'text', required: true, placeholder: 'e.g., India' },
    { name: 'code', label: 'ISO Code', type: 'text', required: true, placeholder: 'e.g., IN' },
    { name: 'callingCode', label: 'Calling Code', type: 'text', placeholder: 'e.g., +91' },
    { name: 'isActive', label: 'Active', type: 'switch' },
    { name: 'order', label: 'Display Order', type: 'number', placeholder: '0' },
  ];

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5 text-primary" />
            Countries Management
          </CardTitle>
          <CardDescription>Manage countries and their details</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={countries}
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
            searchPlaceholder="Search by name or code..."
            createButtonText="Add Country"
          />
        </CardContent>
      </Card>

      <CRUDDialog
        key={editingCountry?.id ?? 'create'}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingCountry ? 'Edit Country' : 'Add Country'}
        description={editingCountry ? 'Update country details' : 'Create a new country'}
        fields={fields}
        data={editingCountry || {}}
        onSubmit={handleSubmit}
        submitButtonText={editingCountry ? 'Update' : 'Create'}
        loading={submitting}
      />
    </div>
  );
}