import styles from '@pages/authorization/style.module.css';

import { FC, HTMLInputTypeAttribute } from 'react';

export interface TextFieldProps {
  labelTitle: string;
  name: string;
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
}

const InputField: FC<TextFieldProps> = ({
  labelTitle: label,
  name,
  type,
  value,
  onChange,
  error,
}) => (
  <div className={styles.fieldContainer}>
    <label>{label}</label>
    <input className={styles.input} type={type} name={name} value={value} onChange={onChange} />
    {error && <span className={styles.error}>{error}</span>}
  </div>
);

export default InputField;
