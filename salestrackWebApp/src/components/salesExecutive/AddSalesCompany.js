import React, { useState } from "react";
import BreadcrumbComponent from "../shared/Breadcrumb";
import InputField from "../public/InputField";
import { useForm } from "react-hook-form";
import Spin from "../public/Spin";
import { addCompany } from "../../Services/CompanyService"; // Replace with your API call
import myToaster from "../../utils/toaster";
import { useNavigate } from "react-router-dom";
import companyImage from "../../utils/55991.jpg"; // Replace with an appropriate image path

function AddSalesCompany() {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await addCompany(data); 

      if (response.isSuccess) {
        myToaster.showSuccessToast(response.message);
        navigate("/"); 
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (error) {
      myToaster.showErrorToast("Failed to add company. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BreadcrumbComponent
        labels={{ module: "salesExecutive", currentRoute: "Add-Company" }}
      />
      <div
        className="wrapper"
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          flexWrap: "wrap",
          width: "100%",
          padding: "50px",
          marginTop: "-20px",
        }}
      >
        {/* Image Section */}
        <div style={{ flex: 1, marginTop: "50px" }}>
          <img
            src={companyImage}
            style={{
              width: "100%",
              borderRadius: "10px",
              marginRight: "50px",
            }}
            alt="Add Company"
          />
        </div>

        {/* Form Section */}
        <div style={{ flex: 1, padding: "20px", marginTop: "-5px" }}>
          <div className="col-lg-8 mb-4-lg-0">
            <div
              className="login-container"
              style={{
                background: "#fff",
                padding: "35px",
                borderRadius: "10px",
                boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                width: "130%",
                height: "auto",
              }}
            >
              <h2 className="form-title">Add Company</h2>
              <form
                className="login-form"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
              >
                {/* Company Name Field */}
                <div className="row mb-3">
                  <div className="col-lg-4 d-flex align-items-center">
                    <label
                      htmlFor="companyName"
                      className="form-label"
                      style={{ marginRight: "10px", whiteSpace: "nowrap",fontSize:"16px" ,fontFamily:"sans-serif",fontWeight:"bold"}}
                    >
                      Company Name:
                    </label>
                  </div>
                  <div className="col-lg-8">
                    <InputField
                      type="text"
                      name="companyName"
                      id="companyName"
                      placeholder="Enter Company Name"
                      {...register("companyName", {
                        required: "Company Name is required",
                      })}
                    />
                    {errors.companyName && (
                      <span className="error-message">
                        {errors.companyName.message}
                      </span>
                    )}
                  </div>
                </div>

                {/* Company Description Field */}
                <div className="row mb-3">
                  <div className="col-lg-4 d-flex align-items-center">
                    <label
                      htmlFor="companyDescription"
                      className="form-label"
                      style={{ marginRight: "10px",fontSize:"16px", whiteSpace: "nowrap",fontFamily:"sans-serif",fontWeight:"bolder" }}
                    >
                      Description:
                    </label>
                  </div>
                  <div className="col-lg-8">
                    <InputField
                      type="text"
                      name="companyDescription"
                      id="companyDescription"
                      placeholder="Enter Description"
                      {...register("companyDescription", {
                        required: "Description is required",
                      })}
                    />
                    {errors.companyDescription && (
                      <span className="error-message">
                        {errors.companyDescription.message}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  disabled={loading}
                >
                  {loading ? <Spin /> : "Add Company"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AddSalesCompany;
