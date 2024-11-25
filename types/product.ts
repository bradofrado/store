import { z } from 'zod';
import { imageSchema } from './image';

export const productVariantSchema = z.record(z.array(z.string()));

export const productSchema = z.object({
  id: z.string(),
  name: z.string(),
  price: z.nullable(z.number()),
  priceId: z.nullable(z.string()),
  description: z.string(),
  options: z.string(),
  imageSrc: z.string(),
  imageAlt: z.string(),
  images: z.array(imageSchema),
  details: z.array(z.string()),
  variants: productVariantSchema,
});
export type Product = z.infer<typeof productSchema>;

export interface ProductVariant {
  name: string;
  values: (string | ProductVariant)[];
  type: 'button' | 'select' | 'text' | 'textarea' | 'group';
}
export const productVariants: ProductVariant[] = [
  {
    name: 'size',
    type: 'button',
    values: [
      '5',
      '5.5',
      '6',
      '6.5',
      '7',
      '7.5',
      '8',
      '8.5',
      '9',
      '9.5',
      '10',
      '10.5',
      '11',
      '11.5',
      '12',
      '12.5',
      '13',
      '13.5',
      '14',
      '14.5',
      '15',
    ],
  },
  {
    name: 'metal',
    type: 'button',
    values: [
      'Tungsten',
      'Titanium',
      'Cobalt',
      'Black Ceramic',
      'White Ceramic',
      'Zirconium',
    ],
  },
  {
    name: 'style',
    type: 'button',
    values: ['Flat', 'Dome', 'Bevel'],
  },
  {
    name: 'finish',
    type: 'button',
    values: ['Satin', 'Matte', 'Hammer', 'Polish'],
  },

  { name: 'width', type: 'button', values: ['6mm', '8mm'] },
  {
    name: 'addon',
    type: 'select',
    values: [
      'Dino Bone',
      'Ocean Blue Opal',
      'Ice Opal',
      'Galaxy Opal',
      'Fire Opal',
      'Purple Opal',
      'Emerald Opal',
      'Pink Opal',
      'Gold Leaf',
      'Silver Leaf',
      'Crushed Turquoise',
      'Antler',
    ],
  },
];
// size: 5,5.5,6,6.5,7,7.5,8,8.5,9,9.5,10,10.5,11,11.5,12,12.5,13,13.5,14,14.5,15
// metal: Tungsten,Titanium,Cobalt,Black Ceramic,White Ceramic,Zirconium
// style: Flat,Dome,Bevel
// finish: Satin,Matte,Hammer,Polish
// width: 6mm,8mm
// addon: Dino Bone,Ocean Blue Opal,Ice Opal,Galaxy Opal,Fire Opal,Purple Opal,Emerald Opal,Pink Opal,Gold Leaf,Silver Leaf,Crushed Turquoise,Antler
