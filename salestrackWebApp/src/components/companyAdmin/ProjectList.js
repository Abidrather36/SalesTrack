// import React, { useState, useEffect } from "react";
// import Grid from "../shared/Grid";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";
// import BreadcrumbComponent from "../shared/Breadcrumb";
// import myToaster from "../../utils/toaster";
// import { ConfirmDialog } from "primereact/confirmdialog";
// import { projectList, deleteProjectById } from "../../Services/CompanyService";
// import { CircularProgress } from "@mui/material";
// import { getAllProjectsByUser } from "../../Services/LeadService";

// function ProjectList() {
//   const [projects, setProjects] = useState([]);
//   const [showSpinner, setShowSpinner] = useState(true);
//   const navigate = useNavigate();

//   const headers = [
//     { key: "projectName", label: "Project Name" },
//     { key: "startDate", label: "Start Date" },
//     { key: "endDate", label: "End Date" },
//     { key: "isActive", label: "Project Status" },
//   ];
//   const breadcrumbLabels = {
//     module: "companyAdmin",
//     currentRoute: "Projects",
//   };

//   const btnList = [
//     {
//       key: "edit",
//       title: "Edit",
//       className: "btn btn-primary",
//       onEditHandler: (data) => editProject(data),
//       icon: <FaEdit />,
//     },
//     {
//       key: "delete",
//       title: "Delete",
//       className: "btn btn-danger",
//       // onDeleteHandler: (data) => deleteProject(data),
//       icon: <FaTrash />,
//     },
//   ];

//   const handleAdd = () => {
//     navigate("/companyAdmin/add-project");
//   };

//   const editProject = async (project) => {
//     console.log(project);
//     await myToaster.projectEditSwal(project, fetchProjects);
//   };

//   // const deleteSwalHandler = async (id) => {
//   //   console.log(id);
//   //   const response = await deleteProjectById(id);
//   //   if (response.isSuccess) {
//   //     myToaster.showSuccessToast(response.message);
//   //     fetchProjects();
//   //   } else {
//   //     myToaster.showErrorToast(response.message);
//   //   }
//   // };

//   // const deleteProject = async (project) => {
//   //   console.log(project);
//   //   myToaster.primereactdeleteProject(project, deleteSwalHandler);
//   // };
// const userId=JSON.parse(localStorage.getItem("user"))
//   const fetchProjects = async () => {
//     const response = await getAllProjectsByUser(userId);
//     if (response.isSuccess) {
//       setProjects(response.result);
//       setShowSpinner(false);
//     } else {
//       myToaster.showErrorToast(response.message);
//       setShowSpinner(false);
//     }
//   };

//   useEffect(() => {
//     fetchProjects();
//   }, []);

//   return (
//     <>
//       <BreadcrumbComponent labels={breadcrumbLabels} />
//       {showSpinner ? (
//         <div
//           style={{
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             marginTop: "150px",
//           }}
//         >
//           <CircularProgress />
//         </div>
//       ) : (
//         <Grid
//           headers={headers}
//           buttons={btnList}
//           data={projects}
//           onAdd={handleAdd}
//           tableName="Projects"
//           addButtonLabel="Add Project"
//         />
//       )}
//       <ConfirmDialog />
//     </>
//   );
// }

// export default ProjectList;


import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import BreadcrumbComponent from "../shared/Breadcrumb";
import myToaster from "../../utils/toaster";
import { ConfirmDialog } from "primereact/confirmdialog";
import { getAllProjectsByUser } from "../../Services/CompanyService";
import { CircularProgress } from "@mui/material";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);
  const navigate = useNavigate();

  const headers = [
    { key: "projectName", label: "Project Name" },
    { key: "startDate", label: "Start Date" },
    { key: "endDate", label: "End Date" },
    { key: "isActive", label: "Project Status" },
  ];


  const breadcrumbLabels = {
    module: "companyAdmin",
    currentRoute: "Projects",
  };

  const btnList = [
    {
      key: "edit",
      title: "Edit",
      className: "btn btn-primary",
      onEditHandler: (data) => editProject(data),
      icon: <FaEdit />,
    },
    {
      key: "delete",
      title: "Delete",
      className: "btn btn-danger",
      icon: <FaTrash />,
    },
  ];

  const handleAdd = () => {
    navigate("/companyAdmin/addProject");
  };

  const editProject = async (project) => {
    console.log(project);
    await myToaster.projectEditSwal(project, fetchProjects);
  };

  // const deleteSwalHandler = async (id) => {
  //   const response = await deleteProjectById(id);
  //   if (response.isSuccess) {
  //     myToaster.showSuccessToast(response.message);
  //     fetchProjects();
  //   } else {
  //     myToaster.showErrorToast(response.message);
  //   }
  // };

  // const deleteProject = async (project) => {
  //   myToaster.primereactdeleteProject(project, deleteSwalHandler);
  // };

  const fetchProjects = async () => {
    setShowSpinner(true); // Show spinner before fetching
    const response = await getAllProjectsByUser();
    console.log("Project List",response.result);
    if (response.isSuccess) {
      setProjects(response.result);
     
    } else {
      myToaster.showErrorToast(response.message);
    }
    setShowSpinner(false); // Hide spinner after fetching
  };

  useEffect(() => {
   fetchProjects()
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
          data={projects}
          onAdd={handleAdd}
          tableName="Projects"
          addButtonLabel="Add Project"
        />
      )}
      <ConfirmDialog />
    </>
  );
}

export default ProjectList;
