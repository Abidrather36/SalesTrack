import React, { useState, useEffect } from "react";
import { getAllEnquiries } from "../../Services/AuthService";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import BreadcrumbComponent from "../shared/Breadcrumb";

function EnquiryList() {
  const [enquiries, setEnquiries] = useState([]);
  
  const headers = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "PhoneNumber" },
    { key: "isActive", label: "isActive" },
  ];

  const breadcrumbLabels={
    module:"Admin",
    currentRoute:"Enquiries"
  }

  const btnList = [
    {
      key: "edit",
      title: "Edit",
      className: "btn btn-primary",
      onEditHandler: (data) => console.log(data),
      icon:<FaEdit/>
    },
    {
      key: "delete",
      title: "Delete",
      className: "btn btn-danger",
      onDeleteHandler: (data) => console.log(data),
      icon:<FaTrash/>
    },
  ];
  const breadcrumLabels={
    module:"Admin",currentRoute:"Enquiries"
  }

  const addEnquiry = () => {
  
  };

  const fetchEnquiries = async () => {
    try {
      const response = await getAllEnquiries();
      setEnquiries(response.result);
    } catch (err) {
      console.error("Failed to fetch enquiries", err);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, []);

  return (
    <>

    <BreadcrumbComponent labels={breadcrumbLabels}/>
      <Grid
       headers={headers}
        buttons={btnList}
        data={enquiries}
        onAdd={addEnquiry}
        tableName="Enquiries" />

    </>
  );
}

export default EnquiryList;
