
// import React, { useState, useEffect } from "react";
// import Grid from "../shared/Grid";
// import { FaEdit, FaPlus, FaTrash, FaCog, FaHistory ,FaCalendarDay} from "react-icons/fa";
// import BreadcrumbComponent from "../shared/Breadcrumb";
// import { addFollowUpdate, getAllLeads } from "../../Services/LeadService";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { leadSources as getLeadSources } from "../../Services/LeadSource";
// import { toast } from "react-toastify";
// import { updateLead } from "../../Services/LeadService";
// import { getAllProcessSteps, UserLists } from "../../Services/UserService";
// import { deleteLead as deleteLeadService } from "../../Services/LeadService";
// import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
// import myToaster from "../../utils/toaster";
// import BasicModal from "./AddfollowUpdate";
// import { CircularProgress } from "@mui/material";

// function LeadList(props) {
//   const [leads, setLeads] = useState([]);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [showGrid, setShowGrid] = useState(true);
//   const [leadSources, setLeadSources] = useState([]);
//   const [userAssignTo, setUserAssignTo] = useState([]);
//   const [leadData, setLeadData] = useState({});
//   const [followUpdatePopup, setFollowUpdatePopup] = useState(false);
//   const [showFollowupHistoryGrid, setshowFollowupHistoryGrid] = useState(false);

