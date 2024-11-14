import React, { useState } from 'react';
import BreadcrumbComponent from '../shared/Breadcrumb';
import InputField from '../public/InputField';
import { useForm } from 'react-hook-form';
import Spin from '../public/Spin';
import { addLeadCategory } from '../../Services/CompanyService';
import myToaster from '../../utils/toaster';
import { useNavigate } from 'react-router-dom';

function LeadCategory() {
  const [loading, setLoading] = useState(false);
  const [leadCategory, setLeadCategory] = useState();
  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    setLoading(true); // Start loading spinner
    console.log(data);
    
    // Call API to add lead category
    const response = await addLeadCategory(data);
    
    if (response.isSuccess) {
      setLeadCategory(response.result);
      myToaster.showSuccessToast(response.message);
      navigate("/companyAdmin/leadCategoryList"); // Redirect on success
    } else {
      myToaster.showErrorToast(response.message);
    }

    setLoading(false); // Stop loading spinner after response is received
  };

  return (
    <>
      <BreadcrumbComponent
        labels={{ module: "companyAdmin", currentRoute: "Add-Lead-Category" }}
      />
      <div
        className="row justify-content-center align-items-center"
        style={{ height: "100vh", marginTop: "-150px" }}
      >
        <div className="col-lg-6 mb-4-lg-0" style={{ display: "auto", display: "center" }}>
          <div className="login-container">
            <h2 className="form-title">Add Lead Category</h2>
            <form
              className="login-form"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <div>
                <InputField
                  type="text"
                  name="leadCategoryName"
                  placeholder="Category Name"
                  {...register("leadCategoryName", { required: "Lead Category Name is required" })}
                />
                {errors.leadCategoryName && (
                  <span className="text-danger">{errors.leadCategoryName.message}</span>
                )}
              </div>

              <div>
                <InputField
                  type="text"
                  name="leadCategoryDescription"
                  placeholder="Description"
                  {...register("leadCategoryDescription", { required: "Lead Description is required" })}
                />
                {errors.leadCategoryDescription && (
                  <span className="text-danger">{errors.leadCategoryDescription.message}</span>
                )}
              </div>

              {loading ? (
                <button type="submit" className="login-button" disabled>
                  <Spin /> {/* Show spin icon when loading */}
                </button>
              ) : (
                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  disabled={loading} 
                >
                  Add Lead Category
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default LeadCategory;
