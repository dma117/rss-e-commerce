import { useApiRootContext } from '@/contexts/useApiRootContext';
import { Product } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
import styles from './style.module.css';
import ProductCardMin from '@components/product-card-min';

type ProductListProps = {
  categoryId: string;
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
  );
}

export default ProductList;
