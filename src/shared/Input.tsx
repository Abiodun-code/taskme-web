import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
}

const CustomInput: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  value,
  onChange,
  className = '',
  ...props
}) => {
  return (
    <input
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className={`p-3 font-inter text-sm text-gray-900 bg-gray-50/70 shadow-sm border border-gray-400 rounded-md w-full outline-none ${className}`}
      {...props}
    />
  );
};

export default CustomInput;