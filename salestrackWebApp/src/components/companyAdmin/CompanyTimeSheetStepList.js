import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import BreadcrumbComponent from "../shared/Breadcrumb";
import { useNavigate } from "react-router-dom";
import myToaster from "../../utils/toaster";
import { CircularProgress } from "@mui/material";
import { ConfirmDialog } from "primereact/confirmdialog";
import { getCompanyTimeSheetStepLists } from "../../Services/CompanyService";

function CompanyTimeSheetStepList() {
  const [timeSheetSteps, setTimeSheetSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchTimeSheetSteps();
  }, []);

  const headers = [
    { key: "name", label: "Name" }, // Only name is available in the payload
  ];

  const breadcrumbLabels = {
    module: "CompanyAdmin",
    currentRoute: "timeSheetSteps",
  };

  const btnList = [
    {
      key: "edit",
      title: "Edit",
      className: "btn btn-primary",
    //   onEditHandler: (data) => updateTimeSheetStep(data),
      icon: <FaEdit />,
    },
    {
      key: "delete",
      title: "Delete",
      className: "btn btn-danger",
    //   onDeleteHandler: (data) => deleteTimeSheetStep(data),
      icon: <FaTrash />,
    },
  ];

  const addTimeSheetStep = () => {
    navigate("/companyAdmin/addTimeSheetStep");
  };

//   const updateTimeSheetStep = (step) => {
//     console.log(step);
//     myToaster.FireInputSwalTimeSheetStep(step, fetchTimeSheetSteps);
//   };

//   const deleteTimeSheetStepHandler = async (id) => {
//     console.log(id);
//     const response = await deleteCompanyTimeSheetStepById(id);
//     if (response.isSuccess) {
//       myToaster.showSuccessToast(response.message);
//       fetchTimeSheetSteps();
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//   };

//   const deleteTimeSheetStep = (step) => {
//     console.log(step);
//     myToaster.primereactDeleteConfirmTimeSheetStep(step, deleteTimeSheetStepHandler);
//   };

  const fetchTimeSheetSteps = async () => {
    const response = await getCompanyTimeSheetStepLists();
    if (response.isSuccess) {
      console.log(response.result);
      setTimeSheetSteps(response.result);
      setShowSpinner(false);
    } else {
      myToaster.showErrorToast(response.message);
      setShowSpinner(false);
    }
    setLoading(false);
  };

  return (
    <>
      <BreadcrumbComponent labels={breadcrumbLabels} />
      {showSpinner ? (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", marginTop: "150px" }}>
          <CircularProgress />
        </div>
      ) : (
        <Grid
          headers={headers}
          buttons={btnList}
          data={timeSheetSteps}
          loading={loading}
          onAdd={addTimeSheetStep}
          tableName="Company Time Sheet Steps"
          addButtonLabel="Add Time Sheet Step"
        />
      )}
      <ConfirmDialog />
    </>
  );
}

export default CompanyTimeSheetStepList;
