


import "./login.css";
import { Link } from "react-router-dom";
import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Spin from "./Spin";
import InputField from "./InputField";
import myToaster from "../../utils/toaster";
import ChangePasswordModal from "../../Shared/PasswordChangeModel";
import storage from "../../utils/storages";
import { loginUser } from "../../Services/AuthService";
import "./LoginComponent.css";
import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";

function Login() {
  const [loading, setLoading] = useState(false);
  const [isPasswordTemporary, setIsPasswordTemporary] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");

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
      if (response.isSuccess) {
        storage.setItem("salesTrack", response.result.token);
        storage.setItem("user", response.result);
        if (response.result.isPasswordTemporary) {
          setIsPasswordTemporary(true);
          setShowChangePasswordModal(true);
          setOldPassword(data.password);
        } else {
          myToaster.showSuccessToast(`Welcome, ${response.result.fullName}!`);
          if (response.result.userRole === 1) {
            navigate("/admin/dashboard");
          } else if (response.result.userRole === 2) {
            navigate("/companyAdmin/dashboard");
          } else if (response.result.userRole === 3) {
            navigate("/salesExecutive");
          }
        }
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (err) {
      myToaster.showErrorToast(
        "Error during login: " + (err.response?.data || err.message)
      );
    } finally {
      setLoading(false);
    }
  };

  const handleCloseModal = () => {
    setShowChangePasswordModal(false);
  };

  return (
    <>
      <div className="container">
        <div className="row m-5 no-gutters shadow-lg">
          <div className="col-md-6 d-none d-md-block">
            <img
              src="https://i.ibb.co/ystg5fH/guardian-digital-realm-mans-vigilance-login-gate-1134661-21407.jpg"
              className="img-fluid rounded-3"
              alt="Background"
              style={{ minHeight: "100%" }}
            />
          </div>
          <div className="col-md-6 bg-white p-5 rounded-3">
            <div style={{ maxWidth: "60%", marginLeft: "90px" }}>
              <img src={logo} alt="Logo" />
            </div>

            <h3 className="pb-3">Login Form</h3>
            <div className="form-style">
              <form onSubmit={handleSubmit(logInUser)}>
                <div className="form-group pb-3">
                  <input
                    type="email"
                    placeholder="Email"
                    className="form-control"
                    id="exampleInputEmail1"
                    aria-describedby="emailHelp"
                    {...register("email", { required: "Email is required" })}
                  />
                  {errors.email && (
                    <span style={{ color: "red" }} className="error-message">
                      {errors.email.message}
                    </span>
                  )}
                </div>
                <div className="form-group pb-3">
                  <input
                    type="password"
                    placeholder="Password"
                    className="form-control"
                    id="exampleInputPassword1"
                    {...register("password", {
                      required: "Password is required",
                    })}
                  />
                  {errors.password && (
                    <span style={{ color: "red" }} className="error-message">
                      {errors.password.message}
                    </span>
                  )}
                </div>
                <div className="d-flex align-items-center justify-content-between">
                  <Link to="/forgetPassword">Forget Password?</Link>
                </div>
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
                    Log In
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
                Don't Have an Account? <Link to="/enquiry">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showChangePasswordModal && (
        <ChangePasswordModal
          open={showChangePasswordModal}
          handleClose={handleCloseModal}
          currentPassword={oldPassword}
        />
      )}
    </>
  );
}

export default Login;
