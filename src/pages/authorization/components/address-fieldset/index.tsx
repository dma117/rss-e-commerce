import { FC } from 'react';

import InputField, { TextFieldProps } from '@/pages/authorization/components/input-field';
import SelectField, { SelectFieldProps } from '@pages/authorization/components/select-field';

interface AddressFieldsetProps {
  title: string;
  countriesProps: SelectFieldProps;
  postalCodeProps: TextFieldProps;
  cityProps: TextFieldProps;
  streetProps: TextFieldProps;
}

const AddressFieldset: FC<AddressFieldsetProps> = ({
  title,
  countriesProps,
  postalCodeProps,
  cityProps,
  streetProps,
}) => (
  <fieldset>
    <legend>{title}</legend>
    <SelectField {...countriesProps} />
    <InputField {...postalCodeProps} />
    <InputField {...cityProps} />
    <InputField {...streetProps} />
  </fieldset>
);

export default AddressFieldset;
