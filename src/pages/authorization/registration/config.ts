import { TextInputProps } from '../components/text-input';

type InputKeys = 'EMAIL';
// | 'PASSWORD'
// | 'FIRST_NAME'
// | 'LAST_NAME'
// | 'DATE_OF_BIRTH'
// | 'STREET'
// | 'CITY'
// | 'POSTAL_CODE'
// | 'COUNTRY';

type InputPropsMap = {
  EMAIL: TextInputProps;
  // PASSWORD: TextInputProps;
  // FIRST_NAME: TextInputProps;
  // LAST_NAME: TextInputProps;
  // DATE_OF_BIRTH: TextInputProps;
  // STREET: TextInputProps;
  // CITY: TextInputProps;
  // POSTAL_CODE: TextInputProps;
  // COUNTRY: TextInputProps;
};

type InputPropsRecord = {
  [K in InputKeys]: InputPropsMap[K];
};

const placeholderTemplate = (title: string) => `Your ${title} is ...`;

export const InputProps: InputPropsRecord = {
  EMAIL: {
    title: 'email',
    placeholder: placeholderTemplate('email'),
    id: 'email',
  },
  // PASSWORD: /[a-z]/,
  // FIRST_NAME: /\d/,
  // DATE_OF_BIRTH: /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/,
  // STREET: /[a-zA-Z]/,
  // CITY: /[\s\p{Zs}\u180E]+/u,
  // POSTAL_CODE: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@?/,
  // COUNTRY: /@/,
};
