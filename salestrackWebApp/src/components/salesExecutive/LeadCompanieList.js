import React, { useEffect, useState } from "react";
import BreadcrumbComponent from "../shared/Breadcrumb";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CircularProgress } from "@mui/material";

import myToaster from "../../utils/toaster";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from "primereact/confirmdialog";
import { getAllLeadCompanies } from "../../Services/LeadService";

function LeadCompanieList() {
  const [leadCompanyList, setLeadCompanyList] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    fetchLeadCompanies();
  }, []);

  const headers = [
    { key: "leadCompanyName", label: "Company Name" },
    { key: "description", label: "Description" },
    { key: "isActive", label: "Is Active" },
  ];

  const btnList = [
    {
      key: "edit",
      title: "Edit",
      className: "btn btn-primary",
    //   onEditHandler: (data) => editLeadCompany(data),
      icon: <FaEdit />,
    },
    {
      key: "delete",
      title: "Delete",
      className: "btn btn-danger",
    //   onDeleteHandler: (data) => deleteLeadCompany(data),
      icon: <FaTrash />,
    },
  ];

  const addLeadCompany = () => {
    navigate("/salesExecutive/addLeadCompany");
  };

//   const updateLeadCompanyHandler = async (updateModel) => {
//     const response = await updateLeadCompanyById(updateModel);
//     if (response.isSuccess) {
//       myToaster.showSuccessToast(response.message);
//       fetchLeadCompanies();
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//   };

//   const editLeadCompany = (leadCompany) => {
//     console.log(leadCompany);
//     myToaster.leadCompanyEditSwal(leadCompany, fetchLeadCompanies);
//   };

  const fetchLeadCompanies = async () => {
    const response = await getAllLeadCompanies();
    if (response.isSuccess) {
      setLeadCompanyList(response.result);
      setShowSpinner(false);
    } else {
      myToaster.showErrorToast(response.message);
    }
  };

//   const deleteLeadCompanyHandler = async (id) => {
//     try {
//       console.log(id);
//       const result = await deleteLeadCompanyById(id);
//       if (result.isSuccess) {
//         myToaster.showSuccessToast(result.message);
//         fetchLeadCompanies();
//       } else {
//         myToaster.showErrorToast(result.message);
//       }
//     } catch (error) {
//       myToaster.showErrorToast("Failed to delete the company");
//     }
//   };

//   const deleteLeadCompany = async (leadCompany) => {
//     console.log(leadCompany);
//     myToaster.primereactDeleteLeadCompany(leadCompany, deleteLeadCompanyHandler);
//   };

  return (
    <>
      <BreadcrumbComponent labels={{ module: "salesExecutive", currentRoute: "Register-New-Lead-Company" }} />

      <div>
        {showSpinner ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "150px" }}>
            <CircularProgress />
          </div>
        ) : (
          <Grid
            headers={headers}
            buttons={btnList}
            data={leadCompanyList}
            loading={loading}
            onAdd={addLeadCompany}
            tableName="Lead Company"
            addButtonLabel="Add Lead Company"
          />
        )}
      </div>
      <ConfirmDialog />
    </>
  );
}

export default LeadCompanieList;

