import React from "react";

const Input = ({ id, type, name, placeholder, value, onChange, className,checked, error, min, max, maxLength, defaultValue}) => {
  const hasErorr = error && error.length > 0;

  return (

      <div className="relative w-full">
    <input
      id={id}
      min={min}
      max={max}
      maxLength={maxLength}
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      checked={checked}
      className={` ${className} &{hasError ? 'border-red-500' : 'border-gray-300'}`}
    />
   {hasErorr && ( <p className="text-red-500 text-xs absolute mb-2 ml-5"> {error}</p> )} 
    </div>
  );
};

export default Input;
