import {
  validateEmail,
  validatePassword,
  validateFirstName,
  validateLastName,
  validateDateOfBirth,
  validateStreet,
  validateCity,
  validatePostalCode,
} from './validation';

export const validationRules = {
  email: validateEmail,
  password: validatePassword,
  firstName: validateFirstName,
  lastName: validateLastName,
  dateOfBirth: validateDateOfBirth,
  street: validateStreet,
  city: validateCity,
  postalCode: validatePostalCode,
  country: (value: string) => (value ? '' : 'Country is required'),
};
