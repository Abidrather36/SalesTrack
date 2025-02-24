//Original//
///Github//
// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import { FaCog } from "react-icons/fa";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import Grid from "../shared/Grid";
// import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
// import { useForm } from "react-hook-form";
// import { addManageLead, leadFollowUpHistory } from "../../Services/LeadService";
// import { getAllProcessSteps } from "../../Services/UserService";
// import myToaster from "../../utils/toaster";
// import { useNavigate } from "react-router-dom";
// import BreadcrumbComponent from "../shared/Breadcrumb";

// // Modal Style
// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
// };

// export default function BasicModal({
//   leadData,
//   onClose,
//   showFallowup,
//   showFoloowUpHistory,
//   popupForm,
//   showHistory,
//   onSave, // This is the callback function passed from parent to handle saving behavior
// }) {
//   const [open, setOpen] = useState(true); // Initially open the modal
//   const [loading, setLoading] = useState(false);
//   const [processSteps, setProcessSteps] = useState([]);
//   const [followUpHistory, setFollowUpHistory] = useState([]);s
//   const [showModel, setShowModel] = useState(true);
//   const [showHistoryGrid, setShowHistoryGrid] = useState(showHistory); // Control the display of follow-up history grid
//   const navigate = useNavigate();

//   useEffect(() => {
//     fetchProcessSteps();
//     fetchFollowUpHistory();
//   }, []);

//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const fetchProcessSteps = async () => {
//     try {
//       const response = await getAllProcessSteps();
//       if (response.isSuccess) {
//         setProcessSteps(response.result);
//       } else {
//         myToaster.showErrorToast(response.message);
//       }
//     } catch (error) {
//       console.error("Error fetching process steps:", error);
//     }
//   };

//   const fetchFollowUpHistory = async () => {
//     setLoading(true);
//     try {
//       const response = await leadFollowUpHistory(leadData.id);
//       if (response.isSuccess) {
//         const formattedHistory = response.result
//           .map((history) => {
//             const date = history.followUpDate ? history.followUpDate.split("T")[0] : null;
//             const formattedDate = date ? date.split("-").reverse().join("-") : "";
//             return {
//               ...history,
//               followUpDate: formattedDate,
//             };
//           })
//           .sort((a, b) => new Date(b.followUpDate.split("-").reverse().join("-")) - new Date(a.followUpDate.split("-").reverse().join("-")));
//         setFollowUpHistory(formattedHistory);
//       }
//     } catch (error) {
//       console.error("Error fetching follow-up history:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleClose = () => {
//     setShowModel(false);
//     setShowHistoryGrid(true); // After closing, show the history grid again
//     if (onClose) onClose();
//   };

//   const handleManageLeadClick = () => {
//     setShowModel(true);
//     setShowHistoryGrid(false);
//   };

//   const onSubmit = async (data) => {
//     const manageLeadData = {
//       date: data.date,
//       time: `${data.time}:00`,
//       leadId: leadData?.leadId || leadData?.id,
//       adminProcessStepId: data.adminProcessStepId,
//       comment: data.comments || "",
//     };

//     try {
//       setLoading(true);
//       const response = await addManageLead(manageLeadData);
//       if (response.isSuccess) {
//         myToaster.showSuccessToast("Follow-up history added");

//         // If onSave callback is provided, execute it (e.g., to refresh data or navigate)
//         if (onSave) {
//           onSave(); // This will trigger the callback passed from the parent component
//         }
//       } else {
//         myToaster.showErrorToast(response.message);
//       }
//     } catch (error) {
//       myToaster.showErrorToast("An error occurred while saving");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const followupColumns = [
//     { key: "clientName", label: "Client Name" },
//     { key: "leadProcessStep", label: "Lead Process Step" },
//     { key: "phoneNumber", label: "Phone Number" },
//     { key: "email", label: "Email" },
//     { key: "leadComments", label: "Lead Comments" },
//     { key: "followUpDate", label: "FollowUp Date" },
//   ];

//   return (
//     <div>
//       {/* Breadcrumb only when showHistoryGrid is true */}
//       {showHistoryGrid && (
//         <BreadcrumbComponent
//           labels={{
//             module: "salesExecutive",
//             currentRoute: "Follow-Up History",
//           }}
//         />
//       )}

