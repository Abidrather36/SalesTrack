import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Spin from "./Spin";
import InputField from "./InputField";
import myToaster from "../../utils/toaster";
import ChangePasswordModal from "../../Shared/PasswordChangeModel";
import storage from "../../utils/storages";
import { loginUser } from "../../Services/AuthService";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isPasswordTemporary, setIsPasswordTemporary] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const logInUser = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      console.log(response);
      if (response.isSuccess) {
        storage.setItem("salesTrack", response.result.token);
        storage.setItem("user", response.result);
        if (response.result.isPasswordTemporary) {
          setIsPasswordTemporary(true);
          setShowChangePasswordModal(true);
        } else {
          myToaster.showSuccessToast(`Welcome, ${response.result.fullName}!`);
          if (response.result.userRole === 1) {
            navigate("/admin/dashboard");
          }
          else if (response.result.userRole ===2){
            navigate("/companyAdmin/dashboard");
          }
          else  if (response.result.userRole ===3){
            navigate("/salesExecutive") 
          }

        }
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (err) {
      console.log(err);
      myToaster.showErrorToast("Error during login: " + (err.response?.data || err.message));
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowChangePasswordModal(false);
  };

  return (
    <>
      {showChangePasswordModal && <div className="modal-overlay"></div>}
      <myToaster />
      <div
        className={`row ${showChangePasswordModal ? "modal-open" : ""}`}
        style={{ display: "flex", flexDirection: "row", height: "100vh" }}
      >
        {!showChangePasswordModal && (
          <>
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img
                src="https://i.ibb.co/ystg5fH/guardian-digital-realm-mans-vigilance-login-gate-1134661-21407.jpg"
                alt="Login Illustration"
                className="img-fluid"
                style={{ maxWidth: "100%", height: "80%", marginLeft: "50px" }}
              />
            </div>
            <div className="col-lg-6 mb-4-lg-0">
              <div className="login-container">
                <h2 className="form-title">Sign in to your account</h2>
                <form className="login-form" onSubmit={handleSubmit(logInUser)}>
                  <div>
                    <InputField
                      type="email"
                      name="email"
                      autoComplete="off"
                      {...register("email", {
                        required: "Email is required",
                      })}
                      placeholder="Your email address"
                    />
                    {errors.email && (
                      <span className="error-message">
                        {errors.email.message}
                      </span>
                    )}
                  </div>

                  <InputField
                    type="password"
                    name="password"
                    autoComplete="off"
                    placeholder="Your password"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <div className="error-message">
                      {errors.password.message}
                    </div>
                  )}

                  <a href="#" className="forgot-password-link">
                    Forgot password?
                  </a>

                  {loading ? (
                    <button type="submit" className="login-button" disabled>
                      <Spin />
                    </button>
                  ) : (
                    <button type="submit" className="login-button">
                      Log In
                    </button>
                  )}
                </form>

                <p className="signup-prompt">
                  Don&apos;t have an account?{" "}
                  <a href="#" className="signup-link">
                    Sign up
                  </a>
                </p>
              </div>
            </div>
          </>
        )}

        <ChangePasswordModal
          open={showChangePasswordModal}
          handleClose={handleCloseModal}
        />
      </div>
    </>
  );
};

export default Login;
