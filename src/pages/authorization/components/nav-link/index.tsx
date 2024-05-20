import styles from './style.module.css';

import { FC } from 'react';

export interface NavLinkProps {
  title: string;
  hrefValue: string;
}

const NavLink: FC<NavLinkProps> = ({ title, hrefValue }: NavLinkProps) => {
  return (
    <li className={styles.linkContainer}>
      <a href={hrefValue}>{title}</a>
    </li>
  );
};

export default NavLink;
