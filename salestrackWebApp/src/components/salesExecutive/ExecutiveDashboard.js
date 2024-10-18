// import React, { useState, useEffect } from "react";
// import Card from "../shared/Card";
// import { useForm, Controller } from "react-hook-form";
// import { FaUsers, FaBriefcase } from "react-icons/fa";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { TextField, Box } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { enGB } from 'date-fns/locale';
// import {
//   getAllLeads as fetchAllLeads,
//   todaysFollowUp,
// } from "../../Services/LeadService";
// import { leadSources } from "../../Services/LeadSource";
// import InputField from "../public/InputField";
// import Spin from "../public/Spin";
// import { Height } from "@mui/icons-material";
// import myToaster from "../../utils/toaster";

// export default function ExecutiveDashboard({ leadData }) {
//   const [leads, setLeads] = useState([]);
//   const [leadSources, setLeadSources] = useState([]);
//   const [salesManager, setSalesManager] = useState([]);
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     getAllLeads();
//     fetchAllLeadSources();
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     control,
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     const [month, day, year] = data.date.split("/");
//     const formattedDate = new Date(`${day}-${month}-${year}`).toISOString();
//     const leadData = {
//       leadId: data.leadId,
//       date: formattedDate,
//     };
//     console.log("Form Data:", leadData);
//     const response = todaysFollowUp(leadData);
//     if (response.isSuccess) {
//       console.log("--------", response.result);
//       myToaster.showSuccessToast(response.message);
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//   };

//   const getAllLeads = async () => {
//     try {
//       const response = await fetchAllLeads();
//       setLeads(response.result || []);
//     } catch (error) {
//       console.error("Error fetching leads:", error);
//     }
//   };

//   const fetchAllLeadSources = async () => {
//     try {
//       const response = await leadSources();
//       setLeadSources(response.result || []);
//     } catch (error) {
//       console.error("Error fetching leadSources:", error);
//     }
//   };

//   const myProps = [
//     {
//       title: "Total Leads",
//       number: leads.length,
//       icon: <FaUsers />,
//       link: "/salesExecutive/leadList",
//     },
//     {
//       title: "Total Lead Sources",
//       number: leadSources.length,
//       icon: <FaUsers />,
//     },
//     {
//       title: "Today's Follow UpDate",
//       number: salesManager.length,
//       icon: <FaBriefcase />,
//     },
//   ];

//   return (
//     <>
//       <Card props={myProps} />
//       <div
//         style={{ marginLeft: "30px" }}
//         className="d-flex justify-content-between align-items-start mb-3"
//       >
//         <div style={{ marginRight: "400px" }} className="col-lg-6 ml-3">
//           <form
//             className="login-form"
//             onSubmit={handleSubmit(onSubmit)}
//             autoComplete="off"
//           >
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 gap: "20px",
//                 alignItems: "center",
//               }}
//             >
//               <div style={{ marginBottom: "22px" }}>
//                 <label
//                   style={{ marginBottom: "20px" }}
//                   className="h6 font-semibold text-muted text-sm d-block mb-2"
//                 >
//                   Select Date
//                 </label>
//                 <LocalizationProvider
//                   dateAdapter={AdapterDateFns}
//                   locale={enGB}
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: 2,
//                       width: 200,
//                     }}
//                   >
//                     <Controller
//                       name="date"
//                       control={control}
//                       rules={{ required: "Date is required" }}
//                       render={({ field }) => (
//                         <DatePicker
//                           label="Select Date"
//                           inputFormat="dd/MM/yyyy" // Set the desired format
//                           renderInput={(params) => <TextField {...params} />}
//                           {...field}
//                         />
//                       )}
//                     />
//                   </Box>
//                 </LocalizationProvider>
//                 {errors.date && (
//                   <span className="error-message">{errors.date.message}</span>
//                 )}
//               </div>

