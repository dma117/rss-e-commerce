import styles from './style.module.css';

import { FC } from 'react';

import NavLink from '@/pages/authorization/components/nav-link';

const Authorization: FC = () => {
  return (
    <nav className={`container ${styles.authorizationContainer}`}>
      <ul className={styles.nav}>
        <NavLink title={'Login'} hrefValue="#login" />
        <NavLink title={'Registration'} hrefValue="#registration" />
      </ul>
    </nav>
  );
};

export default Authorization;
