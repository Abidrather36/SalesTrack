import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import myToaster from "../../utils/toaster";
import BreadcrumbComponent from "../shared/Breadcrumb";
import InputField from "../public/InputField";
import Spin from "../public/Spin";
import { addLeadSource, leadSources } from "../../Services/LeadSource";

const LeadSource = () => {
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
      const response = await addLeadSource(data);
      if (response.isSuccess) {
        myToaster.showSuccessToast(response.message);
        navigate("/salesExecutive/leadSourceList"); 
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (error) {
      myToaster.showErrorToast("Failed to add lead source. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BreadcrumbComponent
        labels={{
          module: "leadSource",
          currentRoute: "Register-New-LeadSource",
        }}
      />
      <div className="wrapper" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", width: "100%" }}>
        <div style={{ flex: 1, marginTop: "50px" }}>
          <img
            src="https://i.ibb.co/pnLd3VS/remote-business-management-concept-with-businessman-holding-tablet-showing-analytics-graphs-connecte.jpg" 
            style={{ width: "100%", height: "auto", borderRadius: "10px", marginRight: "100px" }}
            alt="Lead Source Registration"
          />
        </div>

        <div style={{ flex: 1, padding: "20px" }}>
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
              <h2 className="form-title">Register New Lead Source</h2>
              <form className="login-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <InputField
                      type="text"
                      name="leadSourceName"
                      style={{ padding: "0px 1.25rem 0 1.12rem"}}
                      placeholder="Lead Source Name"
                      {...register("leadSourceName", { required: "Lead Source Name is required" })}
                    />
                    {errors.leadSourceName && <span className="error-message">{errors.leadSourceName.message}</span>}
                  </div>

                  <div className="col-lg-12 mb-3">
                    <textarea
                      name="description"
                      rows={6}
                      style={{ padding: "0px 1.25rem 0 1.12rem", width: "100%", borderRadius: "5px", border: "1px solid #ccc" }}
                      placeholder="Description"
                      {...register("description", { required: "Description is required" })}
                    />
                    {errors.description && <span className="error-message">{errors.description.message}</span>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  disabled={loading}
                >
                  {loading ? <Spin /> : "Register Lead Source"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadSource;
