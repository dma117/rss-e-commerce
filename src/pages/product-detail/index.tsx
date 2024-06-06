import { useApiRootContext } from '@/contexts/useApiRootContext';
import { FC, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { ProductData, galleryProps, mapProductProjectionToProduct, sliderSettings } from './config';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Slider from 'react-slick';
import { Gallery, Item } from 'react-photoswipe-gallery';
import 'photoswipe/dist/photoswipe.css';

const ProductDetail: FC = () => {
  const [product, setProduct] = useState<ProductData | null>(null);
  const [error, setError] = useState<boolean>(false);

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
          setError(true);
        });
  }, [apiRoot, productId]);

  return (
    <div>
      {error && 'Sorry, the product with your id is not found.'}
      {product && (
        <>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <Gallery options={galleryProps.options}>
            <Slider {...sliderSettings}>
              {product.assets.map((asset) => (
                <div key={asset.id}>
                  <Item original={asset.url} thumbnail={asset.url}>
                    {({ ref, open }) => <img ref={ref} onClick={open} src={asset.url} alt="" />}
                  </Item>
                </div>
              ))}
            </Slider>
          </Gallery>
        </>
      )}
    </div>
  );
};

export default ProductDetail;
