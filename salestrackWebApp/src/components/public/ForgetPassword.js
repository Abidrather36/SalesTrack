import React, { useState } from 'react';
import './login.css';
import logo from "../../utils/WhatsApp Image 2024-10-30 at 14.27.14_88ae8d3e.jpg";
import { forgetPassword,} from '../../Services/AuthService';
import myToaster from '../../utils/toaster';
import { useForm } from "react-hook-form";
import Spin from './Spin';
import { Link, useNavigate } from 'react-router-dom';
import img from "../../utils/forgot-password-concept-illustration_114360-1123.avif"

function ForgetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate =useNavigate(); 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    const response = await forgetPassword(data.email); 
    if(response.isSuccess){
      myToaster.showSuccessToast(response.result);
      navigate("/")
    } else {
      myToaster.showErrorToast(response.message);
    }
    setLoading(false);
  };

//   return (
//     <div className="container" >
      
//         <div className="col-md-6 bg-white p-5 rounded-3" >
//           <div style={{ width: "100%",}}>
//             <img src={logo} alt="Logo" />
//           </div>
//           <h3 className="pb-3">Forgot Password</h3>
//           <div className="form-style">
//             <form onSubmit={handleSubmit(onSubmit)}>
//               <div className="form-group pb-3">
//                 <input
//                   type="email"
//                   placeholder="Enter your email"
//                   className="form-control"
//                   id="email"
//                   {...register("email", { required: "Email is required" })}
//                 />
//                 {errors.email && <span className="text-danger">{errors.email.message}</span>}
//               </div>
//               <div className="pb-2">
//                 <button
//                   type="submit"
//                   className="btn btn-primary w-100 font-weight-bold mt-2 p-3"
//                   style={{
//                     display: "flex",
//                     alignItems: "center",
//                     justifyContent: "center",
//                   }}

//                 >
//                   Send Reset Link
//                   {loading && (
//                     <span
//                       style={{
//                         display: "flex",
//                         alignItems: "center",
//                         marginLeft: "8px",
//                       }}
//                     >
//                       <Spin />
//                     </span>
//                   )}
//                 </button>
//               </div>
//             </form>
//             <div className="pt-4 text-center">
//               Remembered your password? <Link to="/login">Login</Link>
//             </div>
//           </div>
//         </div>
//       </div>
//   );
// }

// export default ForgetPassword;

return (
  <div
    className="container d-flex align-items-center justify-content-center"
    style={{ minHeight: "60vh",}}
  >
    <div className="col-md-6 bg-white p-5 rounded-3">
      <div style={{ width: "100%" }}>
        <img src={logo} alt="Logo" />
      </div>
      <h3 className="pb-3 text-center">Forgot Password</h3>
      <div className="form-style">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group pb-3">
            <input
              type="email"
              placeholder="Enter your email"
              className="form-control"
              id="email"
              {...register("email", { required: "Email is required" })}
            />
            {errors.email && (
              <span className="text-danger">{errors.email.message}</span>
            )}
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
              Send Reset Link
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
          Remembered your password? <Link to="/login">Login</Link>
        </div>
      </div>
    </div>
  </div>
);
}
export default ForgetPassword;

