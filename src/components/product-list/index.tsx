import { useApiRootContext } from '@/contexts/useApiRootContext';
import { Product } from '@commercetools/platform-sdk';
import { useEffect, useState } from 'react';
// import { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import styles from './style.module.css';

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
    <div>
      {products.map((product) => {
        return (
          <div key={product.id}>
            <img
              src={
                product.masterData.current.masterVariant.assets &&
                product.masterData.current.masterVariant.assets[0].sources[0].uri
              }
              alt=""
            />
            <div>{product.masterData.current.name['en-GB']}</div>
            <div>
              {product.masterData.current.description &&
                product.masterData.current.description['en-GB']}
            </div>
          </div>
        );
      })}
      {error && error}
    </div>
  );
}

export default ProductList;
