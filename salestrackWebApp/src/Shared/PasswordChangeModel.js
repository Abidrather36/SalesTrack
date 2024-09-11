import React from "react";
import { useState } from "react";
import InputField from "../Public/Components/InputField";
import { changePassword } from "../Services/AuthService";


const PasswordChangeModal = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const handleChangePassword = async (e) => {
    try{
        const obj={
            oldPassword,
            newPassword,
            confirmPassword
        }
        console.log(obj)
        const response=await changePassword(obj)
        console.log(response)
    }
    catch(err){
        console.log(err);
    }
  };
  return (
    <div className="password-modal">
      <div className="modal-content">
        <h4>Your password is temporary. Please change it to continue</h4>
        <form>
          <InputField
            type="password"
            placeholder="Old password"
            value={oldPassword}
            onChange={(e) => setOldPassword(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="New password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <InputField
            type="password"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={handleChangePassword}
            className="btn btn-primary"
            style={{
              backgroundColor: "var(--accent-color)",
              color: "var(--contrast-color)",
              fontFamily: "Montserrat, sans-serif",
              borderRadius: "50px",
              fontSize: "14px",
              margin: "0px 0px 0px 30px",
            }}
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default PasswordChangeModal;
