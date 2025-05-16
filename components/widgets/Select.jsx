import React from "react";
import Select from "react-select";

const SelectField = ({ options, field, form, className }) => (
  <Select
    className={className ? `custom-select ${className}` : "custom-select"}
    options={options}
    name={field.name}
    value={
      options ? options.find((option) => option.value === field.value) : ""
    }
    onChange={(option) => form.setFieldValue(field.name, option.value)}
    onBlur={field.onBlur}
  />
);

export default SelectField;
