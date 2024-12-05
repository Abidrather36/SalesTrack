import React, { useEffect } from 'react'
import { getAllLeads, getAllLeadsOfCompany } from '../../Services/CompanyService'
import { CircularProgress } from '@mui/material';
import { useState } from 'react';
import myToaster from '../../utils/toaster';
import Grid from '../shared/Grid';
import BreadcrumbComponent from '../shared/Breadcrumb';
function LeadListCompany() {
    const [leads, setLeads] = useState([])
    const [showGrid, setShowGrid] = useState(true);
    const [loading, setLoading] = useState(false);
    const [showSpinner, setShowSpinner] = useState(true);

    useEffect(() => {
      fetchAllLeads();
    },)
    
    const headers = [
        { key: "leadCompanyName", label: "Company Name" },
        { key: "leadName", label: "Lead Name" },
        { key: "email", label: "Email" },
        { key: "phoneNumber", label: "Phone Number" },
        { key: "leadSourceName", label: "Lead Source" },
        { key: "assignedTo", label: "Assigned To" },
        { key: "finalStatus", label: "Lead Status" },
        { key: "isActive" ,label:"IsActive"},
        { key :"leadCategoryName",label:"Lead Category Name"},
        { key: "leadRank", label: "Lead Rank"},
        { key: "createdDate", label: "Date of Creation" },
      ];
      const fetchAllLeads = async () => {
        setLoading(true);  
        const response = await getAllLeadsOfCompany();
        if (response.result) {
          console.log("leadList Date",response.result)
          setLeads(response.result);
          setShowSpinner(false);
        } else {
          myToaster.showErrorToast(response.message);
        }
        setShowSpinner(false);  
      };
  return (
    <>
          <BreadcrumbComponent
            labels={{ module: "companyAdmin", currentRoute: "leads" }}
          />
            {showSpinner ? (
            <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
              <CircularProgress />
            </div>
          ):
          (
            <Grid
            headers={headers}
            data={leads}
            loading={loading}
            tableName="Leads"
          />
          )}
      
    </>
  )
}

export default LeadListCompany
