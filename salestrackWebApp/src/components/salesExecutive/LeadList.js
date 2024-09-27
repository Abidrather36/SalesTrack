import React, { useState } from "react";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import BreadcrumbComponent from "../shared/Breadcrumb";
import { getAllLeads } from "../../Services/LeadService";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LeadList() {
  const [leads, setLeads] = useState();
  const navigate = useNavigate();
  const [loading,setLoading]=useState()

  useEffect(() => {
    fetchAllLeads();
  }, []);

  const headers = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "Phone Number" },
    { key: "leadSourceName", label: "Lead Source" },
    { key: "comment", label: "Comment" },
    { key: "assignedTo", label: "Assigned To" },
    { key: "userRole", label: "User Role" },
    { key: "isActive", label: "Is Active" },
    { key: "companyName", label: "Company Name" },
  ];
  const breadcrumbLabels = {
    module: "SalesExective",
    currentRoute: "leads",
  };
  const btnList = [
    {
      key: "edit",
      title: "Edit",
      className: "btn btn-primary",
      onEditHandler: (data) => console.log(data),
      icon: <FaEdit />,
    },
    {
      key: "delete",
      title: "Delete",
      className: "btn btn-danger",
      onDeleteHandler: (data) => console.log(data),
      icon: <FaTrash />,
    },
  ];

  const addLead = () => {
    navigate("/companyAdmin/add-new-lead")
 };

  const fetchAllLeads = async () => {
    try {
      const response = await getAllLeads();
      setLeads(response.result);
      console.log("leads are :->",response)
    } catch (err) {
      console.error("Failed to fetch users", err);
    } finally {
      setLoading(false);
    }

    
}
return (
  <>
  <h1>lead list</h1>
    <BreadcrumbComponent labels={breadcrumbLabels} />
    <Grid
      headers={headers}
      buttons={btnList}
      data={leads}
      loading={loading}
      onAdd={addLead}
      tableName="Leads"
      addButtonLabel="Add Lead"
    />
  </>
);
};

export default LeadList;
