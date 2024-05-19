import styles from './style.module.css';
import cn from 'classnames';

import { FC } from 'react';

import NavLink from '@/pages/authorization/components/nav-link';

const Authorization: FC = () => {
  return (
    <div className={cn('container', styles.authorizationContainer)}>
      <nav>
        <ul className={styles.nav}>
          <NavLink title={'Login'} hrefValue="#login" />
          <NavLink title={'Registration'} hrefValue="#registration" />
        </ul>
      </nav>
    </div>
  );
};

export default Authorization;
