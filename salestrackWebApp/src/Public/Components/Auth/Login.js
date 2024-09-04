import React, { useState } from "react";
import InputField from "../InputField";
import Spin from "../Spin";
import { loginUser } from "../../../Services/AuthService";
import LoginRequestModel from "../../../Models/Common/Login";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(null);
  const [loginData, setLoginData] = useState(new LoginRequestModel());

  const logInUser = async (event) => {
    event.preventDefault();
    setLoading(true);
    setLoginError(null);
    setLoginData({
      email: email,
      password: password,
    });

    try {
      const response = await loginUser(loginData);
      const data = response.data;
      if (data.isSuccess) {
        console.log(data.result);
        alert(`Welcome, ${data.result.fullName}!`);
      } else {
        setLoginError(data.message || "Login failed");
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
    <div className="row">
      <div className="col-lg-6 mb-4 mb-lg-0 loginImage">
        <img
          src="https://img.freepik.com/free-vector/computer-login-concept-illustration_114360-7962.jpg?w=740&t=st=1725352130~exp=1725352730~hmac=e3288c591d26c27da35161da8ddb5b0edb0c7e9524e5b8838138c4f8eb4e058d"
          alt=""
          style={{ height: "80%", marginLeft: "100px" }}
        />
      </div>
      <div className="col-lg-6">
        <div className="login-container">
          <div>
            <h2 className="form-title">Sign in to your account</h2>
            <form className="login-form" onSubmit={logInUser}>
              <InputField
                type="email"
                placeholder="your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <InputField
                type="password"
                placeholder="your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <a href="#" className="forgot-password-link">
                Forgot password?
              </a>

              {loading ? (
                <button type="submit" className="login-button" disabled onClick={showPayload}>
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
  );
};

export default Login;
