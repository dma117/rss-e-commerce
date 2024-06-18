import { LineItem, Cart as CartType } from '@commercetools/platform-sdk';
import styles from '../style.module.css';
import { FC, useState } from 'react';
import trashIcon from '../../../assets/trash.png';
import { changeProductQuantity } from '@/utils/api/cart-api';
import { useApiRootContext } from '@/contexts/useApiRootContext';
import { fetchProductsList } from '../config';

interface ProductItemProps {
  product: LineItem;
  setProducts: React.Dispatch<React.SetStateAction<LineItem[]>>;
  setIsCartEmpty: React.Dispatch<React.SetStateAction<boolean>>;
  setCart: React.Dispatch<React.SetStateAction<CartType | null>>;
}

const ProductItem: FC<ProductItemProps> = ({ product, setCart, setProducts, setIsCartEmpty }) => {
  const { apiRoot } = useApiRootContext();
  const [isQuantityChanging, setIsQuantityChanging] = useState(false);

  async function removeProductFromCart() {
    if (!apiRoot) return;
    const response = await changeProductQuantity(apiRoot, product.productId, 0);
    if (response?.success) {
      fetchProductsList({ apiRoot, setCart, setProducts, setIsCartEmpty });
    }
  }

  function getPrice() {
    const price =
      ((product.variant.prices && product.variant.prices[0].value.centAmount) || 0) / 100;
    const finalPrice =
      ((product.variant.prices && product.variant.prices[0].discounted?.value.centAmount) || 0) /
      100;
    if (finalPrice) {
      return finalPrice;
    }
    return price;
  }

  async function changeQuantity(modifier: string) {
    if (!apiRoot) return;
    setIsQuantityChanging(true);

    if (modifier === '+') {
      const response = await changeProductQuantity(
        apiRoot,
        product.productId,
        product.quantity + 1,
      );
      if (response?.success) {
        fetchProductsList({ apiRoot, setCart, setProducts, setIsCartEmpty });
        setIsQuantityChanging(false);
      }
    } else {
      const response = await changeProductQuantity(
        apiRoot,
        product.productId,
        product.quantity - 1,
      );
      if (response?.success) {
        fetchProductsList({ apiRoot, setCart, setProducts, setIsCartEmpty });
        setIsQuantityChanging(false);
      }
    }
  }

  return (
    <div className={styles.productItem}>
      <div className={styles.imgWrapper}>
        <img
          className={styles.productImg}
          src={product.variant.assets && product.variant.assets[0].sources[0].uri}
          alt=""
        />
      </div>
      <div className={styles.productInfo}>
        <div className={styles.mainInfo}>
          <p className={styles.productName}>{product.name['en-GB']}</p>
          <span className={styles.productPrice}>{getPrice()}$</span>
        </div>
        <div className={styles.totalCostWrapper}>
          <div className={styles.totalCostBlock}>
            <div className={styles.quantityBlock}>
              <span>quantity:</span>
              <div className={styles.controlQuantity}>
                <button
                  disabled={product.quantity === 1 || isQuantityChanging}
                  onClick={() => changeQuantity('-')}
                  className={styles.changeQntBtn}
                >
                  -
                </button>
                <span className={styles.quantity}>{product.quantity}</span>
                <button
                  disabled={isQuantityChanging}
                  onClick={() => changeQuantity('+')}
                  className={styles.changeQntBtn}
                >
                  +
                </button>
              </div>
            </div>
            <div className={styles.totalCost}>
              <span>total cost:</span>
              <span>{product.quantity * getPrice()}$</span>
            </div>
          </div>

          <button
            disabled={isQuantityChanging}
            onClick={removeProductFromCart}
            className={styles.iconWrapper}
          >
            <img className={styles.icon} src={trashIcon} alt="" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
