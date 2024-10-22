'use client';

import React, { useEffect, useState } from 'react';
import { Radio, RadioGroup } from '@headlessui/react';
import {
  CurrencyDollarIcon,
  GlobeAmericasIcon,
} from '@heroicons/react/24/outline';
import { StarIcon } from '@heroicons/react/20/solid';
import { Product, productVariants } from '@/types/product';
import { capitalizeFirstLetter, formatDollarAmount } from '@/utils/common';
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
import { Reviews } from './reviews';
import { ReviewsTotal } from './reviews-total';
import { useReload } from '@/hooks/reload';

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
  relatedProducts: Product[];
}
export const ProductItemView: React.FunctionComponent<ProductItemViewProps> = ({
  product,
  addProductToCart,
  relatedProducts,
}) => {
  const reload = useReload();
  const [variant, setVariant] = useQueryState<VariantSelection>({
    key: 'variant',
    defaultValue: Object.entries(product.variants).reduce(
      (prev, [key, value]) => ({ ...prev, [key]: value[0] }),
      {}
    ),
  });
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

  const [selectedColor, setSelectedColor] = useState(colors[0]);
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
    setLoading(true);
    await reload(addProductToCart)(product, variant);
    setLoading(false);
  };

  return (
    <main className='mx-auto mt-8 max-w-2xl px-4 pb-16 sm:px-6 sm:pb-24 lg:max-w-7xl lg:px-8'>
      <div className='lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8'>
        <div className='lg:col-span-5 lg:col-start-8'>
          <div className='flex justify-between'>
            <h1 className='text-xl font-medium text-gray-900'>
              {product.name}
            </h1>
            <p className='text-xl font-medium text-gray-900'>
              {formatDollarAmount(product.price ?? 0)}
            </p>
          </div>
          {/* Reviews */}
          {/* <ReviewsTotal /> */}
        </div>

        {/* Image gallery */}
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

        <div className='mt-8 lg:col-span-5'>
          <form onSubmit={onSubmit}>
            {/* Color picker */}
            {/* <ColorPicker value={selectedColor} onChange={setSelectedColor} /> */}

            <div className='divide-y'>
              {productVariants.map(({ name, values, type }) =>
                product.variants[name] ? (
                  <VariantPicker
                    key={name}
                    type={type}
                    name={capitalizeFirstLetter(name)}
                    variants={values.map((variant) => ({
                      name: variant,
                      inStock: product.variants[name].includes(variant),
                    }))}
                    value={variant[name]}
                    onChange={onChange(name)}
                  />
                ) : null
              )}
            </div>

            <button
              type='submit'
              className='mt-8 flex w-full items-center justify-center rounded-md border border-transparent bg-primary px-8 py-3 text-base font-medium text-white hover:bg-primary-darker focus:outline-none focus:ring-2 focus:ring-primary-lighter focus:ring-offset-2'
            >
              {loading ? 'Adding to cart...' : 'Add to cart'}
            </button>
          </form>

          {/* Product details */}
          <div className='mt-10'>
            <h2 className='text-sm font-medium text-gray-900'>Description</h2>

            <div
              dangerouslySetInnerHTML={{ __html: product.description }}
              className='prose prose-sm mt-4 text-gray-500'
            />
          </div>

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

      {/* Reviews */}
      {/* <Reviews /> */}

      {/* Related products */}
      <section aria-labelledby='related-heading' className='mt-16 sm:mt-24'>
        <h2 id='related-heading' className='text-lg font-medium text-gray-900'>
          Customers also purchased
        </h2>

        <div className='mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8'>
          {relatedProducts.map((relatedProduct) => (
            <ProductCard product={relatedProduct} key={relatedProduct.id} />
          ))}
        </div>
      </section>
    </main>
  );
};

interface VariantPickerProps {
  name: string;
  variants: { name: string; inStock: boolean }[];
  value: string;
  onChange: (value: string) => void;
  type: 'button' | 'select';
}
const VariantPicker: React.FunctionComponent<VariantPickerProps> = ({
  name,
  variants,
  value,
  onChange,
  type,
}) => {
  return (
    <div className='py-4'>
      <div className='flex items-center justify-between'>
        <h2 className='text-sm font-medium text-gray-900'>{name}</h2>
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
            value={value}
            onChange={onChange}
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
                  'flex items-center justify-center rounded-md border border-gray-200 bg-white px-3 py-3 text-sm font-medium text-gray-900 hover:bg-gray-50 data-[checked]:border-transparent data-[checked]:bg-primary data-[checked]:text-white data-[focus]:ring-2 data-[focus]:ring-primary-lighter data-[focus]:ring-offset-2 data-[checked]:hover:bg-primary-darker sm:flex-1'
                )}
              >
                {variant.name}
              </Radio>
            ))}
          </RadioGroup>
        </fieldset>
      ) : (
        <Select onValueChange={onChange}>
          <SelectTrigger className='mt-2'>
            <SelectValue placeholder={`Select ${name}`} />
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
      )}
    </div>
  );
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
