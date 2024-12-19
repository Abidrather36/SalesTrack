import "./ChangePassword.css";
import { Link } from "react-router-dom";
import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Spin from "../public/Spin";
import myToaster from "../../utils/toaster";
import storage from "../../utils/storages";
import { changePass, changePassword } from "../../Services/AuthService";
import "./ChangePassword.css";
import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function ChangePassword() {
  const [loading, setLoading] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const changeUserPassword = async (data) => {
    const user = storage.getItem("user"); 
    console.log(user);
    
    let role = JSON.parse(user); 
    console.log("role of user ", role.userRole);
    
    setLoading(true);
  
    try {
      const response = await changePass(data);
  
      if (response.isSuccess) {
        if (role.userRole === 1) {

          navigate("/admin");
          myToaster.showSuccessToast(response.message);

        } else if (role.userRole === 2) {
          navigate("/companyAdmin");
          myToaster.showSuccessToast(response.message);
        } else if (role.userRole === 3) {
          navigate("/salesExecutive");
          myToaster.showSuccessToast(response.message);

        } else if (role.userRole === 4) {
          navigate("/salesManager");
          myToaster.showSuccessToast(response.message);

        } else {
          navigate("/dashboard"); 
        }
      } else {
        myToaster.showErrorToast("Error: " + response.message);
      }
    } catch (err) {
      myToaster.showErrorToast(
        "Error changing password: " + (err.response?.data || err.message)
      );
    } finally {
      setLoading(false);
    }
  };
  
  

  const toggleOldPasswordVisibility = () => {
    setShowOldPassword((prev) => !prev);
  };
  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  return (
    <>
      <div
        className="container d-flex justify-content-center align-items-center"
        style={{
          minHeight: "10vh", // Adjust the height as needed
          paddingTop: "10px", // Adjust the padding as needed
        }}
      >
        <div className="col-md-6 bg-white p-5 rounded-3">
          <h3 className="pb-3 text-center">Change Password</h3>
          <div className="form-style">
            <form onSubmit={handleSubmit(changeUserPassword)}>
              {/* Old Password Input with Eye Icon */}
              <div className="form-group pb-3 position-relative">
                <input
                  type={showOldPassword ? "text" : "password"} // Toggle password visibility for old password
                  placeholder="Old Password"
                  className="form-control"
                  id="oldPassword"
                  {...register("oldPassword", {
                    required: "Old Password is required",
                  })}
                />
                <span
                  className="position-absolute"
                  style={{
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={toggleOldPasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={showOldPassword ? faEyeSlash : faEye}
                  />
                </span>
                {errors.oldPassword && (
                  <span style={{ color: "red" }} className="error-message">
                    {errors.oldPassword.message}
                  </span>
                )}
              </div>

              {/* New Password Input with Eye Icon */}
              <div className="form-group pb-3 position-relative">
                <input
                  type={showPassword ? "text" : "password"} // Toggle password visibility for new password
                  placeholder="New Password"
                  className="form-control"
                  id="newPassword"
                  {...register("newPassword", {
                    required: "New Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters long",
                    },
                  })}
                />
                <span
                  className="position-absolute"
                  style={{
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={togglePasswordVisibility}
                >
                  <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
                </span>
                {errors.newPassword && (
                  <span style={{ color: "red" }} className="error-message">
                    {errors.newPassword.message}
                  </span>
                )}
              </div>

              {/* Confirm Password Input with Eye Icon */}
              <div className="form-group pb-3 position-relative">
                <input
                  type={showConfirmPassword ? "text" : "password"} // Toggle password visibility for confirm password
                  placeholder="Confirm Password"
                  className="form-control"
                  id="confirmPassword"
                  {...register("confirmPassword", {
                    required: "Confirm Password is required",
                    validate: (value) =>
                      value === watch("newPassword") || "Passwords don't match",
                  })}
                />
                <span
                  className="position-absolute"
                  style={{
                    right: "10px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    cursor: "pointer",
                  }}
                  onClick={toggleConfirmPasswordVisibility}
                >
                  <FontAwesomeIcon
                    icon={showConfirmPassword ? faEyeSlash : faEye}
                  />
                </span>
                {errors.confirmPassword && (
                  <span style={{ color: "red" }} className="error-message">
                    {errors.confirmPassword.message}
                  </span>
                )}
              </div>

              {/* Submit Button */}
              <div className="pb-2">
                <button
                  type="submit"
                  className="btn btn-primary w-100 font-weight-bold mt-2 p-3"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  Change Password
                  {loading && (
                    <span
                      style={{
                        display: "flex",
                        alignItems: "center",
                        marginLeft: "8px",
                      }}
                    >
                      <Spin />
                    </span>
                  )}
                </button>
              </div>
            </form>

            <div className="pt-4 text-center">
              <Link to="/login">Back to Login</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChangePassword;
