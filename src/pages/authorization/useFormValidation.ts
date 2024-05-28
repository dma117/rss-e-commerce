import { useState } from 'react';

export type FormState = Record<string, string>;
type FormErrors = Record<string, string | undefined>;

type ValidationFunction = (value: string, ...args: string[]) => string;

const useFormValidation = (
  initialState: FormState,
  validate: { [key: string]: ValidationFunction },
) => {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    ...args: string[]
  ) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });

    if (validate[name]) {
      const error = validate[name](value, ...args);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: error || undefined,
      }));
    }

    if (name === 'shippingCountry') {
      validatePostalCode('shippingPostalCode', value);
    }

    if (name === 'billingCountry') {
      validatePostalCode('billingPostalCode', value);
    }
  };

  const validatePostalCode = (postalCodeName: string, value: string) => {
    if (values[postalCodeName]) {
      if (errors[postalCodeName] || values[postalCodeName] !== '') {
        const error = validate[postalCodeName](values[postalCodeName], value);
        setErrors({
          ...errors,
          [postalCodeName]: error || undefined,
        });
      }
    }
  };

  const isFormValid = () =>
    Object.values(errors).some((error) => error !== undefined) ||
    Object.keys(values).some((key) => !key.includes('country') && values[key] === '');

  return { values, errors, handleChange, isFormValid };
};

export default useFormValidation;
