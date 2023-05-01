import { generate } from "generate-password";
import React, { useState } from "react";
import Checkbox from "./Checkbox";
import Input from "./Input";
import { InputProps } from "./Input";

export default function Password({
  label,
  value,
  setValue,
  className,
  placeholder,
  disabled,
  readOnly,
  autoFocus,
  generator = true,
}: InputProps & { generator?: boolean }) {
  const [showPassword, setShowPassword] = useState(false);

  function generatePassword() {
    setValue(
      generate({
        length: 15,
        lowercase: true,
        numbers: true,
        strict: true,
        symbols: true,
        uppercase: true,
      })
    );
  }

  return (
    <Input
      label={label}
      type={showPassword ? "text" : "password"}
      value={value}
      setValue={setValue}
      className={className + " password"}
      placeholder={placeholder}
      required={true}
      disabled={disabled}
      readOnly={readOnly}
      autoFocus={autoFocus}
    >
      <div className="options">
        <Checkbox
          label="Show Password"
          checked={showPassword}
          setChecked={setShowPassword}
        />
        {generator && (
          <button
            type="button"
            className="generate-password"
            onClick={generatePassword}
          >
            Generate Password
          </button>
        )}
      </div>
    </Input>
  );
}
