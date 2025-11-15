'use client';

import { Button } from '@/components/button';
import { Input } from '@/components/input';
import { Label } from '@/components/label';
import { useState } from 'react';

interface VariantEditorProps {
  variants: Record<string, string[]>;
  onChange: (variants: Record<string, string[]>) => void;
}

export const VariantEditor: React.FunctionComponent<VariantEditorProps> = ({
  variants,
  onChange,
}) => {
  const [newVariantKey, setNewVariantKey] = useState('');
  const [newVariantValue, setNewVariantValue] = useState('');

  const handleAddVariant = () => {
    if (!newVariantKey.trim()) return;

    const key = newVariantKey.toLowerCase().trim();
    onChange({
      ...variants,
      [key]: [],
    });
    setNewVariantKey('');
  };

  const handleAddValue = (key: string) => {
    if (!newVariantValue.trim()) return;

    onChange({
      ...variants,
      [key]: [...(variants[key] || []), newVariantValue.trim()],
    });
    setNewVariantValue('');
  };

  const handleRemoveValue = (key: string, valueIndex: number) => {
    onChange({
      ...variants,
      [key]: variants[key].filter((_, i) => i !== valueIndex),
    });
  };

  const handleRemoveVariant = (key: string) => {
    const newVariants = { ...variants };
    delete newVariants[key];
    onChange(newVariants);
  };

  return (
    <div className='space-y-4'>
      <div>
        <Label>Variants (Metadata)</Label>
        <p className='text-sm text-gray-500 mt-1'>
          Add variant types (e.g., size, metal, style) and their possible values
        </p>
      </div>

      {Object.entries(variants).map(([key, values]) => (
        <div key={key} className='border rounded-md p-3 space-y-2'>
          <div className='flex items-center justify-between'>
            <h4 className='font-medium capitalize'>{key}</h4>
            <Button
              type='button'
              variant='ghost'
              size='sm'
              onClick={() => handleRemoveVariant(key)}
            >
              Remove
            </Button>
          </div>

          <div className='flex flex-wrap gap-2'>
            {values.map((value, i) => (
              <div
                key={i}
                className='inline-flex items-center gap-1 bg-gray-100 rounded-md px-2 py-1 text-sm'
              >
                <span>{value}</span>
                <button
                  type='button'
                  onClick={() => handleRemoveValue(key, i)}
                  className='text-gray-500 hover:text-gray-700'
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className='flex gap-2'>
            <Input
              placeholder={`Add ${key} value`}
              value={newVariantValue}
              onChange={setNewVariantValue}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  handleAddValue(key);
                }
              }}
            />
            <Button
              type='button'
              variant='outline'
              size='sm'
              onClick={() => handleAddValue(key)}
            >
              Add
            </Button>
          </div>
        </div>
      ))}

      <div className='border-t pt-4'>
        <div className='flex gap-2'>
          <Input
            placeholder='New variant name (e.g., size, metal)'
            value={newVariantKey}
            onChange={setNewVariantKey}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddVariant();
              }
            }}
          />
          <Button
            type='button'
            variant='outline'
            onClick={handleAddVariant}
          >
            Add Variant Type
          </Button>
        </div>
      </div>
    </div>
  );
};
