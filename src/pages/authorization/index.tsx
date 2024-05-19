import styles from './style.module.css';

import { FC } from 'react';

import ButtonUnderlined from '@components/buttons/button-underlined/';

const Authorization: FC = () => {
  return (
    <section className={`container ${styles.authorizationContainer}`}>
      <ButtonUnderlined title={'Login'} onButtonClick={() => console.log('clicked login')} />
      <ButtonUnderlined
        title={'Registration'}
        onButtonClick={() => console.log('clicked registration')}
      />
    </section>
  );
};

export default Authorization;
