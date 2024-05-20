import { ChangeEvent, FC, useEffect, useState } from 'react';
import styles from './style.module.css';

export type Message = string;
export type ValidationFunction = (inputValue: string) => Message;

export interface ValidatableInputProps {
  title: string;
  id: string;
  placeholder: string;
  validationCallback: ValidationFunction;
  type?: string;
}

const ValidatableInput: FC<ValidatableInputProps> = ({
  title,
  id,
  placeholder,
  validationCallback,
  type = 'text',
}) => {
  const [value, setValue] = useState('');
  const [message, setError] = useState('');

  useEffect(() => {
    if (value) {
      setError(validationCallback(value));
    }
  }, [value, validationCallback]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div className={styles.container}>
      <label htmlFor={id} className={styles.title}>
        {title}
      </label>
      <input
        type={type}
        id={id}
        placeholder={placeholder}
        value={value}
        onChange={handleChange}
        className={styles.input}
      />
      <div className={styles.message}>{message}</div>
    </div>
  );
};

export default ValidatableInput;