//       {showModel && (
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <Typography id="modal-modal-title" variant="h6" component="h2">
//               Manage Lead
//             </Typography>
//             <Box
//               component="form"
//               sx={{ mt: 2 }}
//               onSubmit={handleSubmit(onSubmit)}
//             >
//               <TextField
//                 id="date"
//                 label="Follow-Up Date"
//                 type="date"
//                 InputLabelProps={{ shrink: true }}
//                 {...register("date", { required: "Follow-up date is required" })}
//                 error={Boolean(errors.date)}
//                 helperText={errors.date ? errors.date.message : ""}
//                 fullWidth
//                 sx={{ mb: 2 }}
//               />
//               <TextField
//                 id="time"
//                 label="Follow-Up Time"
//                 type="time"
//                 InputLabelProps={{ shrink: true }}
//                 {...register("time", { required: "Follow-up time is required" })}
//                 error={Boolean(errors.time)}
//                 helperText={errors.time ? errors.time.message : ""}
//                 fullWidth
//                 sx={{ mb: 2 }}
//               />
//               <FormControl fullWidth sx={{ mb: 2 }}>
//                 <InputLabel id="process-step-label">Process Step</InputLabel>
//                 <Select
//                   labelId="process-step-label"
//                   id="adminProcessStepId"
//                   label="Process Step"
//                   {...register("adminProcessStepId", { required: "Process step is required" })}
//                   error={Boolean(errors.adminProcessStepId)}
//                 >
//                   {processSteps.map((step) => (
//                     <MenuItem key={step.id} value={step.id}>
//                       {step.stepName}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {errors.adminProcessStepId && (
//                   <FormHelperText error>
//                     {errors.adminProcessStepId.message}
//                   </FormHelperText>
//                 )}
//               </FormControl>
//               <TextField
//                 id="comments"
//                 label="Comments"
//                 multiline
//                 rows={4}
//                 {...register("comments")}
//                 fullWidth
//                 sx={{ mb: 2 }}
//               />

//               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <Button variant="contained" color="primary" type="submit" disabled={loading}>
//                   {loading ? "Saving..." : "Save"}
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="secondary"
//                   onClick={handleClose} // Handle cancel here
//                   sx={{ backgroundColor: "red", color: "white" }}
//                 >
//                   Cancel
//                 </Button>
//               </Box>
//             </Box>
//           </Box>
//         </Modal>
//       )}

//       {showHistoryGrid && (
//         <Grid
//           headers={followupColumns}
//           data={followUpHistory}
//           tableName="Follow-Up History"
//           addButtonLabel="Add Follow-Up History"
//           onAdd={handleManageLeadClick}
//         />
//       )}
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   Typography,
//   Modal,
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
// } from "@mui/material";
// import { useForm } from "react-hook-form";
// import Grid from "../shared/Grid";
// import BreadcrumbComponent from "../shared/Breadcrumb";
// import myToaster from "../../utils/toaster";
// import {
//   addManageLead,
//   leadFollowUpHistory,
// } from "../../Services/LeadService";
// import { getAllProcessSteps } from "../../Services/UserService";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "60%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
// };

// export default function BasicModal({
//   leadData,
//   onClose,
//   showFallowup,
//   showFoloowUpHistory,
//   popupForm,
//   showHistory,
// }) {
//   const navigate = useNavigate();
//   const [open, setOpen] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [processSteps, setProcessSteps] = useState([]);
//   const [followUpHistory, setFollowUpHistory] = useState([]);
//   const [popUpModel, setPopUpModel] = useState(popupForm);
//   const [showHistoryGrid, setShowHistoryGrid] = useState(showHistory);

//   // Fetch user details from localStorage
//   let user = JSON.parse(localStorage.getItem("user")) || {};
//   let userRole = user.userRole;

//   // Determine breadcrumb path dynamically based on userRole
//   const breadcrumbData =
//     userRole === 3
//       ? { module: "Sales Executive", currentRoute: "Follow-Up History", path: "/salesExecutive/leadLists" }
//       : userRole === 4
//       ? { module: "Sales Manager", currentRoute: "Follow-Up History", path: "/salesManager/leadList" }
//       : { module: "User", currentRoute: "Follow-Up History", path: "/" }; // Default case

