import React from "react";

interface OPtionInterface {
  label: string;
  value: string;
}

interface AdminDropDownInterface {
  options: OPtionInterface[];
  label: string;
  select?: (i: string) => void;
  lightBg?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
}

const AdminDropDown = ({
  options,
  select,
  label,
  lightBg,
  onChange,
  name,
}: AdminDropDownInterface) => {
  return (
    <div id="AdminDropDown">
      <div className={`label ${lightBg ? `lightBg` : ``}`}>
        <label>{label}</label>
      </div>
      <select
        className={`${lightBg ? `lightBg` : ``}`}
        onChange={(e) => {
          select?.(e.target.value);
          onChange?.(e);
        }}
        name={name}
      >
        {options?.map((op, idx) => (
          <option key={idx} value={op.value}>
            {op.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default AdminDropDown;
