'use client';

import { useState, useEffect } from 'react';
import { DataTable, Column } from '@/components/admin/DataTable';
import { CRUDDialog, FormField } from '@/components/admin/CRUDDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Package } from 'lucide-react';

interface Service {
  id: string;
  title: string;
  slug: string;
  price: number;
  discountPrice: number | null;
  gst: number;
  duration: number;
  isActive: boolean;
  isFeatured: boolean;
  category: { title: string };
  createdAt: string;
}

interface SelectOption {
  label: string;
  value: string;
}

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [categories, setCategories] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const fetchServices = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: currentPage.toString(), pageSize: '10', ...(searchQuery && { search: searchQuery }), ...(categoryFilter && { categoryId: categoryFilter }) });
      const res = await fetch(`/api/admin/services?${params}`);
      const json = await res.json();
      setServices(json.data || []);
      setTotalCount(json.total || 0);
    } catch (error) { console.error('Failed to fetch services:', error); }
    finally { setLoading(false); }
  };

  const fetchCategories = async () => {
    try {
      const res = await fetch('/api/admin/categories?pageSize=1000');
      const json = await res.json();
      setCategories(json.data?.map((c: any) => ({ label: c.title, value: c.id })) || []);
    } catch (error) { console.error('Failed to fetch categories:', error); }
  };

  useEffect(() => { fetchServices(); fetchCategories(); }, [currentPage, searchQuery, categoryFilter]);

  const handleCreate = () => { setEditingService(null); setDialogOpen(true); };
  const handleEdit = (service: Service) => { setEditingService(service); setDialogOpen(true); };
  const handleDelete = async (service: Service) => {
    if (!confirm('Are you sure you want to delete this service?')) return;
    try {
      const res = await fetch(`/api/admin/services/${service.id}`, { method: 'DELETE' });
      if (res.ok) fetchServices();
      else alert((await res.json()).error || 'Failed to delete service');
    } catch (error) { console.error('Failed to delete service:', error); alert('Failed to delete service'); }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    setSubmitting(true);
    try {
      const url = editingService ? `/api/admin/services/${editingService.id}` : '/api/admin/services';
      const method = editingService ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (res.ok) { setDialogOpen(false); fetchServices(); }
      else alert((await res.json()).error || 'Failed to save service');
    } catch (error) { console.error('Failed to save service:', error); alert('Failed to save service'); }
    finally { setSubmitting(false); }
  };

  const columns: Column<Service>[] = [
    { key: 'title', header: 'Title', render: (item) => <span className="font-medium">{item.title}</span> },
    { key: 'category', header: 'Category', render: (item) => item.category.title },
    { key: 'price', header: 'Price', render: (item) => <span className="font-mono">₹{item.price}</span> },
    { key: 'discountPrice', header: 'Discount', render: (item) => item.discountPrice ? <span className="text-green-600 font-mono">₹{item.discountPrice}</span> : '-' },
    { key: 'duration', header: 'Duration', render: (item) => `${item.duration} min` },
    { key: 'isActive', header: 'Status', render: (item) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>{item.isActive ? 'Active' : 'Inactive'}</span> },
    { key: 'isFeatured', header: 'Featured', render: (item) => item.isFeatured ? '⭐' : '-' },
  ];

  const fields: FormField[] = [
    { name: 'categoryId', label: 'Category', type: 'select', required: true, options: categories },
    { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'e.g., Deep House Cleaning' },
    { name: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'e.g., deep-house-cleaning' },
    { name: 'description', label: 'Description', type: 'textarea', required: true, placeholder: 'Service description' },
    { name: 'features', label: 'Features (JSON)', type: 'textarea', placeholder: '["Feature 1", "Feature 2"]' },
    { name: 'price', label: 'Price (₹)', type: 'number', required: true, placeholder: '999' },
    { name: 'discountPrice', label: 'Discount Price (₹)', type: 'number', placeholder: '799' },
    { name: 'gst', label: 'GST (%)', type: 'number', placeholder: '18' },
    { name: 'duration', label: 'Duration (minutes)', type: 'number', placeholder: '60' },
    { name: 'image', label: 'Image URL', type: 'text', placeholder: '/images/services/cleaning.jpg' },
    { name: 'isActive', label: 'Active', type: 'switch' },
    { name: 'isFeatured', label: 'Featured', type: 'switch' },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Package className="h-5 w-5 text-primary" />Services Management</CardTitle>
          <CardDescription>Manage services (filter by category)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-3 py-2 border rounded-md bg-background"><option value="">All Categories</option>{categories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}</select>
          <DataTable data={services} columns={columns} loading={loading} onCreate={handleCreate} onEdit={handleEdit} onDelete={handleDelete} searchValue={searchQuery} onSearchChange={setSearchQuery} currentPage={currentPage} onPageChange={setCurrentPage} totalCount={totalCount} searchPlaceholder="Search by title or slug..." createButtonText="Add Service" />
        </CardContent>
      </Card>
      <CRUDDialog key={editingService?.id ?? 'create'} open={dialogOpen} onOpenChange={setDialogOpen} title={editingService ? 'Edit Service' : 'Add Service'} fields={fields} data={editingService || {}} onSubmit={handleSubmit} submitButtonText={editingService ? 'Update' : 'Create'} loading={submitting} />
    </div>
  );
}