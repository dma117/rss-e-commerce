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
      changePostalCode('shippingPostalCode', value);
    }

    if (name === 'billingCountry') {
      changePostalCode('billingPostalCode', value);
    }
  };

  const changePostalCode = (postalCodeName: string, value: string) => {
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

  const changeValues = (newValues: React.SetStateAction<FormState>) => setValues(newValues);

  const isFormValid = () =>
    Object.values(errors).length === Object.values(validate).length &&
    Object.values(errors).every((error) => error === undefined);

  return { values, changeValues, errors, handleChange, isFormValid };
};

export default useFormValidation;
