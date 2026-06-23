'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { DataTable, type Column } from '@/components/admin/DataTable';
import { CRUDDialog, type FormField } from '@/components/admin/CRUDDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Users } from 'lucide-react';
import { toast } from '@/hooks/use-toast';

interface UserItem {
  id: string;
  email: string;
  phone: string;
  name: string;
  role: string;
  status: string;
  userType?: { name: string } | null;
  country?: { name: string } | null;
  state?: { name: string } | null;
  city?: { name: string } | null;
  area?: { name: string } | null;
  subArea?: { name: string } | null;
  createdAt: string;
}

interface SelectOption {
  label: string;
  value: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<UserItem[]>([]);
  const [countries, setCountries] = useState<SelectOption[]>([]);
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserItem | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [countryFilter, setCountryFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [submitting, setSubmitting] = useState(false);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: currentPage.toString(),
        pageSize: '10',
        ...(searchQuery && { search: searchQuery }),
        ...(roleFilter && { role: roleFilter }),
        ...(statusFilter && { status: statusFilter }),
        ...(countryFilter && { countryId: countryFilter }),
      });
      const res = await fetch(`/api/admin/users?${params}`);
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || 'Failed to fetch users');
      }

      setUsers(json.data || []);
      setTotalCount(json.total || 0);
    } catch (error: any) {
      console.error('Failed to fetch users:', error);
      toast({
        title: 'Error',
        description: error.message || 'Failed to load users',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }, [currentPage, searchQuery, roleFilter, statusFilter, countryFilter]);

  const fetchCountries = useCallback(async () => {
    try {
      const res = await fetch('/api/admin/countries?pageSize=1000');
      const json = await res.json();
      if (res.ok) {
        setCountries(json.data?.map((c: any) => ({ label: c.name, value: c.id })) || []);
      }
    } catch (error) {
      console.error('Failed to fetch countries:', error);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  useEffect(() => {
    fetchCountries();
  }, [fetchCountries]);

  const handleCreate = () => {
    setEditingUser(null);
    setDialogOpen(true);
  };

  const handleEdit = (user: UserItem) => {
    setEditingUser(user);
    setDialogOpen(true);
  };

  const handleDelete = async (user: UserItem) => {
    try {
      const res = await fetch(`/api/admin/users/${user.id}`, { method: 'DELETE' });
      const json = await res.json();

      if (res.ok) {
        toast({
          title: 'Deleted',
          description: `"${user.name}" has been deleted successfully`,
        });
        fetchUsers();
      } else {
        throw new Error(json.error || 'Failed to delete');
      }
    } catch (error: any) {
      toast({
        title: 'Delete Failed',
        description: error.message || 'Failed to delete user',
        variant: 'destructive',
      });
    }
  };

  const handleSubmit = async (data: Record<string, any>) => {
    setSubmitting(true);
    try {
      const url = editingUser
        ? `/api/admin/users/${editingUser.id}`
        : '/api/admin/users';
      const method = editingUser ? 'PATCH' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const json = await res.json();

      if (res.ok) {
        toast({
          title: editingUser ? 'Updated' : 'Created',
          description: editingUser
            ? `"${data.name}" has been updated successfully`
            : `"${data.name}" has been created successfully`,
        });
        setDialogOpen(false);
        fetchUsers();
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

  const handleSearchChange = (val: string) => {
    setSearchQuery(val);
    setCurrentPage(1);
  };

  const handleRoleFilterChange = (val: string) => {
    setRoleFilter(val);
    setCurrentPage(1);
  };

  const handleStatusFilterChange = (val: string) => {
    setStatusFilter(val);
    setCurrentPage(1);
  };

  const handleCountryFilterChange = (val: string) => {
    setCountryFilter(val);
    setCurrentPage(1);
  };

  const clearFilters = () => {
    setRoleFilter('');
    setStatusFilter('');
    setCountryFilter('');
    setCurrentPage(1);
  };

  const columns: Column<UserItem>[] = [
    {
      key: 'name',
      header: 'Name',
      render: (item) => <span className="font-medium">{item.name}</span>,
    },
    { key: 'email', header: 'Email' },
    { key: 'phone', header: 'Phone' },
    {
      key: 'role',
      header: 'Role',
      render: (item) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.role === 'ADMIN' || item.role === 'SUPER_ADMIN' ? 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200' :
          item.role === 'EXECUTIVE' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200' :
          item.role === 'MANAGER' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
          'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
        }`}>
          {item.role}
        </span>
      ),
    },
    {
      key: 'status',
      header: 'Status',
      render: (item) => (
        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
          item.status === 'ACTIVE' ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' :
          item.status === 'PENDING' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' :
          item.status === 'SUSPENDED' ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' :
          'bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200'
        }`}>
          {item.status}
        </span>
      ),
    },
    {
      key: 'location',
      header: 'Location',
      render: (item) => {
        const parts = [item.city?.name, item.state?.name, item.country?.name].filter(Boolean);
        return parts.length > 0 ? parts.join(', ') : '-';
      },
    },
    {
      key: 'userType',
      header: 'User Type',
      render: (item) => item.userType?.name || '-',
    },
  ];

  const fields: FormField[] = [
    { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Full name' },
    { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'user@example.com' },
    { name: 'phone', label: 'Phone', type: 'tel', required: true, placeholder: '+91 9876543210' },
    {
      name: 'role',
      label: 'Role',
      type: 'select',
      required: true,
      options: [
        { label: 'Customer', value: 'CUSTOMER' },
        { label: 'Executive', value: 'EXECUTIVE' },
        { label: 'Manager', value: 'MANAGER' },
        { label: 'Admin', value: 'ADMIN' },
        { label: 'Super Admin', value: 'SUPER_ADMIN' },
        { label: 'Data Entry', value: 'DATA_ENTRY' },
      ],
    },
    {
      name: 'status',
      label: 'Status',
      type: 'select',
      required: true,
      options: [
        { label: 'Active', value: 'ACTIVE' },
        { label: 'Pending', value: 'PENDING' },
        { label: 'Inactive', value: 'INACTIVE' },
        { label: 'Suspended', value: 'SUSPENDED' },
      ],
    },
    {
      name: 'countryId',
      label: 'Country',
      type: 'select',
      options: countries,
    },
  ];

  return (
    <div className="container mx-auto py-6 space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-teal-700" />
            Users Management
          </CardTitle>
          <CardDescription>Manage all users with filters (role, status, location)</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-wrap gap-4">
            <select
              value={roleFilter}
              onChange={(e) => handleRoleFilterChange(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="">All Roles</option>
              <option value="CUSTOMER">Customer</option>
              <option value="EXECUTIVE">Executive</option>
              <option value="MANAGER">Manager</option>
              <option value="ADMIN">Admin</option>
              <option value="SUPER_ADMIN">Super Admin</option>
              <option value="DATA_ENTRY">Data Entry</option>
            </select>

            <select
              value={statusFilter}
              onChange={(e) => handleStatusFilterChange(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="">All Status</option>
              <option value="ACTIVE">Active</option>
              <option value="PENDING">Pending</option>
              <option value="INACTIVE">Inactive</option>
              <option value="SUSPENDED">Suspended</option>
            </select>

            <select
              value={countryFilter}
              onChange={(e) => handleCountryFilterChange(e.target.value)}
              className="px-3 py-2 border rounded-md bg-background"
            >
              <option value="">All Countries</option>
              {countries.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>

            {(roleFilter || statusFilter || countryFilter) && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>

          <DataTable
            data={users}
            columns={columns}
            loading={loading}
            onCreate={handleCreate}
            onEdit={handleEdit}
            onDelete={handleDelete}
            searchValue={searchQuery}
            onSearchChange={handleSearchChange}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
            totalCount={totalCount}
            searchPlaceholder="Search by name, email, or phone..."
            createButtonText="Add User"
          />
        </CardContent>
      </Card>

      <CRUDDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingUser ? 'Edit User' : 'Add User'}
        description={editingUser ? 'Update user details' : 'Create a new user'}
        fields={fields}
        data={editingUser || undefined}
        onSubmit={handleSubmit}
        submitButtonText={editingUser ? 'Update' : 'Create'}
        loading={submitting}
      />
    </div>
  );
}