import React, { forwardRef } from "react";

const Input = forwardRef(
  ({ text = "", type = "text", name, placeholder, helperText = '', ...props }, ref) => {
    return (
      <label>
        <p>{text}:</p>
        <input
          type={type}
          name={name}
          placeholder={placeholder}
          ref={ref}
          {...props}
        />
        <span className="error-msg">{helperText}</span>
      </label>
    );
  }
);

export default Input;
