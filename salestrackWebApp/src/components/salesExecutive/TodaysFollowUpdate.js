import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TimePicker } from '@mui/x-date-pickers/TimePicker';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { TextField, Box } from '@mui/material';
import { todaysFollowUp } from '../../Services/LeadService';
import myToaster from '../../utils/toaster';
import Spin from '../public/Spin';

const TodaysFollowUpDate = ({leadData}) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);


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

    <div>
    <label style={{marginBottom:"30px"}}>Todays Follow UpDate </label>
    </div>
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 300 }}>
        {/* Date Picker */}
        <DatePicker
          label="Select Date"
          value={selectedDate}
          onChange={(newDate) => setSelectedDate(newDate)}
          renderInput={(params) => <TextField {...params} />}
        />
         <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  disabled={loading}
                >
                  {loading ? <Spin /> : "Show Todays FollowUp"}
                </button>
      </Box>
    </LocalizationProvider>
    </form>
    </>
  );
};

export default TodaysFollowUpDate;
