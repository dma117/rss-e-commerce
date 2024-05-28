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
  shippingStreet: validateStreet,
  shippingCity: validateCity,
  shippingPostalCode: validatePostalCode,
  billingStreet: validateStreet,
  billingCity: validateCity,
  billingPostalCode: validatePostalCode,
};
