import styles from './style.module.css';

import { FC } from 'react';

interface ButtonUnderlinedProps {
  title: string;
  hrefValue: string;
}

const NavLink: FC<ButtonUnderlinedProps> = ({ title, hrefValue }: ButtonUnderlinedProps) => {
  return (
    <li className={styles.linkContainer}>
      <a href={hrefValue}>{title}</a>
    </li>
  );
};

export default NavLink;
