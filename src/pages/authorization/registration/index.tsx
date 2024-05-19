import styles from './style.module.css';

import { FC } from 'react';

import TextInput from '@/pages/authorization/components/text-input';
import { InputProps } from './config';

const RegistrationForm: FC = () => {
  return (
    <form className={styles.formContainer}>
      <TextInput {...InputProps.EMAIL} />
    </form>
  );
};

export default RegistrationForm;
