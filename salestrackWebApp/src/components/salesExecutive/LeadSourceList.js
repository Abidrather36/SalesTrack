import React, { useEffect, useState } from 'react'
import BreadcrumbComponent from '../shared/Breadcrumb'
import Grid from '../shared/Grid'
import { FaEdit, FaTrash } from "react-icons/fa";
import { CircularProgress } from '@mui/material'
import { deleteLeadSourceById, leadSources, updateLeadSourceById } from '../../Services/LeadSource'
import myToaster from '../../utils/toaster'
import { useNavigate } from 'react-router-dom'
import { ConfirmDialog } from 'primereact/confirmdialog';

function LeadSourceList() {
    const [leadsourcelist,setLeadSourceList]=useState([])
    const [showSpinner, setShowSpinner] = useState(true);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();


    useEffect(() => {
      fetchLeadSources()
    }, [])
  
    const headers=[
        {key: "leadSourceName",label: "Lead Source Name",},
        {key :"description",label:"Description" },
        { key: "isActive", label: "isActive" },


    ]
    const btnList = [
        {
          key: "edit",
          title: "Edit",
          className: "btn btn-primary",
          onEditHandler: (data) => editLeadSource(data),
          icon: <FaEdit />,
        },
        {
          key: "delete",
          title: "Delete",
          className: "btn btn-danger",
          onDeleteHandler: (data) => deleteLeadSource(data),
          icon: <FaTrash />,
        },
      ];
      const addLeadSource = () => {
        navigate("/salesExecutive/registerLeadSource");
      };

      const updateLeadSourceHandler=async(updateModel)=>{
        const response= await updateLeadSourceById(updateModel);
        if(response.isSuccess){
          myToaster.showSuccessToast(response.message);
         fetchLeadSources();
        }
        else{
          myToaster.showErrorToast(response.message);
        }
    }
      const editLeadSource=(leadSource)=>{
        console.log(leadSource)
        myToaster.leadSourceEditSwal(leadSource,fetchLeadSources)
      }
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
      const deleteLeadSourceHandler = async (id) => {
        try {
            console.log(id);
            const result = await deleteLeadSourceById(id);
            if (result.isSuccess) {
                myToaster.showSuccessToast(result.message);
                fetchLeadSources()
            } else {
                myToaster.showErrorToast(result.message);
            }
        } catch (error) {
            myToaster.showErrorToast('Failed to delete the company');
        }
    };
    
    
      const deleteLeadSource = async (leadSource) => {
        console.log(leadSource);
        myToaster.primereactDeleteLeadSource(leadSource,deleteLeadSourceHandler)
      };
  return (
    <>
<BreadcrumbComponent labels={{ module: "salesExecutive", currentRoute: "Register-New-Lead-Source" }} />


    <div>
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
    <ConfirmDialog/>
    </>
  )
}

export default LeadSourceList
