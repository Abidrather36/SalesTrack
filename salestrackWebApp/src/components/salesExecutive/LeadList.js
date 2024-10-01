// import React, { useState, useEffect } from "react";
// import Grid from "../shared/Grid";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import BreadcrumbComponent from "../shared/Breadcrumb";
// import { getAllLeads } from "../../Services/LeadService";
// import { useNavigate } from "react-router-dom";
// import InputField from "../public/InputField";
// import Spin from "../public/Spin";
// import { useForm } from "react-hook-form";
// import { leadSources as getLeadSources } from "../../Services/LeadSource";
// import { toast } from "react-toastify"; // Import Toastify
// import { updateLead } from "../../Services/LeadService";
// import { UserLists } from "../../Services/UserService";
// import { deleteLead as deleteLeadService } from "../../Services/LeadService";

// function LeadList() {
//   const [leads, setLeads] = useState([]);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [showGrid, setShowGrid] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [leadSources, setLeadSources] = useState([]);
//   const [leadData, setLeadData] = useState({});
//   const [userAssignTo, setUserAssignTo] = useState([]);

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
//       toast.error("Failed to load lead sources."); // Using Toastify
//     }
//   };

//   const headers = [
//     { key: "name", label: "Name" },
//     { key: "email", label: "Email" },
//     { key: "phoneNumber", label: "Phone Number" },
//     { key: "leadSourceName", label: "Lead Source" },
//     { key: "assignedTo", label: "Assigned To" },
//     { key: "finalStatus", label: "Final Status" },
//     { key: "isActive", label: "Is Active" },
//   ];

//   const editLead = (lead) => {
//     setLeadData(lead);
//     setShowGrid(false);
//     setShowForm(true);
//   };

