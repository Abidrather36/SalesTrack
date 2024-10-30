
import React, { useState, useEffect } from 'react';
import { timeSheetList } from '../../Services/LeadService';
import myToaster from '../../utils/toaster';
import BreadcrumbComponent from '../shared/Breadcrumb';
import Grid from '../shared/Grid';
import { FaEdit,FaTrash} from "react-icons/fa";
import { Navigate, useNavigate } from 'react-router-dom';

function TimeSheetList() {
  const [timesheetList, setTimeSheetList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [timeSheet,setTimeSheet]=useState([])
  const [hoursSpent,setHoursSpent]=useState(0)
  const [comment,setComment]=useState("")
  const [date,setDate]=useState("")
  const navigate =useNavigate();

  const headers = [
    { key: "dateString", label: "Date" },
    { key: "processStep", label: "Process Step" },
    { key: "hoursSpent", label: "Hours Spent" },
    { key: "comment", label: "Comment" },
  ];

  useEffect(() => {
  fetchTimeSheetList();
  }, [])
  

  const editSheet=(timesheet)=>{
  console.log(timesheet)
   myToaster.editTimeSheet(timesheet,fetchTimeSheetList);

  }

  const fetchTimeSheetList = async () => {
    setLoading(true);
    
      const response = await timeSheetList();
      if (response.isSuccess) {
        setTimeSheetList(response.result);
      } else {
        myToaster.showErrorToast(response.message);
      }
    setLoading(false);
  };

  return (
    <div>
      <BreadcrumbComponent labels={{ module: "SalesExecutive", currentRoute: "TimeSheetList" }} />
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
          // onDeleteHandler:()=>deleteSheet(),
          icon: <FaTrash />,
          
        }

      ]}
        headers={headers}
        data={timesheetList}
        onAdd={()=>navigate("/salesExecutive/timeSheet")}
        loading={loading}
        tableName="Time Sheet List"
        addButtonLabel="Add Time Sheet"   
      />
      
    </div>
  );
}

export default TimeSheetList;