//               <div>
//                 <label
//                   style={{ marginBottom: "20px" }}
//                   className="h6 font-semibold text-muted text-sm d-block mb-2"
//                 >
//                   Select Lead
//                 </label>
//                 <InputField
//                   as="select"
//                   style={{
//                     padding: "0px 1.25rem 0 1.12rem",
//                     maxWidth: "300px",
//                   }}
//                   {...register("leadId", { required: "Lead is required" })}
//                 >
//                   <option value="">Select Lead</option>
//                   {leads.map((lead) => (
//                     <option key={lead?.id} value={lead?.id}>
//                       {lead?.name || "Unnamed Lead"}
//                     </option>
//                   ))}
//                 </InputField>
//                 {errors.leadId && (
//                   <span className="error-message">{errors.leadId.message}</span>
//                 )}
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 style={{ width: "163px", marginLeft: "220px" }}
//                 disabled={loading}
//               >
//                 {loading ? <Spin /> : "Search"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }


// import React, { useState, useEffect } from "react";
// import Card from "../shared/Card";
// import { useForm, Controller } from "react-hook-form";
// import { FaUsers, FaBriefcase } from "react-icons/fa";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
// import { TextField, Box } from "@mui/material";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import { enGB } from 'date-fns/locale';
// import { getAllLeads as fetchAllLeads, todaysFollowUp } from "../../Services/LeadService";
// import { leadSources } from "../../Services/LeadSource";
// import InputField from "../public/InputField";
// import Spin from "../public/Spin";
// import myToaster from "../../utils/toaster";

// export default function ExecutiveDashboard({ leadData }) {
//   const [leads, setLeads] = useState([]);
//   const [leadSources, setLeadSources] = useState([]);
//   const [salesManager, setSalesManager] = useState([]);
//   const [loading, setLoading] = useState(false);

//   // Fetch data on mount
//   useEffect(() => {
//     getAllLeads();
//     fetchAllLeadSources();
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     control, // Already available from useForm
//     formState: { errors },
//   } = useForm();

//   const onSubmit = (data) => {
//     // Split date manually if you still want to keep the old format
//     const [day, month, year] = data.date.toLocaleDateString('en-GB').split("/");
//     const formattedDate = new Date(`${year}-${month}-${day}`).toISOString();

//     const leadData = {
//       leadId: data.leadId,
//       date: formattedDate,
//     };

//     console.log("Form Data:", leadData);

//     const response = todaysFollowUp(leadData);
//     if (response.isSuccess) {
//       myToaster.showSuccessToast(response.message);
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//   };

//   const getAllLeads = async () => {
//     try {
//       const response = await fetchAllLeads();
//       setLeads(response.result || []);
//     } catch (error) {
//       console.error("Error fetching leads:", error);
//     }
//   };

//   const fetchAllLeadSources = async () => {
//     try {
//       const response = await leadSources();
//       setLeadSources(response.result || []);
//     } catch (error) {
//       console.error("Error fetching leadSources:", error);
//     }
//   };

//   const myProps = [
//     {
//       title: "Total Leads",
//       number: leads.length,
//       icon: <FaUsers />,
//       link: "/salesExecutive/leadList",
//     },
//     {
//       title: "Total Lead Sources",
//       number: leadSources.length,
//       icon: <FaUsers />,
//     },
//     {
//       title: "Today's Follow Up",
//       number: salesManager.length,
//       icon: <FaBriefcase />,
//     },
//   ];

//   return (
//     <>
//       <Card props={myProps} />
//       <div
//         style={{ marginLeft: "30px" }}
//         className="d-flex justify-content-between align-items-start mb-3"
//       >
//         <div style={{ marginRight: "400px" }} className="col-lg-6 ml-3">
//           <form
//             className="login-form"
//             onSubmit={handleSubmit(onSubmit)}
//             autoComplete="off"
//           >
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 gap: "20px",
//                 alignItems: "center",
//               }}
//             >
//               {/* Date Picker Input */}
//               <div style={{ marginBottom: "22px" }}>
//                 <label
//                   style={{ marginBottom: "20px" }}
//                   className="h6 font-semibold text-muted text-sm d-block mb-2"
//                 >
//                   Select Date
//                 </label>
//                 <LocalizationProvider
//                   dateAdapter={AdapterDateFns}
//                   locale={enGB} // Setting locale for day/month/year
//                 >
//                   <Box
//                     sx={{
//                       display: "flex",
//                       flexDirection: "column",
//                       gap: 2,
//                       width: 200,
//                     }}
//                   >
//                     <Controller
//                       name="date"
//                       control={control} 
//                       rules={{ required: "Date is required" }}
//                       render={({ field }) => (
//                         <DatePicker
//                           label="Select Date"
//                           inputFormat="dd/MM/yyyy"
//                           renderInput={(params) => <TextField {...params} />}
//                           {...field}
//                         />
//                       )}
//                     />
//                   </Box>
//                 </LocalizationProvider>
//                 {errors.date && (
//                   <span className="error-message">{errors.date.message}</span>
//                 )}
//               </div>

