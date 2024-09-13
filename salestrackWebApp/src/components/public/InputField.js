import React, { useState, forwardRef } from "react";

const InputField = forwardRef(
  ({ type, placeholder, icon, className, ...rest }, ref) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const handlePasswordToggle = () => {
      setIsPasswordShown((prevState) => !prevState);
    };

    return (
      <div className={`input-wrapper ${className}`}>
        <input
          type={
            type === "password" ? (isPasswordShown ? "text" : "password") : type
          }
          placeholder={placeholder}
          ref={ref} // This ensures react-hook-form can register the input
          className="input-field"
          {...rest} // This spreads additional props like onChange, value, etc.
          required
        />
        {icon && <i className="material-symbols-rounded">{icon}</i>}
        {type === "password" && (
          <i
            onClick={handlePasswordToggle}
            className="material-symbols-rounded eye-icon"
            style={{ cursor: "pointer" }}
          >
            {isPasswordShown ? "visibility" : "visibility_off"}
          </i>
        )}
      </div>
    );
  }
);

export default InputField;
