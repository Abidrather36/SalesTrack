import React, { useState, useEffect } from "react";
import { getAllEnquiries } from "../../Services/AuthService";
import Grid from "./Grid";
import { FaEdit, FaTrash } from "react-icons/fa";

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
      <Grid
       headers={headers}
        buttons={btnList}
        data={enquiries}
        tableName="Enquiries" />
    </>
  );
}

export default EnquiryList;
