import React, { useEffect, useState } from "react";
import { getAllLeadsOfCompany, listOfLeadsByCompany } from "../../Services/CompanyService";
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
    { key: "leadName", label: " Lead Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "leadSourceName", label: "Source" },
    { key: "assignedTo", label: "Assigned To" },
    { key: "finalStatus", label: "Status" },
    { key: "leadCategoryName", label: "Category" },
    { key: "leadRank", label: "Rank" },
    { key: "createdDate", label: "Created date" },
  ];

  const fetchAllLeads = async () => {
    setLoading(true);
    try {
      const response = await listOfLeadsByCompany();
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
