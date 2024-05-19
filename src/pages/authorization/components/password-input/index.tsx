import ValidatableInput, { ValidatableInputProps } from '../validatable-input/';

const PasswordInput: React.FC<Omit<ValidatableInputProps, 'type'>> = (props) => {
  return <ValidatableInput {...props} type="password" />;
};

export default PasswordInput;
