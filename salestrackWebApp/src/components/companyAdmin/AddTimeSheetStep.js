import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import myToaster from "../../utils/toaster";
import BreadcrumbComponent from "../shared/Breadcrumb";
import InputField from "../public/InputField";
import Spin from "../public/Spin";
import { addTimeSheet } from "../../Services/LeadService";
import { addCompanyTimesheet } from "../../Services/CompanyService";

const AddTimeSheetStep = () => {
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
      const response = await addCompanyTimesheet(data);
      console.log(data);
      if (response.isSuccess) {
        myToaster.showSuccessToast(response.message);
        setLoading(false);
        navigate("/companyAdmin/companyTimeSheetStepList");     
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (error) {
      myToaster.showErrorToast("Failed to add TimeSheet step.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BreadcrumbComponent labels={{ module: "companyAdmin", currentRoute: "Add-TimeSheet-Step" }} />
      <div className="row" style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "50vh" }}>

        <div className="col-lg-6 mb-4-lg-0">
          <div className="login-container" style={{ width: "100%", maxWidth: "500px", margin: "0 auto" }}>
            <h2 className="form-title">Add TimeSheet Step</h2>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div>
                <InputField
                  type="text"
                  name="name"
                  placeholder="Enter Time Sheet Step"
                  {...register("name", { required: "Step Name is required" })}
                />
                {errors.name && <span className="error-message">{errors.name.message}</span>}
              </div>

              {loading ? (
                <button type="submit" className="login-button" disabled>
                  <Spin />
                </button>
              ) : (
                <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                  Add TimeSheet Step
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddTimeSheetStep;
