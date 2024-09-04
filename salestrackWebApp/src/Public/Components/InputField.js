import React, { useState } from "react";

const InputField = ({
  type,
  placeholder,
  value,
  onChange,
  icon,
  className,
}) => {
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
        value={value}
        onChange={onChange}
        className="input-field"
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
};

export default InputField;
