import React from "react";

interface InputBoxInterface {
  label: string;
  name: string;
  formik?: any;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: any;
  disabled?: boolean;
}
const InputBox = ({
  formik,
  label,
  name,
  onChange,
  type,
  value,
  disabled,
}: InputBoxInterface) => {
  return (
    <div id="adminInputBox">
      <label htmlFor="">{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        onChange={(e) => onChange?.(e)}
        disabled={disabled}
        onBlur={formik?.handleBlur}
      />
      {formik?.touched?.[name] && formik?.errors[name] && (
        <span>{formik?.errors[name]}</span>
      )}
    </div>
  );
};

export default InputBox;
