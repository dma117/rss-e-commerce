import styles from '@pages/authorization/style.module.css';
import 'react-toastify/dist/ReactToastify.css';

import React, { FC } from 'react';
import { ToastContainer } from 'react-toastify';

import { BaseAddress, MyCustomerDraft } from '@commercetools/platform-sdk';

import { useApiRootContext } from '@contexts/useApiRootContext';
import { useUserContext } from '@contexts/useUserContext';

import { register } from '@utils/api/commercetools-api';
import notify from '@utils/notify';

import useFormValidation, { FormState } from '@pages/authorization/useFormValidation';
import { getValidationRules } from '@pages/authorization/validationRules';
import PasswordInput from '@pages/authorization/components/password-input/';
import {
  COUNTRY_OPTIONS,
  initialRegistrationData,
  inputNames,
} from '@/pages/authorization/forms-config';
import InputField from '@pages/authorization/components/input-field';
import SelectField from '@pages/authorization/components/select-field';
import { isHTMLInputElement } from '@/utils/type-guards';

const RegistrationForm: FC = () => {
  const initialState: FormState = initialRegistrationData;

  const { values, errors, handleChange, changeValues, validateValue, isFormValid } =
    useFormValidation(initialState, getValidationRules(Object.keys(initialState)));
  const { apiRoot, setApiRoot } = useApiRootContext();
  const { setIsUserLoggedIn } = useUserContext();

  async function registerUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      shippingStreet,
      shippingCity,
      shippingPostalCode,
      shippingCountry,
      billingStreet,
      billingCity,
      billingPostalCode,
      billingCountry,
    } = values;

    const addresses = [
      createAddressObject(shippingCountry, shippingCity, shippingStreet, shippingPostalCode),
    ];

    let defaultShippingAddressId: number | undefined;
    let defaultBillingAddressId: number | undefined;

    const form = e.target;

    if (form instanceof HTMLFormElement) {
      const defaultShippingInput = form.elements[inputNames.defaultShipping];
      const defaultBillingInput = form.elements[inputNames.defaultBilling];
      const setShippingAsBillingAddressInput = form.elements[inputNames.billingAddress];

      if (
        isHTMLInputElement(defaultShippingInput) &&
        isHTMLInputElement(defaultBillingInput) &&
        isHTMLInputElement(setShippingAsBillingAddressInput)
      ) {
        if (!setShippingAsBillingAddressInput.checked) {
          addresses.push(
            createAddressObject(billingCountry, billingCity, billingStreet, billingPostalCode),
          );
        }

        if (defaultShippingInput.checked) {
          defaultShippingAddressId = 0;
        }

        if (defaultBillingInput.checked) {
          defaultBillingAddressId = addresses.length === 1 ? 0 : 1;
        }
      }
    }

    const customerDraft: MyCustomerDraft = {
      email,
      password,
      firstName,
      lastName,
      dateOfBirth,
      addresses,
      defaultShippingAddress: defaultShippingAddressId,
      defaultBillingAddress: defaultBillingAddressId,
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

  function createAddressObject(
    country: string,
    city: string,
    streetName: string,
    postalCode: string,
  ): BaseAddress {
    return {
      country,
      city,
      streetName,
      postalCode,
    };
  }

  const setBillingAddress = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = e.target.checked;

    if (isChecked) {
      const newValues = {
        billingCountry: values.shippingCountry,
        billingPostalCode: values.shippingPostalCode,
        billingCity: values.shippingCity,
        billingStreet: values.shippingStreet,
      };
      changeValues(newValues, values.shippingCountry);
    }
  };

  const changePostalCode = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;

    let postalCodeName = inputNames.shippingPostalCode;
    if (name === inputNames.billingCountry) {
      postalCodeName = inputNames.billingPostalCode;
    }

    changeValues({ [name]: value });
    validateValue(postalCodeName, values[postalCodeName], value);
  };

  return (
    <form className={styles.formContainer} onSubmit={registerUser}>
      <InputField
        labelTitle="Email"
        name={inputNames.email}
        type="text"
        value={values[inputNames.email]}
        onChange={handleChange}
        error={errors[inputNames.email]}
        autoComplete={`user-${inputNames.email}`}
        styles={styles}
      />
      <div className={styles.fieldContainer}>
        <label>Password:</label>
        <PasswordInput
          name={inputNames.password}
          value={values[inputNames.password]}
          onChange={handleChange}
        />
        {errors[inputNames.password] && (
          <span className={styles.error}>{errors[inputNames.password]}</span>
        )}
      </div>
      <InputField
        labelTitle="First Name"
        type="text"
        name={inputNames.firstName}
        value={values[inputNames.firstName]}
        onChange={handleChange}
        error={errors[inputNames.firstName]}
        autoComplete={`user-${inputNames.firstName}`}
        styles={styles}
      />
      <InputField
        labelTitle="Last Name"
        type="text"
        name={inputNames.lastName}
        value={values[inputNames.lastName]}
        onChange={handleChange}
        error={errors[inputNames.lastName]}
        autoComplete={`user-${inputNames.lastName}`}
        styles={styles}
      />
      <InputField
        labelTitle="Date of Birth"
        type="date"
        name={inputNames.dateOfBirth}
        value={values[inputNames.dateOfBirth]}
        onChange={handleChange}
        error={errors[inputNames.dateOfBirth]}
        autoComplete={`user-${inputNames.dateOfBirth}`}
        styles={styles}
      />

      <fieldset>
        <legend>Shipping Address</legend>
        <SelectField
          labelTitle="Country:"
          name={inputNames.shippingCountry}
          options={COUNTRY_OPTIONS}
          value={values[inputNames.shippingCountry]}
          onChange={changePostalCode}
          error={errors[inputNames.shippingCountry]}
          styles={styles}
        />
        <InputField
          labelTitle="Postal Code"
          type="text"
          name={inputNames.shippingPostalCode}
          value={values[inputNames.shippingPostalCode]}
          onChange={(e) => handleChange(e, values[inputNames.shippingCountry])}
          error={errors[inputNames.shippingPostalCode]}
          styles={styles}
        />
        <InputField
          labelTitle="City"
          type="text"
          name={inputNames.shippingCity}
          value={values[inputNames.shippingCity]}
          onChange={handleChange}
          error={errors[inputNames.shippingCity]}
          styles={styles}
        />
        <InputField
          labelTitle="Street"
          type="text"
          name={inputNames.shippingStreet}
          value={values[inputNames.shippingStreet]}
          onChange={handleChange}
          error={errors[inputNames.shippingStreet]}
          styles={styles}
        />
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id={inputNames.billingAddress}
            name={inputNames.billingAddress}
            onChange={setBillingAddress}
          />
          <label htmlFor={inputNames.billingAddress}>Set as billing address</label>
        </div>
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            id={inputNames.defaultShipping}
            name={inputNames.defaultShipping}
          />
          <label htmlFor={inputNames.defaultShipping}>Set as default address</label>
        </div>
      </fieldset>

      <fieldset>
        <legend>Billing Address</legend>
        <SelectField
          labelTitle="Country:"
          name={inputNames.billingCountry}
          options={COUNTRY_OPTIONS}
          value={values[inputNames.billingCountry]}
          onChange={changePostalCode}
          error={errors[inputNames.billingCountry]}
          styles={styles}
        />
        <InputField
          labelTitle="Postal Code"
          type="text"
          name={inputNames.billingPostalCode}
          value={values[inputNames.billingPostalCode]}
          onChange={(e) => handleChange(e, values[inputNames.billingCountry])}
          error={errors[inputNames.billingPostalCode]}
          styles={styles}
        />
        <InputField
          labelTitle="City"
          type="text"
          name={inputNames.billingCity}
          value={values[inputNames.billingCity]}
          onChange={handleChange}
          error={errors[inputNames.billingCity]}
          styles={styles}
        />
        <InputField
          labelTitle="Street"
          type="text"
          name={inputNames.billingStreet}
          value={values[inputNames.billingStreet]}
          onChange={handleChange}
          error={errors[inputNames.billingStreet]}
          styles={styles}
        />
        <div className={styles.checkboxContainer}>
          <input type="checkbox" id={inputNames.defaultBilling} name={inputNames.defaultBilling} />
          <label htmlFor={inputNames.defaultBilling}>Set as default address</label>
        </div>
      </fieldset>

      <button type="submit" disabled={!isFormValid()} className={styles.submitButton}>
        Signup
      </button>
      <ToastContainer position="bottom-right" />
    </form>
  );
};

export default RegistrationForm;
