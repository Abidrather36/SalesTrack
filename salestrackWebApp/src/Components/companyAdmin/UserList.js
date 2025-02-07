import React, { useState, useEffect } from "react";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash ,FaClipboardList} from "react-icons/fa";
import BreadcrumbComponent from "../shared/Breadcrumb";
import { deleteUser, deleteUserById, UserLists } from "../../Services/UserService";
import { useNavigate } from "react-router-dom";
import myToaster from "../../utils/toaster";
import { CircularProgress } from "@mui/material";
import { ConfirmDialog } from "primereact/confirmdialog";

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
      onEditHandler: (data) => updateUser(data),
      icon: <FaEdit />,
    },
    {
      key: "delete",
      title: "Delete",
      className: "btn btn-danger",
      onDeleteHandler: (data) => deleteUser(data),
      icon: <FaTrash />,
    },
    {
    key: "timeSheet",
    title: "ViewTimeSheet",
    className: "btn btn-info",
    onClickTimeSheetHandler: (user) => viewTimeSheet(user),
    icon: <FaClipboardList />,
    }
  ];

  const addUser = () => {
    navigate("/companyAdmin/add-new-user");
  };

  const updateUser=(user)=>{
    console.log(user)
   myToaster.FireInputSwalUser(user,fetchUsers)
  }

  const deletUserHandler=async (id)=>{
    console.log(id)
    const response =await deleteUserById(id)
    if(response.isSuccess){
      myToaster.showSuccessToast(response.message)
      fetchUsers();
    }
    else{
      myToaster.showErrorToast(response.message)
    }
  }

  const deleteUser=(lead)=>{
    console.log(lead);
    myToaster.primereactDeleteConfirmUser(lead,deletUserHandler)
  }

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
  const viewTimeSheet = (user) => {
    // navigate(`/companyAdmin/view-time-sheet/${user.id}`); // Adjust the URL if needed
    navigate("/companyAdmin/view-time-sheet"); // Adjust the URL if needed

  };
  return (
    <>
      <BreadcrumbComponent labels={breadcrumbLabels} />
      {showSpinner ? (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"150px"}} >
            <CircularProgress/>

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
   
           <ConfirmDialog />
    </>

  );
}

export default UserList;
