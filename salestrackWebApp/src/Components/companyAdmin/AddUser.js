import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import myToaster from "../../utils/toaster";
import { registerUser } from "../../Services/UserService";
import BreadcrumbComponent from "../shared/Breadcrumb";
import InputField from "../public/InputField";
import Spin from "../public/Spin";

const AddUser = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      data.userType = Number(data.userType);
      console.log("register user data",data)
      const response = await registerUser(data);
      console.log(response)
      if (response.isSuccess) {
        myToaster.showSuccessToast(response.message);
        setLoading(false);
        navigate("/companyAdmin/userList");
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (error) {
      myToaster.showErrorToast("Failed to register user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BreadcrumbComponent
        labels={{ module: "companyAdmin", currentRoute: "Register-New-User" }}
      />
      <div
        className="row"
        style={{ display: "flex", flexDirection: "row", height: "100vh" }}
      >
        <div className="col-lg-6 mb-4 mb-lg-0">
          <img
            src="https://i.ibb.co/k8TBpyy/illustration-sign-up-log-wireframe-idea-showcasing-various-ui-elements-1278800-10890.jpg"
            alt="Registration Illustration"
            className="img-fluid"
            style={{
              maxWidth: "100%",
              height: "65%",
              marginLeft: "10px",
              marginTop: "40px",
              borderRadius: "10px",
            }}
          />
        </div>

        <div className="col-lg-6 mb-4-lg-0">
          <div className="login-container">
            <h2 className="form-title">Register New User</h2>
            <form
              className="login-form"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <div>
                <InputField
                  type="text"
                  name="name"
                  placeholder="Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-danger">{errors.name.message}</span>
                )}
              </div>

              <div>
                <InputField
                  type="email"
                  name="email"
                  placeholder="Email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
                {errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </div>

              <div>
                <InputField
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  {...register("phoneNumber",{
                    required:"phoneNumber is required",
                    maxLength:10,
                    minLength:10,
                    message:"phoneNumber should be  10 digit "
                  })}
                />
                 {errors.phoneNumber && (
                  <span className="text-danger">{errors.phoneNumber.message}</span>
                )}
              </div>

              <div>
                <InputField
                  as="select"
                  name="userType"
                  {...register("userType", {
                    required: "User Type is required",
                  })}
                >
                  <option value="">Select User Type</option>
                  <option value="1">Sales Executive</option>
                  <option value="2">Sales Manager</option>
                </InputField>
                {errors.userType && (
                  <span className="text-danger">{errors.userType.message}</span>
                )}
              </div>

              <div>
               
                <InputField
                  as="select"
                  name="reportsTo"
                  {...register("reportsTo", {
                    required: "Reports To is required",
                  })}
                >
                  <option value="">Select Reports To</option>
                  <option value="15EDA46A-374E-42CE-8BA5-2A272354099D">
                    Ram
                  </option>
                </InputField>
                {errors.reportsTo && (
                  <span className="error-message">
                    {errors.reportsTo.message}
                  </span>
                )}
              </div>

              {loading ? (
                <button type="submit" className="login-button" disabled>
                  <Spin />
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                >
                  Register User
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;
