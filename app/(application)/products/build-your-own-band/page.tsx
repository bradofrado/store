import { Product, ProductVariant, productVariants } from '@/types/product';
import { ProductItemView } from '../components/product-page';
import { getPopularProducts } from '@/server/service/product';
import { emailCustomForm } from '../../actions';

export default async function BuildYourOwnBandPage() {
  const relatedProducts = await getPopularProducts();
  const product: Product = {
    id: '',
    name: 'Build Your Own Band',
    imageSrc: '',
    imageAlt: '',
    details: [],
    price: -1,
    priceId: null,
    options: '',
    variants: {
      'text-group': [],
      'additional comments': [],
      size: [
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
      metal: [
        'Tungsten',
        'Titanium',
        'Cobalt',
        'Black Ceramic',
        'White Ceramic',
        'Zirconium',
      ],
      style: ['Flat', 'Dome', 'Bevel'],
      finish: ['Satin', 'Matte', 'Hammer', 'Polish'],
      width: ['6mm', '8mm'],
      addon: [
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
    description:
      'Build your own bands with our customizer tool. Choose from a variety of options to create a unique ring that is perfect for you.',
    images: [],
  };
  const productVariantsWithComments: ProductVariant[] = [
    {
      name: 'text-group',
      values: [
        {
          name: 'name',
          values: [],
          type: 'text',
        },
        {
          name: 'email',
          values: [],
          type: 'text',
        },
      ],
      type: 'group',
    },
    ...productVariants,
    {
      name: 'additional comments',
      values: [],
      type: 'textarea',
    },
  ];
  return (
    <ProductItemView
      product={product}
      relatedProducts={relatedProducts}
      productVariants={productVariantsWithComments}
      addProductToCart={emailCustomForm}
    />
  );
}
