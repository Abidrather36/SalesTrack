 import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import myToaster from "../../utils/toaster";
import { addLead, addLead as registerLead, updateLead } from "../../Services/LeadService";
import BreadcrumbComponent from "../shared/Breadcrumb";
import InputField from "../public/InputField";
import Spin from "../public/Spin";
import { useEffect } from "react";
import { leadSources as getLeadSources } from "../../Services/LeadSource";
const AddLead = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [leadSources, setLeadSources] = useState([]); 
  const [showEditForm,setShowEditForm]=useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const editLead=async (leadData)=>{
    setShowEditForm(true);  
          
  }

  const fetchLeadSources = async () => {
    try {
      console.log("inside try block")
      const res = await getLeadSources();
      setLeadSources(res.result); 
      console.log(leadSources)
    } catch (error) {
      myToaster.showErrorToast("Failed to load lead sources.");
    }
  }

  useEffect(()=>{
    fetchLeadSources()
  },[])


  const onSubmit = async (data) => {
    console.log(data)
    setLoading(true);
    try {
      const response = await addLead(data);
      console.log(data);
      if (response.isSuccess) {
        myToaster.showSuccessToast(response.message);
        setLoading(false);
        navigate("/salesExecutive/leadList");
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (error) {
      myToaster.showErrorToast("Failed to register lead.");
    } finally {
      setLoading(false);
    }
  };

  
  return (
    <>

    <div className="addForm">
      <BreadcrumbComponent
        labels={{ module: "salesExecutive", currentRoute: "Register-New-Lead" }}
      />
      <div className="row justify-content-center" style={{ padding: "20px" }}>
        <div className="col-lg-8 mb-4-lg-0">
          <div
            className="login-container"
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0 0 15px rgba(0,0,0,0.1)",
            }}
          >
            <h2 className="form-title">Register New Lead</h2>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <InputField
                    type="text"
                    name="name"
                    placeholder="Lead Name"
                    {...register("name", { required: "Lead Name is required" })}
                  />
                  {errors.name && <span className="error-message">{errors.name.message}</span>}
                </div>

                <div className="col-lg-6 mb-3">
                  <InputField
                    type="email"
                    name="email"
                    placeholder="Email"
                    {...register("email", {
                      required: "Email is required",
                      validate: (value) =>
                        /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value) ||
                        "Invalid email address",
                    })}
                  />
                  {errors.email && <span className="error-message">{errors.email.message}</span>}
                </div>

                <div className="col-lg-6 mb-3">
                  <InputField
                    type="text"
                    name="phoneNumber"
                    placeholder="Phone Number"
                    {...register("phoneNumber")}
                  />
                </div>

                <div className="col-lg-6 mb-3">
                  <InputField
                    as="select"
                    name="leadSourceId"
                    {...register("leadSourceId", { required: "Lead Source is required" })}
                  >
                    <option value="">Select Lead Source</option>
                    {leadSources.map((source) => (
                      <option key={source.id} value={source.id}>
                        {source.leadSourceName}
                      </option>
                    ))}
                  </InputField>
                  {errors.leadSource && <span className="text-danger">{errors.leadSource.message}</span>}
                </div>

                <div className="col-lg-6 mb-3">
                  <InputField
                    type="text"
                    name="comment"
                    placeholder="Comment"
                    {...register("comment")}
                  />
                </div>

                <div className="col-lg-6 mb-3">
                  <InputField
                    as="select"
                    name="assignTo"
                    {...register("assignTo", { required: "Assign To is required" })}
                  >
                    <option value="">Assign To</option>
                    <option value="7EC27075-3A19-4BB8-A5FF-A20EF959155D">Ram</option>
                  </InputField>
                  {errors.assignTo && <span className="error-message">{errors.assignTo.message}</span>}
                </div>
              </div>

              {loading ? (
                <button type="submit" className="login-button" disabled>
                  <Spin />
                </button>
              ) : (
                <button type="submit" className="btn btn-primary" style={{ width: "100%" }}>
                  Register Lead
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  
</>

  );

}

export default AddLead;

