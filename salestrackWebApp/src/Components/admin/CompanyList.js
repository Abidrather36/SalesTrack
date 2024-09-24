import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import { getCompanies, updateCompany } from "../../Services/CompanyService";
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../shared/Breadcrumb";
import myToaster from "../../utils/toaster";
import { useLocation } from "react-router-dom";

function CompanyList() {
  const [companies, setCompanies] = useState([]);
  const navigate=useNavigate()
  const location=useLocation()

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
    navigate("/admin/add-new-company")
  };
 
  const editCompany=async (company)=>{
    console.log(company)
   await myToaster.FireInputSwal(company);
   await fetchComapnies();

  }

  const deleteCompany=(company)=>{

  }

  const fetchComapnies = async () => {
    try {
      const response = await getCompanies();
      setCompanies(response.result);
      console.log(companies)
    } catch (err) {
      myToaster.showErrorToast(err.message);
    }
  };

  useEffect(() => {
    fetchComapnies();
  }, []);

  return (
    <>
      <BreadcrumbComponent labels={breadcrumbLabels} />
      <Grid
        headers={headers}
        buttons={btnList}
        data={companies}
        onAdd={handleAdd}
        tableName="Companies"
        addButtonLabel="Add company"
      />
    </>
  );
}

export default CompanyList;
