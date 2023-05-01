import React from "react";

export default function Checkbox({
  label,
  checked,
  setChecked,
}: {
  label: string;
  checked: boolean;
  setChecked: (checked: boolean) => void;
}) {
  return (
    <div className="checkbox">
      <input
        type="checkbox"
        id={label}
        checked={checked}
        onChange={(e) => setChecked(e.target.checked)}
      />
      <label htmlFor={label}>{label}</label>
    </div>
  );
}
