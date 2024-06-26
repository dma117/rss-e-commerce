import { FC, HTMLInputTypeAttribute } from 'react';
import cn from 'classnames';

export type Styles = { [key: string]: string };

interface TextFieldProps {
  labelTitle: string;
  name: string;
  type: HTMLInputTypeAttribute;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  styles: Styles;
  error?: string;
  autoComplete?: string;
  isDisabled?: boolean;
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
  isDisabled,
}) => {
  return (
    <div className={styles.fieldContainer}>
      <label>{label}</label>
      <input
        className={isDisabled ? cn(styles.input, styles.disabled) : styles.input}
        type={type}
        name={name}
        value={value}
        autoComplete={autoComplete}
        onChange={onChange}
        disabled={isDisabled}
      />
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
};

export default InputField;
