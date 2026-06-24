'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { CRUDDialog, type FormField } from '@/components/admin/CRUDDialog';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface UserType {
  id: string;
  name: string;
  code: string;
  description: string | null;
  permissions: string | null;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}

export default function UserTypesPage() {
  const [userTypes, setUserTypes] = useState<UserType[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<UserType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const fetchUserTypes = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: '10',
        ...(searchQuery && { search: searchQuery }),
      });
      const res = await fetch(`/api/admin/user-types?${params}`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to fetch user types');
      }

      setUserTypes(json.data || []);
      setTotalCount(json.total || 0);
    } catch (error: any) {
      console.error('Failed to fetch user types:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load user types',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery]);

  useEffect(() => {
    fetchUserTypes();
  }, [fetchUserTypes]);

  const handleCreate = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: UserType) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleDelete = async (item: UserType) => {
    try {
      const res = await fetch(`/api/admin/user-types/${item.id}`, { method: 'DELETE' });
      const json = await res.json();

      if (res.ok) {
        toast({
          title: 'Deleted',
          description: `"${item.name}" has been deleted successfully`,
        });
        fetchUserTypes();
      } else {
        throw new Error(json.error || 'Failed to delete');
      }
    } catch (error: any) {
      toast({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete user type',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    setSubmitting(true);
    try {
      const url = editingItem
        ? `/api/admin/user-types/${editingItem.id}`
        : '/api/admin/user-types';
      const method = editingItem ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        toast({
          title: editingItem ? 'Updated' : 'Created',
          description: editingItem
            ? `"${data.name}" has been updated successfully`
            : `"${data.name}" has been created successfully`,
        });
        setDialogOpen(false);
        fetchUserTypes();
      } else {
        throw new Error(json.error || 'Failed to save');
      }
    } catch (error: any) {
      toast({
        title: 'Save Failed',
        description: error.message || 'An error occurred',
        variant: 'destructive',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const columns: Column<UserType>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (item) => <span className="font-medium">{item.name}</span>,
    },
    { key: 'code', header: 'Code' },
    {
      key: 'description',
      header: 'Description',
      render: (item) => item.description || <span className="text-muted-foreground">-</span>,
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (item) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.isActive
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
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
    { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'e.g., Customer' },
    { name: 'code', label: 'Code', type: 'text', required: true, placeholder: 'e.g., CUSTOMER' },
    { name: 'description', label: 'Description', type: 'textarea', placeholder: 'Description of user type' },
    { name: 'isActive', label: 'Active', type: 'switch' },
    { name: 'order', label: 'Display Order', type: 'number', placeholder: '0' },
  ];

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-foreground" />
            User Types Management
          </CardTitle>
          <CardDescription>Manage user roles and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <DataTable
            data={userTypes}
            columns={columns}
            loading={loading}
            onCreate={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchValue={searchQuery}
            onSearchChange={(val) => {
              setSearchQuery(val);
              setCurrentPage(1);
            }}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalCount={totalCount}
            searchPlaceholder="Search by name or code..."
            createButtonText="Add User Type"
          />
        </CardContent>
      </Card>

      <CRUDDialog
        key={editingItem?.id ?? 'create'}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingItem ? 'Edit User Type' : 'Add User Type'}
        description={editingItem ? 'Update user type details' : 'Create a new user type'}
        fields={fields}
        data={editingItem || undefined}
        onSubmit={handleSubmit}
        submitButtonText={editingItem ? 'Update' : 'Create'}
        loading={submitting}
      />
    </div>
  );
}