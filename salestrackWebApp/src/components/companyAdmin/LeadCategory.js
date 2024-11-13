import React, { useState } from 'react'
import BreadcrumbComponent from '../shared/Breadcrumb';
import InputField from '../public/InputField';
import { useForm } from 'react-hook-form';
import Spin from '../public/Spin';
import image from "../../utils/video-content-becomes-magnet-attract-customers_999616-3177.avif"
function LeadCategory() {
    const [loading, setLoading] = useState(false);
    const {
      register,
      handleSubmit,
      formState: { errors },
    } = useForm();
  return (
    <>
    <BreadcrumbComponent
      labels={{ module: "companyAdmin", currentRoute: "Add-Lead-Category" }}
    />
    <div
     className="row justify-content-center align-items-center"
     style={{ height: "100vh",marginTop:"-150px" }}
    >
   

      <div className="col-lg-6 mb-4-lg-0" style={{display:"auto",display:"centre"}}>
        <div className="login-container">
          <h2 className="form-title">Add Lead Category</h2>
          <form
            className="login-form"
            onSubmit={handleSubmit()}
            autoComplete="off"
          >
            <div>
              <InputField
                type="text"
                name="categoryName"
                placeholder="Category Name"
                {...register("categoryName", { required: "Category Name is required" })}
              />
              {errors.categoryName && (
                <span className="text-danger">{errors.categoryName.message}</span>
              )}
            </div>

            <div>
              <InputField
                type="text"
                name="description"
                placeholder="Description"
                {...register("description", { required: "Description is required" })}
              />
              {errors.description && (
                <span className="text-danger">{errors.description.message}</span>
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
                Add Lead Category
              </button>
            )}
          </form>
        </div>
      </div>
    </div>
  </>
  )
}

export default LeadCategory
