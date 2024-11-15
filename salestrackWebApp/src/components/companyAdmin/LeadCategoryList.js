import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash } from "react-icons/fa";
// import { getLeadCategories, updateLeadCategory, deleteLeadCategoryById } from "../../Services/LeadCategoryService";
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../shared/Breadcrumb";
import myToaster from "../../utils/toaster";
import { ConfirmDialog } from "primereact/confirmdialog";
import { leadCategoryList } from "../../Services/CompanyService";
import { CircularProgress } from "@mui/material";

function LeadCategoryList() {
  const [leadCategories, setLeadCategories] = useState([]);
  const navigate = useNavigate();

  const headers = [
    { key: "leadCategoryName", label: "Category Name" },
    { key: "leadCategoryDescription", label: "Description" },
  ];

  const breadcrumbLabels = {
    module: "Admin",
    currentRoute: "Lead Categories",
  };

  const btnList = [
    {
      key: "edit",
      title: "Edit",
      className: "btn btn-primary",
    //   onEditHandler: (data) => editLeadCategory(data),
      icon: <FaEdit />,
    },
    {
      key: "delete",
      title: "Delete",
      className: "btn btn-danger",
    //   onDeleteHandler: (data) => deleteLeadCategory(data),
      icon: <FaTrash />,
    },
  ];

  const handleAdd = () => {
    navigate("/companyAdmin/add-lead-category");
  };

//   const editLeadCategory = async (leadCategory) => {
//     console.log(leadCategory);
//     await myToaster.FireInputSwal(leadCategory, fetchLeadCategories);
//   };

//   const deleteSwalHandler = async (id) => {
//     try {
//       console.log(id);
//     //   const result = await deleteLeadCategoryById(id);
//       if (result.isSuccess) {
//         myToaster.showSuccessToast(result.message);
//         fetchLeadCategories();
//       } else {
//         myToaster.showErrorToast(result.message);
//       }
//     } catch (error) {
//       myToaster.showErrorToast("Failed to delete the lead category");
//     }
//   };

//   const deleteLeadCategory = async (leadCategory) => {
//     console.log(leadCategory);
//     myToaster.primereactDeleteConfirm(leadCategory, deleteSwalHandler);
//   };

  const fetchLeadCategories = async () => {
    const response = await leadCategoryList();
    if (response.isSuccess) {
      setLeadCategories(response.result);
    } else {
      myToaster.showErrorToast(response.message);
    }
  };

  useEffect(() => {
    fetchLeadCategories();
  }, []);

  return (
    <>
      <BreadcrumbComponent labels={breadcrumbLabels} />
      <Grid
        headers={headers}
        buttons={btnList}
        data={leadCategories}
        onAdd={handleAdd}
        tableName="Lead Categories"
        addButtonLabel="Add Lead Category"
      />
      
      <ConfirmDialog />
     
    </>
  );
}

export default LeadCategoryList;

