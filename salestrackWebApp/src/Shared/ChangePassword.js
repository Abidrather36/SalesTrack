import React from "react";
import "./ChangePassword.css"

function ChangePassword() {
  return (
    <>
         <form className="cp-form">
            <label for="old-password">Old Password</label>
            <input type="password" id="old-password" name="old-password" required/>

            <label for="new-password">New Password</label>
            <input type="password" id="new-password" name="new-password" required/>

            <label for="confirm-password">Confirm Password</label>
            <input type="password" id="confirm-password" name="confirm-password" required/>
            
            <button type="submit">Submit</button>
         </form>
    </>
  );
}

export default ChangePassword;
