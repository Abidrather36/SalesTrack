import React, { useState, forwardRef } from "react";

const InputField = forwardRef(
  ({ type, as, placeholder, icon, className, required, children, ...rest }, ref) => {
    const [isPasswordShown, setIsPasswordShown] = useState(false);

    const handlePasswordToggle = () => {
      setIsPasswordShown((prevState) => !prevState);
    };

    return (
      <div className={`input-wrapper ${className || ""}`}>
        {as === "select" ? (
          <select ref={ref} className="input-field" required={required} {...rest}>
            {children} 
          </select>
        ) : (
          <input
            type={type === "password" ? (isPasswordShown ? "text" : "password") : type}
            placeholder={placeholder}
            ref={ref}
            className="input-field"
            required={required}
            {...rest}
          />
        )}
        
        {icon && <i className="material-symbols-rounded">{icon}</i>}

        {type === "password" && as !== "select" && (
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
