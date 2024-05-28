import styles from '@pages/authorization/style.module.css';
import 'react-toastify/dist/ReactToastify.css';

import { FC } from 'react';
import { ToastContainer } from 'react-toastify';

import { MyCustomerDraft } from '@commercetools/platform-sdk';

import { useApiRootContext } from '@contexts/useApiRootContext';
import { useUserContext } from '@contexts/useUserContext';

import { register } from '@utils/api/commercetools-api';
import notify from '@utils/notify';

import useFormValidation, { FormState } from '../useFormValidation';
import { validationRules } from '../validationRules';
import PasswordInput from '../components/password-input/';

const RegistrationForm: FC = () => {
  const initialState: FormState = {
    email: '',
    password: '',
    firstName: '',
    lastName: '',
    dateOfBirth: '',
    shippingStreet: '',
    shippingCity: '',
    shippingPostalCode: '',
    shippingCountry: 'US',
    billingStreet: '',
    billingCity: '',
    billingPostalCode: '',
    billingCountry: 'US',
  };

  const { values, errors, handleChange, isFormValid } = useFormValidation(
    initialState,
    validationRules,
  );
  const { apiRoot, setApiRoot } = useApiRootContext();
  const { setIsUserLoggedIn } = useUserContext();

  async function registerUser(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    e.preventDefault();
    const { email, password, firstName, lastName, dateOfBirth, country, city, street, postalCode } =
      values;
    const customerDraft: MyCustomerDraft = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses: [
        {
          country,
          city,
          streetName: street,
          postalCode,
        },
      ],
    };

    if (apiRoot) {
      const response = await register(apiRoot, customerDraft);

      if (response.success && response.apiBuilder) {
        setApiRoot(response.apiBuilder);
        setIsUserLoggedIn(true);
      } else if (response.errorMessage) {
        notify(response.errorMessage);
      }
    }
  }

  return (
    <form className={styles.formContainer}>
      <div className={styles.fieldContainer}>
        <label>Email:</label>
        <input
          className={styles.input}
          type="text"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && <span className={styles.error}>{errors.email}</span>}
      </div>
      <div className={styles.fieldContainer}>
        <label>Password:</label>
        <PasswordInput name="password" value={values.password} onChange={handleChange} />
        {errors.password && <span className={styles.error}>{errors.password}</span>}
      </div>
      <div className={styles.fieldContainer}>
        <label>First Name:</label>
        <input
          className={styles.input}
          type="text"
          name="firstName"
          value={values.firstName}
          onChange={handleChange}
        />
        {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
      </div>
      <div className={styles.fieldContainer}>
        <label>Last Name:</label>
        <input
          className={styles.input}
          type="text"
          name="lastName"
          value={values.lastName}
          onChange={handleChange}
        />
        {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
      </div>
      <div className={styles.fieldContainer}>
        <label>Date of Birth:</label>
        <input
          className={styles.input}
          type="date"
          name="dateOfBirth"
          value={values.dateOfBirth}
          onChange={handleChange}
        />
        {errors.dateOfBirth && <span className={styles.error}>{errors.dateOfBirth}</span>}
      </div>

      <fieldset>
        <legend>Shipping Address</legend>
        <div className={styles.fieldContainer}>
          <label htmlFor="shippingCountry">Country:</label>
          <select
            className={styles.countriesSelect}
            id="shippingCountry"
            name="shippingCountry"
            value={values.shippingCountry}
            onChange={handleChange}
          >
            <option value="US">United States</option>
            <option value="DE">Germany</option>
            <option value="NL">Netherlands</option>
            <option value="RU">Russia</option>
          </select>
          {errors.shippingCountry && <span className={styles.error}>{errors.shippingCountry}</span>}
        </div>
        <div className={styles.fieldContainer}>
          <label>Postal Code:</label>
          <input
            className={styles.input}
            type="text"
            name="shippingPostalCode"
            value={values.shippingPostalCode}
            onChange={(e) => handleChange(e, values['shippingCountry'])}
          />
          {errors.shippingPostalCode && (
            <span className={styles.error}>{errors.shippingPostalCode}</span>
          )}
        </div>
        <div className={styles.fieldContainer}>
          <label>City:</label>
          <input
            className={styles.input}
            type="text"
            name="shippingCity"
            value={values.shippingCity}
            onChange={handleChange}
          />
          {errors.shippingCity && <span className={styles.error}>{errors.shippingCity}</span>}
        </div>
        <div className={styles.fieldContainer}>
          <label>Street:</label>
          <input
            className={styles.input}
            type="text"
            name="shippingStreet"
            value={values.shippingStreet}
            onChange={handleChange}
          />
          {errors.shippingStreet && <span className={styles.error}>{errors.shippingStreet}</span>}
        </div>
      </fieldset>

      <fieldset>
        <legend>Billing Address</legend>
        <div className={styles.fieldContainer}>
          <label htmlFor="billingCountry">Country:</label>
          <select
            className={styles.countriesSelect}
            id="billingCountry"
            name="billingCountry"
            value={values.billingCountry}
            onChange={handleChange}
          >
            <option value="US">United States</option>
            <option value="DE">Germany</option>
            <option value="NL">Netherlands</option>
            <option value="RU">Russia</option>
          </select>
          {errors.billingCountry && <span className={styles.error}>{errors.billingCountry}</span>}
        </div>
        <div className={styles.fieldContainer}>
          <label>Postal Code:</label>
          <input
            className={styles.input}
            type="text"
            name="billingPostalCode"
            value={values.billingPostalCode}
            onChange={(e) => handleChange(e, values['billingCountry'])}
          />
          {errors.billingPostalCode && (
            <span className={styles.error}>{errors.billingPostalCode}</span>
          )}
        </div>
        <div className={styles.fieldContainer}>
          <label>City:</label>
          <input
            className={styles.input}
            type="text"
            name="billingCity"
            value={values.billingCity}
            onChange={handleChange}
          />
          {errors.billingCity && <span className={styles.error}>{errors.billingCity}</span>}
        </div>
        <div className={styles.fieldContainer}>
          <label>Street:</label>
          <input
            className={styles.input}
            type="text"
            name="billingStreet"
            value={values.billingStreet}
            onChange={handleChange}
          />
          {errors.billingStreet && <span className={styles.error}>{errors.billingStreet}</span>}
        </div>
      </fieldset>

      <button
        type="submit"
        disabled={isFormValid()}
        className={styles.submitButton}
        onClick={registerUser}
      >
        Signup
      </button>
      <ToastContainer position="bottom-right" />
    </form>
  );
};

export default RegistrationForm;