//   const submitLeadForm = async (data) => {
//     setLoading(true);
//     try {
//       const result = await updateLead({ ...leadData, ...data });
//       if (result.isSuccess) {
//         toast.success(result.message); // Using Toastify
//         fetchAllLeads();
//         setShowForm(false);
//         setShowGrid(true);
//       } else {
//         toast.error(result.message); // Using Toastify
//       }
//     } catch (error) {
//       toast.error("An error occurred while updating the lead."); // Using Toastify
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteLead = async (leadId) => {
//     const confirmToast = toast.info("Are you sure you want to delete this lead?", {
//       position: "top-right",
//       autoClose: false,
//       closeOnClick: false,
//       draggable: false,
//       progress: undefined,
//       action: [
//         <button
//           onClick={async () => {
//             try {
//               const response = await deleteLeadService(leadId);
//               if (response.isSuccess) {
//                 toast.success(response.message); // Using Toastify
//                 fetchAllLeads();
//               } else {
//                 toast.error(response.message); // Using Toastify
//               }
//             } catch (error) {
//               toast.error("An error occurred while deleting the lead."); // Using Toastify
//             }
//             toast.dismiss(confirmToast); // Dismiss the confirmation toast
//           }}
//         >
//           Yes
//         </button>,
//         <button
//           onClick={() => {
//             toast.dismiss(confirmToast); // Dismiss the confirmation toast
//           }}
//         >
//           No
//         </button>,
//       ],
//     });
//   };

//   const fetchAllLeads = async () => {
//     setLoading(true);
//     try {
//       const response = await getAllLeads();
//       setLeads(response.result);
//     } catch (err) {
//       console.error("Failed to fetch leads", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAssignTo = async () => {
//     try {
//       const response = await UserLists();
//       setUserAssignTo(response.result || []);
//     } catch (error) {
//       toast.error("Failed to fetch users for assignment."); // Using Toastify
//     }
//   };

//   return (
//     <>
//       {showGrid && (
//         <div>
//           <BreadcrumbComponent labels={{ module: "SalesExecutive", currentRoute: "leads" }} />
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
//             ]}
//             data={leads}
//             loading={loading}
//             onAdd={() => navigate("/salesExecutive/add-new-lead")}
//             tableName="Leads"
//             addButtonLabel="Add Lead"
//           />
//         </div>
//       )}

//       {showForm && (
//         <div className="addForm">
//           <BreadcrumbComponent labels={{ module: "SalesExecutive", currentRoute: "Update-Lead" }} />
//           <div className="row justify-content-center" style={{ padding: "20px" }}>
//             <div className="col-lg-8 mb-4-lg-0">
//               <div
//                 className="login-container"
//                 style={{
//                   background: "#fff",
//                   padding: "30px",
//                   borderRadius: "10px",
//                   boxShadow: "0 0 15px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <h2 className="form-title">Edit Lead</h2>
//                 <form className="login-form" onSubmit={handleSubmit(submitLeadForm)} autoComplete="off">
//                   <div className="row">
//                     <div className="col-lg-6 mb-3">
//                       <InputField
//                         type="text"
//                         name="name"
//                         value={leadData.name || ""}
//                         onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
//                         placeholder="Lead Name"
//                       />
//                       {errors.name && <span className="error-message">{errors.name.message}</span>}
//                     </div>

//                     <div className="col-lg-6 mb-3">
//                       <InputField
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         value={leadData.email || ""}
//                         onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
//                       />
//                       {errors.email && <span className="error-message">{errors.email.message}</span>}
//                     </div>

//                     <div className="col-lg-6 mb-3">
//                       <InputField
//                         type="text"
//                         name="phoneNumber"
//                         value={leadData.phoneNumber || ""}
//                         placeholder="Phone Number"
//                         onChange={(e) => setLeadData({ ...leadData, phoneNumber: e.target.value })}
//                       />
//                     </div>

//                     <div className="col-lg-6 mb-3">
//                       <InputField
//                         as="select"
//                         name="leadSourceId"
//                         value={leadData.leadSourceId || ""}
//                         onChange={(e) => setLeadData({ ...leadData, leadSourceId: e.target.value })}
//                       >
//                         <option value="">Select Lead Source</option>
//                         {leadSources.map((source) => (
//                           <option key={source.id} value={source.id}>
//                             {source.leadSourceName}
//                           </option>
//                         ))}
//                       </InputField>
//                       {errors.leadSourceId && <span className="text-danger">{errors.leadSourceId.message}</span>}
//                     </div>

//                     <div className="col-lg-6 mb-3">
//                       <InputField
//                         type="text"
//                         name="comment"
//                         value={leadData.comment || ""}
//                         placeholder="Comment"
//                         onChange={(e) => setLeadData({ ...leadData, comment: e.target.value })}
//                       />
//                     </div>

//                     <div className="col-lg-6 mb-3">
//                       <InputField
//                         as="select"
//                         name="assignTo"
//                         value={leadData.assignTo || ""}
//                         onChange={(e) => setLeadData({ ...leadData, assignTo: e.target.value })}
//                       >
//                         <option value="">Assign To</option>
//                         {userAssignTo.map((user) => (
//                           <option key={user.id} value={user.id}>
//                             {user.name}
//                           </option>
//                         ))}
//                       </InputField>
//                       {errors.assignTo && <span className="error-message">{errors.assignTo.message}</span>}
//                     </div>
//                   </div>
//                   <button type="submit" className="btn btn-primary mt-3">
//                     Update Lead
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-secondary mt-3"
//                     onClick={() => {
//                       setShowForm(false);
//                       setShowGrid(true);
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </>
// //   );
// // }

// // export default LeadList;

// import React, { useState, useEffect } from "react";
// import Grid from "../shared/Grid";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import BreadcrumbComponent from "../shared/Breadcrumb";
// import { getAllLeads } from "../../Services/LeadService";
// import { useNavigate } from "react-router-dom";
// import InputField from "../public/InputField";
// import Spin from "../public/Spin";
// import { useForm } from "react-hook-form";
// import { leadSources as getLeadSources } from "../../Services/LeadSource";
// import { toast } from "react-toastify"; // Import Toastify
// import { updateLead } from "../../Services/LeadService";
// import { UserLists } from "../../Services/UserService";
// import { deleteLead as deleteLeadService } from "../../Services/LeadService";

// function LeadList() {
//   const [leads, setLeads] = useState([]);
//   const navigate = useNavigate();
//   const [loading, setLoading] = useState(false);
//   const [showGrid, setShowGrid] = useState(true);
//   const [showForm, setShowForm] = useState(false);
//   const [leadSources, setLeadSources] = useState([]);
//   const [leadData, setLeadData] = useState({});
//   const [userAssignTo, setUserAssignTo] = useState([]);

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
//       toast.error("Failed to load lead sources."); // Using Toastify
//     }
//   };

//   const headers = [
//     { key: "name", label: "Name" },
//     { key: "email", label: "Email" },
//     { key: "phoneNumber", label: "Phone Number" },
//     { key: "leadSourceName", label: "Lead Source" },
//     { key: "assignedTo", label: "Assigned To" },
//     { key: "finalStatus", label: "Final Status" },
//     { key: "isActive", label: "Is Active" },
//   ];

//   const editLead = (lead) => {
//     setLeadData(lead);
//     setShowGrid(false);
//     setShowForm(true);
//   };

//   const submitLeadForm = async (data) => {
//     setLoading(true);
//     try {
//       const result = await updateLead({ ...leadData, ...data });
//       if (result.isSuccess) {
//         toast.success(result.message); // Using Toastify
//         fetchAllLeads();
//         setShowForm(false);
//         setShowGrid(true);
//       } else {
//         toast.error(result.message); // Using Toastify
//       }
//     } catch (error) {
//       toast.error("An error occurred while updating the lead."); // Using Toastify
//     } finally {
//       setLoading(false);
//     }
//   };

//   const deleteLead = (leadId) => {
//     toast.warn("Are you sure you want to delete this lead?", {
//       position: "top-right",
//       autoClose: false,
//       closeOnClick: false,
//       draggable: false,
//       progress: undefined,
//       onClose: () => {
//         // User clicked outside the toast or after the autoClose time
//         toast.dismiss(); // Dismiss the warning toast
//       },
//     });

//     // Automatically trigger deletion after a delay
//     setTimeout(async () => {
//       try {
//         const response = await deleteLeadService(leadId);
//         if (response.isSuccess) {
//           toast.success(response.message); // Using Toastify
//           fetchAllLeads(); // Reload the leads after deletion
//         } else {
//           toast.error(response.message); // Using Toastify
//         }
//       } catch (error) {
//         toast.error("An error occurred while deleting the lead."); // Using Toastify
//       }
//     }, 3000); // Adjust the timeout duration as needed (3 seconds in this case)
//   };

//   const fetchAllLeads = async () => {
//     setLoading(true);
//     try {
//       const response = await getAllLeads();
//       setLeads(response.result);
//     } catch (err) {
//       console.error("Failed to fetch leads", err);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAssignTo = async () => {
//     try {
//       const response = await UserLists();
//       setUserAssignTo(response.result || []);
//     } catch (error) {
//       toast.error("Failed to fetch users for assignment."); // Using Toastify
//     }
//   };

//   return (
//     <>
//       {showGrid && (
//         <div>
//           <BreadcrumbComponent labels={{ module: "SalesExecutive", currentRoute: "leads" }} />
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
//             ]}
//             data={leads}
//             loading={loading}
//             onAdd={() => navigate("/salesExecutive/add-new-lead")}
//             tableName="Leads"
//             addButtonLabel="Add Lead"
//           />
//         </div>
//       )}

//       {showForm && (
//         <div className="addForm">
//           <BreadcrumbComponent labels={{ module: "SalesExecutive", currentRoute: "Update-Lead" }} />
//           <div className="row justify-content-center" style={{ padding: "20px" }}>
//             <div className="col-lg-8 mb-4-lg-0">
//               <div
//                 className="login-container"
//                 style={{
//                   background: "#fff",
//                   padding: "30px",
//                   borderRadius: "10px",
//                   boxShadow: "0 0 15px rgba(0,0,0,0.1)",
//                 }}
//               >
//                 <h2 className="form-title">Edit Lead</h2>
//                 <form className="login-form" onSubmit={handleSubmit(submitLeadForm)} autoComplete="off">
//                   <div className="row">
//                     <div className="col-lg-6 mb-3">
//                       <InputField
//                         type="text"
//                         name="name"
//                         value={leadData.name || ""}
//                         onChange={(e) => setLeadData({ ...leadData, name: e.target.value })}
//                         placeholder="Lead Name"
//                       />
//                       {errors.name && <span className="error-message">{errors.name.message}</span>}
//                     </div>

//                     <div className="col-lg-6 mb-3">
//                       <InputField
//                         type="email"
//                         name="email"
//                         placeholder="Email"
//                         value={leadData.email || ""}
//                         onChange={(e) => setLeadData({ ...leadData, email: e.target.value })}
//                       />
//                       {errors.email && <span className="error-message">{errors.email.message}</span>}
//                     </div>

//                     <div className="col-lg-6 mb-3">
//                       <InputField
//                         type="text"
//                         name="phoneNumber"
//                         value={leadData.phoneNumber || ""}
//                         placeholder="Phone Number"
//                         onChange={(e) => setLeadData({ ...leadData, phoneNumber: e.target.value })}
//                       />
//                     </div>

//                     <div className="col-lg-6 mb-3">
//                       <InputField
//                         as="select"
//                         name="leadSourceId"
//                         value={leadData.leadSourceId || ""}
//                         onChange={(e) => setLeadData({ ...leadData, leadSourceId: e.target.value })}
//                       >
//                         <option value="">Select Lead Source</option>
//                         {leadSources.map((source) => (
//                           <option key={source.id} value={source.id}>
//                             {source.leadSourceName}
//                           </option>
//                         ))}
//                       </InputField>
//                       {errors.leadSourceId && <span className="text-danger">{errors.leadSourceId.message}</span>}
//                     </div>

//                     <div className="col-lg-6 mb-3">
//                       <InputField
//                         type="text"
//                         name="comment"
//                         value={leadData.comment || ""}
//                         placeholder="Comment"
//                         onChange={(e) => setLeadData({ ...leadData, comment: e.target.value })}
//                       />
//                     </div>

//                     <div className="col-lg-6 mb-3">
//                       <InputField
//                         as="select"
//                         name="assignTo"
//                         value={leadData.assignTo || ""}
//                         onChange={(e) => setLeadData({ ...leadData, assignTo: e.target.value })}
//                       >
//                         <option value="">Assign To</option>
//                         {userAssignTo.map((user) => (
//                           <option key={user.id} value={user.id}>
//                             {user.name}
//                           </option>
//                         ))}
//                       </InputField>
//                       {errors.assignTo && <span className="error-message">{errors.assignTo.message}</span>}
//                     </div>

//                     <div className="col-lg-6 mb-3">
//                       <InputField
//                         as="select"
//                         name="finalStatus"
//                         value={leadData.finalStatus || ""}
//                         onChange={(e) => setLeadData({ ...leadData, finalStatus: e.target.value })}
//                       >
//                         <option value="">Select Final Status</option>
//                         <option value="1">Open</option>
//                         <option value="2">Close</option>
//                         <option value="3">Success</option>
//                       </InputField>
//                     </div>
//                   </div>
//                   <button type="submit" className="btn btn-primary mt-3">
//                     Update Lead
//                   </button>
//                   <button
//                     type="button"
//                     className="btn btn-secondary mt-3"
//                     onClick={() => {
//                       setShowForm(false);
//                       setShowGrid(true);
//                     }}
//                   >
//                     Cancel
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>

//         </div>
//       )}
//     </>
//   );
// }

// export default LeadList;

import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import BreadcrumbComponent from "../shared/Breadcrumb";
import { getAllLeads } from "../../Services/LeadService";
import { useNavigate } from "react-router-dom";
import InputField from "../public/InputField";
import Spin from "../public/Spin";
import { useForm } from "react-hook-form";
import { leadSources as getLeadSources } from "../../Services/LeadSource";
import { toast } from "react-toastify";
import { updateLead } from "../../Services/LeadService";
import { UserLists } from "../../Services/UserService";
import { deleteLead as deleteLeadService } from "../../Services/LeadService";
import { confirmDialog, ConfirmDialog } from "primereact/confirmdialog"; // PrimeReact confirm dialog
import myToaster from "../../utils/toaster";

function LeadList() {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [leadSources, setLeadSources] = useState([]);
  const [leadData, setLeadData] = useState({});
  const [userAssignTo, setUserAssignTo] = useState([]);

  useEffect(() => {
    fetchAllLeads();
    fetchLeadSources();
    fetchAssignTo();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchLeadSources = async () => {
    try {
      const res = await getLeadSources();
      setLeadSources(res.result);
    } catch (error) {
      toast.error("Failed to load lead sources.");
    }
  };

  const headers = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "leadSourceName", label: "Lead Source" },
    { key: "assignedTo", label: "Assigned To" },
    { key: "finalStatus", label: "Final Status" },
    { key: "isActive", label: "Is Active" },
  ];

  const editLead = (lead) => {
    setLeadData(lead);
    setShowGrid(false);
    setShowForm(true);
  };

  const submitLeadForm = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await updateLead(leadData);
      if(res.isSuccess){
        myToaster.showSuccessToast(res.message);
        fetchAllLeads();
        setShowGrid(true)
        setShowForm(false)
      }
    } catch {
      toast.error("Failed to update lead.");
    }
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

  const fetchAllLeads = async () => {
    setLoading(true);
    try {
      const response = await getAllLeads();
      setLeads(response.result);
    } catch (err) {
      console.error("Failed to fetch leads", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchAssignTo = async () => {
    try {
      const response = await UserLists();
      setUserAssignTo(response.result || []);
    } catch (error) {
      toast.error("Failed to fetch users for assignment.");
    }
  };

  return (
    <>
      <ConfirmDialog style={{ height: "150px" }} />

      {showGrid && (
        <div>
          <BreadcrumbComponent
            labels={{ module: "SalesExecutive", currentRoute: "leads" }}
          />
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
            ]}
            data={leads}
            loading={loading}
            onAdd={() => navigate("/salesExecutive/add-new-lead")}
            tableName="Leads"
            addButtonLabel="Add Lead"
          />
        </div>
      )}

      {showForm && (
        <div className="addForm">
          <BreadcrumbComponent
            labels={{ module: "SalesExecutive", currentRoute: "Update-Lead" }}
          />
          <div
            className="row justify-content-center"
            style={{ padding: "20px" }}
          >
            <div className="col-lg-8 mb-4-lg-0">
              <div
                className="login-container"
                style={{
                  background: "#fff",
                  padding: "30px",
                  borderRadius: "10px",
                  boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                }}
              >
                <h2 className="form-title">Edit Lead</h2>
                <form
                  className="login-form"
                  onSubmit={submitLeadForm}
                  autoComplete="off"
                >
                  <div className="row">
                    <div className="col-lg-6 mb-3">
                      <InputField
                        type="text"
                        name="name"
                        value={leadData.name

                        }
                        onChange={(e) =>
                          setLeadData({ ...leadData, name: e.target.value })
                        }
                        placeholder="Lead Name"
                      />
                      {errors.name && (
                        <span className="error-message">
                          {errors.name.message}
                        </span>
                      )}
                    </div>

                    <div className="col-lg-6 mb-3">
                      <InputField
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={leadData.email || ""}
                        onChange={(e) =>
                          setLeadData({ ...leadData, email: e.target.value })
                        }
                      />
                      {errors.email && (
                        <span className="error-message">
                          {errors.email.message}
                        </span>
                      )}
                    </div>

                    <div className="col-lg-6 mb-3">
                      <InputField
                        type="text"
                        name="phoneNumber"
                        value={leadData.phoneNumber}
                        placeholder="Phone Number"
                        onChange={(e) =>
                          setLeadData({
                            ...leadData,
                            phoneNumber: e.target.value,
                          })
                        }
                      />
                    </div>

                    <div className="col-lg-6 mb-3">
                      <InputField
                        as="select"
                        name="leadSourceId"
                        value={leadData.leadSourceId}
                        onChange={(e) =>
                          setLeadData({
                            ...leadData,
                            leadSourceId: e.target.value,
                          })
                        }
                      >
                        <option value="">Select Lead Source</option>
                        {leadSources.map((source) => (
                          <option key={source.id} value={source.id}>
                            {source.leadSourceName}
                          </option>
                        ))}
                      </InputField>
                      {errors.leadSourceId && (
                        <span className="text-danger">
                          {errors.leadSourceId.message}
                        </span>
                      )}
                    </div>

                    <div className="col-lg-6 mb-3">
                      <InputField
                        type="text"
                        name="comment"
                        value={leadData.comment || ""}
                        placeholder="Comment"
                        onChange={(e) =>
                          setLeadData({ ...leadData, comment: e.target.value })
                        }
                      />
                    </div>

                    <div className="col-lg-6 mb-3">
                      <InputField
                        as="select"
                        name="assignedTo"
                        value={leadData.assignTo}
                        onChange={(e) =>
                          setLeadData({
                            ...leadData,
                            assignTo: e.target.value,
                          })
                        }
                      >
                        <option value="">Assign To</option>
                        {userAssignTo.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </InputField>
                      {errors.assignTo && (
                        <span className="error-message">
                          {errors.assignTo.message}
                        </span>
                      )}
                    </div>

                    <div className="col-lg-6 mb-3">
                      <InputField
                        as="select"
                        name="finalStatus"
                        value={leadData.finalStatus || ""}
                        onChange={(e) =>
                          setLeadData({
                            ...leadData,
                            finalStatus: Number(e.target.value),
                          })
                        }
                      >
                        <option value="">Select Final Status</option>
                        <option value="1">Open</option>
                        <option value="2">Close</option>
                        <option value="3">Success</option>
                        <option value="0">Unknown</option>
                      </InputField>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary mt-3">
                    Update Lead
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary mt-3"
                    onClick={() => {
                      setShowForm(false);
                      setShowGrid(true);
                    }}
                  >
                    Cancel
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default LeadList;
