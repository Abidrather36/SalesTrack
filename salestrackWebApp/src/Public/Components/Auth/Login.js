import { React, useState } from "react";
import Spin from "../Spin";
import { loginUser } from "../../../Services/AuthService";
import ChangePasswordModal from "../../../Models/Common/ModelPopup";
import { useForm } from "react-hook-form";
import myToaster from "../../../utils/toaster";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [isPasswordTemporary, setIsPasswordTemporary] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const logInUser = async (data) => {
    setLoading(true);
    try {
      const response = await loginUser(data);
      console.log(response)
      if (response.isSuccess) {
        if (response.result.isPasswordTemporary) {
          setIsPasswordTemporary(true);
          setShowChangePasswordModal(true);
        } else {
          alert(`Welcome, ${response.response.fullName}!`);
        }
      } else {
        // alert("Login failed: " + response.message);
        myToaster.showErrorToast(response.message)
      }
    } catch (err) {
      console.log(err);
      alert("Error during login: " + (err.response?.data || err.message));
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

      <div className={`row ${showChangePasswordModal ? "modal-open" : ""}`}>
        {!showChangePasswordModal && (
          <>
            <div className="col-lg-6 mb-4 mb-lg-0 loginImage">
              <img
                src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=740&t=st=1725352130~exp=1725352730~hmac=e3288c591d26c27da35161da8ddb5b0edb0c7e9524e5b8838138c4f8eb4e058d"
                alt="Login Illustration"
              />
            </div>
            <div className="col-lg-6">
              <div className="login-container">
                <div>
                  <h2 className="form-title">Sign in to your account</h2>
                  <form
                    className="login-form"
                    onSubmit={handleSubmit(logInUser)}
                  >
                    <div>
                      <input
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

                    <input
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
