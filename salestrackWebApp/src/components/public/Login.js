import "./login.css";
import { Link } from "react-router-dom";
import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Spin from "./Spin";
import myToaster from "../../utils/toaster";
import ChangePasswordModal from "../../Shared/PasswordChangeModel";
import storage from "../../utils/storages";
import { loginUser } from "../../Services/AuthService";
import "./LoginComponent.css";
import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function Login() {
  const [loading, setLoading] = useState(false);
  const [isPasswordTemporary, setIsPasswordTemporary] = useState(false);
  const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false); // New state for password visibility

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
          } else if (response.result.userRole === 4) {
            navigate("/salesManager");
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

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
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

            <h3
              className="pb-3"
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
            >
              Login Form
            </h3>

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
                <div className="form-group pb-3 position-relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    className="form-control"
                    id="exampleInputPassword1"
                    {...register("password", {
                      required: "Password is required",
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

// import "./login.css";
// import { Link } from "react-router-dom";
// import { React, useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import Spin from "./Spin";
// import myToaster from "../../utils/toaster";
// import ChangePasswordModal from "../../Shared/PasswordChangeModel";
// import storage from "../../utils/storages";
// import { loginUser } from "../../Services/AuthService";
// import { jwtDecode } from "jwt-decode";
// import "./LoginComponent.css";
// import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

// function Login() {
//   const [loading, setLoading] = useState(false);
//   const [isPasswordTemporary, setIsPasswordTemporary] = useState(false);
//   const [showChangePasswordModal, setShowChangePasswordModal] = useState(false);
//   const [oldPassword, setOldPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // Helper function to check token expiration
//   const validateSession = (token) => {
//     try {
//       const decoded = jwtDecode(token);
//       const currentTime = Date.now() / 1000; // Current time in seconds
//       return decoded.exp < currentTime;
//     } catch (err) {
//       return true; // Treat invalid token as expired
//     }
//   };

//   // Automatically log out user when token expires
//   const startSessionTimer = (expireTime) => {
//     const expirationTime = new Date(expireTime).getTime() - Date.now();
//     setTimeout(() => {
//       myToaster.showErrorToast("Session expired. Please log in again.");
//       storage.removeItem("salesTrack");
//       storage.removeItem("user");
//       window.location.href = "/login"; // Redirect to login page
//     }, expirationTime);
//   };

//   const logInUser = async (data) => {
//     setLoading(true);
//     try {
//       const response = await loginUser(data);
//       if (response.isSuccess) {
//         const { token, expireTime } = response.result;

//         // Save user data and token in storage
//         storage.setItem("salesTrack", token);
//         storage.setItem("user", response.result);

//         // Start session timer
//         startSessionTimer(expireTime);

//         if (response.result.isPasswordTemporary) {
//           setIsPasswordTemporary(true);
//           setShowChangePasswordModal(true);
//           setOldPassword(data.password);
//         } else {
//           myToaster.showSuccessToast(`Welcome, ${response.result.fullName}!`);

//           // Navigate based on user role
//           const roleRoutes = {
//             1: "/admin/dashboard",
//             2: "/companyAdmin/dashboard",
//             3: "/salesExecutive",
//             4: "/salesManager",
//           };
//           navigate(roleRoutes[response.result.userRole] || "/");
//         }
//       } else {
//         myToaster.showErrorToast(response.message);
//       }
//     } catch (err) {
//       myToaster.showErrorToast(
//         "Error during login: " + (err.response?.data || err.message)
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCloseModal = () => {
//     setShowChangePasswordModal(false);
//   };

//   const togglePasswordVisibility = () => {
//     setShowPassword((prev) => !prev);
//   };

//   // Validate session on component load
//   useEffect(() => {
//     const token = storage.getItem("salesTrack");
//     if (token && validateSession(token)) {
//       storage.removeItem("salesTrack");
//       storage.removeItem("user");
//       myToaster.showErrorToast("Session expired. Please log in again.");
//       window.location.href = "/login"; // Redirect to login page
//     }
//   }, []);

//   return (
//     <>
//       <div className="container">
//         <div className="row m-5 no-gutters shadow-lg">
//           <div className="col-md-6 d-none d-md-block">
//             <img
//               src="https://i.ibb.co/ystg5fH/guardian-digital-realm-mans-vigilance-login-gate-1134661-21407.jpg"
//               className="img-fluid rounded-3"
//               alt="Background"
//               style={{ minHeight: "100%" }}
//             />
//           </div>
//           <div className="col-md-6 bg-white p-5 rounded-3">
//             <div style={{ maxWidth: "60%", marginLeft: "90px" }}>
//               <img src={logo} alt="Logo" />
//             </div>

//             <h3 className="pb-3">Login Form</h3>
//             <div className="form-style">
//               <form onSubmit={handleSubmit(logInUser)}>
//                 <div className="form-group pb-3">
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     className="form-control"
//                     {...register("email", { required: "Email is required" })}
//                   />
//                   {errors.email && (
//                     <span style={{ color: "red" }} className="error-message">
//                       {errors.email.message}
//                     </span>
//                   )}
//                 </div>
//                 <div className="form-group pb-3 position-relative">
//                   <input
//                     type={showPassword ? "text" : "password"}
//                     placeholder="Password"
//                     className="form-control"
//                     {...register("password", { required: "Password is required" })}
//                   />
//                   <span
//                     className="position-absolute"
//                     style={{ right: "10px", top: "50%", transform: "translateY(-50%)", cursor: 'pointer' }}
//                     onClick={togglePasswordVisibility}
//                   >
//                     <FontAwesomeIcon icon={showPassword ? faEyeSlash : faEye} />
//                   </span>
//                   {errors.password && (
//                     <span style={{ color: "red" }} className="error-message">
//                       {errors.password.message}
//                     </span>
//                   )}
//                 </div>
//                 <div className="d-flex align-items-center justify-content-between">
//                   <Link to="/forgetPassword">Forget Password?</Link>
//                 </div>
//                 <div className="pb-2">
//                   <button
//                     type="submit"
//                     className="btn btn-primary w-100 font-weight-bold mt-2 p-3"
//                     disabled={loading}
//                   >
//                     Log In
//                     {loading && <Spin />}
//                   </button>
//                 </div>
//               </form>

//               <div className="pt-4 text-center">
//                 Don't Have an Account? <Link to="/enquiry">Sign Up</Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//       {showChangePasswordModal && (
//         <ChangePasswordModal
//           open={showChangePasswordModal}
//           handleClose={handleCloseModal}
//           currentPassword={oldPassword}
//         />
//       )}
//     </>
//   );
// }

// export default Login;
