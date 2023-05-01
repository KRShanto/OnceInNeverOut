import React, { useEffect, useState } from "react";

export default function Select({
  label,
  value,
  setValue,
  options,
}: // defaultOption,
{
  label: string;
  value: string;
  setValue: (value: string) => void;
  options: string[];
  // defaultOption: string;
}) {
  const [focus, setFocus] = useState(false);

  return (
    <div className="form-wrapper select">
      <label htmlFor={label}>{label}</label>

      <div className="select-input">
        <button
          type="button"
          id={label}
          className="btn skyblue select-btn"
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
        >
          {value}
        </button>

        <div
          className="select-options"
          style={{
            transform: focus ? "scaleY(1)" : "scaleY(0)",
          }}
        >
          {options.map((option) => (
            <button
              className="option"
              type="button"
              key={option}
              onClick={() => {
                setValue(option);
              }}
            >
              {option}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
