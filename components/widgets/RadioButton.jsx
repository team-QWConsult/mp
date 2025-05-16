import React from "react";

const RadioButton = ({
  value,
  selectedValue,
  children,
  setFieldValue,
  name,
}) => {
  return (
    <button
      className={`
                    mt-1
                    block
                    w-full
                   
                    border-transparent
                    capitalize
                    text-center
                    py-2
                    ${selectedValue === value ? "bg-gold" : "bg-gray-200"}
                  `}
      onClick={(e) => {
        e.preventDefault();
        setFieldValue(name, value);
      }}
    >
      {children}
    </button>
  );
};

export default RadioButton;
