import React, { useState } from "react";
import InputField from "../InputField";
import Spin from "../Spin";
import { loginUser } from "../../../Services/AuthService";
import LoginRequestModel from "../../../Models/Common/Login";
import { toast, ToastContainer } from "react-toastify";
import { json, useNavigate } from "react-router-dom";
import storage from "../../../utils/storages";
import { StorageHelper } from "../../../utils/storages";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loginData, setLoginData] = useState(new LoginRequestModel());

  const navigate = useNavigate();

  const logInUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoginError(null);
    const loginData=new LoginRequestModel(email,password)
    try {
      const response = await loginUser(loginData);
      console.log(response);
      if (response.isSuccess) {
        console.log(response.result);
        storage.setItem("salesTrack", response.result.token);
        storage.setItem("userObj", response.result);

        toast.success(response.message);
        setTimeout(() => {
          navigate("/");
        });
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      setLoginError(
        "Error during login: " + (error.response?.data || error.message)
      );
    } finally {
      setLoading(false);
    }
  };
  const showPayload = () => {
    console.log("Payload:", loginData);
  };

  return (
    <>
      <ToastContainer />
      <div className="row" style={{marginTop:"100px"}}>
        <div className="col-lg-6 mb-4 mb-lg-0 loginImage">
          <img
            src="https://img.freepik.com/premium-photo/guardian-digital-realm-mans-vigilance-login-gate_1134661-21407.jpg?w=740"
            alt=""
            style={{ maxWidth: "100%", height: "70%", marginLeft: "100px" ,borderRadius:"30px"}}

          />
        </div>
        <div className="col-lg-6">
          <div className="login-container" style={{marginTop:"8px"}}>
            <div>
              <h2 className="form-title">Sign in to your account</h2>
              <form className="login-form" onSubmit={logInUser}>
                <InputField
                  type="email"
                  placeholder="your email address"
                  value={email}
                  pattern="[^@\s]+@[^@\s]+\.[^@\s]+"
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                  type="password"
                  placeholder="your password"
                  value={password}
                  pattern="/^[a-zA-Z0-9!@#\$%\^\&*_=+-]{8,12}$/g" 
                  onChange={(e) => setPassword(e.target.value)}
                />

                <a href="#" className="forgot-password-link">
                  Forgot password?
                </a>

                {loading ? (
                  <button
                    type="submit"
                    className="login-button"
                    disabled
                    onClick={showPayload}
                  >
                    <Spin />
                  </button>
                ) : (
                  <button type="submit" className="login-button">
                    Log In
                  </button>
                )}

                {loginError && <p className="login-error">{loginError}</p>}
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
      </div>
    </>
  );
};

export default Login;
