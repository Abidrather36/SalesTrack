import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import myToaster from "../../utils/toaster";
import BreadcrumbComponent from "../shared/Breadcrumb";
import InputField from "../public/InputField";
import Spin from "../public/Spin";
import storage from "../../utils/storages";
import { addprocessStep } from "../../Services/UserService";

const AdminProcessStep = () => {
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
      const response = await addprocessStep(data);
      console.log(data);
      if (response.isSuccess) {
        myToaster.showSuccessToast(response.message);
        setLoading(false);
        navigate("/companyAdmin/dashboard");     
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (error) {
      myToaster.showErrorToast("Failed to add process step.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BreadcrumbComponent labels={{ module: "Admin", currentRoute: "Add-Process-Step" }} />
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
          <div className="login-container" style={{height:"60%"}}>
            <h2 className="form-title">Add Process Step</h2>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div>
                <InputField
                  type="text"
                  name="stepName"
                  placeholder="Step Name"
                  {...register("stepName", { required: "Step Name is required" })}
                />
                {errors.stepName && <span className="error-message">{errors.stepName.message}</span>}
              </div>

              {loading ? (
                <button type="submit" className="login-button" disabled>
                  <Spin />
                </button>
              ) : (
                <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                  Add Process Step
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminProcessStep;

