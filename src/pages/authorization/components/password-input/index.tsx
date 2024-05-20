import React, { useState } from 'react';

interface PasswordInputProps {
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  title?: string;
  id?: string;
  placeholder?: string;
}

const PasswordInput: React.FC<PasswordInputProps> = ({
  name,
  value,
  onChange,
  error,
  title,
  id,
  placeholder,
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div>
      <input
        type={isPasswordVisible ? 'text' : 'password'}
        name={name}
        value={value}
        onChange={onChange}
        title={title}
        id={id}
        placeholder={placeholder}
      />
      <button type="button" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
        {isPasswordVisible ? 'Hide' : 'Show'}
      </button>
      {error && <span>{error}</span>}
    </div>
  );
};

export default PasswordInput;
