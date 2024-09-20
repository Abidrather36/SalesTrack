import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import BreadcrumbComponent from "../shared/Breadcrumb";
import { getCompanies } from "../../Services/CompanyService";
import myToaster from "../../utils/toaster";

function CompanyList() {
  const [companies, setCompanies] = useState([]);

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


  const addCompany = () => {};

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
        onAdd={addCompany}
        tableName="Companies"
      />
    </>
  );
}

export default CompanyList;
