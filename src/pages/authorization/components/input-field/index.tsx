// import styles from '@pages/authorization/style.module.css';

import { FC, HTMLInputTypeAttribute } from 'react';

export type Styles = { [key: string]: string };

interface TextFieldProps {
  labelTitle: string;
  name: string;
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  autoComplete?: string;
  styles: Styles;
  useWrapper?: boolean;
}

const InputField: FC<TextFieldProps> = ({
  labelTitle: label,
  name,
  type,
  value,
  onChange,
  error,
  autoComplete = 'username',
  styles,
  useWrapper,
}) => {
  if (useWrapper) {
    return (
      <div className={styles.fieldContainer}>
        <div className={styles.wrapper}>
          <label className={styles.label}>{label}</label>
          <input
            className={styles.input}
            type={type}
            name={name}
            value={value}
            autoComplete={autoComplete}
            onChange={onChange}
          />
        </div>
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  } else {
    return (
      <div className={styles.fieldContainer}>
        <label>{label}</label>
        <input
          className={styles.input}
          type={type}
          name={name}
          value={value}
          autoComplete={autoComplete}
          onChange={onChange}
        />
        {error && <span className={styles.error}>{error}</span>}
      </div>
    );
  }
};

export default InputField;
