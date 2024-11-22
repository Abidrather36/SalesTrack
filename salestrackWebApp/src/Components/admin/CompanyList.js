import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getCompanies, updateCompany } from "../../Services/CompanyService";
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../shared/Breadcrumb";
import myToaster from "../../utils/toaster";
import { useLocation } from "react-router-dom";
import { ConfirmDialog } from "primereact/confirmdialog";
import { deleteCompanyById } from "../../Services/CompanyService";
import { CircularProgress } from "@mui/material";
function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [showSpinner, setShowSpinner] = useState(true);

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
      onDeleteHandler: (data) => deleteCompany(data),
      icon: <FaTrash />,
    },
  ];

  const handleAdd = () => {
    navigate("/admin/add-new-company");
  };

  const editCompany = async (company) => {
    console.log(company);
    await myToaster.FireInputSwal(company, fetchComapnies);
  };
  const deleteSwalHandler = async (id) => {
    try {
        console.log(id);
        const result = await deleteCompanyById(id);
        if (result.isSuccess) {
            myToaster.showSuccessToast(result.message);
            fetchComapnies();
        } else {
            myToaster.showErrorToast(result.message);
        }
    } catch (error) {
        myToaster.showErrorToast('Failed to delete the company');
    }
};


  const deleteCompany = async (company) => {
    console.log(company);
    myToaster.primereactDeleteConfirm(company, deleteSwalHandler);
  };

  const fetchComapnies = async () => {
      const response = await getCompanies();
      if(response.isSuccess){
        setCompanies(response.result);
        setShowSpinner(false);
      }
      else{
        myToaster.showErrorToast(response.message);
      }
    }

  useEffect(() => {
    fetchComapnies();
  }, []);

  return (
    <>
      <BreadcrumbComponent labels={breadcrumbLabels} />
      {showSpinner ? (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"150px"}} >
            <CircularProgress/>

        </div>
      ) : (
      <Grid
        headers={headers}
        buttons={btnList}
        data={companies}
        onAdd={handleAdd}
        tableName="Companies"
        addButtonLabel="Add company"
      />
      )}
      <ConfirmDialog />
    </>
  );
}

export default CompanyList;
