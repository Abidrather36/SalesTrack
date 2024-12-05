import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../shared/Breadcrumb";
import myToaster from "../../utils/toaster";
import { ConfirmDialog } from "primereact/confirmdialog";
import { leadCategoryList, updateLeadCategory,deleteLeadCategoryById } from "../../Services/CompanyService";
import { CircularProgress } from "@mui/material";

function LeadCategoryList() {
  const [leadCategories, setLeadCategories] = useState([]);
  const navigate = useNavigate();
  const[showSpinner,setShowSpinner]=useState(true)

  const headers = [
    { key: "leadCategoryName", label: "Category Name" },
    { key: "leadCategoryDescription", label: "Description" },
    { key: "isActive", label: "Status"},
  ];

  const breadcrumbLabels = {
    module: "companyAdmin",
    currentRoute: "Lead Categories",
  };

  const btnList = [
    {
      key: "edit",
      title: "Edit",
      className: "btn btn-primary",
      onEditHandler: (data) => editLeadCategory(data),
      icon: <FaEdit />,
    },
    {
      key: "delete",
      title: "Delete",
      className: "btn btn-danger",
      onDeleteHandler: (data) => deleteLeadCategory(data),
      icon: <FaTrash />,
    },
  ];

  const handleAdd = () => {
    navigate("/companyAdmin/add-lead-category");
  };

 
  const editLeadCategory = async (leadCategory) => {
    console.log(leadCategory);
    await myToaster.leadCategoryEditSwal(leadCategory, fetchLeadCategories);
  };

  const deleteSwalHandler = async (id) => {
      console.log(id);
      const response = await deleteLeadCategoryById(id);
      if (response.isSuccess) {
        myToaster.showSuccessToast(response.message);
        fetchLeadCategories();
      } else {
        myToaster.showErrorToast(response.message);
      }
    } 

  const deleteLeadCategory = async (leadCategory) => {
    console.log(leadCategory);
    myToaster.primereactdeleteLeadCategory(leadCategory, deleteSwalHandler);
  };

  const fetchLeadCategories = async () => {
    const response = await leadCategoryList();
    if (response.isSuccess) {
      setLeadCategories(response.result);
      setShowSpinner(false);
    } else {
      setShowSpinner(false)
    }
  };

  useEffect(() => {
    fetchLeadCategories();
  }, []);

  return (
    <>
      <BreadcrumbComponent labels={breadcrumbLabels} />
      {showSpinner ? (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"150px"}} >
            <CircularProgress/>

        </div>
      ):(
      <Grid
        headers={headers}
        buttons={btnList}
        data={leadCategories}
        onAdd={handleAdd}
        tableName="Lead Categories"
        addButtonLabel="Add Lead Category"
      />
      )}
      <ConfirmDialog />
     
    </>
  );
}

export default LeadCategoryList;

