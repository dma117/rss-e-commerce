import { FC, ChangeEvent } from 'react';

export interface CountriesListProps {
  title: string;
  id: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
}

const CountriesList: FC<CountriesListProps> = ({ title, id, value, onChange }) => {
  return (
    <>
      <label htmlFor={id}>{title}</label>
      <select id={id} value={value} onChange={onChange}>
        <option value="US">US</option>
        <option value="DE">DE</option>
        <option value="NL">NL</option>
        <option value="RU">RU</option>
      </select>
    </>
  );
};

export default CountriesList;