//   useEffect(() => {
//     fetchAllLeads();
//     fetchLeadSources();
//     fetchAssignTo();
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const fetchLeadSources = async () => {
//     try {
//       const res = await getLeadSources();
//       setLeadSources(res.result);
//     } catch (error) {
//       toast.error("Failed to load lead sources.");
//     }
//   };

//   const editLead = (lead) => {
//     myToaster.editLeadSwal(lead, userAssignTo, leadSources, fetchAllLeads);
//   };

//   const headers = [
//     { key: "name", label: "LeadName" },
//     { key: "email", label: "Email" },
//     { key: "contactPerson", label: "Contact Person" }, 
//     { key: "phoneNumber", label: "Phone Number" },
//     { key: "leadSourceName", label: "Lead Source" },
//     { key: "assignedTo", label: "Assigned To" },
//     { key: "finalStatus", label: "Lead Status" },
//   ];

//   const deleteLead = (leadId) => {
//     confirmDialog({
//       message: "Are you sure you want to delete this lead?",
//       header: "Delete Confirmation",
//       icon: "pi pi-exclamation-triangle",
//       accept: async () => {
//         try {
//           const response = await deleteLeadService(leadId);
//           if (response.isSuccess) {
//             toast.success(response.message);
//             fetchAllLeads();
//           } else {
//             toast.error(response.message);
//           }
//         } catch (error) {
//           toast.error("An error occurred while deleting the lead.");
//         }
//       },
//       reject: () => {
//         toast.info("Deletion cancelled");
//       },
//     });
//   };

//   const fetchAllLeads = async () => {
//       setLoading(true);
//       const response = await getAllLeads();
//       if(response.result){
//         setLeads(response.result)
//       }
//       else{
//         myToaster.showErrorToast(response.message)
//       }
//       setLoading(false);
//   };

//   const fetchAssignTo = async () => {
//     try {
//       const response = await UserLists();
//       setUserAssignTo(response.result);
//     } catch (error) {
//       toast.error("Failed to fetch users for assignment.");
//     }
//   };

//   const manageLead = (lead) => {
//     setLeadData(lead);
//     setFollowUpdatePopup(true); 
//     setShowGrid(false);
//   };

//   const mangeClosePopup=()=>{
//     console.log("close triggered")
//     setFollowUpdatePopup(false); 
//     setShowGrid(true);
//   }

//   const fetchFollowUpHistoryHandler = (lead) => {
//     setLeadData(lead);
//     setShowGrid(false);
//     setshowFollowupHistoryGrid(true)
//   };
//   const todaysFollowUp=()=>{

//   }

//   return (
//     <>
//       <ConfirmDialog style={{ height: "150px" }} />
//       {showGrid && (
//         <div>
//           <BreadcrumbComponent
//             labels={{ module: "SalesExecutive", currentRoute: "leads" }}
//           />
//           <Grid
//             headers={headers}
//             buttons={[
//               {
//                 key: "edit",
//                 title: "Edit",
//                 className: "btn btn-primary",
//                 onEditHandler: (lead) => editLead(lead),
//                 icon: <FaEdit />,
//               },
//               {
//                 key: "delete",
//                 title: "Delete",
//                 className: "btn btn-danger",
//                 onDeleteHandler: (lead) => deleteLead(lead.id),
//                 icon: <FaTrash />,
//               },
//               {
//                 key: "add",
//                 title: "Manage Lead",
//                 className: "btn btn-warning",
//                 onAddFollowUpdate: (lead) => manageLead(lead),
//                 icon: <FaCog />,
//               },
//               {
//                 key: "followUpHistory",
//                 title: "Follow Up History",
//                 className: "btn btn-warning",
//                 onAddFollowUpHistory: (lead) =>
//                   fetchFollowUpHistoryHandler(lead),
//                 icon: <FaHistory />,
//               },
             
//             ]}
//             data={leads}
//             loading={loading}
//             onAdd={() => navigate("/salesExecutive/add-new-lead")}
//             tableName="Leads"
//             addButtonLabel="Add Lead"
//           />
//         </div>
//       )}

//        {followUpdatePopup && (
//         <BasicModal
//           leadData={leadData}
//           onClose={() => mangeClosePopup()}
//           popupForm={true}
//           showHistory={false}
          
//         />
//       )}
//       {showFollowupHistoryGrid && (
//         <BasicModal
//           leadData={leadData}
//           popupForm={false}
//           showHistory={true}
//         />
//       )} 
//     </>
//   );
// }

// export default LeadList;


// original
// import React, { useState, useEffect } from "react";
// import Grid from "../shared/Grid";
// import { FaEdit, FaPlus, FaTrash, FaCog, FaHistory, FaCalendarDay } from "react-icons/fa";
// import BreadcrumbComponent from "../shared/Breadcrumb";
// import { addFollowUpdate, getAllLeads } from "../../Services/LeadService";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { leadSources as getLeadSources } from "../../Services/LeadSource";
// import { toast } from "react-toastify";
// import { updateLead } from "../../Services/LeadService";
// import { getAllProcessSteps, UserLists } from "../../Services/UserService";
// import { deleteLead as deleteLeadService } from "../../Services/LeadService";
// import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
// import myToaster from "../../utils/toaster";
// import BasicModal from "./AddfollowUpdate";
// import { CircularProgress } from "@mui/material";

// function LeadList(props) {
//   const [leads, setLeads] = useState([]);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [showGrid, setShowGrid] = useState(true);
//   const [leadSources, setLeadSources] = useState([]);
//   const [userAssignTo, setUserAssignTo] = useState([]);
//   const [leadData, setLeadData] = useState({});
//   const [followUpdatePopup, setFollowUpdatePopup] = useState(false);
//   const [showFollowupHistoryGrid, setShowFollowupHistoryGrid] = useState(false);

//   useEffect(() => {
//     fetchAllLeads();
//     fetchLeadSources();
//     fetchAssignTo();
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const fetchLeadSources = async () => {
//     try {
//       const res = await getLeadSources();
//       setLeadSources(res.result);
//     } catch (error) {
//       toast.error("Failed to load lead sources.");
//     }
//   };

//   const editLead = (lead) => {
//     myToaster.editLeadSwal(lead, userAssignTo, leadSources, fetchAllLeads);
//   };

//   const headers = [
//     { key: "name", label: "Lead Name" },
//     { key: "email", label: "Email" },
//     { key: "contactPerson", label: "Contact Person" },
//     { key: "phoneNumber", label: "Phone Number" },
//     { key: "leadSourceName", label: "Lead Source" },
//     { key: "assignedTo", label: "Assigned To" },
//     { key: "finalStatus", label: "Lead Status" },
//   ];

//   const deleteLead = (leadId) => {
//     confirmDialog({
//       message: "Are you sure you want to delete this lead?",
//       header: "Delete Confirmation",
//       icon: "pi pi-exclamation-triangle",
//       accept: async () => {
//         try {
//           const response = await deleteLeadService(leadId);
//           if (response.isSuccess) {
//             toast.success(response.message);
//             fetchAllLeads();
//           } else {
//             toast.error(response.message);
//           }
//         } catch (error) {
//           toast.error("An error occurred while deleting the lead.");
//         }
//       },
//       reject: () => {
//         toast.info("Deletion cancelled");
//       },
//     });
//   };

//   const fetchAllLeads = async () => {
//     setLoading(true);  // Start loading when fetching leads
//     const response = await getAllLeads();
//     if (response.result) {
//       setLeads(response.result);
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//     setLoading(false);  // Stop loading after fetching leads
//   };

//   const fetchAssignTo = async () => {
//     try {
//       const response = await UserLists();
//       setUserAssignTo(response.result);
//     } catch (error) {
//       toast.error("Failed to fetch users for assignment.");
//     }
//   };

//   const manageLead = (lead) => {
//     setLeadData(lead);
//     setFollowUpdatePopup(true);
//     setShowGrid(false);
//   };

//   const mangeClosePopup = () => {
//     setFollowUpdatePopup(false);
//     setShowGrid(true);
//   };

//   const fetchFollowUpHistoryHandler = (lead) => {
//     setLeadData(lead);
//     setShowGrid(false);
//     setShowFollowupHistoryGrid(true);
//   };

//   return (
//     <>
//       <ConfirmDialog style={{ height: "150px" }} />
//       {showGrid && (
//         <div>
//           <BreadcrumbComponent
//             labels={{ module: "SalesExecutive", currentRoute: "leads" }}
//           />
          
//           {/* Show CircularProgress only when loading is true */}
//           {loading && (
//             <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
//               <CircularProgress />
//             </div>
//           )}

//           {!loading && (
//             <Grid
//               headers={headers}
//               buttons={[
//                 {
//                   key: "edit",
//                   title: "Edit",
//                   className: "btn btn-primary",
//                   onEditHandler: (lead) => editLead(lead),
//                   icon: <FaEdit />,
//                 },
//                 {
//                   key: "delete",
//                   title: "Delete",
//                   className: "btn btn-danger",
//                   onDeleteHandler: (lead) => deleteLead(lead.id),
//                   icon: <FaTrash />,
//                 },
//                 {
//                   key: "add",
//                   title: "Manage Lead",
//                   className: "btn btn-warning",
//                   onAddFollowUpdate: (lead) => manageLead(lead),
//                   icon: <FaCog />,
//                 },
//                 {
//                   key: "followUpHistory",
//                   title: "Follow Up History",
//                   className: "btn btn-warning",
//                   onAddFollowUpHistory: (lead) => fetchFollowUpHistoryHandler(lead),
//                   icon: <FaHistory />,
//                 },
//               ]}
//               data={leads}
//               onAdd={() => navigate("/salesExecutive/add-new-lead")}
//               tableName="Leads"
//               addButtonLabel="Add Lead"
//             />
//           )}
//         </div>
//       )}

//       {followUpdatePopup && (
//         <BasicModal
//           leadData={leadData}
//           onClose={() => mangeClosePopup()}
//           popupForm={true}
//           showHistory={false}
//         />
//       )}

//       {showFollowupHistoryGrid && (
//         <BasicModal
//           leadData={leadData}
//           popupForm={false}
//           showHistory={true}
//         />
//       )}
//     </>
//   );
// }

// export default LeadList;


import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid";
import { FaEdit, FaPlus, FaTrash, FaCog, FaHistory, FaCalendarDay } from "react-icons/fa";
import BreadcrumbComponent from "../shared/Breadcrumb";
import { addFollowUpdate, getAllLeads, leadFollowUpHistory } from "../../Services/LeadService";  // Add the function to fetch follow-up history
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { leadSources as getLeadSources } from "../../Services/LeadSource";
import { toast } from "react-toastify";
import { updateLead } from "../../Services/LeadService";
import { getAllProcessSteps, UserLists } from "../../Services/UserService";
import { deleteLead as deleteLeadService } from "../../Services/LeadService";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import myToaster from "../../utils/toaster";
import BasicModal from "./AddfollowUpdate";
import { CircularProgress } from "@mui/material";

function LeadList(props) {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [leadSources, setLeadSources] = useState([]);
  const [userAssignTo, setUserAssignTo] = useState([]);
  const [leadData, setLeadData] = useState({});
  const [followUpdatePopup, setFollowUpdatePopup] = useState(false);
  const [showFollowupHistoryGrid, setShowFollowupHistoryGrid] = useState(false);
  const [followUpHistory, setFollowUpHistory] = useState([]);  // New state to store the follow-up history

  const navigate = useNavigate();

  useEffect(() => {
    fetchAllLeads();
    fetchLeadSources();
    fetchAssignTo();
  }, []);

  const fetchLeadSources = async () => {
    try {
      const res = await getLeadSources();
      setLeadSources(res.result);
    } catch (error) {
      toast.error("Failed to load lead sources.");
    }
  };

  const fetchAllLeads = async () => {
    setLoading(true);
    const response = await getAllLeads();
    if (response.result) {
      setLeads(response.result);
    } else {
      myToaster.showErrorToast(response.message);
    }
    setLoading(false);
  };

  const fetchAssignTo = async () => {
    try {
      const response = await UserLists();
      setUserAssignTo(response.result);
    } catch (error) {
      toast.error("Failed to fetch users for assignment.");
    }
  };

  const fetchFollowUpHistoryHandler = async (lead) => {
    setLeadData(lead);
    setShowGrid(false);
    setShowFollowupHistoryGrid(true);
    try {
      setLoading(true);
      const response = await leadFollowUpHistory(lead.id); 
      if (response.success) {
        setFollowUpHistory(response.result);
      } else {
        toast.error(response.message || "Failed to load follow-up history.");
      }
    } catch (error) {
      toast.error("An error occurred while fetching follow-up history.");
    } finally {
      setLoading(false);
    }
  };

  const editLead = (lead) => {
    myToaster.editLeadSwal(lead, userAssignTo, leadSources, fetchAllLeads);
  };

  const deleteLead = (leadId) => {
    confirmDialog({
      message: "Are you sure you want to delete this lead?",
      header: "Delete Confirmation",
      icon: "pi pi-exclamation-triangle",
      accept: async () => {
        try {
          const response = await deleteLeadService(leadId);
          if (response.isSuccess) {
            toast.success(response.message);
            fetchAllLeads();
          } else {
            toast.error(response.message);
          }
        } catch (error) {
          toast.error("An error occurred while deleting the lead.");
        }
      },
      reject: () => {
        toast.info("Deletion cancelled");
      },
    });
  };

  const manageLead = (lead) => {
    setLeadData(lead);
    setFollowUpdatePopup(true);
    setShowGrid(false);
  };

  const mangeClosePopup = () => {
    setFollowUpdatePopup(false);
    setShowGrid(true);
  };

  const headers = [
    { key: "name", label: "Lead Name" },
    { key: "email", label: "Email" },
    { key: "contactPerson", label: "Contact Person" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "leadSourceName", label: "Lead Source" },
    { key: "assignedTo", label: "Assigned To" },
    { key: "finalStatus", label: "Lead Status" },
  ];

  return (
    <>
      <ConfirmDialog style={{ height: "150px" }} />
      {showGrid && (
        <div>
          <BreadcrumbComponent
            labels={{ module: "SalesExecutive", currentRoute: "leads" }}
          />
          
          {/* Show CircularProgress only when loading is true */}
          {loading && (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <CircularProgress />
            </div>
          )}

          {!loading && (
            <Grid
              headers={headers}
              buttons={[
                {
                  key: "edit",
                  title: "Edit",
                  className: "btn btn-primary",
                  onEditHandler: (lead) => editLead(lead),
                  icon: <FaEdit />,
                },
                {
                  key: "delete",
                  title: "Delete",
                  className: "btn btn-danger",
                  onDeleteHandler: (lead) => deleteLead(lead.id),
                  icon: <FaTrash />,
                },
                {
                  key: "add",
                  title: "Manage Lead",
                  className: "btn btn-warning",
                  onAddFollowUpdate: (lead) => manageLead(lead),
                  icon: <FaCog />,
                },
                {
                  key: "followUpHistory",
                  title: "Follow Up History",
                  className: "btn btn-warning",
                  onAddFollowUpHistory: (lead) => fetchFollowUpHistoryHandler(lead),
                  icon: <FaHistory />,
                },
              ]}
              data={leads}
              onAdd={() => navigate("/salesExecutive/add-new-lead")}
              tableName="Leads"
              addButtonLabel="Add Lead"
            />
          )}
        </div>
      )}

      {followUpdatePopup && (
        <BasicModal
          leadData={leadData}
          onClose={() => mangeClosePopup()}
          popupForm={true}
          showHistory={false}
        />
      )}

      {showFollowupHistoryGrid && (
        <BasicModal
          leadData={leadData}
          popupForm={false}
          showHistory={true}
          followUpHistory={followUpHistory}  // Pass follow-up history data to modal
        />
      )}
    </>
  );
}

export default LeadList;
