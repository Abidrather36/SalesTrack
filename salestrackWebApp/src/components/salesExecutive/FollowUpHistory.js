import {  useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { leadFollowUpHistory } from "../../Services/LeadService";
import Grid from "../shared/Grid";
import myToaster from "../../utils/toaster";
import BreadcrumbComponent from "../shared/Breadcrumb";
import { CircularProgress } from "@mui/material";

const FollowUpHistory = () => {
  const { leadId } = useParams(); // Get leadId from URL params
  const [followUpHistory, setFollowUpHistory] = useState([]);
  const [loading, setLoading] = useState(false);
 const [showSpinner, setShowSpinner] = useState(true);
  const navigate=useNavigate();
  useEffect(() => {
    fetchFollowUpHistory();
  }, [leadId]); // Refetch when leadId changes

  const user = JSON.parse(localStorage.getItem("user"));
  const addFollowUp = () => {
    const basePath = user?.userRole === 3 ? "/salesExecutive" : "/salesManager";
    navigate(`${basePath}/addFollowUp/${leadId}`);
  };
  const headers = [
    { key: "clientName", label: "Client Name" },
    { key: "leadProcessStep", label: "Lead Process Step" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "email", label: "Email" },
    { key: "leadComments", label: "Lead Comments" },
    { key: "followUpDate", label: "Follow-Up Date" },
  ];

  const fetchFollowUpHistory = async () => {
    setLoading(true);
      console.log("Fetching follow-up history for leadId:", leadId);
      if (!leadId) {
        myToaster.showErrorToast("Invalid lead ID.");
        setFollowUpHistory([]);
        return;
      }

      const response = await leadFollowUpHistory(leadId);
      console.log("API Response:", response);

      if (response.isSuccess) {
       
        if (user?.userRole === 3 || user?.userRole === 4) {
          setFollowUpHistory(response.result);
          setShowSpinner(false)
          setLoading(false)
        } else {
          myToaster.showErrorToast("You do not have permission to view this history.");
          setFollowUpHistory([]);
          setShowSpinner(false);
        }
      } else {
        myToaster.showErrorToast(response?.message);
        setFollowUpHistory([]);
        setShowSpinner(false);
      setLoading(false);

      }
  };

  console.log("Current followUpHistory state:", followUpHistory);

  return (
    <div>
      <BreadcrumbComponent
              labels={{ module: "SalesExecutive", currentRoute: "leads" }}
            />
      {loading ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "150px",
          }}
        >
          <CircularProgress />
        </div>
      ) : followUpHistory && followUpHistory.length > 0 ? (
        <Grid
          headers={headers}
          data={followUpHistory}
          onAdd={addFollowUp}
          tableName={`Follow-Up History for ${followUpHistory[0]?.clientName || "Unknown Client"}`}
          addButtonLabel="Add"
        />
      ) : (
        <p>No follow-up history found for this lead.</p>
      )}
    </div>
  );
};

export default FollowUpHistory;