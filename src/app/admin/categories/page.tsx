'use client';

import { useState, useEffect } from 'react';
import { DataTable, Column } from '@/components/admin/DataTable';
import { CRUDDialog, FormField } from '@/components/admin/CRUDDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { FolderTree } from 'lucide-react';

interface Category {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  image: string | null;
  icon: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
}

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const fetchCategories = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: currentPage.toString(), pageSize: '10', ...(searchQuery && { search: searchQuery }) });
      const res = await fetch(`/api/admin/categories?${params}`);
      const json = await res.json();
      setCategories(json.data || []);
      setTotalCount(json.total || 0);
    } catch (error) { console.error('Failed to fetch categories:', error); }
    finally { setLoading(false); }
  };

  useEffect(() => { fetchCategories(); }, [currentPage, searchQuery]);

  const handleCreate = () => { setEditingCategory(null); setDialogOpen(true); };
  const handleEdit = (category: Category) => { setEditingCategory(category); setDialogOpen(true); };
  const handleDelete = async (category: Category) => {
    if (!confirm('Are you sure you want to delete this category?')) return;
    try {
      const res = await fetch(`/api/admin/categories/${category.id}`, { method: 'DELETE' });
      if (res.ok) fetchCategories();
      else alert((await res.json()).error || 'Failed to delete category');
    } catch (error) { console.error('Failed to delete category:', error); alert('Failed to delete category'); }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    setSubmitting(true);
    try {
      const url = editingCategory ? `/api/admin/categories/${editingCategory.id}` : '/api/admin/categories';
      const method = editingCategory ? 'PATCH' : 'POST';
      const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      if (res.ok) { setDialogOpen(false); fetchCategories(); }
      else alert((await res.json()).error || 'Failed to save category');
    } catch (error) { console.error('Failed to save category:', error); alert('Failed to save category'); }
    finally { setSubmitting(false); }
  };

  const columns: Column<Category>[] = [
    { key: 'title', header: 'Title', render: (item) => <span className="font-medium">{item.title}</span> },
    { key: 'slug', header: 'Slug', render: (item) => <code className="text-xs bg-muted px-1 rounded">{item.slug}</code> },
    { key: 'description', header: 'Description', render: (item) => item.description || '-' },
    { key: 'isActive', header: 'Status', render: (item) => <span className={`px-2 py-1 rounded-full text-xs font-medium ${item.isActive ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'}`}>{item.isActive ? 'Active' : 'Inactive'}</span> },
    { key: 'order', header: 'Order', render: (item) => item.order },
  ];

  const fields: FormField[] = [
    { name: 'title', label: 'Title', type: 'text', required: true, placeholder: 'e.g., Home Cleaning' },
    { name: 'slug', label: 'Slug', type: 'text', required: true, placeholder: 'e.g., home-cleaning' },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Category description' },
    { name: 'icon', label: 'Icon URL', type: 'text', placeholder: '/icons/cleaning.svg' },
    { name: 'image', label: 'Image URL', type: 'text', placeholder: '/images/categories/cleaning.jpg' },
    { name: 'isActive', label: 'Active', type: 'switch' },
    { name: 'order', label: 'Display Order', type: 'number', placeholder: '0' },
  ];

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><FolderTree className="h-5 w-5 text-primary" />Categories Management</CardTitle>
          <CardDescription>Manage service categories</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable data={categories} columns={columns} loading={loading} onCreate={handleCreate} onEdit={handleEdit} onDelete={handleDelete} searchValue={searchQuery} onSearchChange={setSearchQuery} currentPage={currentPage} onPageChange={setCurrentPage} totalCount={totalCount} searchPlaceholder="Search by title or slug..." createButtonText="Add Category" />
        </CardContent>
      </Card>
      <CRUDDialog open={dialogOpen} onOpenChange={setDialogOpen} title={editingCategory ? 'Edit Category' : 'Add Category'} fields={fields} data={editingCategory || {}} onSubmit={handleSubmit} submitButtonText={editingCategory ? 'Update' : 'Create'} loading={submitting} />
    </div>
  );
}