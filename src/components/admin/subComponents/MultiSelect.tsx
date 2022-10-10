import React from "react";
import Select, { MultiValue } from "react-select";

interface MultiSelectInterface {
  label: string;
  options: { value: string; label: string }[];
  getValue?: (value: string[]) => void;
}

const MultiSelect = ({ label, options, getValue }: MultiSelectInterface) => {
  const filterOutValues = (
    value: MultiValue<{ value: string; label: string }>
  ) => {
    const res = value.map((v) => v.value);
    return res;
  };
  return (
    <div id="AdminDropDown">
      <div className="label">
        <label htmlFor="">{label}</label>
      </div>
      <Select
        isMulti
        options={options}
        onChange={(value) => {
          getValue?.(filterOutValues(value));
        }}
      />
    </div>
  );
};

export default MultiSelect;
