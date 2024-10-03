import React, { useState, useEffect } from "react";
import { addLeadProcessStep, getAllLeads } from "../../Services/LeadService";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import InputField from "../public/InputField"; 
import myToaster from "../../utils/toaster";
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../shared/Breadcrumb";
import { getAllProcessSteps } from "../../Services/UserService";

function AddLeadProcessStep() {
  const [leads, setLeads] = useState([]);
  const [processSteps, setProcessSteps] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate=useNavigate();

  const { register, handleSubmit, setValue, formState: { errors } } = useForm();

  useEffect(() => {
    fetchLeads();
    fetchProcessSteps();
  }, []);

  const fetchLeads = async () => {
    try {
      const response = await getAllLeads();
      setLeads(response.result);
    } catch (error) {
      toast.error("Failed to fetch leads.");
    }
  };

  const fetchProcessSteps = async () => {
    try {
      const response = await getAllProcessSteps();
      setProcessSteps(response.result);
    } catch (error) {
      toast.error("Failed to fetch process steps.");
    }
  };

  const onSubmit = async (data) => {
    
    setLoading(true);
    try {
      const  response = await addLeadProcessStep(data);
      if(response.isSuccess){
        myToaster.showSuccessToast(response.message);
        navigate()
      }
      else
      {
        myToaster.showErrorToast(response.message);
      }
   
    } catch (error) {
      toast.error("Failed to add process step.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
     <BreadcrumbComponent
        labels={{
          module: "salesExecutive",
          currentRoute: "Add-Lead-ProcessStep",
        }}
      />
    <div className="addForm">
      <div className="row justify-content-center" style={{ padding: "20px" }}>
        <div className="col-lg-8 mb-4-lg-0">
          <div
            className="form-container"
            style={{
              background: "#fff",
              padding: "30px",
              borderRadius: "10px",
              boxShadow: "0 0 15px rgba(0,0,0,0.1)",
            }}
          >
            <h2 className="form-title">Add Lead Process Step</h2>
            <form className="login-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
              <div className="row">
                <div className="col-lg-6 mb-3">
                  <InputField
                    as="select"
                    name="leadId"
                    {...register("leadId", { required: "Lead is required" })}
                  >
                    <option value="">Select Lead</option>
                    {leads.map((lead) => (
                      <option key={lead.id} value={lead.id}>
                        {lead.name}
                      </option>
                    ))}
                  </InputField>
                  {errors.leadId && (
                    <span className="text-danger">{errors.leadId.message}</span>
                  )}
                </div>

                <div className="col-lg-6 mb-3">
                  <InputField
                    as="select"
                    name="adminProcessStepId"
                    {...register("adminProcessStepId", { required: "Process Step is required" })}
                  >
                    <option value="">Select Process Step</option>
                    {processSteps.map((step) => (
                      <option key={step.id} value={step.id}>
                        {step.stepName}
                      </option>
                    ))}
                  </InputField>
                  {errors.adminProcessStepId && (
                    <span className="text-danger">
                      {errors.adminProcessStepId.message}
                    </span>
                  )}
                </div>

                <div className="col-lg-12 mb-3">
                  <InputField
                    type="text"
                    name="stepDescription"
                    {...register("stepDescription", { required: "Description is required" })}
                    placeholder="Step Description"
                  />
                  {errors.stepDescription && (
                    <span className="text-danger">
                      {errors.stepDescription.message}
                    </span>
                  )}
                </div>
              </div>

              <button type="submit" className="btn btn-primary mt-3" disabled={loading}>
                {loading ? "Adding..." : "Add Process Step"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
    </>
  );
}

export default AddLeadProcessStep;