//   useEffect(() => {
//     fetchProcessSteps();
//     fetchFollowUpHistory();
//   }, []);

//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const handleClose = () => {
//     setPopUpModel(false);
//     setShowHistoryGrid(true);
//     if (onClose) onClose();
//   };

//   const handleManageLeadClick = () => {
//     setPopUpModel(true);
//     setShowHistoryGrid(false);
//   };

//   const fetchFollowUpHistory = async () => {
//     setLoading(true);
//     try {
//       const response = await leadFollowUpHistory(leadData.id);
//       if (response.isSuccess) {
//         const formattedHistory = response.result
//           .map((history) => ({
//             ...history,
//             followUpDate: history.followUpDate
//               ? history.followUpDate.split("T")[0].split("-").reverse().join("-")
//               : "",
//           }))
//           .sort((a, b) =>
//             new Date(b.followUpDate.split("-").reverse().join("-")) -
//             new Date(a.followUpDate.split("-").reverse().join("-"))
//           );
//         setFollowUpHistory(formattedHistory);
//       }
//     } catch (error) {
//       myToaster.showErrorToast("Error fetching follow-up history");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProcessSteps = async () => {
//     const response = await getAllProcessSteps();
//     if (response.isSuccess) {
//       setProcessSteps(response.result);
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//   };

//   const onSubmit = async (data) => {
//     const manageLeadData = {
//       date: data.date,
//       time: `${data.time}:00`,
//       leadId: leadData?.leadId || leadData?.id,
//       adminProcessStepId: data.adminProcessStepId,
//       comment: data.comments || "",
//     };
//     const response = await addManageLead(manageLeadData);
//     if (response.isSuccess) {
//       myToaster.showSuccessToast("Follow-up history added");
//       setPopUpModel(false);
//       setShowHistoryGrid(true);
//       fetchFollowUpHistory();

//       // Navigate based on user role after adding follow-up
//       if (userRole === 3) {
//         navigate(`/salesExecutive/follow-up-history/${leadData.id}`);
//       } else if (userRole === 4) {
//         navigate(`/salesManager/follow-up-history/${leadData.id}`);
//       }
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//   };

//   return (
//     <div>
//       {/* Breadcrumb Component with Dynamic Path */}
//       {showHistoryGrid && (
//         <BreadcrumbComponent
//           labels={{
//             module: breadcrumbData.module,
//             currentRoute: breadcrumbData.currentRoute,
//           }}
//           path={breadcrumbData.path}
//         />
//       )}

//       {popUpModel && (
//         <Modal
//           open={open}
//           onClose={handleClose}
//           aria-labelledby="modal-modal-title"
//           aria-describedby="modal-modal-description"
//         >
//           <Box sx={style}>
//             <Typography id="modal-modal-title" variant="h6" component="h2">
//               Manage Lead
//             </Typography>
//             <Box
//               component="form"
//               sx={{ mt: 2 }}
//               onSubmit={handleSubmit(onSubmit)}
//             >
//               <TextField
//                 id="date"
//                 label="Follow-Up Date"
//                 type="date"
//                 InputLabelProps={{ shrink: true }}
//                 {...register("date", { required: true })}
//                 error={Boolean(errors.date)}
//                 helperText={errors.date ? "Follow-up date is required" : ""}
//                 fullWidth
//                 sx={{ mb: 2 }}
//               />
//               <TextField
//                 id="time"
//                 label="Follow-Up Time"
//                 type="time"
//                 InputLabelProps={{ shrink: true }}
//                 {...register("time", { required: true })}
//                 error={Boolean(errors.time)}
//                 helperText={errors.time ? "Follow-up time is required" : ""}
//                 fullWidth
//                 sx={{ mb: 2 }}
//               />
//               <FormControl fullWidth sx={{ mb: 2 }}>
//                 <InputLabel id="process-step-label">Process Step</InputLabel>
//                 <Select
//                   labelId="process-step-label"
//                   id="adminProcessStepId"
//                   {...register("adminProcessStepId", { required: true })}
//                   error={Boolean(errors.adminProcessStepId)}
//                 >
//                   {processSteps.map((step) => (
//                     <MenuItem key={step.id} value={step.id}>
//                       {step.stepName}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {errors.adminProcessStepId && (
//                   <FormHelperText error>
//                     {errors.adminProcessStepId.message}
//                   </FormHelperText>
//                 )}
//               </FormControl>
//               <TextField
//                 id="comments"
//                 label="Comments"
//                 multiline
//                 rows={4}
//                 {...register("comments", { required: true })}
//                 fullWidth
//                 sx={{ mb: 2 }}
//               />

