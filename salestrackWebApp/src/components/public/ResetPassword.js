import "./login.css";
import { Link } from "react-router-dom";
import { React, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Spin from "./Spin";
import myToaster from "../../utils/toaster";
import {resetPassword } from "../../Services/AuthService";
import "./LoginComponent.css";
import { useLocation } from "react-router-dom";

function ResetPassword() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location=useLocation()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const queryParams=new URLSearchParams(location.search)
  const code=queryParams.get("resetCode")  
  console.log(code)
  const onSubmit = async (data) => {
    setLoading(true);
    if(data.newPassword!==data.confirmPassword){
        myToaster.showErrorToast("Passwords do not match");
    }
    data.resetCode=code;
    const response= await resetPassword(data);
    if( response.isSuccess){
        myToaster.showSuccessToast(response.result);
        navigate("/login")
    }
    else{
        myToaster.error(response.result);
    }

   
  };

  return (
    <>
      <div className="container mx-auto 4xl" style={{ justifyContent: "center",}}>
        <div className="row m-5 no-gutters shadow-lg">
        
          <div className="col-md-6 bg-white p-5 rounded-3">
           

            <h3 className="pb-3">Reset Your Password</h3>
            <div className="form-style">
              <form onSubmit={handleSubmit(onSubmit)}>
              <div className="form-group pb-3">
                  <input
                    type="password"
                    placeholder="New Password"
                    className="form-control"
                    id="exampleInputPassword1"
                    {...register("newPassword", {
                      required: "Password is required",
                    })}
                  />
                  {errors.newPassword && (
                    <span style={{ color: "red" }} className="text-danger">
                      {errors.newPassword.message}
                    </span>
                  )}
                </div>
                <div className="form-group pb-3">
                  <input
                    type="password"
                    placeholder="Confirm Password"
                    className="form-control"
                    id="exampleInputPassword1"
                    {...register("confirmPassword", {
                      required: "confirmPassword is required",
                    })}
                  />
                  {errors.confirmPassword && (
                    <span style={{ color: "red" }} className="text-danger">
                      {errors.confirmPassword.message}
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
                  Reset
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
     
    </>
  );
}

export default ResetPassword;

