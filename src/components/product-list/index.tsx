import { useApiRootContext } from '@/contexts/useApiRootContext';
import { Product } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import styles from './style.module.css';
import ProductCardMin from '@components/product-card-min';
import Breadcrumbs from '../breadcrumbs';

type ProductListProps = {
  categoryId:
    | 'c96ff3d0-1688-4913-90ae-a3056e259e68'
    | '78db1a69-6023-44b5-8b3d-a8f294cdd335'
    | 'dac8edad-bf16-4f56-859c-f364efde1c2a'
    | '9f44fc3d-b2b9-4625-91e8-03934154b07d';
};

function ProductList({ categoryId }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [error, setError] = useState();

  const { apiRoot } = useApiRootContext();

  useEffect(() => {
    apiRoot &&
      apiRoot
        .products()
        .get({
          queryArgs: {
            limit: 30,
            where: `masterData(current(categories(id="${categoryId}")))`,
          },
        })
        .execute()
        .then((response) => {
          console.log(response.body.results);
          const products = response.body.results;
          if (products) {
            setProducts(products);
          }
        })
        .catch((error) => {
          setError(error);
        });
  }, [apiRoot, categoryId]);

  return (
    <div className={styles.catalog}>
      <Breadcrumbs categoryId={categoryId} />
      <div className={styles.productList}>
        {products &&
          products.map((product) => {
            const id = product.id;
            const imgSrc =
              product.masterData.current.masterVariant.assets &&
              product.masterData.current.masterVariant.assets[0].sources[0].uri;
            const title = product.masterData.current.name['en-GB'];
            const description =
              product.masterData.current.description &&
              product.masterData.current.description['en-GB'];
            const price =
              product.masterData.current.masterVariant.prices &&
              product.masterData.current.masterVariant.prices[0].value.centAmount / 100;

            return (
              <ProductCardMin
                key={id}
                id={id}
                imgSrc={imgSrc || ''}
                title={title}
                description={description || ''}
                price={price || 0}
              />
            );
          })}
        {error && error}
      </div>
    </div>
  );
}

export default ProductList;
