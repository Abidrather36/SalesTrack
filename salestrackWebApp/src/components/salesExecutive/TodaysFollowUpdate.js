import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField, Box } from '@mui/material';
import { todaysFollowUp } from '../../Services/LeadService';
import myToaster from '../../utils/toaster';

import InputField from '../public/InputField';

const TodaysFollowUpDate = ({leadData}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);
  const [lead,setLeads]=useState([])

  const onSubmit = async(e)=>{
    e.preventDefault()
    const tdfud ={
        date:selectedDate,
        leadId:leadData?.id
    }
    console.log(tdfud)
    const response =await todaysFollowUp(tdfud);
    if(response.isSuccess){
        
        myToaster.showSuccessToast(response.message)
    }
    else{
        myToaster.showErrorToast(response.message)
    }
  }

  return (
    <>
    <form  onSubmit={onSubmit}>

    <div style={{marginBottom:"30px",marginLeft:"35px"}}>
    <label style={{marginBottom:"20px"}} className="h6 font-semibold text-muted text-sm d-block mb-2">Select Date </label>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 200 }}>
        {/* Date Picker */}
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          renderInput={(params) => <TextField {...params} />}
        />
        
      </Box>
    </LocalizationProvider>
    </div>

    </form>
    </>
  );
};

export default TodaysFollowUpDate;
