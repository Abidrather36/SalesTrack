import React, { useEffect, useState } from "react";
import BreadcrumbComponent from "../shared/Breadcrumb";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import myToaster from "../../utils/toaster";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from "primereact/confirmdialog";
import { deletLeadCompanyById, getAllLeadCompanies, updateLeadCompany } from "../../Services/LeadService";

function LeadCompanieList() {
  const [leadCompanyList, setLeadCompanyList] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const [loading, setLoading] = useState(true);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedLeadCompany, setSelectedLeadCompany] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeadCompanies();
  }, []);
  let user=JSON.parse(localStorage.getItem("user"));
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
      onEditHandler: (data) => editLeadCompany(data),
      icon: <FaEdit />,
    },
    {
      key: "delete",
      title: "Delete",
      className: "btn btn-danger",
      onDeleteHandler: (data) => handleDeleteLeadCompany(data),
      icon: <FaTrash />,
    },
  ];

  const addLeadCompany = () => {
    if(user.userRole==3){
      navigate("/salesExecutive/addLeadCompany");
    }
    else if(user.userRole==4){
      navigate("/salesManager/addLeadCompany");
    }
    else{
      myToaster.error("You don't have permission to add Lead Company");
    }
  };

  const updateLeadCompanyHandler = async (updateModel) => {
    const response = await updateLeadCompany(updateModel);
    if (response.isSuccess) {
      myToaster.showSuccessToast(response.message);
      fetchLeadCompanies();
    } else {
      myToaster.showErrorToast(response.message);
    }
  };

  const editLeadCompany = (leadCompany) => {
    console.log(leadCompany);
    myToaster.leadCompanyEditSwal(leadCompany, fetchLeadCompanies);
  };

  const fetchLeadCompanies = async () => {
    const response = await getAllLeadCompanies();
    if (response.isSuccess) {
      setLeadCompanyList(response.result);
      setShowSpinner(false);
    } else {
      myToaster.showErrorToast(response.message);
      setShowSpinner(false);
    }
  };

  const deleteLeadCompanyHandler = async (id) => {
    console.log(id);
    const result = await deletLeadCompanyById(id);
    if (result.isSuccess) {
      myToaster.showSuccessToast(result.message);
      fetchLeadCompanies();
    } else {
      myToaster.showErrorToast(result.message);
    }
  };

  const handleDeleteLeadCompany = (leadCompany) => {
    setSelectedLeadCompany(leadCompany);
    setConfirmVisible(true);
  };

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
      <ConfirmDialog
        visible={confirmVisible}
        onHide={() => setConfirmVisible(false)}
        message={`Are you sure you want to delete the lead company "${selectedLeadCompany?.leadCompanyName || ""}"?`}
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        acceptLabel="Yes"
        rejectLabel="No"
        acceptClassName="p-button-secondary"
        rejectClassName="p-button-danger"
        className="custom-dialog"
        accept={() => deleteLeadCompanyHandler(selectedLeadCompany?.id)}
      />
    </>
  );
}

export default LeadCompanieList;
