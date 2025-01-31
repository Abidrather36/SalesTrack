import React, { useState } from 'react';
import Spin from '../public/Spin';
import { useForm } from "react-hook-form";
import InputField from '../public/InputField';
import BreadcrumbComponent from '../shared/Breadcrumb';
import { addProject } from '../../Services/CompanyService';
import myToaster from '../../utils/toaster';
import { useNavigate } from 'react-router-dom';

function Projects() {
  const [projectName, setProjectName] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [userId, setUserId] = useState('');
  const [loading,setLoading]=useState(false)
  const navigate=useNavigate();
  let user=JSON.parse(localStorage.getItem("user"))
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();
  const onSubmit = async (data) => {
    setLoading(true);
    
    const projectRequestModel = {
      projectName: data.projectName || null,
      startDate: data.startDate ? new Date(data.startDate).toISOString() : null,
      endDate: data.endDate ? new Date(data.endDate).toISOString() : null,
    };

    try {
      const response = await addProject(projectRequestModel);
      console.log(response);
      if(response.isSuccess){
        myToaster.showSuccessToast(response.message)
        navigate("/companyAdmin/projectList")
      }
      else{
        myToaster.showErrorToast(response.message)
      }
    } catch (error) {
      console.error("Error adding project:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
        <>
          <BreadcrumbComponent
            labels={{ module: "salesExecutive", currentRoute: "Add-Project" }}
          />
          <div
            className="row justify-content-center align-items-center"
            style={{ height: "100vh", marginTop:"-80px" }}
          >
            <div className="col-lg-6 mb-4-lg-0" style={{ display: "auto", display: "center" }}>
              <div className="login-container">
                <h2 className="form-title">Add New Project</h2>
                <form
                  className="login-form"
                  onSubmit={handleSubmit(onSubmit)}
                  autoComplete="off"
                >
                  {/* Optional Project Name Field */}
                  <div>
                    <InputField
                      type="text"
                      name="projectName"
                      placeholder="Project Name"
                      {...register("projectName",{required:"true"})}
                    />
                  </div>
      
                  {/* Optional Start Date Field */}
                  <div>
                    <InputField
                      type="date"
                      name="startDate"
                      placeholder="Start Date (Optional)"
                      {...register("startDate")}
                    />
                  </div>
      
                  {/* Optional End Date Field */}
                  <div>
                    <InputField
                      type="date"
                      name="endDate"
                      placeholder="End Date (Optional)"
                      {...register("endDate")}
                    />
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
                      Add
                    </button>
                  )}
                </form>
              </div>
            </div>
          </div>
        </>
      );
      
}

export default Projects;

