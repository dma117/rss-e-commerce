import { useApiRootContext } from '@/contexts/useApiRootContext';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductData, mapProductProjectionToProduct } from './config';

const ProductDetail: FC = () => {
  const [product, setProduct] = useState<ProductData | null>(null);

  const { apiRoot } = useApiRootContext();
  const { productId } = useParams<{ category: string; productId: string }>();

  useEffect(() => {
    apiRoot &&
      apiRoot
        .products()
        .withId({ ID: productId || '' })
        .get()
        .execute()
        .then((response) => {
          console.log('Product retrieved:', response.body);
          const productProjection = response.body;
          const product = mapProductProjectionToProduct(productProjection);
          console.log('Mapped product:', product);
          setProduct(product);
        })
        .catch((error) => {
          console.error('Error retrieving product:', error);
        });
  }, [apiRoot, productId]);

  return (
    <div>
      {!product && 'Sorry, the product with your id is not found.'}
      {product && (
        <>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <img src={product.assets[0]} alt="" />
        </>
      )}
    </div>
  );
};

export default ProductDetail;