//               {/* Lead Dropdown */}
//               <div>
//                 <label
//                   style={{ marginBottom: "20px" }}
//                   className="h6 font-semibold text-muted text-sm d-block mb-2"
//                 >
//                   Select Lead
//                 </label>
//                 <InputField
//                   as="select"
//                   style={{
//                     padding: "0px 1.25rem 0 1.12rem",
//                     maxWidth: "300px",
//                   }}
//                   {...register("leadId", { required: "Lead is required" })}
//                 >
//                   <option value="">Select Lead</option>
//                   {leads.map((lead) => (
//                     <option key={lead?.id} value={lead?.id}>
//                       {lead?.name || "Unnamed Lead"}
//                     </option>
//                   ))}
//                 </InputField>
//                 {errors.leadId && (
//                   <span className="error-message">{errors.leadId.message}</span>
//                 )}
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 style={{ width: "163px", marginLeft: "220px" }}
//                 disabled={loading}
//               >
//                 {loading ? <Spin /> : "Search"}
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     </>
//   );
// }

//  Mine Corrected one
// import React, { useState, useEffect } from "react";
// import Card from "../shared/Card";
// import { useForm } from "react-hook-form";
// import { FaUsers, FaBriefcase } from "react-icons/fa";
// import { getAllLeads as fetchAllLeads, todaysFollowUp } from "../../Services/LeadService";
// import { leadSources } from "../../Services/LeadSource";
// import InputField from "../public/InputField";
// import Spin from "../public/Spin";
// import myToaster from "../../utils/toaster";
// import Grid from "../shared/Grid";

// export default function ExecutiveDashboard({ leadData }) {
//   const [leads, setLeads] = useState([]);
//   const [leadSources, setLeadSources] = useState([]);
//   const [salesManager, setSalesManager] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [leadTodayFollowUp,setleadTodayFollowUp]=useState([])

//   useEffect(() => {
//     getAllLeads();
//     fetchAllLeadSources();
    
//   }, []);
 
