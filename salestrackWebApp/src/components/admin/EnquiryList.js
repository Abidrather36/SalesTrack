import React, { useState, useEffect } from "react";
import { getAllEnquiries } from "../../Services/AuthService";
import Grid from "./Grid";
import BreadcrumbComponent from "../shared/Breadcrumb";

function EnquiryList() {
  const [enquiries, setEnquiries] = useState([]);
  
  const headers = [
    { key: "name", label: "Name" },
    { key: "email", label: "Email" },
    { key: "phoneNumber", label: "PhoneNumber" },
    { key: "isActive", label: "isActive" },
  ];
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
  const breadcrumLabels={
    module:"Admin",currentRoute:"Enquiries"
  }

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
<<<<<<< HEAD
    <div>
      <BreadcrumbComponent labels={breadcrumLabels}/>
    </div>
      <Grid 
      headers={headers} 
      buttons={btnList}
      data={enquiries}/>
=======
      <Grid headers={headers} buttons={btnList} data={enquiries} />
>>>>>>> origin/aamir
    </>
  );
}

export default EnquiryList;
