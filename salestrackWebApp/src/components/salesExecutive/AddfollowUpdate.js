// import React from "react";
// import Box from "@mui/material/Box";
// import Button from "@mui/material/Button";
// import { FaCog } from "react-icons/fa";
// import Typography from "@mui/material/Typography";
// import Modal from "@mui/material/Modal";
// import { Margin, TroubleshootTwoTone } from "@mui/icons-material";
// import Grid from "../shared/Grid";
// import { addManageLead, leadFollowUpHistory } from "../../Services/LeadService";
// import {TextField,FormControl,InputLabel,Select,MenuItem,FormHelperText,} from "@mui/material";
// import { useForm } from "react-hook-form";
// import { useState } from "react";
// import {
//   addFollowUpdate,
//   addLeadComment,
//   addLeadProcessStep,
// } from "../../Services/LeadService";
// import myToaster from "../../utils/toaster";
// import { getAllProcessSteps, getAllProcessStepsByCompany } from "../../Services/UserService";
// import { useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import BreadcrumbComponent from "../shared/Breadcrumb";
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
//   console.log(leadData);
//   const [open, setOpen] = useState(TroubleshootTwoTone);
//   const handleOpen = () => setOpen(true);
//   const [showList, setShowList] = useState(showFoloowUpHistory);
//   const [loading, setLoading] = useState(false);
//   const [processSteps, setProcessSteps] = useState([]);
//   const [followUpHistory, setFollowUpHistory] = useState([]);
//   const [showModel, setShowModel] = useState(true);
//   const navigate = useNavigate();
//   const [popUpModel, setpopUpModel] = useState(popupForm);
//   const [showHistoryGrid, setshowHistoryGrid] = useState(showHistory);

//   useEffect(() => {
//     fetchProcessSteps();
//     fetchFollowUpHistory();
//   }, []);

//   const { register, handleSubmit, formState: errors } = useForm();

//   const flag=false;

//   const handleClose = () => {
//     setpopUpModel(false);
//     setshowHistoryGrid(followUpHistory);
//     if (onClose) onClose();
//   };

//   const handleManageLeadClick = () => {
//     setpopUpModel(true);
//     setshowHistoryGrid(false);
//   };

//   const followupColumns = [
//     { key: "clientName", label: "Client Name" },
//     { key: "leadProcessStep", label: "Lead Process Step" },
//     { key: "phoneNumber", label: "Phone Number" },
//     { key: "email", label: "Email" },
//     { key: "leadComments", label: "Lead Comments" },
//     { key: "followUpDate", label: "FollowUp Date" },
//   ];

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
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProcessSteps = async () => {
//       const response = await getAllProcessSteps();
//       if (response.isSuccess) {
//         setProcessSteps(response.result);
//       }
//       else{
//         myToaster.showErrorToast(response.message)
//       }
//     }
  
//   const onSubmit = async (data) => {
//     console.log("save btn clicked");
//     console.log(data)
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
//       myToaster.showSuccessToast("followup history added");
//       setShowModel(false);
//       setpopUpModel(false)
//       setshowHistoryGrid(true)      
//       fetchFollowUpHistory();
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//   };

//   return (
//     <div>
//       {/* Conditionally render Breadcrumb only when showHistoryGrid is true */}
//       {showHistoryGrid && (
//         <BreadcrumbComponent
//           labels={{
//             module:  "salesExecutive",
//             currentRoute: "Follow-Up History",
//           }}
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

//       {showHistoryGrid && (
//         <Grid
//           headers={followupColumns}
//           data={followUpHistory}
//           tableName="FollowUp History"
//           addButtonLabel="Add Follow Up History"
//           onAdd={handleManageLeadClick}
//           buttons={[
//             {
//               // key: "manageLead",
//               // title: "Manage Lead",
//               // className: "btn btn-warning",
//               // icon: <FaCog />,
//               // onClick: handleManageLeadClick,
//             },
//           ]}
//         />
//       )}
//     </div>
//   );
// }

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
//   const [followUpHistory, setFollowUpHistory] = useState([]);
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
//                   onClick={handleClose}
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


import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { FaCog } from "react-icons/fa";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Grid from "../shared/Grid";
import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
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
  showFallowup,
  showFoloowUpHistory,
  popupForm,
  showHistory,
  onSave, // This is the callback function passed from parent to handle saving behavior
}) {
  const [open, setOpen] = useState(true); // Initially open the modal
  const [loading, setLoading] = useState(false);
  const [processSteps, setProcessSteps] = useState([]);
  const [followUpHistory, setFollowUpHistory] = useState([]);
  const [showModel, setShowModel] = useState(true);
  const [showHistoryGrid, setShowHistoryGrid] = useState(showHistory); // Control the display of follow-up history grid
  const navigate = useNavigate();

  useEffect(() => {
    fetchProcessSteps();
    fetchFollowUpHistory();
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const fetchProcessSteps = async () => {
    try {
      const response = await getAllProcessSteps();
      if (response.isSuccess) {
        setProcessSteps(response.result);
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (error) {
      console.error("Error fetching process steps:", error);
    }
  };

  const fetchFollowUpHistory = async () => {
    setLoading(true);
    try {
      const response = await leadFollowUpHistory(leadData.id);
      if (response.isSuccess) {
        const formattedHistory = response.result
          .map((history) => {
            const date = history.followUpDate ? history.followUpDate.split("T")[0] : null;
            const formattedDate = date ? date.split("-").reverse().join("-") : "";
            return {
              ...history,
              followUpDate: formattedDate,
            };
          })
          .sort((a, b) => new Date(b.followUpDate.split("-").reverse().join("-")) - new Date(a.followUpDate.split("-").reverse().join("-")));
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
    setShowHistoryGrid(true); // After closing, show the history grid again
    if (onClose) onClose();
  };

  const handleManageLeadClick = () => {
    setShowModel(true);
    setShowHistoryGrid(false);
  };

  const onSubmit = async (data) => {
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
      if (response.isSuccess) {
        myToaster.showSuccessToast("Follow-up history added");

        // If onSave callback is provided, execute it (e.g., to refresh data or navigate)
        if (onSave) {
          onSave(); // This will trigger the callback passed from the parent component
        }
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (error) {
      myToaster.showErrorToast("An error occurred while saving");
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
    { key: "followUpDate", label: "FollowUp Date" },
  ];

  return (
    <div>
      {/* Breadcrumb only when showHistoryGrid is true */}
      {showHistoryGrid && (
        <BreadcrumbComponent
          labels={{
            module: "salesExecutive",
            currentRoute: "Follow-Up History",
          }}
        />
      )}

      {showModel && (
        <Modal
          open={open}
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
                helperText={errors.date ? errors.date.message : ""}
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
                helperText={errors.time ? errors.time.message : ""}
                fullWidth
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="process-step-label">Process Step</InputLabel>
                <Select
                  labelId="process-step-label"
                  id="adminProcessStepId"
                  label="Process Step"
                  {...register("adminProcessStepId", { required: "Process step is required" })}
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
                <Button variant="contained" color="primary" type="submit" disabled={loading}>
                  {loading ? "Saving..." : "Save"}
                </Button>
                <Button
                  variant="outlined"
                  color="secondary"
                  onClick={handleClose} // Handle cancel here
                  sx={{ backgroundColor: "red", color: "white" }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}

      {showHistoryGrid && (
        <Grid
          headers={followupColumns}
          data={followUpHistory}
          tableName="Follow-Up History"
          addButtonLabel="Add Follow-Up History"
          onAdd={handleManageLeadClick}
        />
      )}
    </div>
  );
}
