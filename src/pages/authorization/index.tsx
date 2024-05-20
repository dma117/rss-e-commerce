import styles from './style.module.css';
import cn from 'classnames';

import { FC } from 'react';

import NavLink from '@/pages/authorization/components/nav-link';
import RegistrationForm from '@/pages/authorization/registration/';

const Authorization: FC = () => {
  return (
    <div className={cn('container', styles.authorizationContainer)}>
      <nav className={styles.navContainer}>
        <ul className={styles.nav}>
          <NavLink title={'Login'} hrefValue="#login" />
          <NavLink title={'Sign-up'} hrefValue="#signup" />
        </ul>
      </nav>
      <RegistrationForm />
    </div>
  );
};

export default Authorization;
