import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid"; // 
import BreadcrumbComponent from "../shared/Breadcrumb";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllProcessSteps } from "../../Services/UserService";
import { getAdminProcessesByCompany } from "../../Services/CompanyService";
import myToaster from "../../utils/toaster";
import { CircularProgress } from "@mui/material";

function GetAdminProcessSteps() {
  const [processSteps, setProcessSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    fetchProcessSteps();
  }, []);

  const headers = [
    { key: "stepName", label: "Step Name" },
  
  ];

  const breadcrumbLabels = {
    module: "CompanyAdmin",
    currentRoute: "getAllProcess-steps",
  };

  const btnList = [
    {
      key: "edit",
      title: "Edit",
      className: "btn btn-primary",
      onEditHandler: (data) => editAdminProcessStep(data),
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

  const addProcessStep = () => {
    navigate("/companyAdmin/addProcessStep");
  };
  const editAdminProcessStep =(adminPorcesStepModel)=>{
    myToaster.FireInputSwalAdminProcessStep(adminPorcesStepModel,fetchProcessSteps)
  }
  const fetchProcessSteps = async () => {

      const response = await getAdminProcessesByCompany();
      if(response.isSuccess){
        setProcessSteps(response.result);
        setShowSpinner(false);
      }
      else{
        myToaster.showErrorToast(response.message)
      setShowSpinner(false);
      }
      setLoading(false);
    }

  return (
    <>
      <BreadcrumbComponent labels={breadcrumbLabels} />
      {showSpinner ? (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"150px"}} >
        <CircularProgress  />

        </div>
      ):(
        <Grid
        headers={headers}
        buttons={btnList}
        data={processSteps}
        loading={loading}
        onAdd={addProcessStep}
        tableName="Process Steps"
        addButtonLabel="Add Process Step"
      />
      )}
   
    </>
  );
}

export default GetAdminProcessSteps;
