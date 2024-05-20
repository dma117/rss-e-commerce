import React from 'react';
import useFormValidation from '../useFormValidation';
import { validationRules } from '../validationRules';
import PasswordInput from '../components/password-input';

const RegistrationForm: React.FC = () => {
  const initialState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    street: '',
    city: '',
    postalCode: '',
    country: '',
  };
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
        <PasswordInput name="password" value={values.password} onChange={handleChange} />
        {errors.password && <span>{errors.password}</span>}
      </div>
      <div>
        <label>First Name:</label>
        <input type="text" name="firstName" value={values.firstName} onChange={handleChange} />
        {errors.firstName && <span>{errors.firstName}</span>}
      </div>
      <div>
        <label>Last Name:</label>
        <input type="text" name="lastName" value={values.lastName} onChange={handleChange} />
        {errors.lastName && <span>{errors.lastName}</span>}
      </div>
      <div>
        <label>Date of Birth:</label>
        <input type="date" name="dateOfBirth" value={values.dateOfBirth} onChange={handleChange} />
        {errors.dateOfBirth && <span>{errors.dateOfBirth}</span>}
      </div>
      <div>
        <label>Street:</label>
        <input type="text" name="street" value={values.street} onChange={handleChange} />
        {errors.street && <span>{errors.street}</span>}
      </div>
      <div>
        <label>City:</label>
        <input type="text" name="city" value={values.city} onChange={handleChange} />
        {errors.city && <span>{errors.city}</span>}
      </div>
      <div>
        <label>Postal Code:</label>
        <input type="text" name="postalCode" value={values.postalCode} onChange={handleChange} />
        {errors.postalCode && <span>{errors.postalCode}</span>}
      </div>
      <div>
        <label>Country:</label>
        <input type="text" name="country" value={values.country} onChange={handleChange} />
        {errors.country && <span>{errors.country}</span>}
      </div>
      <button
        type="submit"
        disabled={
          Object.values(errors).some((error) => error !== undefined) ||
          Object.values(values).some((value) => value === '')
        }
      >
        Signup
      </button>
    </form>
  );
};

export default RegistrationForm;
