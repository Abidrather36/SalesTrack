


import React, { useState } from 'react';
import { todaysFollowUp } from '../../Services/LeadService';
import myToaster from '../../utils/toaster';

const TodaysFollowUpDate = ({ leadData }) => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(false);

  const formatFollowUpDate = (date) => {
    if (!date) return '';
    const splitDate = date.split("T")[0];
    return splitDate.split("-").reverse().join("-");
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const todayFollowUpHistory = {
      date: selectedDate,
      leadId: leadData?.id,
    };

    try {
      const response = await todaysFollowUp(todayFollowUpHistory);
      if (response.isSuccess) {
        const formattedHistory = response.result.map((history) => ({
          ...history,
          followUpDate: formatFollowUpDate(history.followUpDate),
        }));

        // Assuming you set the formatted history to state if needed
        // setLeads(formattedHistory);

        myToaster.showSuccessToast(response.message);
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (error) {
      myToaster.showErrorToast('Error fetching follow-up data');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        {/* Add your input fields here */}
      </form>
    </>
  );
};

export default TodaysFollowUpDate;
