'use client';

import React, { useEffect, useState } from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
} from '@heroicons/react/24/outline';
import { Product, ProductVariant } from '@/types/product';
import {
  capitalizeFirstLetter,
  formatDollarAmount,
  getClass,
} from '@/utils/common';
import { ProductCard } from '@/components/product-card';
import { useQueryState } from '@/hooks/query-state';
import { PhotoCarousel } from '@/components/photo-carousel';
import { VariantSelection } from '@/types/variant';
import { useChange } from '@/hooks/change';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/select';
import { useReload } from '@/hooks/reload';
import { Input } from '@/components/input';
import { Textarea } from '@/components/textarea';
import { Button } from '@/components/button';

const colors = [
  { name: 'Black', bgColor: 'bg-gray-900', selectedColor: 'ring-gray-900' },
  {
    name: 'Heather Grey',
    bgColor: 'bg-gray-400',
    selectedColor: 'ring-gray-400',
  },
];

const policies = [
  {
    name: 'International delivery',
    icon: GlobeAmericasIcon,
    description: 'Get your order in 2 years',
  },
  {
    name: 'Loyalty rewards',
    icon: CurrencyDollarIcon,
    description: "Don't look at other tees",
  },
];

function classNames(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}

interface ProductItemViewProps {
  product: Product;
  addProductToCart: (
    product: Product,
    variants: VariantSelection
  ) => Promise<void>;
  productVariants: ProductVariant[];
}
export const ProductItemView: React.FunctionComponent<ProductItemViewProps> = ({
  product,
  addProductToCart,
  productVariants,
}) => {
  const reload = useReload();
  const [variant, setVariant] = useQueryState<VariantSelection>({
    key: 'variant',
    defaultValue: Object.entries(product.variants).reduce(
      (prev, [key, value]) => ({ ...prev, [key]: value[0] }),
      {}
    ),
  });
  const [error, setError] = useState<string | null>(null);

  useChange(
    variant,
    (newVariant) => {
      const newSelectedImage = product.images.findIndex((image) =>
        Object.entries(image.variant || {}).every(
          ([key, value]) => image.variant?.[key] === newVariant[key]
        )
      );
      if (newSelectedImage !== -1) {
        setSelectedImage(newSelectedImage);
      }
    },
    [product.images]
  );

  const [selectedImage, setSelectedImage] = useState(0);
  const [loading, setLoading] = useState(false);

  useEffect(() => {});

  const onChange = (variantName: string) => (value: string) => {
    const copy = { ...variant };
    copy[variantName] = value;
    setVariant(copy);
  };

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (
      !productVariants.every((_variant) =>
        _variant.type === 'group'
          ? _variant.values.every(
              (_variant) =>
                !product.variants[(_variant as ProductVariant).name] ||
                variant[(_variant as ProductVariant).name]
            )
          : !product.variants[_variant.name] || variant[_variant.name]
      )
    ) {
      setError('Must fill out all fields');
      return;
    }
    setLoading(true);
    await reload(addProductToCart)(product, variant);
    setLoading(false);
  };

  const hasImage = Boolean(product.imageSrc);

  return (
    <div className='lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8'>
      <div
        className={getClass(
          hasImage ? 'lg:col-span-5 lg:col-start-8' : 'lg:col-span-12'
        )}
      >
        <div className='flex justify-between'>
          <h1 className='text-xl font-medium text-gray-900'>{product.name}</h1>
          <p className='text-xl font-medium text-gray-900'>
            {(product.price ?? 0) >= 0
              ? formatDollarAmount(product.price ?? 0)
              : ''}
          </p>
        </div>
        {/* Reviews */}
        {/* <ReviewsTotal /> */}
      </div>
      {hasImage ? null : (
        <p className='lg:col-span-12 text-sm mt-4 text-gray-500'>
          {product.description}
        </p>
      )}

      {/* Image gallery */}
      {hasImage ? (
        <div className='flex flex-col items-center mt-8 lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0'>
          <h2 className='sr-only'>Images</h2>

          <div className='grid grid-cols-1 lg:grid-cols-2 lg:grid-rows-2 lg:gap-8'>
            <img
              key={product.id}
              alt={product.imageAlt}
              src={product.images[selectedImage].imageSrc}
              className={classNames(
                'lg:col-span-2 lg:row-span-2',
                'rounded-lg'
              )}
            />
          </div>
          {product.images.length > 1 ? (
            <PhotoCarousel
              selectedImage={selectedImage}
              onSelect={setSelectedImage}
              images={product.images}
            />
          ) : null}
        </div>
      ) : null}

      <div
        className={getClass(
          'mt-8',
          hasImage ? 'lg:col-span-5' : 'lg:col-span-12'
        )}
      >
        <form onSubmit={onSubmit}>
          {/* Color picker */}
          {/* <ColorPicker value={selectedColor} onChange={setSelectedColor} /> */}

          <div className='divide-y'>
            {productVariants.map(({ name, values, type }) =>
              product.variants[name] ? (
                type === 'group' ? (
                  <VariantPicker
                    key={name}
                    variants={values.map((value) => ({
                      name: (value as ProductVariant).name,
                      variants: (value as ProductVariant).values.map(
                        (variant) => ({
                          name: variant as string,
                          inStock: product.variants[name].includes(
                            variant as string
                          ),
                        })
                      ),
                      type: (value as ProductVariant).type,
                    }))}
                    values={values.map(
                      (value) => variant[(value as ProductVariant).name]
                    )}
                    onChange={(name, value) => onChange(name)(value)}
                  />
                ) : (
                  <VariantPicker
                    key={name}
                    variants={[
                      {
                        name,
                        variants: values.map((variant) => ({
                          name: variant as string,
                          inStock: product.variants[name].includes(
                            variant as string
                          ),
                        })),
                        type,
                      },
                    ]}
                    values={[variant[name]]}
                    onChange={(name, value) => onChange(name)(value)}
                  />
                )
              ) : null
            )}
          </div>

          {error ? <p className='text-sm text-red-500'>{error}</p> : null}
          <Button
            type='submit'
            className='mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary/75 focus:outline-none focus:ring-2 focus:ring-primary-lighter focus:ring-offset-2'
            loading={loading}
          >
            {hasImage ? 'Add to cart' : 'Submit'}
          </Button>
        </form>

        {/* Product details */}
        {hasImage ? (
          <div className='mt-10'>
            <h2 className='text-sm font-medium text-gray-900'>Description</h2>

            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
              className='prose prose-sm mt-4 text-gray-500'
            />
          </div>
        ) : null}

        <div className='mt-8 border-t border-gray-200 pt-8'>
          <h2 className='text-sm font-medium text-gray-900'>
            Fabric &amp; Care
          </h2>

          <div className='prose prose-sm mt-4 text-gray-500'>
            <ul role='list'>
              {product.details.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Policies */}
        <section aria-labelledby='policies-heading' className='mt-10'>
          <h2 id='policies-heading' className='sr-only'>
            Our Policies
          </h2>

          <dl className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2'>
            {policies.map((policy) => (
              <div
                key={policy.name}
                className='rounded-lg border border-gray-200 bg-gray-50 p-6 text-center'
              >
                <dt>
                  <policy.icon
                    aria-hidden='true'
                    className='mx-auto h-6 w-6 flex-shrink-0 text-gray-400'
                  />
                  <span className='mt-4 text-sm font-medium text-gray-900'>
                    {policy.name}
                  </span>
                </dt>
                <dd className='mt-1 text-sm text-gray-500'>
                  {policy.description}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      </div>
    </div>
  );
};

interface VariantPickerProps {
  variants: {
    name: string;
    variants: { name: string; inStock: boolean }[];
    type: ProductVariant['type'];
  }[];
  values: string[];
  onChange: (name: string, value: string) => void;
}
const VariantPicker: React.FunctionComponent<VariantPickerProps> = ({
  variants,
  values,
  onChange,
}) => {
  const [tempState, setTempState] = useState(values);
  return (
    <div className='py-4 flex gap-4'>
      {variants.map(({ name, variants, type }, i) => (
        <div className='flex flex-col flex-1' key={name}>
          <div className='flex items-center justify-between'>
            <h2 className='text-sm font-medium text-gray-900'>
              {name
                .split(' ')
                .map((name) => capitalizeFirstLetter(name))
                .join(' ')}
            </h2>
            {/* <a
          href='#'
          className='text-sm font-medium text-primary hover:text-primary-lighter'
        >
          See sizing chart
        </a> */}
          </div>
          {type === 'button' ? (
            <fieldset aria-label={`Choose a ${name}`} className='mt-2'>
              <RadioGroup
                value={values[i]}
                onChange={(value) => onChange(name, value)}
                className='grid grid-cols-3 gap-3 sm:grid-cols-6'
              >
                {variants.map((variant) => (
                  <Radio
                    key={variant.name}
                    value={variant.name}
                    disabled={!variant.inStock}
                    className={classNames(
                      variant.inStock
                        ? 'cursor-pointer focus:outline-none'
                        : 'cursor-not-allowed opacity-25',
                      'flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 data-[checked]:border-transparent data-[checked]:bg-primary data-[checked]:text-white data-[focus]:ring-2 data-[focus]:ring-primary-lighter data-[focus]:ring-offset-2 data-[checked]:hover:bg-primary-lighter sm:flex-1'
                    )}
                  >
                    {variant.name}
                  </Radio>
                ))}
              </RadioGroup>
            </fieldset>
          ) : type === 'select' ? (
            <Select
              onValueChange={(value) => onChange(name, value)}
              defaultValue={values[i]}
            >
              <SelectTrigger className='mt-2'>
                <SelectValue
                  placeholder={`Select ${capitalizeFirstLetter(name)}`}
                />
              </SelectTrigger>
              <SelectContent>
                {variants.map((variant) => (
                  <SelectItem
                    key={variant.name}
                    value={variant.name}
                    disabled={!variant.inStock}
                  >
                    {variant.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : type === 'text' ? (
            <Input
              className='mt-2'
              value={tempState[i]}
              onChange={(value) =>
                setTempState((prev) => {
                  const copy = [...prev];
                  copy[i] = value;
                  return copy;
                })
              }
              onBlur={(value) => onChange(name, value)}
            />
          ) : (
            <Textarea
              className='mt-2'
              value={tempState[i]}
              onChange={(value) =>
                setTempState((prev) => {
                  const copy = [...prev];
                  copy[i] = value;
                  return copy;
                })
              }
              onBlur={(value) => onChange(name, value)}
            />
          )}
        </div>
      ))}
    </div>
  );
};

const VariantInput: React.FunctionComponent<{
  variants: { name: string; inStock: boolean }[];
  type: ProductVariant['type'];
  value: string;
  onChange: (value: string) => void;
}> = ({ variants, type, value, onChange }) => {
  return <></>;
};

type ProductColor = (typeof colors)[number];
interface ColorPickerProps {
  value: ProductColor;
  onChange: (color: ProductColor) => void;
}
const ColorPicker: React.FunctionComponent<ColorPickerProps> = ({
  value,
  onChange,
}) => {
  return (
    <div>
      <h2 className='text-sm font-medium text-gray-900'>Color</h2>

      <fieldset aria-label='Choose a color' className='mt-2'>
        <RadioGroup
          value={value}
          onChange={onChange}
          className='flex items-center space-x-3'
        >
          {colors.map((color) => (
            <Radio
              key={color.name}
              value={color}
              aria-label={color.name}
              className={classNames(
                color.selectedColor,
                'relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none data-[checked]:ring-2 data-[focus]:data-[checked]:ring data-[focus]:data-[checked]:ring-offset-1'
              )}
            >
              <span
                aria-hidden='true'
                className={classNames(
                  color.bgColor,
                  'h-8 w-8 rounded-full border border-black border-opacity-10'
                )}
              />
            </Radio>
          ))}
        </RadioGroup>
      </fieldset>
    </div>
  );
};
