import { Link } from 'react-router-dom';
import styles from './style.module.css';

type ProductCardMinProps = {
  id: string;
  imgSrc: string;
  title: string;
  description: string;
  price: number;
};

function ProductCardMin({ id, imgSrc, title, description, price }: ProductCardMinProps) {
  return (
    <Link className={styles.productCard} to={`./${id}`}>
      <img src={imgSrc} alt="" />
      <div className={styles.title}>{title}</div>
      <div>{description}</div>
      <div className={styles.price}>{`${price}$`}</div>
    </Link>
  );
}

export default ProductCardMin;
