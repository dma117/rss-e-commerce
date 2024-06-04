import { Link } from 'react-router-dom';
import styles from './style.module.css';
import cn from 'classnames';

type ProductCardMinProps = {
  id: string;
  imgSrc: string;
  title: string;
  description: string;
  price: number;
  finalPrice: number;
};

function ProductCardMin({
  id,
  imgSrc,
  title,
  description,
  price,
  finalPrice,
}: ProductCardMinProps) {
  return (
    <Link className={styles.productCard} to={`./${id}`}>
      {!!finalPrice && <span className={styles.discount}>%</span>}
      <img src={imgSrc} alt="" />
      <div className={styles.title}>{title}</div>
      <div>{description}</div>
      <div className={styles.price}>
        {!!finalPrice && <span className={styles.finalPrice}>{`${finalPrice.toFixed(2)}$`}</span>}
        <span className={cn({ [styles['oldPrice']]: finalPrice })}>{`${price}$`}</span>
      </div>
    </Link>
  );
}

export default ProductCardMin;
