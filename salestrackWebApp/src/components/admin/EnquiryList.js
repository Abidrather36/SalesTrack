import React, { useState, useEffect } from "react";
import { getAllEnquiries } from "../../Services/AuthService";
import Grid from "../shared/Grid";
import { FaEdit, FaTrash } from "react-icons/fa";
import BreadcrumbComponent from "../shared/Breadcrumb";
import { deleteEnquiryById, updateEnquiry, updateEnquiryById } from "../../Services/EnquiryService";
import myToaster from "../../utils/toaster";
import { ConfirmDialog } from "primereact/confirmdialog";
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
      onEditHandler: (data) => updateEnquiry(data),
      icon:<FaEdit/>
    },
    {
      key: "delete",
      title: "Delete",
      className: "btn btn-danger",
      onDeleteHandler: (data) => deleteEnquiry(data),
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
  const deleteEnquiryHandler = async (enquiryId) => {
    try {
        const res = await deleteEnquiryById(enquiryId);
        if (res.isSuccess) {
            myToaster.showSuccessToast("Enquiry deleted successfully");
            fetchEnquiries();  
        } else {
            myToaster.showErrorToast(res.message);
        }
    } catch (error) {
        myToaster.showErrorToast("Failed to delete the enquiry");
    }
};
  const deleteEnquiry=(enquiry)=>{
    myToaster.primereactDeleteConfirmEnquiry(enquiry,deleteEnquiryHandler)
  }
  const updateEnquiryHandler=async(updateModel)=>{
      const response= await updateEnquiryById(updateModel);
      if(response.isSuccess){
        myToaster.showSuccessToast(response.message);
        fetchEnquiries();
      }
      else{
        myToaster.showErrorToast(response.message);
      }
  }
  const updateEnquiry=(enquiry)=>{
    console.log(enquiry)
    myToaster.FireInputSwalEnquiry(enquiry,fetchEnquiries)
  }

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
        tableName="Enquiries"
        addButtonLabel="Enquiry"
         />
    <ConfirmDialog/>
    </>
  );
}

export default EnquiryList;
