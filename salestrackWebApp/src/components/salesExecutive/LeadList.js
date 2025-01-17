// // original
import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid";
import { FaEdit, FaPlus, FaTrash, FaCog, FaHistory, FaCalendarDay } from "react-icons/fa";
import BreadcrumbComponent from "../shared/Breadcrumb";
import { addFollowUpdate, deleteLeadById, getAllLeads } from "../../Services/LeadService";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { leadSources as getLeadSources } from "../../Services/LeadSource";
import { toast } from "react-toastify";
import { updateLead } from "../../Services/LeadService";
import { getAllProcessSteps, UserLists } from "../../Services/UserService";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
import myToaster from "../../utils/toaster";
import BasicModal from "./AddfollowUpdate";
import { CircularProgress } from "@mui/material";
import { deleteCompanyById } from "../../Services/CompanyService";

function LeadList(props) {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [leadSources, setLeadSources] = useState([]);
  const [userAssignTo, setUserAssignTo] = useState([]);
  const [leadData, setLeadData] = useState({});
  const [followUpdatePopup, setFollowUpdatePopup] = useState(false);
  const [showFollowupHistoryGrid, setShowFollowupHistoryGrid] = useState(false);

  useEffect(() => {
    const initialize = async () => {
      await Promise.all([fetchAllLeads(), fetchLeadSources(), fetchAssignTo()]);
    };
    initialize();
  }, []);

  let user =JSON.parse(localStorage.getItem("user"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  let addButtonNavigate=() => {
    if(user.userRole==3){
      navigate("/salesExecutive/add-new-lead");
    }
    else if(user.userRole==4){
      navigate("/salesManager/add-new-lead");
    }
    else{
      myToaster.showErrorToast("User role is not authorized to add leads.");
    }
  }
  const fetchLeadSources = async () => {
    try {
      const res = await getLeadSources();
      setLeadSources(res.result);
    } catch (error) {
      toast.error("Failed to load lead sources.");
    }
  };

  const editLead = (lead) => {
    console.log(lead)
    myToaster.editLeadSwal(lead, userAssignTo, leadSources,updateLeadInState);
  };

  const headers = [
    { key: "leadCompanyName", label: "Company Name" },
    { key: "leadName", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "leadSourceName", label: "Source" },
    { key: "assignedTo", label: "Assigned To" },
    { key: "finalStatus", label: " Status" },
    { key :"leadCategoryName",label:"Category "},
    { key: "leadRank", label: "Rank"},
    { key: "createdDate", label: "Created Date" },
    { key: "isActive",label:"IsActive"},
    { key:"comment" ,label:"Comment"}
  ];

  const deleteLeadHandler =async (id)=>{
    console.log(id)
    const response = await deleteLeadById(id);
    if(response.isSuccess){
      myToaster.showSuccessToast(response.message)
      fetchAllLeads();
    }
    else{
      myToaster.showErrorToast(response.message);
    }
  }
  const deleteLead = (lead) => {
    console.log(lead)
      myToaster.primereactDeleteConfirmLead(lead,deleteLeadHandler)
  };

  const fetchAllLeads = async () => {
    setLoading(true);  
    const response = await getAllLeads();
    console.log("lead List ->",response.result)
    if (response.result) {
      console.log("leadList Date",response.result)
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

  const manageLead = (lead) => {
    setLeadData(lead);
    setFollowUpdatePopup(true);
    setShowGrid(false);
  };

  const mangeClosePopup = () => {
    setFollowUpdatePopup(false);
    setShowGrid(true);
    
  };

  const fetchFollowUpHistoryHandler = (lead) => {
    setLeadData(lead);
    setShowGrid(false);
    setFollowUpdatePopup(false);
    setShowFollowupHistoryGrid(true);
  };
  const saveAndRedirectToFollowUpHistory = (updatedLead) => {
    setLeads((prevLeads) =>
      prevLeads.map((lead) =>
        lead.id === updatedLead.id ? { ...lead, ...updatedLead } : lead
      )
    );
    let user= JSON.parse( localStorage.getItem("user"))
    if(user.userRole ===3){
      navigate(`/salesExecutive/follow-up-history/${updatedLead.id}`);
    }
    else if(user.userRole==4){
      navigate(`/salesManager/follow-up-history/${updatedLead.id}`);
    }
  };
  const updateLeadInState = (updatedLead) => {
    setLeads((prevLeads) =>
        prevLeads.map((lead) =>
            lead.id === updatedLead.id ? { ...lead, ...updatedLead } : lead
        )
    );
};
  return (
    <>
      <ConfirmDialog/>
      {showGrid && (
        <div>
          <BreadcrumbComponent
            labels={{ module: "SalesExecutive", currentRoute: "leads" }}
          />
          
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
                  onEditHandler: (data) => editLead(data),
                  icon: <FaEdit />,
                },
                {
                  key: "delete",
                  title: "Delete",
                  className: "btn btn-danger",
                  onDeleteHandler: (data) => deleteLead(data),
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
              onAdd={addButtonNavigate}
              tableName="Leads"
              addButtonLabel="Add Lead"
            />
          )}
        </div>
      )}

       {/* Basic Modal for Managing Lead */}
       {followUpdatePopup && (
        <BasicModal
          leadData={leadData}
          onClose={mangeClosePopup}
          popupForm={true} // Show form inside modal
          showHistory={false}
          onSave={saveAndRedirectToFollowUpHistory} 
        />
      )}

      {/* Follow-up History Grid */}
      {showFollowupHistoryGrid && (
        <BasicModal
          leadData={leadData}
          popupForm={false} // No form inside modal, only history
          showHistory={true}
          leadIdKey="id"
          context="leadList"
        />
      )}
    </>
  );
}

export default LeadList;

// import React, { useState, useEffect } from "react";
// import Grid from "../shared/Grid";
// import { FaEdit, FaPlus, FaTrash, FaCog, FaHistory, FaCalendarDay } from "react-icons/fa";
// import BreadcrumbComponent from "../shared/Breadcrumb";
// import { addFollowUpdate, deleteLeadById, getAllLeads } from "../../Services/LeadService";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { leadSources as getLeadSources } from "../../Services/LeadSource";
// import { toast } from "react-toastify";
// import { updateLead } from "../../Services/LeadService";
// import { getAllProcessSteps, UserLists } from "../../Services/UserService";
// import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog";
// import myToaster from "../../utils/toaster";
// import BasicModal from "./AddfollowUpdate";
// import { CircularProgress } from "@mui/material";
// import { deleteCompanyById } from "../../Services/CompanyService";

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
//     const initialize = async () => {
//       await Promise.all([fetchAllLeads(), fetchLeadSources(), fetchAssignTo()]);
//     };
//     initialize();
//   }, []);

//   let user = JSON.parse(localStorage.getItem("user"));
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const addButtonNavigate = () => {
//     if (user.userRole == 3) {
//       navigate("/salesExecutive/add-new-lead");
//     } else if (user.userRole == 4) {
//       navigate("/salesManager/add-new-lead");
//     } else {
//       myToaster.showErrorToast("User role is not authorized to add leads.");
//     }
//   };

//   const fetchLeadSources = async () => {
//     try {
//       const res = await getLeadSources();
//       setLeadSources(res.result);
//     } catch (error) {
//       toast.error("Failed to load lead sources.");
//     }
//   };

//   const editLead = (lead) => {
//     console.log(lead);
//     myToaster.editLeadSwal(lead, userAssignTo, leadSources, updateLeadInState);
//   };

//   const headers = [
//     { key: "leadCompanyName", label: "Company Name" },
//     { key: "leadName", label: "Name" },
//     { key: "email", label: "Email" },
//     { key: "phoneNumber", label: "Phone Number" },
//     { key: "leadSourceName", label: "Source" },
//     { key: "assignedTo", label: "Assigned To" },
//     { key: "finalStatus", label: " Status" },
//     { key: "leadCategoryName", label: "Category " },
//     { key: "leadRank", label: "Rank" },
//     { key: "createdDate", label: "Created Date" },
//     { key: "isActive", label: "IsActive" },
//     { key: "comment", label: "Comment" },
//   ];

//   const deleteLeadHandler = async (id) => {
//     console.log(id);
//     const response = await deleteLeadById(id);
//     if (response.isSuccess) {
//       myToaster.showSuccessToast(response.message);
//       fetchAllLeads();
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//   };

//   const deleteLead = (lead) => {
//     console.log(lead);
//     myToaster.primereactDeleteConfirmLead(lead, deleteLeadHandler);
//   };

//   const fetchAllLeads = async () => {
//     setLoading(true);
//     const response = await getAllLeads();
//     console.log("lead List ->", response.result);
//     if (response.result) {
//       console.log("leadList Date", response.result);
//       setLeads(response.result);
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//     setLoading(false);
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

//   const updateLeadInState = (updatedLead) => {
//     setLeads((prevLeads) =>
//       prevLeads.map((lead) =>
//         lead.id === updatedLead.id ? { ...lead, ...updatedLead } : lead
//       )
//     );
//   };

//   // New logic for redirecting to Follow-Up History after saving lead
//   const saveAndRedirectToFollowUpHistory = (updatedLead) => {
//     updateLeadInState(updatedLead);
//     navigate(`/salesExecutive/follow-up-history/${updatedLead.id}`);
//   };

//   return (
//     <>
//       <ConfirmDialog />
//       {showGrid && (
//         <div>
//           <BreadcrumbComponent
//             labels={{ module: "SalesExecutive", currentRoute: "leads" }}
//           />

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
//                   onEditHandler: (data) => editLead(data),
//                   icon: <FaEdit />,
//                 },
//                 {
//                   key: "delete",
//                   title: "Delete",
//                   className: "btn btn-danger",
//                   onDeleteHandler: (data) => deleteLead(data),
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
//               onAdd={addButtonNavigate}
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
//           onSave={saveAndRedirectToFollowUpHistory} // Pass the save and redirect function
//         />
//       )}

//       {showFollowupHistoryGrid && (
//         <BasicModal
//           leadData={leadData}
//           popupForm={false}
//           showHistory={true}
//           leadIdKey="id"
//           context="leadList"
//         />
//       )}
//     </>
//   );
// }

// export default LeadList;



// import React, { useState, useEffect } from "react";
// import Grid from "../shared/Grid";
// import { FaEdit, FaTrash, FaCog, FaHistory } from "react-icons/fa";
// import BreadcrumbComponent from "../shared/Breadcrumb";
// import { addFollowUpdate, deleteLeadById, getAllLeads } from "../../Services/LeadService";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { leadSources as getLeadSources } from "../../Services/LeadSource";
// import { toast } from "react-toastify";
// import { updateLead } from "../../Services/LeadService";
// import { UserLists } from "../../Services/UserService";
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
//     const initialize = async () => {
//       await Promise.all([fetchAllLeads(), fetchLeadSources(), fetchAssignTo()]);
//     };
//     initialize();
//   }, []);

//   const user = JSON.parse(localStorage.getItem("user"));
//   const editLead = (lead) => {
//         console.log(lead)
//         myToaster.editLeadSwal(lead, userAssignTo, leadSources,updateLeadInState);
//       };
//   const fetchLeadSources = async () => {
//     try {
//       const res = await getLeadSources();
//       setLeadSources(res.result);
//     } catch (error) {
//       toast.error("Failed to load lead sources.");
//     }
//   };

//   const fetchAllLeads = async () => {
//     setLoading(true);
//     const response = await getAllLeads();
//     if (response.result) {
//       setLeads(response.result);
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//     setLoading(false);
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
//     setFollowUpdatePopup(true); // Open the modal form
//     setShowGrid(false); // Hide the grid
//     setShowFollowupHistoryGrid(false); // Ensure follow-up history grid is hidden
//   };

//   const mangeClosePopup = () => {
//     setFollowUpdatePopup(false);
//     setShowGrid(true); // Show the grid when modal is closed
//     setShowFollowupHistoryGrid(false); // Ensure follow-up history grid is hidden
//   };

//   const fetchFollowUpHistoryHandler = (lead) => {
//     setLeadData(lead);
//     setShowFollowupHistoryGrid(true); // Show the history grid
//     setShowGrid(false); // Hide the main grid
//     setFollowUpdatePopup(false); // Ensure the form modal is hidden
//   };

//   const saveAndRedirectToFollowUpHistory = (updatedLead) => {
//     setLeads((prevLeads) =>
//       prevLeads.map((lead) =>
//         lead.id === updatedLead.id ? { ...lead, ...updatedLead } : lead
//       )
//     );
//     let user= JSON.parse( localStorage.getItem("user"))
//     if(user.userRole ===3){
//       navigate(`/salesExecutive/follow-up-history/${updatedLead.id}`);
//     }
//     else if(user.userRole==4){
//       navigate(`/salesManager/follow-up-history/${updatedLead.id}`);
//     }
//   };

//   const deleteLeadHandler = async (id) => {
//     const response = await deleteLeadById(id);
//     if (response.isSuccess) {
//       myToaster.showSuccessToast(response.message);
//       fetchAllLeads(); // Re-fetch leads after deletion
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//   };

//   const deleteLead = (lead) => {
//     myToaster.primereactDeleteConfirmLead(lead, deleteLeadHandler);
//   };

//   const headers = [
//     { key: "leadCompanyName", label: "Company Name" },
//     { key: "leadName", label: "Name" },
//     { key: "email", label: "Email" },
//     { key: "phoneNumber", label: "Phone Number" },
//     { key: "leadSourceName", label: "Source" },
//     { key: "assignedTo", label: "Assigned To" },
//     { key: "finalStatus", label: "Status" },
//     { key: "leadCategoryName", label: "Category" },
//     { key: "leadRank", label: "Rank" },
//     { key: "createdDate", label: "Created Date" },
//     { key: "isActive", label: "IsActive" },
//     { key: "comment", label: "Comment" },
//   ];
//   const updateLeadInState = (updatedLead) => {
//         setLeads((prevLeads) =>
//             prevLeads.map((lead) =>
//                 lead.id === updatedLead.id ? { ...lead, ...updatedLead } : lead
//             )
//         );
//     };
//   return (
//     <>
//       <ConfirmDialog />
//       {showGrid && (
//         <div>
//           <BreadcrumbComponent
//             labels={{ module: "SalesExecutive", currentRoute: "leads" }}
//           />

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
//                   onEditHandler: (data) => editLead(data),
//                   icon: <FaEdit />,
//                 },
//                 {
//                   key: "delete",
//                   title: "Delete",
//                   className: "btn btn-danger",
//                   onDeleteHandler: (data) => deleteLead(data),
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
//               onAdd={() => {
//                 if (user.userRole === 3) {
//                   navigate("/salesExecutive/add-new-lead");
//                 } else if (user.userRole === 4) {
//                   navigate("/salesManager/add-new-lead");
//                 } else {
//                   myToaster.showErrorToast("User role is not authorized to add leads.");
//                 }
//               }}
//               tableName="Leads"
//               addButtonLabel="Add Lead"
//             />
//           )}
//         </div>
//       )}

//       {/* Basic Modal for Managing Lead */}
//       {followUpdatePopup && (
//         <BasicModal
//           leadData={leadData}
//           onClose={mangeClosePopup}
//           popupForm={true} // Show form inside modal
//           showHistory={false}
//           onSave={saveAndRedirectToFollowUpHistory} // Save and redirect to follow-up history
//         />
//       )}

//       {/* Follow-up History Grid */}
//       {showFollowupHistoryGrid && (
//         <BasicModal
//           leadData={leadData}
//           popupForm={false} // No form inside modal, only history
//           showHistory={true}
//           leadIdKey="id"
//           context="leadList"
//         />
//       )}
//     </>
//   );
// }

// export default LeadList;


// import React, { useState, useEffect } from "react";
// import Grid from "../shared/Grid";
// import { FaEdit, FaPlus, FaTrash, FaCog, FaHistory } from "react-icons/fa";
// import BreadcrumbComponent from "../shared/Breadcrumb";
// import { getAllLeads, deleteLeadById } from "../../Services/LeadService";
// import { useNavigate } from "react-router-dom";
// import { useForm } from "react-hook-form";
// import { leadSources as getLeadSources } from "../../Services/LeadSource";
// import { toast } from "react-toastify";
// import { UserLists } from "../../Services/UserService";
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
//     const initialize = async () => {
//       await Promise.all([fetchAllLeads(), fetchLeadSources(), fetchAssignTo()]);
//     };
//     initialize();
//   }, []);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   const addButtonNavigate = () => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user.userRole === 3) {
//       navigate("/salesExecutive/add-new-lead");
//     } else if (user.userRole === 4) {
//       navigate("/salesManager/add-new-lead");
//     } else {
//       myToaster.showErrorToast("User role is not authorized to add leads.");
//     }
//   };

//   const fetchLeadSources = async () => {
//     try {
//       const res = await getLeadSources();
//       setLeadSources(res.result);
//     } catch (error) {
//       toast.error("Failed to load lead sources.");
//     }
//   };

//   const editLead = (lead) => {
//     myToaster.editLeadSwal(lead, userAssignTo, leadSources, updateLeadInState);
//   };

//   const deleteLeadHandler = async (id) => {
//     const response = await deleteLeadById(id);
//     if (response.isSuccess) {
//       myToaster.showSuccessToast(response.message);
//       fetchAllLeads();
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//   };

//   const deleteLead = (lead) => {
//     myToaster.primereactDeleteConfirmLead(lead, deleteLeadHandler);
//   };

//   const fetchAllLeads = async () => {
//     setLoading(true);
//     try {
//       const response = await getAllLeads();
//       if (response.result) {
//         setLeads(response.result);
//       } else {
//         myToaster.showErrorToast(response.message);
//       }
//     } catch (error) {
//       myToaster.showErrorToast("Failed to fetch leads.");
//     }
//     setLoading(false);
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
//     setShowFollowupHistoryGrid(false);
//     setShowGrid(true);
//   };

//   const fetchFollowUpHistoryHandler = (lead) => {
//     setLeadData(lead);
//     setFollowUpdatePopup(false);
//     setShowGrid(false);
//     setShowFollowupHistoryGrid(true);
//   };

//   const updateLeadInState = (updatedLead) => {
//     setLeads((prevLeads) =>
//       prevLeads.map((lead) =>
//         lead.id === updatedLead.id ? { ...lead, ...updatedLead } : lead
//       )
//     );
//   };

//   const headers = [
//     { key: "leadCompanyName", label: "Company Name" },
//     { key: "leadName", label: "Name" },
//     { key: "email", label: "Email" },
//     { key: "phoneNumber", label: "Phone Number" },
//     { key: "leadSourceName", label: "Source" },
//     { key: "assignedTo", label: "Assigned To" },
//     { key: "finalStatus", label: "Status" },
//     { key: "leadCategoryName", label: "Category" },
//     { key: "leadRank", label: "Rank" },
//     { key: "createdDate", label: "Created Date" },
//     { key: "isActive", label: "Is Active" },
//     { key: "comment", label: "Comment" },
//   ];

//   return (
//     <>
//       <ConfirmDialog />
//       {showGrid && (
//         <div>
//           <BreadcrumbComponent
//             labels={{ module: "SalesExecutive", currentRoute: "leads" }}
//           />

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
//                   onEditHandler: (data) => editLead(data),
//                   icon: <FaEdit />,
//                 },
//                 {
//                   key: "delete",
//                   title: "Delete",
//                   className: "btn btn-danger",
//                   onDeleteHandler: (data) => deleteLead(data),
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
//               onAdd={addButtonNavigate}
//               tableName="Leads"
//               addButtonLabel="Add Lead"
//             />
//           )}
//         </div>
//       )}

//       {followUpdatePopup && (
//         <BasicModal
//           leadData={leadData}
//           onClose={mangeClosePopup}
//           popupForm={true}
//           showHistory={false}
//           onSave={updateLeadInState}
//         />
//       )}

//       {showFollowupHistoryGrid && (
//         <BasicModal
//           leadData={leadData}
//           onClose={mangeClosePopup}
//           popupForm={false}
//           showHistory={true}
//           leadIdKey="id"
//           context="leadList"
//         />
//       )}
//     </>
//   );
// }

// export default LeadList;

