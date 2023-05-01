import React from "react";

export interface InputProps {
  label: string;
  type?: string;
  value: string;
  setValue: (value: string) => void;
  className?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  readOnly?: boolean;
  autoFocus?: boolean;
  children?: React.ReactNode;
}

export default function Input({
  label,
  type = "text",
  value,
  setValue,
  className,
  placeholder,
  required,
  disabled,
  readOnly,
  autoFocus,
  children,
}: InputProps) {
  return (
    <div className={`form-wrapper label-input ${className}`}>
      <label htmlFor={label}>{label}</label>
      <input
        className="input"
        type={type}
        id={label}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        readOnly={readOnly}
        autoFocus={autoFocus}
      />
      {children}
    </div>
  );
}
