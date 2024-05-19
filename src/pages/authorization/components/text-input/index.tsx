import styles from './style.module.css';

import { FC } from 'react';

export interface TextInputProps {
  title: string;
  placeholder: string;
  id: string;
}

export interface someInterface {
  nameValue: string;
}

const TextInput: FC<TextInputProps> = ({ title, placeholder, id }: TextInputProps) => {
  return (
    <>
      <label htmlFor={id} className={styles.title}>
        {title}
      </label>
      <input type="text" name={id} id={id} className={styles.input} placeholder={placeholder} />
    </>
  );
};

export default TextInput;
