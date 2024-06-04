// import { Link } from 'react-router-dom';
import cn from 'classnames';
import styles from './style.module.css';
// import cn from 'classnames';

type SortingProps = {
  setSort: (query: { [key: string]: string }) => void;
}

function Sorting({ setSort }: SortingProps) {
  return (
    <div className={styles.sorting}>
      <button className={cn(styles.button, styles.buttonAsc)} onClick={() => setSort({ sort: 'price asc', })}>Asc</button>
      <span className={styles.text}>Price</span>
      <button className={cn(styles.button, styles.buttonDesc)} onClick={() => setSort({ sort: 'price desc', })}>Desc</button>
    </div>
  );
}

export default Sorting;
