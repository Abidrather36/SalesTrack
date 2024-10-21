
import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid";
import { FaEdit, FaPlus, FaTrash, FaCog, FaHistory ,FaCalendarDay} from "react-icons/fa";
import BreadcrumbComponent from "../shared/Breadcrumb";
import { addFollowUpdate, getAllLeads } from "../../Services/LeadService";
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
import { Troubleshoot } from "@mui/icons-material";
import { classNames } from "primereact/utils";
function LeadList(props) {
  const [leads, setLeads] = useState([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showGrid, setShowGrid] = useState(true);
  const [leadSources, setLeadSources] = useState([]);
  const [userAssignTo, setUserAssignTo] = useState([]);
  const [leadData, setLeadData] = useState({});
  const [followUpdatePopup, setFollowUpdatePopup] = useState(false);
  const [showFollowupHistoryGrid, setshowFollowupHistoryGrid] = useState(false);

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

  const editLead = (lead) => {
    myToaster.editLeadSwal(lead, userAssignTo, leadSources, fetchAllLeads);
  };

  const headers = [
    { key: "name", label: "LeadName" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "leadSourceName", label: "Lead Source" },
    { key: "assignedTo", label: "Assigned To" },
    { key: "finalStatus", label: "Lead Status" },
  ];

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

  const mangeClosePopup=()=>{
    console.log("close triggered")
    setFollowUpdatePopup(false); 
    setShowGrid(true);
  }

  const fetchFollowUpHistoryHandler = (lead) => {
    setLeadData(lead);
    setShowGrid(false);
    setshowFollowupHistoryGrid(true)
  };
  const todaysFollowUp=()=>{

  }

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
                onAddFollowUpHistory: (lead) =>
                  fetchFollowUpHistoryHandler(lead),
                icon: <FaHistory />,
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
        />
      )} 
    </>
  );
}

export default LeadList;

