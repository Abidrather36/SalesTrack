import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import InputField from "../public/InputField"
import Spin from "../public/Spin"
import myToaster from "../../utils/toaster";
import BreadcrumbComponent from "../shared/Breadcrumb"
import { addCompany as registerCompany } from "../../Services/CompanyService";
import storage from "../../utils/storages";
const AddCompany = () => {
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
    const token = storage.getItem("salesTrack");
    const bearerToken = `Bearer ${token.replace(/"/g, "")}`;
    const response=await registerCompany(data,bearerToken);
    console.log(data)
      if (response.isSuccess) {
        myToaster.showSuccessToast(response.message);
        setLoading(false);
        navigate("/Admin/companylist");
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (error) {
      myToaster.showErrorToast("Failed to register company.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <BreadcrumbComponent labels={{module:"Admin",currentRoute:"Register-New-Company"}}/>
    <div className="row" style={{ display: "flex", flexDirection: "row", height: "100vh" }}>
      <div className="col-lg-6 mb-4 mb-lg-0">
        <img
          src="https://i.ibb.co/9g2y0MH/professional-registration-page-form-submission-by-diverse-group-people-1334819-37395.jpg"
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
          <h2 className="form-title">Register New Company</h2>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div>
              <InputField
                type="text"
                name="name"
                placeholder="Admin Name"
                {...register("name", { required: "Name is required" })}
              />
              {errors.name && <span className="error-message">{errors.name.message}</span>}
            </div>

            <div>
              <InputField
                type="text"
                name="companyName"
                placeholder="Company Name"
                {...register("companyName", { required: "Company Name is required" })}
              />
              {errors.companyName && (
                <span className="error-message">{errors.companyName.message}</span>
              )}
            </div>

     
            <div>
              <InputField
                type="email"
                name="email"
                placeholder="Email"
                {...register("email", {
                  required: "Email is required",
                  validate: (value) =>
                    /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value) || "Invalid email address",
                })}
              />
              {errors.email && <span className="error-message">{errors.email.message}</span>}
            </div>

            <div>
              <InputField
                type="text"
                name="phoneNumber"
                placeholder="Phone Number"
                {...register("phoneNumber")}
              />
            </div>

            {loading ? (
              <button type="submit" className="login-button" disabled>
                <Spin />
              </button>
            ) : (
              <button type="submit" className="btn btn-primary" style={{width:"100%"}}>
                Register Company
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
    </>
  );
};

export default AddCompany;
