import React, { useEffect, useState } from 'react'
import BreadcrumbComponent from '../shared/Breadcrumb'
import Grid from '../shared/Grid'
import { FaEdit, FaTrash } from "react-icons/fa";
import { CircularProgress } from '@mui/material'
import { leadSources } from '../../Services/LeadSource'
import myToaster from '../../utils/toaster'
import { useNavigate } from 'react-router-dom'

function LeadSourceList() {
    const [leadsourcelist,setLeadSourceList]=useState([])
    const [showSpinner, setShowSpinner] = useState(true);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    useEffect(() => {
      fetchLeadSources()
    }, [])
    
    const breadcrumbLabels={
        moudule:"salesExecutive",
        currentRoute:"Register-New-SourceLead"
    }
    const headers=[
        {key: "leadSourceName",label: "string",},
        {key :"description",label:"Description" },
    ]
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
      const addLeadSource = () => {
        navigate("/salesExecutive/registerLeadSource");
      };

      const fetchLeadSources =async ()=>{
        const response =await leadSources()
        if(response.isSuccess){
            setLeadSourceList(response.result)
            setShowSpinner(false)
        }
        else{
            myToaster.showErrorToast(response.message)
        }
      }
  return (
    <div>
      <BreadcrumbComponent labels={breadcrumbLabels}/>
      {showSpinner ? (
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",marginTop:"150px"}} >
        <CircularProgress  />

        </div>
      ) : (
        <Grid
          headers={headers}
          buttons={btnList}
          data={leadsourcelist}
          loading={loading}
          onAdd={addLeadSource}
          tableName="Lead Source"
          addButtonLabel="Add LeadSource"
        />
      )}
    </div>
  )
}

export default LeadSourceList
