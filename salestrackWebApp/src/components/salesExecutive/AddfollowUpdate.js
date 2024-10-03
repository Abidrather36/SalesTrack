

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import myToaster from "../../utils/toaster";
import BreadcrumbComponent from "../shared/Breadcrumb";
import InputField from "../public/InputField";
import Spin from "../public/Spin";
import { addFollowUpdate } from "../../Services/LeadService";

const AddFollowUpdate = ({ leadData }) => {
  console.log(leadData.id);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const followUpPayload = {
      date: data.date, 
      time: data.time, 
      leadId: leadData?.leadId, 
    };
  
    
    if (!followUpPayload.leadId) {
      myToaster.showErrorToast("Lead ID is missing.");
      return;
    }
  
    setLoading(true);
    try {
      const response = await addFollowUpdate(followUpPayload);
      console.log("API Response: ", response);
  
      if (response.isSuccess) {
        myToaster.showSuccessToast(response.message);
        setLoading(false);
        navigate("/admin/dashboard");
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (error) {
      console.error("Error Details: ", error.response || error.message); 
      myToaster.showErrorToast("Failed to add follow-up.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <>
      <BreadcrumbComponent
        labels={{ module: "Admin", currentRoute: "Add-Follow-Update" }}
      />
      <div
        className="row"
        style={{ display: "flex", flexDirection: "row", height: "100vh" }}
      >
        <div className="col-lg-6 mb-4 mb-lg-0">
          <img
            src="https://i.ibb.co/9g2y0MH/professional-registration-page-form-submission-by-diverse-group-people-1334819-37395.jpg"
            alt="Form Illustration"
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
          <div className="login-container" style={{ height: "60%" }}>
            <h2 className="form-title">Add Follow Update</h2>
            <form
              className="login-form"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <div>
                <InputField
                  type="date"
                  name="date"
                  placeholder="Follow-up Date"
                  {...register("date", { required: "Date is required" })}
                />
                {errors.date && (
                  <span className="error-message">{errors.date.message}</span>
                )}
              </div>

              <div>
                <InputField
                  type="time"
                  name="time"
                  placeholder="Follow-up Time"
                  {...register("time", { required: "Time is required" })}
                />
                {errors.time && (
                  <span className="error-message">{errors.time.message}</span>
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
                  Add Follow Update
                </button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFollowUpdate;
  
// import React, { useState } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import myToaster from "../../utils/toaster";
// import BreadcrumbComponent from "../shared/Breadcrumb";
// import InputField from "../public/InputField";
// import Spin from "../public/Spin";
// import { addFollowUpdate } from "../../Services/LeadService";

// const AddFollowUpdate = ({ leadData }) => {
//   console.log("Lead Data: ", leadData?.id); 
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = async (data) => {
//     // Prepare the payload
//     const followUpPayload = {
//       date: data.date, // Date part
//       time: `${data.date}T${data.time}:00`, // Time part as ISO string
//       leadId: leadData?.leadId || '', // Use leadId from props or fallback to empty
//     };

//     console.log("Follow-up Payload: ", followUpPayload); // Log payload before sending

//     setLoading(true);
//     try {
//       const response = await addFollowUpdate(followUpPayload);
//       console.log("API Response: ", response); // Log API response

//       if (response.isSuccess) {
//         myToaster.showSuccessToast(response.message);
//         setLoading(false);
//         navigate("/admin/dashboard");
//       } else {
//         myToaster.showErrorToast(response.message);
//       }
//     } catch (error) {
//       console.error("Error Details: ", error.response || error.message); // Log full error response
//       myToaster.showErrorToast("Failed to add follow-up.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <>
//       <BreadcrumbComponent
//         labels={{ module: "Admin", currentRoute: "Add-Follow-Update" }}
//       />
//       <div
//         className="row"
//         style={{ display: "flex", flexDirection: "row", height: "100vh" }}
//       >
//         <div className="col-lg-6 mb-4 mb-lg-0">
//           <img
//             src="https://i.ibb.co/9g2y0MH/professional-registration-page-form-submission-by-diverse-group-people-1334819-37395.jpg"
//             alt="Form Illustration"
//             className="img-fluid"
//             style={{
//               maxWidth: "100%",
//               height: "65%",
//               marginLeft: "10px",
//               marginTop: "40px",
//               borderRadius: "10px",
//             }}
//           />
//         </div>

//         <div className="col-lg-6 mb-4-lg-0">
//           <div className="login-container" style={{ height: "60%" }}>
//             <h2 className="form-title">Add Follow Update</h2>
//             <form
//               className="login-form"
//               onSubmit={handleSubmit(onSubmit)}
//               autoComplete="off"
//             >
//               <div>
//                 <InputField
//                   type="date"
//                   name="date"
//                   placeholder="Follow-up Date"
//                   {...register("date", { required: "Date is required" })}
//                 />
//                 {errors.date && (
//                   <span className="error-message">{errors.date.message}</span>
//                 )}
//               </div>

//               <div>
//                 <InputField
//                   type="time"
//                   name="time"
//                   placeholder="Follow-up Time"
//                   {...register("time", { required: "Time is required" })}
//                 />
//                 {errors.time && (
//                   <span className="error-message">{errors.time.message}</span>
//                 )}
//               </div>
//               {loading ? (
//                 <button type="submit" className="login-button" disabled>
//                   <Spin />
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   style={{ width: "100%" }}
//                 >
//                   Add Follow Update
//                 </button>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddFollowUpdate;
