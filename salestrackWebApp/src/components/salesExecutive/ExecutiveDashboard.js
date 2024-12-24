// import React, { useState, useEffect } from "react";
// import Card from "../shared/Card";
// import { useForm } from "react-hook-form";
// import {
//   FaEdit,
//   FaPlus,
//   FaCog,
//   FaTrash,
//   FaUsers,
//   FaBriefcase,
//   FaSyncAlt,
// } from "react-icons/fa";
// import {
//   getAllLeads as fetchAllLeads,
//   todaysFollowUp,
// } from "../../Services/LeadService";
// import { leadSources as fetchLeadSources } from "../../Services/LeadSource";
// import InputField from "../public/InputField";
// import Spin from "../public/Spin";
// import myToaster from "../../utils/toaster";
// import Grid from "../shared/Grid";
// import { CircularProgress } from "@mui/material";
// import BasicModal from "./AddfollowUpdate"; // Import the BasicModal component

// export default function ExecutiveDashboard() {
//   const [leads, setLeads] = useState([]);
//   const [leadSources, setLeadSources] = useState([]);
//   const [leadTodayFollowUp, setLeadTodayFollowUp] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [date, setDate] = useState(""); // Date selected by the user
//   const [hasFollowUpHistory, setHasFollowUpHistory] = useState(false); // Flag to track if there are follow-ups
//   const [followUpdatePopup, setFollowUpdatePopup] = useState(false); // Flag to show follow-up modal
//   const [showGrid, setShowGrid] = useState(true); // Flag to show the grid
//   const [leadData, setLeadData] = useState({}); // To store the selected lead data
//   const [followUpHistory, setFollowUpHistory] = useState([]); // Store follow-up history data

//   useEffect(() => {
//     getAllLeads(); // Fetch all leads
//     fetchAllLeadSources(); // Fetch all lead sources
//     fetchTodayFollowUp(); // Fetch today's follow-up history immediately
//   }, []);

//   // Handle click on "Manage Lead" button
//   const manageLead = (lead) => {
//     setLeadData(lead); // Store the selected lead data
//     setFollowUpdatePopup(true); // Show the "Manage Lead" modal
//     setShowGrid(false); // Hide the grid
//     setFollowUpHistory(false);
//   };

//   // Fetch today's follow-up history
//   const fetchTodayFollowUp = async () => {
//     const today = new Date().toISOString().split("T")[0]; // Today's date in YYYY-MM-DD format
//     await onfetchFollowUpHistory({ date: today });
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
//       const response = await fetchLeadSources();
//       setLeadSources(response.result || []);
//     } catch (error) {
//       console.error("Error fetching lead sources:", error);
//     }
//   };

//   // const onfetchFollowUpHistory = async (data) => {
//   //   setLoading(true);
//   //   setHasFollowUpHistory(false); 

//   //   try {
//   //     const response = await todaysFollowUp(data);
//   //     if (response.isSuccess) {
//   //       const result = Array.isArray(response.result)
//   //         ? response.result
//   //         : [response.result];
//   //       const formattedResult = result
//   //         .map((item) => {
//   //           const date = item.followUpDate
//   //             ? item.followUpDate.split("T")[0]
//   //             : null;
//   //           const formattedDate = date
//   //             ? date.split("-").reverse().join("-")
//   //             : "";
//   //           return { ...item, followUpDate: formattedDate };
//   //         })
//   //         .sort(
//   //           (a, b) =>
//   //             new Date(b.followUpDate.split("-").reverse().join("-")) -
//   //             new Date(a.followUpDate.split("-").reverse().join("-"))
//   //         );

//   //       setLeadTodayFollowUp(formattedResult);
//   //       setHasFollowUpHistory(formattedResult.length > 0); // Set flag based on whether any follow-ups exist

//   //       if (formattedResult.length === 0) {
//   //       }
//   //     } else {
//   //       setHasFollowUpHistory(false); // Ensure the flag is false if no success
//   //     }
//   //   } catch (error) {
//   //     console.error("Error fetching follow-up history:", error);
//   //     setLeadTodayFollowUp([]);
//   //     setHasFollowUpHistory(false);
//   //   } finally {
//   //     setLoading(false);
//   //   }
//   // };
//   const onfetchFollowUpHistory = async (data) => {
//     setLoading(true);
//     setHasFollowUpHistory(false);
  
//     try {
//       const response = await todaysFollowUp(data);
//       if (response.isSuccess) {
//         const result = Array.isArray(response.result) ? response.result : [response.result];
//         if (result.length === 0) {
//           // If the response is successful but no data is found, show a toaster error
//           myToaster.showErrorToast("No follow-up history found for the selected date.");
//           setLeadTodayFollowUp([]);
//           setHasFollowUpHistory(false);
//         } else {
//           const formattedResult = result
//             .map((item) => {
//               const date = item.followUpDate ? item.followUpDate.split("T")[0] : null;
//               const formattedDate = date ? date.split("-").reverse().join("-") : "";
//               return { ...item, followUpDate: formattedDate };
//             })
//             .sort(
//               (a, b) =>
//                 new Date(b.followUpDate.split("-").reverse().join("-")) -
//                 new Date(a.followUpDate.split("-").reverse().join("-"))
//             );
  
