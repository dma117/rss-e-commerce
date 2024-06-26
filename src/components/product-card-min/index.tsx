import { Link } from 'react-router-dom';
import styles from './style.module.css';
import cn from 'classnames';

type ProductCardMinProps = {
  id: string;
  imgSrc: string;
  title: string;
  price: number;
  finalPrice: number;
  level: string;
  duration: number;
};

function ProductCardMin({
  id,
  imgSrc,
  title,
  price,
  finalPrice,
  level,
  duration,
}: ProductCardMinProps) {
  return (
    <Link className={styles.productCard} to={`./${id}`}>
      {!!finalPrice && <span className={styles.discount}>%</span>}
      <div className={styles.imgWrapper}>
        <img className={styles.img} src={imgSrc} alt="" />
      </div>
      <div className={styles.content}>
        <div className={styles.title}>{title}</div>
        <div className={styles.level}>
          <span>
            <span className={styles.accent}>{level}</span>
          </span>
          <span>
            <span className="">{duration}</span> month
          </span>
        </div>
        <div className={styles.price}>
          {!!finalPrice && <span className={styles.finalPrice}>{`${finalPrice.toFixed(2)}$`}</span>}
          <span className={cn({ [styles.oldPrice]: finalPrice })}>{`${price}$`}</span>
        </div>
      </div>
    </Link>
  );
}

export default ProductCardMin;
