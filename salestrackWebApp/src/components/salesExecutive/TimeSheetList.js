
import React, { useState, useEffect } from 'react';
import { deleteTimeSheetById, timeSheetList } from '../../Services/LeadService';
import myToaster from '../../utils/toaster';
import BreadcrumbComponent from '../shared/Breadcrumb';
import Grid from '../shared/Grid';
import { FaEdit,FaTrash} from "react-icons/fa";
import { Navigate, useNavigate } from 'react-router-dom';
import { CircularProgress } from "@mui/material";
import { ConfirmDialog } from 'primereact/confirmdialog';

function TimeSheetList() {
  const [timesheetList, setTimeSheetList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeSheet,setTimeSheet]=useState([])
  const [hoursSpent,setHoursSpent]=useState(0)
  const [comment,setComment]=useState("")
  const [date,setDate]=useState("")
  const navigate =useNavigate();
  const [showSpinner,setShowSpinner]=useState(true)
  const [selectedtimesheet,setSelectedTimeSheet]=useState(null)
  const [confirmVisible, setConfirmVisible] = useState(false);


  const headers = [
    { key: "dateString", label: "Date" },
    { key: "timeSheetStepName", label: "Time Sheet StepName" },
    { key: "hoursSpent", label: "Hours Spent" },
    { key: "comment", label: "Comment" },
    { key: "isActive",label:"IsActive"}
  ];
  let user =JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
  fetchTimeSheetList();
  }, [])
  
  let addTimeSheet=()=>{
    if(user.userRole==3){
      navigate("/salesExecutive/timeSheet");
    }
    else if(user.userRole==4){
      navigate("/salesManager/timeSheet");
    }
    else{
      myToaster.showErrorToast("You are not authorized to access this page");
    }
  }
  const handleDeleteTimeSheet = (timesheet) => {
    setSelectedTimeSheet(timesheet); 
    setConfirmVisible(true); 
  };
const deleteTimeSheet = async (id)=>{
  let response= await deleteTimeSheetById(id);
  if(response.isSuccess){
    myToaster.showSuccessToast(response.message);
      fetchTimeSheetList();
  }
  else{
    myToaster.showErrorToast(response.message);
    setConfirmVisible(false); 

  }
}
  const editSheet=(timesheet)=>{
  console.log(timesheet)
   myToaster.editTimeSheet(timesheet,fetchTimeSheetList);

  }

  const fetchTimeSheetList = async () => {
    setLoading(true);
    
      const response = await timeSheetList();
      if (response.isSuccess) {
        setTimeSheetList(response.result);
        setShowSpinner(false)
      } else {
        myToaster.showErrorToast(response.message);
      }
    setLoading(false);
  };

  return (
    <>
      <BreadcrumbComponent labels={{ module: "SalesExecutive", currentRoute: "TimeSheetList" }} />
      {showSpinner ? (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"150px"}} >
            <CircularProgress/>

        </div>
      ):(
      <Grid
      buttons={[
        {
          key: "edit",
          title: "Edit",
          className: "btn btn-primary",
          onEditHandler: (timesheet) => editSheet(timesheet),
          icon: <FaEdit />,
        },
        {
          key: "delete",
          title: "Delete",
          onDeleteHandler:(timesheet)=>handleDeleteTimeSheet(timesheet),
          icon: <FaTrash />,
          
        }

      ]}
        headers={headers}
        data={timesheetList}
        onAdd={addTimeSheet}
        loading={loading}
        tableName="Time Sheet List"
        addButtonLabel="Add Time Sheet"   
      />
    )}
         <ConfirmDialog
        visible={confirmVisible}
        onHide={() => setConfirmVisible(false)}
        message={`Are you sure you want to delete the Timesheet "${selectedtimesheet?.timeSheetStepName}"?`}
        header="Confirmation"
        icon="pi pi-exclamation-triangle"
        acceptLabel="Yes"
        rejectLabel="No"
        acceptClassName="p-button-secondary"
        rejectClassName="p-button-danger"
        className="custom-dialog"
        accept={() => deleteTimeSheet(selectedtimesheet?.id)}
      />
    </>
  );
}

export default TimeSheetList;
