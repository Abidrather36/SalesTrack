import React, { useEffect, useState } from "react";
import BreadcrumbComponent from "../shared/Breadcrumb";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import { CircularProgress } from "@mui/material";
import {
  deleteLeadSourceById,
  leadSources,
  updateLeadSourceById,
} from "../../Services/LeadSource";
import myToaster from "../../utils/toaster";
import { useNavigate } from "react-router-dom";
import { ConfirmDialog } from "primereact/confirmdialog";

function LeadSourceList() {
  const [leadsourcelist, setLeadSourceList] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const [loading, setLoading] = useState(true);
  const [confirmVisible, setConfirmVisible] = useState(false);
  const [selectedLeadSource, setSelectedLeadSource] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchLeadSources();
  }, []);
  let user=JSON.parse(localStorage.getItem("user"));
  const headers = [
    { key: "leadSourceName", label: "Lead Source Name" },
    { key: "description", label: "Description" },
    { key: "isActive", label: "isActive" },
  ];
  const btnList = [
    {
      key: "edit",
      title: "Edit",
      className: "btn btn-primary",
      onEditHandler: (data) => editLeadSource(data),
      icon: <FaEdit />,
    },
    {
      key: "delete",
      title: "Delete",
      className: "btn btn-danger",
      onDeleteHandler: (data) => handleDeleteLeadSource(data),
      icon: <FaTrash />,
    },
  ];
  const addLeadSource = () => {
    if(user.userRole==3){
      navigate("/salesExecutive/registerLeadSource");
    }
    else if(user.userRole==4){
      navigate("/salesManager/registerLeadSource");
    }
    else{
      myToaster.showErrorToast("unAuthorized Role ")
    }
  };

  const updateLeadSourceHandler = async (updateModel) => {
    const response = await updateLeadSourceById(updateModel);
    if (response.isSuccess) {
      myToaster.showSuccessToast(response.message);
      fetchLeadSources();
    } else {
      myToaster.showErrorToast(response.message);
    }
  };
  const editLeadSource = (leadSource) => {
    console.log(leadSource);
    myToaster.leadSourceEditSwal(leadSource, fetchLeadSources);
  };
  const fetchLeadSources = async () => {
    const response = await leadSources();
    if (response.isSuccess) {
      setLeadSourceList(response.result);
      setShowSpinner(false);
    } else {
      setShowSpinner(false);
    }
  };
  const deleteLeadSourceHandler = async (id) => {
    console.log(id);
    const result = await deleteLeadSourceById(id);
    if (result.isSuccess) {
      myToaster.showSuccessToast(result.message);
      fetchLeadSources();
    } else {
      myToaster.showErrorToast(result.message);
    }
  };
  const handleDeleteLeadSource = (leadSource) => {
    setSelectedLeadSource(leadSource); // Store the company to be deleted
    setConfirmVisible(true); // Show the dialog
  };

  // const deleteLeadSource = async (leadSource) => {
  //   console.log(leadSource);
  //   myToaster.primereactDeleteLeadSource(leadSource,deleteLeadSourceHandler)
  // };
  return (
    <>
      <BreadcrumbComponent
        labels={{
          module: "salesExecutive",
          currentRoute: "Register-New-Lead-Source",
        }}
      />

      <div>
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
            data={leadsourcelist}
            loading={loading}
            onAdd={addLeadSource}
            tableName="Lead Source"
            addButtonLabel="Add LeadSource"
          />
        )}
      </div>
      <ConfirmDialog
        visible={confirmVisible}
        onHide={() => setConfirmVisible(false)}
        message={`Are you sure you want to delete the enquiry "${selectedLeadSource?.leadSourceName}"?`}
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        acceptLabel="Yes"
        rejectLabel="No"
        acceptClassName="p-button-secondary"
        rejectClassName="p-button-danger"
        className="custom-dialog"
        accept={() => deleteLeadSourceHandler(selectedLeadSource?.id)}
      />
    </>
  );
}

export default LeadSourceList;
