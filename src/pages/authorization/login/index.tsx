import React from 'react';
import useFormValidation, { FormState } from '../useFormValidation';
import { validationRules } from '../validationRules';
import PasswordInput from '../components/password-input';

const LoginForm: React.FC = () => {
  const initialState: FormState = { email: '', password: '' };
  const { values, errors, handleChange, handleSubmit } = useFormValidation(
    initialState,
    validationRules,
  );

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Email:</label>
        <input type="email" name="email" value={values.email} onChange={handleChange} />
        {errors.email && <span>{errors.email}</span>}
      </div>
      <div>
        <label>Password:</label>
        <PasswordInput
          name="password"
          value={values.password}
          onChange={handleChange}
          error={errors.password || ''}
        />
      </div>
      <button
        type="submit"
        disabled={
          Object.values(errors).some((error) => error !== undefined) ||
          Object.values(values).some((value) => value === '')
        }
      >
        Login
      </button>
    </form>
  );
};

export default LoginForm;
