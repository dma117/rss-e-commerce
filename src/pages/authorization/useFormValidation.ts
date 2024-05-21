import { useState, useEffect } from 'react';

export type FormState = Record<string, string>;
type FormErrors = Record<string, string | undefined>;

type ValidationFunction = (value: string, ...args: string[]) => string;

const useFormValidation = (
  initialState: FormState,
  validate: { [key: string]: ValidationFunction },
) => {
  const [values, setValues] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = Object.keys(errors).length === 0;
      if (noErrors) {
        console.log('Form is valid and can be submitted!');
        // Submit form
      }
      setIsSubmitting(false);
    }
  }, [errors, isSubmitting]);

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

    const postalCodeName = 'postalCode';
    if (name === 'country' && values[postalCodeName]) {
      if (errors[postalCodeName] || values[postalCodeName] !== '') {
        const error = validate[postalCodeName](values[postalCodeName], value);
        setErrors({
          ...errors,
          [postalCodeName]: error || undefined,
        });
      }
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors: FormErrors = {};
    Object.keys(validate).forEach((key) => {
      const error = validate[key](values[key]);
      if (error) {
        validationErrors[key] = error;
      }
    });
    setErrors(validationErrors);
    setIsSubmitting(true);
  };

  return { values, errors, handleChange, handleSubmit, isSubmitting };
};

export default useFormValidation;
