import React, { forwardRef } from "react";

const TextArea = forwardRef(
  ({ text = "", name, placeholder, helperText = '', ...props }, ref) => {
    return (
      <label>
        <p>{text}:</p>
        <textarea
          name={name}
          placeholder={placeholder}
          ref={ref}
          {...props}
        ></textarea>
        <span className="error-msg">{helperText}</span>
      </label>
    );
  }
);

export default TextArea;
