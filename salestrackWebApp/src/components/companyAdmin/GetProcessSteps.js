import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid"; // 
import BreadcrumbComponent from "../shared/Breadcrumb";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { getAllProcessSteps } from "../../Services/UserService";

function GetProcessSteps() {
  const [processSteps, setProcessSteps] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

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

  const addProcessStep = () => {
    navigate("/companyAdmin/processStepList");
  };

  const fetchProcessSteps = async () => {
    try {
      const response = await getAllProcessSteps();
      setProcessSteps(response.result);
    } catch (err) {
      console.error("Failed to fetch process steps", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BreadcrumbComponent labels={breadcrumbLabels} />
      <Grid
        headers={headers}
        buttons={btnList}
        data={processSteps}
        loading={loading}
        onAdd={addProcessStep}
        tableName="Process Steps"
        addButtonLabel="Add Process Step"
      />
    </>
  );
}

export default GetProcessSteps;
