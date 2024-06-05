import { FC } from 'react';
import { useParams } from 'react-router-dom';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
}

const ProductDetail: FC = () => {
  const { category, productId } = useParams<{ category: string; productId: string }>();

  const product = getProductById(category, productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p>Price: {product.price}</p>
    </div>
  );
};

export default ProductDetail;

const getProductById = (
  category: string | undefined,
  productId: string | undefined,
): Product | null => {
  const products: { [key: string]: Product[] } = {
    programming: [
      { id: '1', name: 'JavaScript Basics', description: 'Learn JavaScript', price: '$20' },
    ],
    design: [
      { id: '2', name: 'Photoshop Essentials', description: 'Learn Photoshop', price: '$25' },
    ],
    marketing: [{ id: '3', name: 'Marketing 101', description: 'Learn Marketing', price: '$30' }],
    business: [{ id: '4', name: 'Business Basics', description: 'Learn Business', price: '$35' }],
  };

  const categoryProducts = products[category || ''];
  if (!categoryProducts) return null;

  return categoryProducts.find((product) => product.id === productId) || null;
};
