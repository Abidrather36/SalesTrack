import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getCompanies, deleteCompanyById } from "../../Services/CompanyService";
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../shared/Breadcrumb";
import myToaster from "../../utils/toaster";
import { CircularProgress } from "@mui/material";
import { ConfirmDialog, confirmDialog } from "primereact/confirmdialog";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  const navigate = useNavigate();

  const headers = [
    { key: "adminName", label: "Admin Name" },
    { key: "companyName", label: "Company Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "PhoneNumber" },
    { key: "isActive", label: "isActive" },
  ];

  const breadcrumbLabels = {
    module: "Admin",
    currentRoute: "Companies",
  };

  const btnList = [
    {
      key: "edit",
      title: "Edit",
      className: "btn btn-primary",
      onEditHandler: (data) => editCompany(data),
      icon: <FaEdit />,
    },
    {
      key: "delete",
      title: "Delete",
      className: "btn btn-danger",
      onDeleteHandler: (data) => handleDeleteCompany(data),
      icon: <FaTrash />,
    },
  ];

  const fetchComapnies = async () => {
    setShowSpinner(true);
    const response = await getCompanies();
    if (response.isSuccess) {
      setCompanies(response.result);
    } else {
      myToaster.showErrorToast(response.message);
    }
    setShowSpinner(false);
  };

  const editCompany = async (company) => {
    console.log(company);
    await myToaster.FireInputSwal(company, fetchComapnies);
  };

  const handleDeleteCompany = (company) => {
    setSelectedCompany(company); // Store the company to be deleted
    setConfirmVisible(true); // Show the dialog
  };

  const deleteCompany = async (id) => {
    try {
      const result = await deleteCompanyById(id);
      if (result.isSuccess) {
        myToaster.showSuccessToast(result.message);
        fetchComapnies();
      } else {
        myToaster.showErrorToast(result.message);
      }
    } catch (error) {
      myToaster.showErrorToast("Failed to delete the company");
    } finally {
      setConfirmVisible(false); // Close the dialog
    }
  };

  useEffect(() => {
    fetchComapnies();
  }, []);

  return (
    <>
      <BreadcrumbComponent labels={breadcrumbLabels} />
      {showSpinner ? (
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
      ) : (
        <Grid
          headers={headers}
          buttons={btnList}
          data={companies}
          onAdd={() => navigate("/admin/add-new-company")}
          tableName="Companies"
          addButtonLabel="Add company"
        />
      )}

      {/* ConfirmDialog */}
      <ConfirmDialog
        visible={confirmVisible}
        onHide={() => setConfirmVisible(false)}
        message={`Are you sure you want to delete the company "${selectedCompany?.companyName}"?`}
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        acceptLabel="Yes"
        rejectLabel="No"
        acceptClassName="p-button-secondary"
        rejectClassName="p-button-danger"
        className="custom-dialog"
        accept={() => deleteCompany(selectedCompany?.id)}
      />
    </>
  );
}

export default CompanyList;
