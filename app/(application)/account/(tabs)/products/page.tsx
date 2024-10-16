import { getProducts } from '@/server/service/product';
import { ProductsEdit } from './products-edit';
import {
  changeProductImage,
  deleteProductImage,
  uploadNewProductImage,
} from '@/app/(application)/actions';
import { protectedAdminPage } from '@/utils/protected-admin';

async function ProductsTab() {
  const products = await getProducts();

  return (
    <form>
      <div className='space-y-12'>
        <div className='border-b border-gray-900/10 pb-12'>
          <h2 className='text-base font-semibold leading-7 text-gray-900'>
            Products
          </h2>
          <p className='mt-1 text-sm leading-6 text-gray-600'>
            Update product information here.
          </p>
          <div className='mt-1'>
            <ProductsEdit
              products={products}
              changePhoto={changeProductImage}
              uploadNewPhoto={uploadNewProductImage}
              deletePhoto={deleteProductImage}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

export default protectedAdminPage(ProductsTab);