//           setLeadTodayFollowUp(formattedResult);
//           setHasFollowUpHistory(formattedResult.length > 0);
//         }
//       } else {
//         // Show error message from the response if it exists
//         myToaster.showErrorToast(response.message || "Failed to fetch follow-up history.");
//         setLeadTodayFollowUp([]);
//         setHasFollowUpHistory(false);
//       }
//     } catch (error) {
//       // Show a generic error message in case of exceptions
//       console.error("Error fetching follow-up history:", error);
//       myToaster.showErrorToast("An error occurred while fetching follow-up history.");
//       setLeadTodayFollowUp([]);
//       setHasFollowUpHistory(false);
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const handleRefresh = () => {
//     getAllLeads();
//     fetchAllLeadSources();
//     setDate("");
//     fetchTodayFollowUp();
//     setHasFollowUpHistory(false);
//     if (leadTodayFollowUp.length > 0) {
//       setLeadTodayFollowUp([]);
//       setLeads([]);
//     }
//   };

//   const headers = [
//     { key: "leadCompanyName", label: "Lead Company Name" },
//     { key: "clientName", label: "Client Name" },
//     { key: "leadProcessStep", label: "Lead Process Step" },
//     { key: "phoneNumber", label: "Phone Number" },
//     { key: "email", label: "Email" },
//     { key: "leadComments", label: "Lead Comments" },
//     { key: "followUpDate", label: "Follow-up Date" },
//   ];
//   const user = JSON.parse(localStorage.getItem("user"));
//   // const myProps = [
//   //   {
//   //     title: "Total Leads",
//   //     number: leads.length,
//   //     icon: <FaUsers />,
//   //     link: "/salesExecutive/leadList",
//   //   },
//   //   {
//   //     title: "Total Lead Sources",
//   //     number: leadSources.length,
//   //     icon: <FaUsers />,
//   //     link: "/salesExecutive/leadSourceList",
//   //   },
//   //   {
//   //     title: "Today's Follow Up",
//   //     number: leadTodayFollowUp.length,
//   //     icon: <FaBriefcase />,
//   //   },
//   // ];
//   const myProps = [
//     {
//       title: "Total Leads",
//       number: leads.length,
//       icon: <FaUsers />,
//       link:
//         user?.userRole === 3
//           ? "/salesExecutive/leadList"
//           : "/salesManager/leadList",
//     },
//     {
//       title: "Total Lead Sources",
//       number: leadSources.length,
//       icon: <FaUsers />,
//       link:
//         user?.userRole === 3
//           ? "/salesExecutive/leadSourceList"
//           : "/salesManager/leadSourceList",
//     },
//     {
//       title: "Today's Follow Up",
//       number: leadTodayFollowUp.length,
//       icon: <FaBriefcase />,
//     },
//   ];
//   const formatDate = (dateString) => {
//     if (!dateString) return "";

//     const dateObj = new Date(dateString);
//     const day = String(dateObj.getDate()).padStart(2, "0");
//     const month = String(dateObj.getMonth() + 1).padStart(2, "0");
//     const year = dateObj.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   // Handle date selection
//   const onDateChange = (e) => {
//     const selectedDate = e.target.value;
//     setDate(selectedDate);
//   };

//   return (
//     <>
//       <Card props={myProps} />
//       <h1
//         className="text-primary"
//         style={{
//           fontSize: "1.3em",
//           textAlign: "left",
//           marginTop: "20px",
//           marginBottom: "20px",
//           marginLeft: "30px",
//         }}
//       >
//         <div>
//           <span>Search Follow-Up History </span>
        
//         </div>
//       </h1>

//       {/* Search Form */}
//       <div
//         style={{ marginLeft: "30px" }}
//         className="d-flex justify-content-between align-items-start mb-3"
//       >
//         <div style={{ marginRight: "400px" }} className="col-lg-6 ml-3">
//           <form
//             className="login-form"
//             onSubmit={handleSubmit(onfetchFollowUpHistory)}
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
//                   className="h6 font-semibold text-primary text-sm d-block mb-2"
//                 >
//                   Select Date
//                 </label>

//                 {errors.date && (
//                   <span
//                     className="error-message"
//                     style={{ color: "red", marginBottom: "5px" }}
//                   >
//                     {errors.date.message}
//                   </span>
//                 )}

//                 <InputField
//                   type="date"
//                   value={date}
//                   style={{
//                     padding: "0px 1.25rem 0 1.12rem",
//                     maxWidth: "300px",
//                   }}
//                   {...register("date", { required: "Date is required" })}
//                   onChange={onDateChange} // Update date state on date change
//                 />
//               </div>

//               {/* Submit Button */}
//               <div style={{ marginBottom: "22px", alignSelf: "flex-end" }}>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   disabled={loading}
//                   style={{ marginBottom: "25px", height: "50px" }}
//                 >
//                   {loading ? <Spin /> : "Search"}
//                 </button>
//               </div>

//               {/* Refresh Button */}
//               {leadTodayFollowUp.length > 0 && (
//                 <div
//                   style={{
//                     marginBottom: "22px",
//                     alignSelf: "flex-end",
//                   }}
//                 >
//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={handleRefresh}
//                     style={{ marginBottom: "25px", height: "50px" }}
//                   >
//                     <FaSyncAlt /> Refresh
//                   </button>
//                 </div>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Follow-up History Table */}
//       <div>
//         {loading ? (
//           <div
//             className="d-flex justify-content-center align-items-center"
//             style={{ marginTop: "30px" }}
//           >
//             <CircularProgress />
//           </div>
//         ) : !hasFollowUpHistory ? (
//           date ? (
//             <p style={{marginLeft:"30px"}}></p>
//           ) : (
//             <p>No follow-up history found Today.</p>
//           )
//         ) : (
//           <Grid
//             buttons={[
//               {
//                 key: "add",
//                 title: "Manage Lead",
//                 className: "btn btn-warning",
//                 onAddFollowUpdate: (lead) => manageLead(lead), // Open the modal on "Manage Lead"
//                 icon: <FaCog />,
//               },
//             ]}
//             headers={headers}
//             data={leadTodayFollowUp}
//             loading={loading}
//             tableName={
//               date
//                 ? `Follow-up History for ${formatDate(date)}`
//                 : "Today's Follow-up History"
//             }
//           />
//         )}
//       </div>

//       {/* Follow-up Modal */}
//       {followUpdatePopup && (
//         <BasicModal
//           leadData={leadData} 
//           onClose={() => setFollowUpdatePopup(false)}
//           popupForm={true}
//           leadIdKey="leadId"
//           context="salesExecutive"
//         />
//       )}
//     </>
//   );
// }

// import React, { useState, useEffect } from "react";
// import Card from "../shared/Card";
// import { useForm } from "react-hook-form";
// import {
//   FaEdit,
//   FaPlus,
//   FaCog,
//   FaTrash,
//   FaUsers,
//   FaBriefcase,
//   FaSyncAlt,
// } from "react-icons/fa";
// import {
//   getAllLeads as fetchAllLeads,
//   todaysFollowUp,
// } from "../../Services/LeadService";
// import { leadSources as fetchLeadSources } from "../../Services/LeadSource";
// import InputField from "../public/InputField";
// import Spin from "../public/Spin";
// import myToaster from "../../utils/toaster";
// import Grid from "../shared/Grid";
// import { CircularProgress } from "@mui/material";
// import BasicModal from "./AddfollowUpdate"; // Import the BasicModal component

// export default function ExecutiveDashboard() {
//   const [leads, setLeads] = useState([]); // Holds the list of all leads
//   const [leadSources, setLeadSources] = useState([]); // Holds the list of all lead sources
//   const [leadTodayFollowUp, setLeadTodayFollowUp] = useState([]); // Holds the list of follow-ups for the selected date
//   const [loading, setLoading] = useState(false); // Indicates whether data is being loaded
//   const [date, setDate] = useState(""); // Stores the date selected by the user for filtering follow-ups
//   const [hasFollowUpHistory, setHasFollowUpHistory] = useState(false); // Flag to indicate if there's any follow-up history for the selected date
//   const [followUpdatePopup, setFollowUpdatePopup] = useState(false); // Controls the visibility of the "Manage Lead" modal
//   const [showGrid, setShowGrid] = useState(true); // Flag to control the display of the grid (currently unused, can be removed if not needed)
//   const [leadData, setLeadData] = useState({}); // Stores the data of the lead selected for management
//   const [followUpHistory, setFollowUpHistory] = useState([]); // Currently unused, consider removing it if it's not needed

//   useEffect(() => {
//     // Initial data fetching when the component mounts
//     getAllLeads(); // Fetch the list of all leads
//     fetchAllLeadSources(); // Fetch the list of all lead sources
//     fetchTodayFollowUp(); // Fetch the follow-up history for the current day
//   }, []);

//   // Function to handle clicking the "Manage Lead" button
//   const manageLead = (lead) => {
//     setLeadData(lead); // Store the selected lead's data
//     setFollowUpdatePopup(true); // Open the "Manage Lead" modal
//     setShowGrid(false); // Hide the grid (this seems unnecessary as the modal covers the grid, can be removed)
//     setFollowUpHistory(false); // Reset this flag (also likely unnecessary, can be removed)
//   };

//   // Function to fetch today's follow-up history automatically
//   const fetchTodayFollowUp = async () => {
//     const today = new Date().toISOString().split("T")[0]; // Get today's date in YYYY-MM-DD format
//     await onfetchFollowUpHistory({ date: today });
//   };

//   // Function to fetch all leads from the API
//   const getAllLeads = async () => {
//     try {
//       const response = await fetchAllLeads();
//       setLeads(response.result || []); // Update the leads state with the fetched data
//     } catch (error) {
//       console.error("Error fetching leads:", error);
//       myToaster.showErrorToast("Failed to load leads. Please try again later."); // Show an error message if fetching fails
//     }
//   };

//   // Function to fetch all lead sources from the API
//   const fetchAllLeadSources = async () => {
//     try {
//       const response = await fetchLeadSources();
//       setLeadSources(response.result || []); // Update the leadSources state with the fetched data
//     } catch (error) {
//       console.error("Error fetching lead sources:", error);
//       myToaster.showErrorToast("Failed to load lead sources. Please try again later."); // Show an error message if fetching fails
//     }
//   };

//   // Function to fetch follow-up history for a specific date
//   const onfetchFollowUpHistory = async (data) => {
//     setLoading(true); // Start loading indicator
//     setHasFollowUpHistory(false); // Reset the flag

//     try {
//       const response = await todaysFollowUp(data);
//       if (response.isSuccess) {
//         const result = Array.isArray(response.result)
//           ? response.result
//           : [response.result];

//         if (result.length === 0) {
//           // Handle the case where no data is found for the selected date
//           myToaster.showInfoToast("No follow-up history found for the selected date.");
//           setLeadTodayFollowUp([]);
//           setHasFollowUpHistory(false);
//         } else {
//           // Format the date for display and sort by date in descending order
//           const formattedResult = result
//             .map((item) => {
//               const date = item.followUpDate
//                 ? item.followUpDate.split("T")[0]
//                 : null;
//               const formattedDate = date
//                 ? date.split("-").reverse().join("-")
//                 : "";
//               return { ...item, followUpDate: formattedDate };
//             })
//             .sort(
//               (a, b) =>
//                 new Date(b.followUpDate.split("-").reverse().join("-")) -
//                 new Date(a.followUpDate.split("-").reverse().join("-"))
//             );

//           setLeadTodayFollowUp(formattedResult);
//           setHasFollowUpHistory(formattedResult.length > 0); // Set the flag to true if follow-ups are found
//         }
//       } else {
//         // Show an error message if the API request was not successful
//         myToaster.showErrorToast(
//           response.message || "Failed to fetch follow-up history."
//         );
//         setLeadTodayFollowUp([]);
//         setHasFollowUpHistory(false);
//       }
//     } catch (error) {
//       // Show a generic error message for any other errors during the process
//       console.error("Error fetching follow-up history:", error);
//       myToaster.showErrorToast(
//         "An error occurred while fetching follow-up history."
//       );
//       setLeadTodayFollowUp([]);
//       setHasFollowUpHistory(false);
//     } finally {
//       setLoading(false); // Stop loading indicator
//     }
//   };

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   // Function to refresh the data on the dashboard
//   const handleRefresh = () => {
//     getAllLeads();
//     fetchAllLeadSources();
//     setDate(""); // Reset the selected date
//     fetchTodayFollowUp();
//     setHasFollowUpHistory(false);
//     setLeadTodayFollowUp([]);
//     setLeads([]); // Clear the leads data (you might not want to clear leads on refresh, consider removing this)
//   };

//   // Define the table headers for the follow-up history grid
//   const headers = [
//     { key: "leadCompanyName", label: "Lead Company Name" },
//     { key: "clientName", label: "Client Name" },
//     { key: "leadProcessStep", label: "Lead Process Step" },
//     { key: "phoneNumber", label: "Phone Number" },
//     { key: "email", label: "Email" },
//     { key: "leadComments", label: "Lead Comments" },
//     { key: "followUpDate", label: "Follow-up Date" },
//   ];

//   // Get the user role from local storage
//   const user = JSON.parse(localStorage.getItem("user"));

//   // Define the data for the summary cards at the top of the dashboard
//   const myProps = [
//     {
//       title: "Total Leads",
//       number: leads.length,
//       icon: <FaUsers />,
//       link:
//         user?.userRole === 3
//           ? "/salesExecutive/leadList"
//           : "/salesManager/leadList",
//     },
//     {
//       title: "Total Lead Sources",
//       number: leadSources.length,
//       icon: <FaUsers />,
//       link:
//         user?.userRole === 3
//           ? "/salesExecutive/leadSourceList"
//           : "/salesManager/leadSourceList",
//     },
//     {
//       title: "Today's Follow Up",
//       number: leadTodayFollowUp.length,
//       icon: <FaBriefcase />,
//     },
//   ];

//   // Function to format the date for display in the table
//   const formatDate = (dateString) => {
//     if (!dateString) return "";

//     const dateObj = new Date(dateString);
//     const day = String(dateObj.getDate()).padStart(2, "0");
//     const month = String(dateObj.getMonth() + 1).padStart(2, "0");
//     const year = dateObj.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   // Function to handle date changes in the date input field
//   const onDateChange = (e) => {
//     const selectedDate = e.target.value;
//     setDate(selectedDate);
//   };

//   return (
//     <>
//       {/* Summary Cards */}
//       <Card props={myProps} />

//       {/* Follow-up History Section Title */}
//       <h1
//         className="text-primary"
//         style={{
//           fontSize: "1.3em",
//           textAlign: "left",
//           marginTop: "20px",
//           marginBottom: "20px",
//           marginLeft: "30px",
//         }}
//       >
//         <div>Search Follow-Up History</div>
//       </h1>

//       {/* Search Form */}
//       <div
//         style={{ marginLeft: "30px" }}
//         className="d-flex justify-content-between align-items-start mb-3"
//       >
//         <div style={{ marginRight: "400px" }} className="col-lg-6 ml-3">
//           <form
//             className="login-form"
//             onSubmit={handleSubmit(onfetchFollowUpHistory)}
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
//                   className="h6 font-semibold text-primary text-sm d-block mb-2"
//                 >
//                   Select Date
//                 </label>

//                 {errors.date && (
//                   <span
//                     className="error-message"
//                     style={{ color: "red", marginBottom: "5px" }}
//                   >
//                     {errors.date.message}
//                   </span>
//                 )}

//                 <InputField
//                   type="date"
//                   value={date}
//                   style={{
//                     padding: "0px 1.25rem 0 1.12rem",
//                     maxWidth: "300px",
//                   }}
//                   {...register("date", { required: "Date is required" })}
//                   onChange={onDateChange}
//                 />
//               </div>

//               {/* Submit Button */}
//               <div style={{ marginBottom: "22px", alignSelf: "flex-end" }}>
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   disabled={loading}
//                   style={{ marginBottom: "25px", height: "50px" }}
//                 >
//                   {loading ? <Spin /> : "Search"}
//                 </button>
//               </div>

//               {/* Refresh Button */}
//               {leadTodayFollowUp.length > 0 && (
//                 <div
//                   style={{
//                     marginBottom: "22px",
//                     alignSelf: "flex-end",
//                   }}
//                 >
//                   <button
//                     type="button"
//                     className="btn btn-primary"
//                     onClick={handleRefresh}
//                     style={{ marginBottom: "25px", height: "50px" }}
//                   >
//                     <FaSyncAlt /> Refresh
//                   </button>
//                 </div>
//               )}
//             </div>
//           </form>
//         </div>
//       </div>

//       {/* Follow-up History Table/Grid */}
//       <div>
//         {loading ? (
//           // Show a loading spinner while data is being fetched
//           <div
//             className="d-flex justify-content-center align-items-center"
//             style={{ marginTop: "30px" }}
//           >
//             <CircularProgress />
//           </div>
//         ) : !hasFollowUpHistory ? (
//           // Show a message if no follow-up history is found
//           date ? (
//             <p style={{ marginLeft: "30px" }}>
//               No follow-up history found for {formatDate(date)}.
//             </p>
//           ) : (
//             <p style={{ marginLeft: "30px" }}>
//               No follow-up scheduled for today.
//             </p>
//           )
//         ) : (
//           // Display the follow-up history grid
//           <Grid
//             buttons={[
//               {
//                 key: "add",
//                 title: "Manage Lead",
//                 className: "btn btn-warning",
//                 onAddFollowUpdate: (lead) => manageLead(lead), // Function to open the "Manage Lead" modal
//                 icon: <FaCog />,
//               },
//             ]}
//             headers={headers}
//             data={leadTodayFollowUp}
//             loading={loading}
//             tableName={
//               date
//                 ? `Follow-up History for ${formatDate(date)}`
//                 : "Today's Follow-up History"
//             }
//           />
//         )}
//       </div>

//       {/* Follow-up Modal */}
//       {followUpdatePopup && (
//         <BasicModal
//           leadData={leadData}
//           onClose={() => setFollowUpdatePopup(false)}
//           popupForm={true}
//           leadIdKey="leadId"
//           context="salesExecutive"
//         />
//       )}
//     </>
//   );
// }


// import React, { useState, useEffect } from "react";
// import Card from "../shared/Card";
// import { useForm } from "react-hook-form";
// import {
//   FaEdit,
//   FaPlus,
//   FaCog,
//   FaTrash,
//   FaUsers,
//   FaBriefcase,
//   FaSyncAlt,
// } from "react-icons/fa";
// import {
//   getAllLeads as fetchAllLeads,
//   todaysFollowUp,
// } from "../../Services/LeadService";
// import { leadSources as fetchLeadSources } from "../../Services/LeadSource";
// import InputField from "../public/InputField";
// import Spin from "../public/Spin";
// import myToaster from "../../utils/toaster";
// import Grid from "../shared/Grid";
// import { CircularProgress } from "@mui/material";
// import BasicModal from "./AddfollowUpdate";

// export default function ExecutiveDashboard() {
//   const [leads, setLeads] = useState([]);
//   const [leadSources, setLeadSources] = useState([]);
//   const [leadTodayFollowUp, setLeadTodayFollowUp] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [date, setDate] = useState("");
//   const [hasFollowUpHistory, setHasFollowUpHistory] = useState(false);
//   const [followUpdatePopup, setFollowUpdatePopup] = useState(false);
//   const [showGrid, setShowGrid] = useState(true);
//   const [leadData, setLeadData] = useState({});
//   const [followUpHistory, setFollowUpHistory] = useState([]);
//   const [isSearchTriggered, setIsSearchTriggered] = useState(false); // Track if a search is triggered

//   useEffect(() => {
//     getAllLeads();
//     fetchAllLeadSources();
//     fetchTodayFollowUp(); // Default load for today's follow-up
//   }, []);

//   const manageLead = (lead) => {
//     setLeadData(lead);
//     setFollowUpdatePopup(true);
//     setShowGrid(false);
//   };

//   const fetchTodayFollowUp = async () => {
//     const today = new Date().toISOString().split("T")[0];
//     await onfetchFollowUpHistory({ date: today }, false); // Default fetch (not triggered by search)
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
//       const response = await fetchLeadSources();
//       setLeadSources(response.result || []);
//     } catch (error) {
//       console.error("Error fetching lead sources:", error);
//     }
//   };

//   const onfetchFollowUpHistory = async (data, triggeredBySearch = true) => {
//     setLoading(true);
//     setHasFollowUpHistory(false);
//     setIsSearchTriggered(triggeredBySearch);

//     try {
//       const response = await todaysFollowUp(data);
//       if (response.isSuccess) {
//         const result = Array.isArray(response.result) ? response.result : [response.result];
//         if (result.length === 0) {
//           if (triggeredBySearch) {
//             // Show toaster for search-triggered cases
//             myToaster.showErrorToast(
//               response.message || "No follow-up history found for the selected date."
//             );
//           } else {
//             // Show message for default fetch
//             setHasFollowUpHistory(false);
//           }
//           setLeadTodayFollowUp([]);
//         } else {
//           const formattedResult = result
//             .map((item) => {
//               const date = item.followUpDate ? item.followUpDate.split("T")[0] : null;
//               const formattedDate = date ? date.split("-").reverse().join("-") : "";
//               return { ...item, followUpDate: formattedDate };
//             })
//             .sort(
//               (a, b) =>
//                 new Date(b.followUpDate.split("-").reverse().join("-")) -
//                 new Date(a.followUpDate.split("-").reverse().join("-"))
//             );

//           setLeadTodayFollowUp(formattedResult);
//           setHasFollowUpHistory(true);
//         }
//       } else {
//         if (triggeredBySearch) {
//           myToaster.showErrorToast(
//             response.message || "Failed to fetch follow-up history."
//           );
//         }
//         setLeadTodayFollowUp([]);
//       }
//     } catch (error) {
//       console.error("Error fetching follow-up history:", error);
//       if (triggeredBySearch) {
//         myToaster.showErrorToast("An error occurred while fetching follow-up history.");
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const handleRefresh = () => {
//     getAllLeads();
//     fetchAllLeadSources();
//     setDate("");
//     fetchTodayFollowUp();
//   };

//   const headers = [
//     { key: "leadCompanyName", label: "Lead Company Name" },
//     { key: "clientName", label: "Client Name" },
//     { key: "leadProcessStep", label: "Lead Process Step" },
//     { key: "phoneNumber", label: "Phone Number" },
//     { key: "email", label: "Email" },
//     { key: "leadComments", label: "Lead Comments" },
//     { key: "followUpDate", label: "Follow-up Date" },
//   ];

//   const myProps = [
//     { title: "Total Leads", number: leads.length, icon: <FaUsers />, link: "/salesExecutive/leadList" },
//     { title: "Total Lead Sources", number: leadSources.length, icon: <FaUsers />, link: "/salesExecutive/leadSourceList" },
//     { title: "Today's Follow Up", number: leadTodayFollowUp.length, icon: <FaBriefcase /> },
//   ];

//   const formatDate = (dateString) => {
//     if (!dateString) return "";
//     const dateObj = new Date(dateString);
//     const day = String(dateObj.getDate()).padStart(2, "0");
//     const month = String(dateObj.getMonth() + 1).padStart(2, "0");
//     const year = dateObj.getFullYear();
//     return `${day}-${month}-${year}`;
//   };

//   const onDateChange = (e) => setDate(e.target.value);

//   return (
//     <>
//       <Card props={myProps} />
//       <h1
//         className="text-primary"
//         style={{
//           fontSize: "1.3em",
//           textAlign: "left",
//           margin: "20px 0 20px 30px",
//         }}
//       >
//         Search Follow-Up History
//       </h1>
//       <div style={{ marginLeft: "30px" }} className="d-flex justify-content-between align-items-start mb-3">
//         <form
//           className="login-form"
//           onSubmit={handleSubmit((data) => onfetchFollowUpHistory(data, true))}
//           autoComplete="off"
//         >
//           <div className="d-flex gap-3 align-items-center">
//             <div>
//               <label className="h6 font-semibold text-primary text-sm d-block mb-2">Select Date</label>
//               {errors.date && (
//                 <span className="error-message" style={{ color: "red" }}>{errors.date.message}</span>
//               )}
//               <InputField
//                 type="date"
//                 value={date}
//                 {...register("date", { required: "Date is required" })}
//                 onChange={onDateChange}
//               />
//             </div>
//             <button type="submit" className="btn btn-primary" disabled={loading}>
//               {loading ? <Spin /> : "Search"}
//             </button>
//             <button type="button" className="btn btn-primary" onClick={handleRefresh}>
//               <FaSyncAlt /> Refresh
//             </button>
//           </div>
//         </form>
//       </div>
//       <div>
//         {loading ? (
//           <div className="d-flex justify-content-center align-items-center mt-3">
//             <CircularProgress />
//           </div>
//         ) : hasFollowUpHistory ? (
//           <Grid
//             headers={headers}
//             data={leadTodayFollowUp}
//             tableName={date ? `Follow-up History for ${formatDate(date)}` : "Today's Follow-up History"}
//           />
//         ) : (
//           <p style={{ marginLeft: "30px" }}>
//             {isSearchTriggered ? "" : "No follow-up history found Today."}
//           </p>
//         )}
//       </div>
//       {followUpdatePopup && (
//         <BasicModal
//           leadData={leadData}
//           onClose={() => setFollowUpdatePopup(false)}
//           popupForm={true}
//           leadIdKey="leadId"
//         />
//       )}
//     </>
//   );
// }



import React, { useState, useEffect } from "react";
import Card from "../shared/Card";
import { useForm } from "react-hook-form";
import {
  FaEdit,
  FaPlus,
  FaCog,
  FaTrash,
  FaUsers,
  FaBriefcase,
  FaSyncAlt,
} from "react-icons/fa";
import {
  getAllLeads as fetchAllLeads,
  todaysFollowUp,
} from "../../Services/LeadService";
import { leadSources as fetchLeadSources } from "../../Services/LeadSource";
import InputField from "../public/InputField";
import Spin from "../public/Spin";
import myToaster from "../../utils/toaster";
import Grid from "../shared/Grid";
import { CircularProgress } from "@mui/material";
import BasicModal from "./AddfollowUpdate";

export default function ExecutiveDashboard() {
  const [leads, setLeads] = useState([]);
  const [leadSources, setLeadSources] = useState([]);
  const [leadTodayFollowUp, setLeadTodayFollowUp] = useState([]);
  const [loading, setLoading] = useState(false);
  const [date, setDate] = useState("");
  const [hasFollowUpHistory, setHasFollowUpHistory] = useState(false);
  const [followUpdatePopup, setFollowUpdatePopup] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [leadData, setLeadData] = useState({});
  const [followUpHistory, setFollowUpHistory] = useState([]);

  useEffect(() => {
    getAllLeads();
    fetchAllLeadSources();
    fetchTodayFollowUp();
  }, []);

  const manageLead = (lead) => {
    setLeadData(lead);
    setFollowUpdatePopup(true);
    setShowGrid(false);
    setFollowUpHistory(false);
  };

  const fetchTodayFollowUp = async () => {
    const today = new Date().toISOString().split("T")[0];
    await onfetchFollowUpHistory({ date: today }, false);
  };

  const getAllLeads = async () => {
    try {
      const response = await fetchAllLeads();
      setLeads(response.result || []);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  const fetchAllLeadSources = async () => {
    try {
      const response = await fetchLeadSources();
      setLeadSources(response.result || []);
    } catch (error) {
      console.error("Error fetching lead sources:", error);
    }
  };

  const onfetchFollowUpHistory = async (data, isCustomSearch = true) => {
    setLoading(true);
    setHasFollowUpHistory(false);

    try {
      const response = await todaysFollowUp(data);
      if (response.isSuccess) {
        const result = Array.isArray(response.result) ? response.result : [response.result];
        if (result.length === 0) {
          if (isCustomSearch) {
            myToaster.showErrorToast("No follow-up history found for the selected date.");
          }
          setLeadTodayFollowUp([]);
          setHasFollowUpHistory(false);
        } else {
          const formattedResult = result
            .map((item) => {
              const date = item.followUpDate ? item.followUpDate.split("T")[0] : null;
              const formattedDate = date ? date.split("-").reverse().join("-") : "";
              return { ...item, followUpDate: formattedDate };
            })
            .sort(
              (a, b) =>
                new Date(b.followUpDate.split("-").reverse().join("-")) -
                new Date(a.followUpDate.split("-").reverse().join("-"))
            );

          setLeadTodayFollowUp(formattedResult);
          setHasFollowUpHistory(formattedResult.length > 0);
        }
      } else {
        if (isCustomSearch) {
          myToaster.showErrorToast(response.message || "Failed to fetch follow-up history.");
        }
        setLeadTodayFollowUp([]);
        setHasFollowUpHistory(false);
      }
    } catch (error) {
      console.error("Error fetching follow-up history:", error);
      if (isCustomSearch) {
        myToaster.showErrorToast("An error occurred while fetching follow-up history.");
      }
      setLeadTodayFollowUp([]);
      setHasFollowUpHistory(false);
    } finally {
      setLoading(false);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRefresh = () => {
    getAllLeads();
    fetchAllLeadSources();
    setDate("");
    fetchTodayFollowUp();
    setHasFollowUpHistory(false);
    if (leadTodayFollowUp.length > 0) {
      setLeadTodayFollowUp([]);
      setLeads([]);
    }
  };

  const headers = [
    { key: "leadCompanyName", label: "Lead Company Name" },
    { key: "clientName", label: "Client Name" },
    { key: "leadProcessStep", label: "Lead Process Step" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "email", label: "Email" },
    { key: "leadComments", label: "Lead Comments" },
    { key: "followUpDate", label: "Follow-up Date" },
  ];

  const user = JSON.parse(localStorage.getItem("user"));

  const myProps = [
    {
      title: "Total Leads",
      number: leads.length,
      icon: <FaUsers />,
      link:
        user?.userRole === 3
          ? "/salesExecutive/leadList"
          : "/salesManager/leadList",
    },
    {
      title: "Total Lead Sources",
      number: leadSources.length,
      icon: <FaUsers />,
      link:
        user?.userRole === 3
          ? "/salesExecutive/leadSourceList"
          : "/salesManager/leadSourceList",
    },
    {
      title: "Today's Follow Up",
      number: leadTodayFollowUp.length,
      icon: <FaBriefcase />,
    },
  ];

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const dateObj = new Date(dateString);
    const day = String(dateObj.getDate()).padStart(2, "0");
    const month = String(dateObj.getMonth() + 1).padStart(2, "0");
    const year = dateObj.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const onDateChange = (e) => {
    const selectedDate = e.target.value;
    setDate(selectedDate);
  };

  return (
    <>
      <Card props={myProps} />
      <h1
        className="text-primary"
        style={{
          fontSize: "1.3em",
          textAlign: "left",
          marginTop: "20px",
          marginBottom: "20px",
          marginLeft: "30px",
        }}
      >
        <div>
          <span>Search Follow-Up History </span>
        </div>
      </h1>

      <div
        style={{ marginLeft: "30px" }}
        className="d-flex justify-content-between align-items-start mb-3"
      >
        <div style={{ marginRight: "400px" }} className="col-lg-6 ml-3">
          <form
            className="login-form"
            onSubmit={handleSubmit((data) => onfetchFollowUpHistory(data, true))}
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
              <div style={{ marginBottom: "22px" }}>
                <label
                  style={{ marginBottom: "20px" }}
                  className="h6 font-semibold text-primary text-sm d-block mb-2"
                >
                  Select Date
                </label>
                {errors.date && (
                  <span
                    className="error-message"
                    style={{ color: "red", marginBottom: "5px" }}
                  >
                    {errors.date.message}
                  </span>
                )}
                <InputField
                  type="date"
                  value={date}
                  style={{
                    padding: "0px 1.25rem 0 1.12rem",
                    maxWidth: "300px",
                  }}
                  {...register("date", { required: "Date is required" })}
                  onChange={onDateChange}
                />
              </div>

              <div style={{ marginBottom: "22px", alignSelf: "flex-end" }}>
                <button
                  type="submit"
                  className="btn btn-primary"
                  disabled={loading}
                  style={{ marginBottom: "25px", height: "50px" }}
                >
                  {loading ? <Spin /> : "Search"}
                </button>
              </div>

              {leadTodayFollowUp.length > 0 && (
                <div style={{ marginBottom: "22px", alignSelf: "flex-end" }}>
                  <button
                    type="button"
                    className="btn btn-primary"
                    onClick={handleRefresh}
                    style={{ marginBottom: "25px", height: "50px" }}
                  >
                    <FaSyncAlt /> Refresh
                  </button>
                </div>
              )}
            </div>
          </form>
        </div>
      </div>

      <div>
        {!loading && hasFollowUpHistory ? (
          <Grid
            buttons={[
              {
                key: "add",
                title: "Manage Lead",
                className: "btn btn-warning",
                onAddFollowUpdate: (lead) => manageLead(lead),
                icon: <FaCog />,
              },
            ]}
            headers={headers}
            data={leadTodayFollowUp}
            tableName={
              date
                ? `Follow-up History for ${formatDate(date)}`
                : "Today's Follow-up History"
            }
          />
        ) : !date ? (
          <p style={{ marginLeft: "30px" }}>No follow-up history found Today.</p>
        ) : null}
      </div>

      {followUpdatePopup && (
        <BasicModal
          leadData={leadData}
          onClose={() => setFollowUpdatePopup(false)}
          popupForm={true}
          leadIdKey="leadId"
          context="salesExecutive"
        />
      )}
    </>
  );
}
