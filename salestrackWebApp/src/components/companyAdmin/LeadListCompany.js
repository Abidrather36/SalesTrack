import React, { useEffect, useState } from "react";
import { getAllLeadsOfCompany } from "../../Services/CompanyService";
import { CircularProgress } from "@mui/material";
import myToaster from "../../utils/toaster";
import Grid from "../shared/Grid";
import BreadcrumbComponent from "../shared/Breadcrumb";

function LeadListCompany() {
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchAllLeads();
  }, []);

  const headers = [
    { key: "leadCompanyName", label: "Company Name" },
    { key: "leadName", label: "Lead Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "leadSourceName", label: "Lead Source" },
    { key: "assignedTo", label: "Assigned To" },
    { key: "finalStatus", label: "Lead Status" },
    { key: "isActive", label: "IsActive" },
    { key: "leadCategoryName", label: "Lead Category Name" },
    { key: "leadRank", label: "Lead Rank" },
    { key: "createdDate", label: "Date of Creation" },
  ];

  const fetchAllLeads = async () => {
    setLoading(true);
    try {
      const response = await getAllLeadsOfCompany();
      if (response.result) {
        console.log("leadList Data", response.result);
        setLeads(response.result);
      } else {
        myToaster.showErrorToast(response.message || "Failed to fetch leads.");
      }
    } catch (error) {
      console.error("Error fetching leads:", error);
      myToaster.showErrorToast("An error occurred while fetching leads.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BreadcrumbComponent labels={{ module: "companyAdmin", currentRoute: "leads" }} />
      {loading ? (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid 
        headers={headers}
         data={leads} 
         loading={loading} 
         tableName="Leads" />
      )}
    </>
  );
}

export default LeadListCompany;
