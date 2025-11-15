'use client';

import { uploadImage } from '@/app/(application)/actions';
import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import { Textarea } from '@/components/textarea';
import { useState } from 'react';
import { UploadImageDialog } from './upload-image';
import { VariantEditor } from './variant-editor';

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  primaryImageUrl: string;
  variants: Record<string, string[]>;
  details: string[];
}

interface ProductFormProps {
  formData: ProductFormData;
  onChange: (data: ProductFormData) => void;
  uploadedImages: string[];
  uploadImage: typeof uploadImage;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  loading: boolean;
  submitLabel: string;
  showCancel?: boolean;
  showSubmit?: boolean;
}

export const ProductForm: React.FunctionComponent<ProductFormProps> = ({
  formData,
  onChange,
  uploadedImages,
  uploadImage,
  onSubmit,
  onCancel,
  loading,
  submitLabel,
  showCancel = true,
  showSubmit = true,
}) => {
  const [detailInput, setDetailInput] = useState('');

  const handleAddDetail = () => {
    if (!detailInput.trim()) return;
    onChange({
      ...formData,
      details: [...formData.details, detailInput.trim()],
    });
    setDetailInput('');
  };

  const handleRemoveDetail = (index: number) => {
    onChange({
      ...formData,
      details: formData.details.filter((_, i) => i !== index),
    });
  };

  const isValid =
    formData.name &&
    formData.description &&
    formData.primaryImageUrl &&
    formData.price > 0;

  return (
    <form onSubmit={onSubmit} className='space-y-4'>
      <div>
        <Label>Name *</Label>
        <Input
          required
          value={formData.name}
          onChange={(value) => onChange({ ...formData, name: value })}
          placeholder='Product name'
        />
      </div>

      <div>
        <Label>Description *</Label>
        <Textarea
          required
          value={formData.description}
          onChange={(value) => onChange({ ...formData, description: value })}
          placeholder='Product description'
          className='min-h-[100px]'
        />
      </div>

      <div>
        <Label>Price (USD) *</Label>
        <Input
          required
          type='number'
          step='0.01'
          min='0'
          value={formData.price}
          onChange={(value) =>
            onChange({ ...formData, price: parseFloat(value) || 0 })
          }
          placeholder='0.00'
        />
      </div>

      <div>
        <Label>Primary Image *</Label>
        {formData.primaryImageUrl ? (
          <div className='mt-2 space-y-2'>
            <div className='h-32 w-32'>
              <img
                className='object-cover h-full w-full rounded-md'
                src={formData.primaryImageUrl}
                alt='Primary'
              />
            </div>
            <UploadImageDialog
              uploadedImages={uploadedImages}
              uploadImage={uploadImage}
              selectImage={(imageUrl) =>
                onChange({ ...formData, primaryImageUrl: imageUrl })
              }
            >
              Change Image
            </UploadImageDialog>
          </div>
        ) : (
          <div className='mt-2'>
            <UploadImageDialog
              uploadedImages={uploadedImages}
              uploadImage={uploadImage}
              selectImage={(imageUrl) =>
                onChange({ ...formData, primaryImageUrl: imageUrl })
              }
            >
              Select Primary Image
            </UploadImageDialog>
          </div>
        )}
      </div>

      <div>
        <Label>Details</Label>
        <div className='mt-2 space-y-2'>
          {formData.details.map((detail, i) => (
            <div
              key={i}
              className='flex items-center justify-between bg-gray-50 rounded-md px-3 py-2'
            >
              <span className='text-sm'>{detail}</span>
              <button
                type='button'
                onClick={() => handleRemoveDetail(i)}
                className='text-gray-500 hover:text-gray-700'
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <div className='flex gap-2 mt-2'>
          <Input
            placeholder='Add detail'
            value={detailInput}
            onChange={setDetailInput}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddDetail();
              }
            }}
          />
          <Button
            type='button'
            variant='outline'
            size='sm'
            onClick={handleAddDetail}
          >
            Add
          </Button>
        </div>
      </div>

      <VariantEditor
        variants={formData.variants}
        onChange={(variants) => onChange({ ...formData, variants })}
      />

      {(showSubmit || showCancel) && (
        <div className='flex gap-2 pt-4'>
          {showSubmit && (
            <Button type='submit' loading={loading} disabled={!isValid}>
              {submitLabel}
            </Button>
          )}
          {showCancel && (
            <Button type='button' variant='outline' onClick={onCancel}>
              Cancel
            </Button>
          )}
        </div>
      )}
    </form>
  );
};
