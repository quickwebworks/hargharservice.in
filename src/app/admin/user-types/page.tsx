'use client';

import { useState, useEffect } from 'react';
import { DataTable } from '@/components/admin/DataTable';
import { CRUDDialog } from '@/components/admin/CRUDDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield } from 'lucide-react';

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
  const [editingUserType, setEditingUserType] = useState<UserType | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const fetchUserTypes = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: '10',
        ...(searchQuery && { search: searchQuery }),
      });
      const res = await fetch(`/api/admin/user-types?${params}`);
      const json = await res.json();
      setUserTypes(json.data || []);
      setTotalCount(json.total || 0);
    } catch (error) {
      console.error('Failed to fetch user types:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTypes();
  }, [currentPage, searchQuery]);

  const handleCreate = () => {
    setEditingUserType(null);
    setDialogOpen(true);
  };

  const handleEdit = (userType: UserType) => {
    setEditingUserType(userType);
    setDialogOpen(true);
  };

  const handleDelete = async (userType: UserType) => {
    if (!confirm('Are you sure you want to delete this user type?')) return;

    try {
      const res = await fetch(`/api/admin/user-types/${userType.id}`, { method: 'DELETE' });
      if (res.ok) {
        fetchUserTypes();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to delete user type');
      }
    } catch (error) {
      console.error('Failed to delete user type:', error);
      alert('Failed to delete user type');
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    setSubmitting(true);
    try {
      const url = editingUserType
        ? `/api/admin/user-types/${editingUserType.id}`
        : '/api/admin/user-types';
      const method = editingUserType ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        setDialogOpen(false);
        fetchUserTypes();
      } else {
        const error = await res.json();
        alert(error.error || 'Failed to save user type');
      }
    } catch (error) {
      console.error('Failed to save user type:', error);
      alert('Failed to save user type');
    } finally {
      setSubmitting(false);
    }
  };

  const columns = [
    {
      key: 'name',
      header: 'Name',
      render: (item: UserType) => <span className="font-medium">{item.name}</span>,
    },
    { key: 'code', header: 'Code' },
    {
      key: 'description',
      header: 'Description',
      render: (item: UserType) => item.description || '-',
    },
    {
      key: 'isActive',
      header: 'Status',
      render: (item: UserType) => (
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
      render: (item: UserType) => item.order,
    },
  ];

  const fields = [
    { name: 'name', label: 'Name', type: 'text' as const, required: true, placeholder: 'e.g., Customer' },
    { name: 'code', label: 'Code', type: 'text' as const, required: true, placeholder: 'e.g., CUSTOMER' },
    { name: 'description', label: 'Description', type: 'textarea' as const, placeholder: 'Description of user type' },
    { name: 'isActive', label: 'Active', type: 'switch' as const },
    { name: 'order', label: 'Order', type: 'number' as const, placeholder: '0' },
  ];

  return (
    <div className="container mx-auto py-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-primary" />
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
            onSearchChange={setSearchQuery}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalCount={totalCount}
            searchPlaceholder="Search by name or code..."
            createButtonText="Add User Type"
          />
        </CardContent>
      </Card>

      <CRUDDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingUserType ? 'Edit User Type' : 'Add User Type'}
        description={editingUserType ? 'Update user type details' : 'Create a new user type'}
        fields={fields}
        data={editingUserType || {}}
        onSubmit={handleSubmit}
        submitButtonText={editingUserType ? 'Update' : 'Create'}
        loading={submitting}
      />
    </div>
  );
}