'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

export interface FormField {
  name: string;
  label: string;
  type: 'text' | 'email' | 'number' | 'textarea' | 'select' | 'switch' | 'date' | 'tel';
  placeholder?: string;
  options?: { label: string; value: string }[];
  required?: boolean;
  description?: string;
}

export interface CRUDDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description?: string;
  fields: FormField[];
  data?: Record<string, any>;
  onSubmit: (data: Record<string, any>) => Promise<void>;
  submitButtonText?: string;
  loading?: boolean;
}

function buildInitialFormData(fields: FormField[], data?: Record<string, any>): Record<string, any> {
  const initialData: Record<string, any> = {};
  fields.forEach((field) => {
    if (data && data.id && data[field.name] !== undefined) {
      initialData[field.name] = data[field.name];
    } else if (field.type === 'switch') {
      initialData[field.name] = true;
    } else if (field.type === 'number') {
      initialData[field.name] = 0;
    } else {
      initialData[field.name] = '';
    }
  });
  return initialData;
}

export function CRUDDialog({
  open,
  onOpenChange,
  title,
  description,
  fields,
  data,
  onSubmit,
  submitButtonText = 'Save',
  loading = false,
}: CRUDDialogProps) {
  const [formData, setFormData] = useState<Record<string, any>>({});

  // Initialize form data when the dialog opens.
  // This MUST be in an effect because the parent controls `open` externally —
  // the dialog's own onOpenChange does NOT fire when the parent sets open=true.
  useEffect(() => {
    if (open) {
      // Reset form when dialog opens — parent controls `open` externally
      // so we must sync internal state via an effect.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setFormData(buildInitialFormData(fields, data));
    }
  }, [open, data, fields]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const submitData: Record<string, any> = {};
    fields.forEach((field) => {
      submitData[field.name] = formData[field.name];
    });

    // Convert empty strings to null for optional fields
    fields.forEach((field) => {
      if (!field.required && submitData[field.name] === '') {
        submitData[field.name] = null;
      }
      if (field.type === 'number' && submitData[field.name] !== '') {
        submitData[field.name] = Number(submitData[field.name]);
      }
    });

    await onSubmit(submitData);
  };

  const handleFieldChange = (name: string, value: any) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          {fields.map((field) => (
            <div key={field.name} className="space-y-2">
              <Label htmlFor={field.name}>
                {field.label}
                {field.required && <span className="text-destructive ml-1">*</span>}
              </Label>

              {field.type === 'text' || field.type === 'email' || field.type === 'number' || field.type === 'tel' ? (
                <Input
                  id={field.name}
                  type={field.type}
                  placeholder={field.placeholder}
                  value={formData[field.name] ?? ''}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  required={field.required}
                />
              ) : field.type === 'textarea' ? (
                <Textarea
                  id={field.name}
                  placeholder={field.placeholder}
                  value={formData[field.name] ?? ''}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  required={field.required}
                  rows={3}
                />
              ) : field.type === 'select' ? (
                <Select
                  value={formData[field.name] ?? ''}
                  onValueChange={(value) => handleFieldChange(field.name, value)}
                  required={field.required}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={field.placeholder || `Select ${field.label}`} />
                  </SelectTrigger>
                  <SelectContent>
                    {field.options?.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              ) : field.type === 'switch' ? (
                <Switch
                  id={field.name}
                  checked={formData[field.name] ?? false}
                  onCheckedChange={(checked) => handleFieldChange(field.name, checked)}
                />
              ) : field.type === 'date' ? (
                <Input
                  id={field.name}
                  type="date"
                  value={formData[field.name] ?? ''}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  required={field.required}
                />
              ) : null}

              {field.description && (
                <p className="text-sm text-muted-foreground">{field.description}</p>
              )}
            </div>
          ))}

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={loading}
            >
              Cancel
            </Button>
            <Button type="submit" className="btn-cta" disabled={loading}>
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {submitButtonText}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}