//               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <Button variant="contained" color="primary" type="submit">
//                   Save
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   onClick={handleClose}
//                   style={{ backgroundColor: "red", color: "white" }}
//                 >
//                   Cancel
//                 </Button>
//               </Box>
//             </Box>
//           </Box>
//         </Modal>
//       )}

//       {showHistoryGrid && (
//         <Grid
//           headers={[
//             { key: "clientName", label: "Client Name" },
//             { key: "leadProcessStep", label: "Lead Process Step" },
//             { key: "phoneNumber", label: "Phone Number" },
//             { key: "email", label: "Email" },
//             { key: "leadComments", label: "Lead Comments" },
//             { key: "followUpDate", label: "Follow-Up Date" },
//           ]}
//           data={followUpHistory}
//           tableName="Follow-Up History"
//           addButtonLabel="Add Follow-Up History"
//           onAdd={handleManageLeadClick}
//         />
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import Grid from "../shared/Grid";
// import {
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
// } from "@mui/material";
// import { useForm } from "react-hook-form";
// import myToaster from "../../utils/toaster";
// import LeadList from "./LeadList";
// import BreadcrumbComponent from "../shared/Breadcrumb";
// import { addManageLead, leadFollowUpHistory } from "../../Services/LeadService";
// import { getAllProcessSteps } from "../../Services/UserService";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "60%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
// };

// export default function BasicModal({
//   leadData,
//   onClose,
//   showFallowup,
//   showFoloowUpHistory,
//   popupForm,
//   showHistory,
// }) {
//   const [open, setOpen] = useState(false);
//   const [showList, setShowList] = useState(showFoloowUpHistory);
//   const [loading, setLoading] = useState(false);
//   const [processSteps, setProcessSteps] = useState([]);
//   const [followUpHistory, setFollowUpHistory] = useState([]);
//   const [popUpModel, setPopUpModel] = useState(popupForm);
//   const [showHistoryGrid, setShowHistoryGrid] = useState(showHistory);

//   const { register, handleSubmit, formState: errors } = useForm();

//   // Fetch user details from localStorage
//   let user = JSON.parse(localStorage.getItem("user")) || {};
//   let userRole = user.userRole;

//   // Determine breadcrumb path dynamically based on userRole
//   const breadcrumbData =
//     userRole === 3
//       ? {
//           module: "Sales Executive",
//           intermediateRoute: "Lead List",
//           currentRoute: "Follow-Up History",
//         }
//       : userRole === 4
//       ? {
//           module: "Sales Manager",
//           intermediateRoute: "Lead List",
//           currentRoute: "Follow-Up History",
//         }
//       : {
//           module: "User",
//           intermediateRoute: null, // No intermediate route for other roles
//           currentRoute: "Follow-Up History",
//         };

//   const handleClose = () => {
//     setPopUpModel(false);
//     setShowHistoryGrid(false);
//     if (onClose) onClose();
//   };

//   const handleManageLeadClick = () => {
//     setPopUpModel(true);
//     setShowHistoryGrid(false);
//   };

