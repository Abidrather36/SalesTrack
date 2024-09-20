import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import BreadcrumbComponent from "../shared/Breadcrumb";
import { UserList as getUsers } from "../../Services/UserService";

function UserList() {
  const [users, setUsers] = useState([]);
  const headers = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "PhoneNumber" },
    { key: "userType", label: "userType" },
    { key: "repostsTo", label: "repostsTo" },
    { key: "isActive", label: "isActive" },
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
    
  };

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.result);
    } catch (err) {
      console.error("Failed to fetch enquiries", err);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <>
      <BreadcrumbComponent labels={breadcrumbLabels} />
      <Grid
        headers={headers}
        buttons={btnList}
        data={users}
        onAdd={addUser}
        tableName="Users"
        addButtonLabel="Add User"
      />
    </>
  );
}

export default UserList;
