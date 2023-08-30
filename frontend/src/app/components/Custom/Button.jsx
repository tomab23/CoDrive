import React from "react";

const Button = ({
  onClick,
  label,
  className,
  type,
  title,
  disabled,
  iconSvg,
}) => {
  return (
    <button
      type={type}
      title={title}
      disabled={disabled}
      className={` mb-4 mt-2 px-6 py-2 rounded-lg font-bold ${className}`}
      onClick={onClick}
    >
      {label} {iconSvg}
    </button>
  );
};

export default Button;
