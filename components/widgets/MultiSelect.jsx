import React from "react";
import Select from "react-select";

const MultiSelect = ({ options, field, form }) => (
  <Select
    className="custom-select"
    options={options}
    name={field.name}
    value={field.value.map((f) => ({ label: f, value: f }))}
    onChange={(option) => {
      form.setFieldValue(field.name, [...option.map((i) => i.value)]);
    }}
    onBlur={field.onBlur}
    isMulti
    closeMenuOnSelect={false}
  />
);

export default MultiSelect;
