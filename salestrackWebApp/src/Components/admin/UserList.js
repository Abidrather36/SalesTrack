import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid";
import { getAllUsers } from "../../Services/AuthService";
import BreadcrumbComponent from "../shared/Breadcrumb";

function UserList() {
  const [users, setUsers] = useState([]);
  const headers = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "PhoneNumber" },
    { key: "isActive", label: "isActive" },
    { key: "userTypr", label: "UserType" },
  ];
  const breadcrumbLabels={
    module:"Admin",
    currentRoute:"users"
  }
  const btnList = [
    {
      key: "edit",
      label: "Edit",
      className: "btn btn-primary",
      onClick: (data) => console.log(data),
    },
    {
      key: "delete",
      label: "Delete",
      className: "btn btn-danger",
      onClick: (data) => console.log(data),
    },
  ];

  const fetchUsers = async () => {
    try {
      const response = await getAllUsers();
      setUsers(response.result);
      console.log(users)
    } catch (err) {
      console.error("Failed to fetch enquiries", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);
  
  return (
    <>
    <BreadcrumbComponent labels={breadcrumbLabels}/>
      <Grid headers={headers} buttons={btnList} data={users} />
    </>
  );
}

export default UserList;