//   const fetchFollowUpHistory = async () => {
//     setLoading(true);
//     try {
//       const response = await leadFollowUpHistory(leadData.id);
//       if (response.isSuccess) {
//         const formattedHistory = response.result
//           .map((history) => {
//             const date = history.followUpDate
//               ? history.followUpDate.split("T")[0]
//               : null;
//             const formattedDate = date
//               ? date.split("-").reverse().join("-")
//               : "";
//             return {
//               ...history,
//               followUpDate: formattedDate,
//             };
//           })
//           .sort(
//             (a, b) =>
//               new Date(b.followUpDate.split("-").reverse().join("-")) -
//               new Date(a.followUpDate.split("-").reverse().join("-"))
//           );
//         setFollowUpHistory(formattedHistory);
//       }
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProcessSteps = async () => {
//     const response = await getAllProcessSteps();
//     if (response.isSuccess) {
//       setProcessSteps(response.result);
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//   };

//   useEffect(() => {
//     fetchProcessSteps();
//     fetchFollowUpHistory();
//   }, []);

//   const onSubmit = async (data) => {
//     console.log("save btn clicked");
//     console.log(data);
//     const manageLeadData = {
//       date: data.date,
//       time: `${data.time}:00`,
//       leadId: leadData?.leadId || leadData?.id,
//       adminProcessStepId: data.adminProcessStepId,
//       comment: data.comments || "",
//     };
//     const response = await addManageLead(manageLeadData);
//     console.log(response);
//     if (response.isSuccess) {
//       myToaster.showSuccessToast("Follow-up history added");
//       setPopUpModel(false);
//       setShowHistoryGrid(true);
//       fetchFollowUpHistory();
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//   };

//   const handleBreadcrumbClick = (route) => {
//     switch (route) {
//       case "module":
//         setShowHistoryGrid(false);
//         setPopUpModel(false);
//         break;
//       case "intermediate":
//         setShowHistoryGrid(false);
//         setPopUpModel(false);
//         break;
//       case "current":
//         setShowHistoryGrid(true);
//         setPopUpModel(false);
//         break;
//       default:
//         break;
//     }
//   };

//   const followupColumns = [
//     { key: "clientName", label: "Client Name" },
//     { key: "leadProcessStep", label: "Lead Process Step" },
//     { key: "phoneNumber", label: "Phone Number" },
//     { key: "email", label: "Email" },
//     { key: "leadComments", label: "Lead Comments" },
//     { key: "followUpDate", label: "Follow-Up Date" },
//   ];

//   return (
//     <div>
//       {/* Conditionally render Breadcrumb only when showHistoryGrid is true */}
//       {showHistoryGrid && (
//         <BreadcrumbComponent
//           labels={{
//             module: breadcrumbData.module,
//             intermediateRoute: breadcrumbData.intermediateRoute,
//             currentRoute: breadcrumbData.currentRoute,
//           }}
//           onClick={handleBreadcrumbClick}
//         />
//       )}

//       {/* Modal for managing follow-up history */}
//       {popUpModel && (
//         <Modal open={open} onClose={handleClose}>
//           <Box sx={style}>
//             <Typography id="modal-modal-title" variant="h6" component="h2">
//               Manage Lead
//             </Typography>
//             <Box
//               component="form"
//               sx={{ mt: 2 }}
//               onSubmit={handleSubmit(onSubmit)}
//             >
//               <TextField
//                 id="date"
//                 label="Follow-Up Date"
//                 type="date"
//                 InputLabelProps={{ shrink: true }}
//                 {...register("date", { required: true })}
//                 error={Boolean(errors.date)}
//                 helperText={errors.date ? "Follow-up date is required" : ""}
//                 fullWidth
//                 sx={{ mb: 2 }}
//               />
//               <TextField
//                 id="time"
//                 label="Follow-Up Time"
//                 type="time"
//                 InputLabelProps={{ shrink: true }}
//                 {...register("time", { required: true })}
//                 error={Boolean(errors.time)}
//                 helperText={errors.time ? "Follow-up time is required" : ""}
//                 fullWidth
//                 sx={{ mb: 2 }}
//               />
//               <FormControl fullWidth sx={{ mb: 2 }}>
//                 <InputLabel id="process-step-label">Process Step</InputLabel>
//                 <Select
//                   labelId="process-step-label"
//                   id="adminProcessStepId"
//                   label="Process Step"
//                   {...register("adminProcessStepId", { required: true })}
//                   error={Boolean(errors.adminProcessStepId)}
//                 >
//                   {processSteps.map((step) => (
//                     <MenuItem key={step.id} value={step.id}>
//                       {step.stepName}
//                     </MenuItem>
//                   ))}
//                 </Select>
//                 {errors.adminProcessStepId && (
//                   <FormHelperText error>
//                     {errors.adminProcessStepId.message}
//                   </FormHelperText>
//                 )}
//               </FormControl>
//               <TextField
//                 id="comments"
//                 label="Comments"
//                 multiline
//                 rows={4}
//                 {...register("comments", { required: true })}
//                 fullWidth
//                 sx={{ mb: 2 }}
//               />
//               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <Button variant="contained" color="primary" type="submit">
//                   Save
//                 </Button>
//                 <Button
//                   variant="outlined"
//                   color="white"
//                   onClick={handleClose}
//                   style={{ backgroundColor: "red", color: "white" }}
//                 >
//                   Cancel
//                 </Button>
//               </Box>
//             </Box>
//           </Box>
//         </Modal>
//       )}

//       {/* Grid for displaying follow-up history */}
//       {showHistoryGrid && (
//         <Grid
//           headers={followupColumns}
//           data={followUpHistory}
//           tableName="Follow-Up History"
//           addButtonLabel="Add Follow-Up History"
//           onAdd={handleManageLeadClick}
//         />
//       )}
//     </div>
//   );
// }

// import React, { useState, useEffect } from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import Grid from "../shared/Grid";
// import BreadcrumbComponent from "../shared/Breadcrumb";
// import { useForm } from "react-hook-form";
// import {
//   TextField,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   FormHelperText,
// } from "@mui/material";
// import {
//   addManageLead,
//   leadFollowUpHistory,
// } from "../../Services/LeadService";
// import { getAllProcessSteps } from "../../Services/UserService";
// import myToaster from "../../utils/toaster";
// import { useNavigate } from "react-router-dom";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 500,
//   bgcolor: "background.paper",
//   boxShadow: 24,
//   p: 4,
// };

// export default function BasicModal({
//   leadData,
//   onClose,
//   showFollowUp,
//   showFollowUpHistory,
//   popupForm,
//   showHistory,
// }) {
//   const [open, setOpen] = useState(true);
//   const [showList, setShowList] = useState(showFollowUpHistory);
//   const [loading, setLoading] = useState(false);
//   const [processSteps, setProcessSteps] = useState([]);
//   const [followUpHistory, setFollowUpHistory] = useState([]);
//   const [showModel, setShowModel] = useState(true);
//   const navigate = useNavigate();
//   const [popUpModel, setPopUpModel] = useState(popupForm);
//   const [showHistoryGrid, setShowHistoryGrid] = useState(showHistory);

//   useEffect(() => {
//     fetchProcessSteps();
//     fetchFollowUpHistory();
//   }, []);

//   const { register, handleSubmit, formState: { errors } } = useForm();

//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   const userRole = user.userRole;

//   const breadcrumbData =
//     userRole === 3
//       ? { module: "Sales Executive", currentRoute: "Follow-Up History", path: "/salesExecutive/leadLists" }
//       : userRole === 4
//       ? { module: "Sales Manager", currentRoute: "Follow-Up History", path: "/salesManager/leadList" }
//       : { module: "User", currentRoute: "Follow-Up History", path: "/" };

//   const handleClose = () => {
//     setPopUpModel(false);
//     setShowHistoryGrid(true);
//     if (onClose) onClose();
//   };

//   const handleManageLeadClick = () => {
//     setPopUpModel(true);
//     setShowHistoryGrid(false);
//   };

//   const fetchFollowUpHistory = async () => {
//     setLoading(true);
//     try {
//       const response = await leadFollowUpHistory(leadData.id);
//       if (response.isSuccess) {
//         const formattedHistory = response.result.map(history => ({
//           ...history,
//           followUpDate: history.followUpDate?.split("T")[0]?.split("-").reverse().join("-") || "",
//         })).sort((a, b) => new Date(b.followUpDate) - new Date(a.followUpDate));
//         setFollowUpHistory(formattedHistory);
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProcessSteps = async () => {
//     const response = await getAllProcessSteps();
//     if (response.isSuccess) {
//       setProcessSteps(response.result);
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//   };

//   const onSubmit = async (data) => {
//     const manageLeadData = {
//       date: data.date,
//       time: `${data.time}:00`,
//       leadId: leadData?.leadId || leadData?.id,
//       adminProcessStepId: data.adminProcessStepId,
//       comment: data.comments || "",
//     };
//     const response = await addManageLead(manageLeadData);
//     if (response.isSuccess) {
//       myToaster.showSuccessToast("Follow-up history added");
//       setShowModel(false);
//       setPopUpModel(false);
//       setShowHistoryGrid(true);
//       fetchFollowUpHistory();
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//   };

//   return (
//     <div>
//       {showHistoryGrid && <BreadcrumbComponent labels={breadcrumbData} />}
//       {popUpModel && (
//         <Modal open={open} onClose={handleClose}>
//           <Box sx={style}>
//             <Typography variant="h6">Manage Lead</Typography>
//             <Box component="form" sx={{ mt: 2 }} onSubmit={handleSubmit(onSubmit)}>
//               <TextField
//                 label="Follow-Up Date"
//                 type="date"
//                 InputLabelProps={{ shrink: true }}
//                 {...register("date", { required: "Follow-up date is required" })}
//                 error={Boolean(errors.date)}
//                 helperText={errors.date?.message}
//                 fullWidth sx={{ mb: 2 }}
//               />
//               <TextField
//                 label="Follow-Up Time"
//                 type="time"
//                 InputLabelProps={{ shrink: true }}
//                 {...register("time", { required: "Follow-up time is required" })}
//                 error={Boolean(errors.time)}
//                 helperText={errors.time?.message}
//                 fullWidth sx={{ mb: 2 }}
//               />
//               <FormControl fullWidth sx={{ mb: 2 }}>
//                 <InputLabel>Process Step</InputLabel>
//                 <Select {...register("adminProcessStepId", { required: "Process step is required" })} error={Boolean(errors.adminProcessStepId)}>
//                   {processSteps.map(step => (
//                     <MenuItem key={step.id} value={step.id}>{step.stepName}</MenuItem>
//                   ))}
//                 </Select>
//                 {errors.adminProcessStepId && <FormHelperText error>{errors.adminProcessStepId.message}</FormHelperText>}
//               </FormControl>
//               <TextField label="Comments" multiline rows={4} {...register("comments")} fullWidth sx={{ mb: 2 }} />
//               <Box sx={{ display: "flex", justifyContent: "space-between" }}>
//                 <Button variant="contained" color="primary" type="submit">Save</Button>
//                 <Button variant="outlined" color="error" onClick={handleClose}>Cancel</Button>
//               </Box>
//             </Box>
//           </Box>
//         </Modal>
//       )}
//       {showHistoryGrid && <Grid headers={[]} data={followUpHistory} tableName="Follow-Up History" addButtonLabel="Add Follow-Up" onAdd={handleManageLeadClick} />}
//     </div>
//   );
// }

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FaCog } from "react-icons/fa";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "../shared/Grid";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { addManageLead, leadFollowUpHistory } from "../../Services/LeadService";
import { getAllProcessSteps } from "../../Services/UserService";
import myToaster from "../../utils/toaster";
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../shared/Breadcrumb";

// Modal Style
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 500,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function BasicModal({
  leadData,
  onClose,
  showFollowup,
  showFollowUpHistory,
  popupForm,
  showHistory,
  onSave,
}) {
  const [open, setOpen] = useState(true); // Ensure modal state is managed correctly
  const [loading, setLoading] = useState(false);
  const [processSteps, setProcessSteps] = useState([]);
  const [followUpHistory, setFollowUpHistory] = useState([]);
  const [showModel, setShowModel] = useState(popupForm);
  const [showHistoryGrid, setShowHistoryGrid] = useState(showHistory);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProcessSteps();
    if (leadData?.id) fetchFollowUpHistory();
  }, [leadData]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchProcessSteps = async () => {
    try {
      const response = await getAllProcessSteps();
      if (response?.isSuccess) {
        setProcessSteps(response.result);
      } else {
        myToaster.showErrorToast(
          response?.message || "Failed to fetch process steps."
        );
      }
    } catch (error) {
      console.error("Error fetching process steps:", error);
    }
  };

  const fetchFollowUpHistory = async () => {
    setLoading(true);
    try {
      const response = await leadFollowUpHistory(leadData.id);
      if (response?.isSuccess) {
        const formattedHistory = response.result
          .map((history) => {
            const date = history.followUpDate
              ? history.followUpDate.split("T")[0]
              : null;
            const formattedDate = date
              ? date.split("-").reverse().join("-")
              : "";
            return { ...history, followUpDate: formattedDate };
          })
          .sort(
            (a, b) =>
              new Date(b.followUpDate.split("-").reverse().join("-")) -
              new Date(a.followUpDate.split("-").reverse().join("-"))
          );
        setFollowUpHistory(formattedHistory);
      }
    } catch (error) {
      console.error("Error fetching follow-up history:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setShowModel(false);
    setShowHistoryGrid(true);
    if (onClose) onClose();
  };

  const handleManageLeadClick = () => {
    setShowModel(true);
    setShowHistoryGrid(false);
  };

  const onSubmit = async (data) => {
    if (!leadData) {
      myToaster.showErrorToast("Lead data is missing.");
      return;
    }

    const manageLeadData = {
      date: data.date,
      time: `${data.time}:00`,
      leadId: leadData?.leadId || leadData?.id,
      adminProcessStepId: data.adminProcessStepId,
      comment: data.comments || "",
    };

    try {
      setLoading(true);
      const response = await addManageLead(manageLeadData);
      if (response?.isSuccess) {
        myToaster.showSuccessToast("Follow-up history added successfully.");
         // Close the modal
      setShowModel(false);
      setShowHistoryGrid(true);
      // Refresh the Follow-Up History Grid
      fetchFollowUpHistory();
        if (onSave) onSave();
      } else {
        myToaster.showErrorToast(
          response?.message || "Failed to save follow-up."
        );
      }
    } catch (error) {
      myToaster.showErrorToast("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  const followupColumns = [
    { key: "clientName", label: "Client Name" },
    { key: "leadProcessStep", label: "Lead Process Step" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "email", label: "Email" },
    { key: "leadComments", label: "Lead Comments" },
    { key: "followUpDate", label: "Follow-Up Date" },
  ];

  return (
    <div>
      {showHistoryGrid && (
        <BreadcrumbComponent
          labels={{
            module: "salesExecutive",
            currentRoute: "Follow-Up History",
          }}
        />
      )}

      <Modal
        open={showModel}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Manage Lead
          </Typography>
          <Box
            component="form"
            sx={{ mt: 2 }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              id="date"
              label="Follow-Up Date"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register("date", { required: "Follow-up date is required" })}
              error={Boolean(errors.date)}
              helperText={errors.date?.message}
              fullWidth
              sx={{ mb: 2 }}
            />
            <TextField
              id="time"
              label="Follow-Up Time"
              type="time"
              InputLabelProps={{ shrink: true }}
              {...register("time", { required: "Follow-up time is required" })}
              error={Boolean(errors.time)}
              helperText={errors.time?.message}
              fullWidth
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="process-step-label">Process Step</InputLabel>
              <Select
                labelId="process-step-label"
                id="adminProcessStepId"
                label="Process Step"
                {...register("adminProcessStepId", {
                  required: "Process step is required",
                })}
                error={Boolean(errors.adminProcessStepId)}
              >
                {processSteps.map((step) => (
                  <MenuItem key={step.id} value={step.id}>
                    {step.stepName}
                  </MenuItem>
                ))}
              </Select>
              {errors.adminProcessStepId && (
                <FormHelperText error>
                  {errors.adminProcessStepId.message}
                </FormHelperText>
              )}
            </FormControl>
            <TextField
              id="comments"
              label="Comments"
              multiline
              rows={4}
              {...register("comments")}
              fullWidth
              sx={{ mb: 2 }}
            />

            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? "Saving..." : "Save"}
              </Button>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleClose}
                sx={{ backgroundColor: "red", color: "white" }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>

      {showHistoryGrid && (
        <Grid
          headers={followupColumns}
          data={followUpHistory}
          tableName="Follow-Up History"
          onAdd={handleManageLeadClick}
        />
      )}
    </div>
  );
}
