import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import BreadcrumbComponent from "../shared/Breadcrumb";
import { UserLists } from "../../Services/UserService";
import { useNavigate } from "react-router-dom";
import myToaster from "../../utils/toaster";
import { CircularProgress } from "@mui/material";

function UserList() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const headers = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "PhoneNumber" },
    { key: "userType", label: "User Type" },
    { key: "reportsToName", label: "Reports To" },
    { key: "isActive", label: "Is Active" },
    { key: "companyName", label: "Company Name" },
  ];

  const breadcrumbLabels = {
    module: "CompanyAdmin",
    currentRoute: "users",
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

  const addUser = () => {
    navigate("/companyAdmin/add-new-user");
  };

  const fetchUsers = async () => {
    const response = await UserLists();
    if (response.isSuccess) {
      console.log(response.result);
      setUsers(response.result);
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
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"150px"}} >
        <CircularProgress  />

        </div>
      ) : (
        <Grid
          headers={headers}
          buttons={btnList}
          data={users}
          loading={loading}
          onAdd={addUser}
          tableName="Users"
          addButtonLabel="Add User"
        />
      )}
    </>
  );
}

export default UserList;