//   const headers = [
//     { key: "clientName", label: "ClientName" },
//     { key: "leadProcessStep", label: "Lead Process Step" },
//     { key: "phoneNumber", label: "Phone Number" },
//     { key: "email", label: "Email" },
//     { key: "leadComments", label: "Lead Comments" },
//     { key: "followUpDate", label: "FollowUp Date" },
//   ];
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const onfetchFollowUpHistory= async(data)=>{
//     const response = todaysFollowUp(data);
//     if (response.isSuccess) {
//     setleadTodayFollowUp(response.result)

//       myToaster.showSuccessToast(response.message)
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//   }
//   const onSubmit = (result) => {
//     onfetchFollowUpHistory(result)
//   };

//   const getAllLeads = async () => {
//     try {
//       const response = await fetchAllLeads();
//       setLeads(response.result || []);
//     } catch (error) {
//       console.error("Error fetching leads:", error);
//     }
//   };

//   const fetchAllLeadSources = async () => {
//     try {
//       const response = await leadSources();
//       setLeadSources(response.result || []);
//     } catch (error) {
//       console.error("Error fetching leadSources:", error);
//     }
//   };

//   const myProps = [
//     {
//       title: "Total Leads",
//       number: leads.length,
//       icon: <FaUsers />,
//       link: "/salesExecutive/leadList",
//     },
//     {
//       title: "Total Lead Sources",
//       number: leadSources.length,
//       icon: <FaUsers />,
//     },
//     {
//       title: "Today's Follow Up",
//       number: salesManager.length,
//       icon: <FaBriefcase />,
//     },
//   ];

//   return (
//     <>
//       <Card props={myProps} />
//       <div
//         style={{ marginLeft: "30px" }}
//         className="d-flex justify-content-between align-items-start mb-3"
//       >
//         <div style={{ marginRight: "400px" }} className="col-lg-6 ml-3">
//           <form
//             className="login-form"
//             onSubmit={handleSubmit(onSubmit)}
//             autoComplete="off"
//           >
//             <div
//               style={{
//                 display: "flex",
//                 flexDirection: "row",
//                 gap: "20px",
//                 alignItems: "center",
//               }}
//             >
//               {/* Date Input Field */}
//               <div style={{ marginBottom: "22px" }}>
//                 <label
//                   style={{ marginBottom: "20px" }}
//                   className="h6 font-semibold text-muted text-sm d-block mb-2"
//                 >
//                   Select Date
//                 </label>
//                 <InputField
//                   type="date" 
//                   style={{
//                     padding: "0px 1.25rem 0 1.12rem",
//                     maxWidth: "300px",
//                   }}
//                   {...register("date", { required: "Date is required" })}
//                 />
//                 {errors.date && (
//                   <span className="error-message">{errors.date.message}</span>
//                 )}
//               </div>

//               {/* Lead Dropdown */}
//               <div style={{ marginBottom: "22px" }}>

//                 <label
//                   style={{}}
//                   className="h6 font-semibold text-muted text-sm d-block mb-2"
//                 >
//                   Select Lead
//                 </label>
//                 <InputField
//                   as="select"
//                   style={{
//                     padding: "0px 1.25rem 0 1.12rem",
//                     maxWidth: "300px",
//                   }}
//                   {...register("leadId", { required: "Lead is required" })}
//                 >
//                   <option value="">Select Lead</option>
//                   {leads.map((lead) => (
//                     <option key={lead?.id} value={lead?.id}>
//                       {lead?.name || "Unnamed Lead"}
//                     </option>
//                   ))}
//                 </InputField>
//                 {errors.leadId && (
//                   <span className="error-message">{errors.leadId.message}</span>
//                 )}
//               </div>
//             </div>

//             <div>
//               <button
//                 type="submit"
//                 className="btn btn-primary"
//                 style={{ width: "200px", marginLeft: "217px",marginTop:"-40px"}}
//                 disabled={loading}
//               >
//                 {loading ? <Spin /> : "Search"}    
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//       <div>
//       <h1>Executive Dashboard</h1>

//       {loading ? (
//         <p>Loading...</p>
//       ) : leadTodayFollowUp.length === 0 ? (
//         <p>No follow-ups for today</p>
//       ) : (
//         <Grid
//           headers={headers}
//           data={leadTodayFollowUp}
//           loading={loading}
//           tableName="Today's Follow-up"
//         />
//       )}
//     </div>
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import Card from "../shared/Card";
import { useForm } from "react-hook-form";
import { FaUsers, FaBriefcase } from "react-icons/fa";
import { getAllLeads as fetchAllLeads, todaysFollowUp } from "../../Services/LeadService";
import { leadSources as fetchLeadSources } from "../../Services/LeadSource";
import InputField from "../public/InputField";
import Spin from "../public/Spin";
import myToaster from "../../utils/toaster";
import Grid from "../shared/Grid";

export default function ExecutiveDashboard({ leadData }) {
  const [leads, setLeads] = useState([]);
  const [leadSources, setLeadSources] = useState([]);
  const [leadTodayFollowUp, setLeadTodayFollowUp] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getAllLeads();
    fetchAllLeadSources();
  }, []);

  // Fetch leads
  const getAllLeads = async () => {
    try {
      const response = await fetchAllLeads();
      setLeads(response.result || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  // Fetch lead sources
  const fetchAllLeadSources = async () => {
    try {
      const response = await fetchLeadSources();
      setLeadSources(response.result || []);
    } catch (error) {
      console.error("Error fetching lead sources:", error);
    }
  };

  // Fetch today's follow-up history
  const onfetchFollowUpHistory = async (data) => {
    setLoading(true);
    try {
      const response = await todaysFollowUp(data);
      if (response.isSuccess) {
        const result = Array.isArray(response.result) ? response.result : [];
        setLeadTodayFollowUp(response.result || []);
        myToaster.showSuccessToast(response.message);
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (error) {
      console.error("Error fetching follow-up history:", error);
      myToaster.showErrorToast("Failed to fetch follow-up data.");
    } finally {
      setLoading(false);
    }
  };

  // Form submit handler
  const onSubmit = (data) => {
    onfetchFollowUpHistory(data);
  };

  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const headers = [
    { key: "clientName", label: "Client Name" },
    { key: "leadProcessStep", label: "Lead Process Step" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "email", label: "Email" },
    { key: "leadComments", label: "Lead Comments" },
    { key: "followUpDate", label: "Follow-up Date" },
  ];

  // Cards data
  const myProps = [
    {
      title: "Total Leads",
      number: leads.length,
      icon: <FaUsers />,
      link: "/salesExecutive/leadList",
    },
    {
      title: "Total Lead Sources",
      number: leadSources.length,
      icon: <FaUsers />,
    },
    {
      title: "Today's Follow Up",
      number: leadTodayFollowUp.length,
      icon: <FaBriefcase />,
    },
  ];

  return (
    <>
      <Card props={myProps} />

      <div
        style={{ marginLeft: "30px" }}
        className="d-flex justify-content-between align-items-start mb-3"
      >
        <div style={{ marginRight: "400px" }} className="col-lg-6 ml-3">
          <form
            className="login-form"
            onSubmit={handleSubmit(onSubmit)}
            autoComplete="off"
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                gap: "20px",
                alignItems: "center",
              }}
            >
              {/* Date Input Field */}
              <div style={{ marginBottom: "22px" }}>
                <label
                  style={{ marginBottom: "20px" }}
                  className="h6 font-semibold text-muted text-sm d-block mb-2"
                >
                  Select Date
                </label>
                <InputField
                  type="date"
                  style={{
                    padding: "0px 1.25rem 0 1.12rem",
                    maxWidth: "300px",
                  }}
                  {...register("date", { required: "Date is required" })}
                />
                {errors.date && (
                  <span className="error-message">{errors.date.message}</span>
                )}
              </div>

              {/* Lead Dropdown */}
              <div style={{ marginBottom: "22px" }}>
                <label className="h6 font-semibold text-muted text-sm d-block mb-2">
                  Select Lead
                </label>
                <InputField
                  as="select"
                  style={{
                    padding: "0px 1.25rem 0 1.12rem",
                    maxWidth: "300px",
                  }}
                  {...register("leadId", { required: "Lead is required" })}
                >
                  <option value="">Select Lead</option>
                  {leads.map((lead) => (
                    <option key={lead?.id} value={lead?.id}>
                      {lead?.name || "Unnamed Lead"}
                    </option>
                  ))}
                </InputField>
                {errors.leadId && (
                  <span className="error-message">{errors.leadId.message}</span>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div>
              <button
                type="submit"
                className="btn btn-primary"
                style={{
                  width: "200px",
                  marginLeft: "217px",
                  marginTop: "-40px",
                }}
                disabled={loading}
              >
                {loading ? <Spin /> : "Search"}
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Follow-up History Grid */}
      <div>
        {loading ? (
          <p>Loading...</p>
        ) : leadTodayFollowUp.length === 0 ? (
          <p style={{marginLeft:"32px"}}>No follow-ups for today</p>
        ) : (
          <Grid
            headers={headers}
            data={Array.isArray(leadTodayFollowUp) ? leadTodayFollowUp : []}
            loading={loading}
            tableName="Today's Follow-up"
          />
        )}
      </div>
    </>
  );
}
