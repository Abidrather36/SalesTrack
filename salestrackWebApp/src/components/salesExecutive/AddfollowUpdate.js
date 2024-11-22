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
//     if (flag) {
//       setshowHistoryGrid(false);
//       onClose()
//     } else {
//      setshowHistoryGrid(true)

//     }
  
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
//       } else {
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
//     const manageLeadData = {
//       date: data.date,
//       time: `${data.time}:00`,
//       leadId: leadData?.id,
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
//           <BreadcrumbComponent
//         labels={{
//           module:  "salesExecutive",
//           currentRoute: "Follow-Up History",
//         }}
//       />
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
//                 {...register("comments", { required: false })}
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

import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { FaCog } from "react-icons/fa";
import Grid from "../shared/Grid";
import { leadFollowUpHistory } from "../../Services/LeadService";
import { TextField, FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";
import { useForm } from "react-hook-form";
import { addManageLead } from "../../Services/LeadService";
import myToaster from "../../utils/toaster";
import { getAllProcessSteps } from "../../Services/UserService";
import { useNavigate } from "react-router-dom";
import Breadcrumbs from "../auth/BreadCrumbs";
import BreadcrumbComponent from "../shared/Breadcrumb";
const style = {
  position: "absolute",
  top: "50%",
  left: "60%",
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
}) {
  const [open, setOpen] = useState(true); // Manage Modal visibility
  const [showList, setShowList] = useState(showFoloowUpHistory); // Show follow-up history or lead list
  const [loading, setLoading] = useState(false);
  const [processSteps, setProcessSteps] = useState([]);
  const [followUpHistory, setFollowUpHistory] = useState([]);
  const [showManageLeadModal, setShowManageLeadModal] = useState(popupForm);
  const [showHistoryGrid, setShowHistoryGrid] = useState(showHistory);
  const [showLeadList, setShowLeadList] = useState(true); // To manage visibility of LeadList view
  const navigate = useNavigate();

  useEffect(() => {
    fetchProcessSteps();
    fetchFollowUpHistory();
  }, []);

  const { register, handleSubmit, formState: errors } = useForm();
  const currentPath = window.location.pathname; // e.g., "salesExective/leadList/followUp"
  const pathParts = currentPath.split("/").filter(Boolean); // ["salesExective", "leadList", "followUp"]

  // Breadcrumb labels for the modal
  const breadcrumbLabels = {
    module: pathParts[0], // "salesExective"
    currentRoute: pathParts[pathParts.length - 1], // "followUp"
  };
  // Handle Close button of Manage Lead modal
  const handleClose = () => {
    setShowManageLeadModal(false); // Close the Manage Lead modal
    setShowHistoryGrid(false); // Hide the follow-up history
    setShowLeadList(true); // Show the Lead List again
    onClose();
  };

  // Handle clicking the 'Manage Lead' button in Follow-up History grid
  const handleManageLeadClick = () => {
    setShowManageLeadModal(true);
    setShowHistoryGrid(false);
    setShowLeadList(false); // Hide the Lead List when Manage Lead modal is open
  };

  // Define the columns for the Follow-up History grid
  const followupColumns = [
    { key: "leadCompanyName",label:"Lead Company Name"},
    { key: "clientName", label: "Client Name" },
    { key: "leadProcessStep", label: "Lead Process Step" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "email", label: "Email" },
    { key: "leadComments", label: "Lead Comments" },
    { key: "followUpDate", label: "FollowUp Date" },
  ];

  // Fetch Follow-up History for the specific lead
  const fetchFollowUpHistory = async () => {
    setLoading(true);
    try {
      const response = await leadFollowUpHistory(leadData.id);
      if (response.isSuccess) {
        const formattedHistory = response.result
          .map((history) => {
            const date = history.followUpDate ? history.followUpDate.split("T")[0] : null;
            const formattedDate = date ? date.split("-").reverse().join("-") : "";
            return { ...history, followUpDate: formattedDate };
          })
          .sort(
            (a, b) =>
              new Date(b.followUpDate.split("-").reverse().join("-")) -
              new Date(a.followUpDate.split("-").reverse().join("-"))
          );
        setFollowUpHistory(formattedHistory);
      } else {
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  // Fetch the available process steps
  const fetchProcessSteps = async () => {
    const response = await getAllProcessSteps();
    if (response.isSuccess) {
      setProcessSteps(response.result);
    } else {
      myToaster.showErrorToast(response.message);
    }
  };

  // Handle form submission for Manage Lead
  const onSubmit = async (data) => {
    const manageLeadData = {
      date: data.date,
      time: `${data.time}:00`,
      leadId: leadData?.id,
      adminProcessStepId: data.adminProcessStepId,
      comment: data.comments || "",
    };
    const response = await addManageLead(manageLeadData);
    if (response.isSuccess) {
      myToaster.showSuccessToast("Follow-up history added");
      setShowManageLeadModal(false); 
      setShowHistoryGrid(true); 
      setShowLeadList(false); 
      fetchFollowUpHistory();
    } else {
      myToaster.showErrorToast(response.message);
    }
  };


  return (
    <div>
       <BreadcrumbComponent labels={breadcrumbLabels} />
      {/* Manage Lead Modal */}
      {showManageLeadModal && (
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
                {...register("date", { required: true })}
                error={Boolean(errors.date)}
                helperText={errors.date ? "Follow-up date is required" : ""}
                fullWidth
                sx={{ mb: 2 }}
              />
              <TextField
                id="time"
                label="Follow-Up Time"
                type="time"
                InputLabelProps={{ shrink: true }}
                {...register("time", { required: true })}
                error={Boolean(errors.time)}
                helperText={errors.time ? "Follow-up time is required" : ""}
                fullWidth
                sx={{ mb: 2 }}
              />
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel id="process-step-label">Process Step</InputLabel>
                <Select
                  labelId="process-step-label"
                  id="adminProcessStepId"
                  label="Process Step"
                  {...register("adminProcessStepId", { required: true })}
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
                {...register("comments", { required: false })}
                fullWidth
                sx={{ mb: 2 }}
              />

              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
                <Button
                  variant="outlined"
                  color="white"
                  onClick={handleClose}
                  style={{ backgroundColor: "red", color: "white" }}
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Box>
        </Modal>
      )}

      {/* Show Follow Up History Grid */}
      {showHistoryGrid && (
        <Grid
          headers={followupColumns}
          data={followUpHistory}
          tableName="FollowUp History"
          addButtonLabel="Add Follow Up History"
          onAdd={handleManageLeadClick}
        />
      )}

      {/* Show Lead List */}
      {showLeadList && (
        <div>
          {/* Your LeadList grid component or code to show the Lead List here */}
        </div>
      )}
    </div>
  );
}
