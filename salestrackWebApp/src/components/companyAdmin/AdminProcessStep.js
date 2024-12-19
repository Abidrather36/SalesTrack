import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import myToaster from "../../utils/toaster";
import BreadcrumbComponent from "../shared/Breadcrumb";
import InputField from "../public/InputField";
import Spin from "../public/Spin";
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
        navigate("/companyAdmin/getProcessSteps");     
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
    <BreadcrumbComponent labels={{ module: "companyAdmin", currentRoute: "Add-Process-Step" }} />
    <div
      className="row"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "40vh",
      }}
    >
      <div className="col-lg-6">
        <div
          className="login-container"
          style={{
            height: "60%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            borderRadius: "8px",
          }}
        >
          <h2 className="form-title" style={{ marginBottom: "20px" }}>Add Process Step</h2>
          <form className="login-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div style={{ marginBottom: "10px", width: "100%" }}>
              <InputField
                type="text"
                name="stepName"
                placeholder="Step Name"
                {...register("stepName", { required: "Step Name is required" })}
              />
              {errors.stepName && <span className="error-message">{errors.stepName.message}</span>}
            </div>
            {loading ? (
              <button type="submit" className="login-button" disabled style={{ width: "100%" }}>
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

