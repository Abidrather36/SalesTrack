// import React, { useState } from 'react';
// import { Calendar } from 'primereact/calendar';

// const TimeSheet = () => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [isMonday, setIsMonday] = useState(false);

//   // Function to get the start of the week (Monday) for the selected date
//   const getStartOfWeek = (date) => {
//     const day = date.getDay();
//     const difference = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
//     return new Date(date.setDate(difference));
//   };

//   // Handle Date Selection
//   const handleDateSelect = (date) => {
//     setSelectedDate(date);

//     // Check if the selected date is Monday
//     const selectedDay = date.getDay();
//     if (selectedDay === 1) {
//       setIsMonday(true);
//     } else {
//       setIsMonday(false);
//     }
//   };

//   return (
//     <div className="time-sheet-container">
//       <h2>Time Sheet</h2>

//       {/* Display the Start of the Week */}
//       {selectedDate && (
//         <div className="start-of-week-label">
//           <label>Start of the Week: {getStartOfWeek(new Date(selectedDate)).toDateString()}</label>
//         </div>
//       )}

//       {/* Calendar */}
//       <div className="calendar-container">
//         <label>Select Date</label>
//         <Calendar value={selectedDate} onChange={(e) => handleDateSelect(e.value)} showIcon />
//       </div>

//       {/* Add New Button - Visible only if Monday is selected */}
//       {isMonday && (
//         <div className="add-new-button">
//           <button className="p-button p-component p-button-success">Add New</button>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TimeSheet;

// import React, { useState } from 'react';
// import { Calendar } from 'primereact/calendar'; // Assuming you're using PrimeReact
// import { Button } from 'primereact/button';
// import { Dialog } from 'primereact/dialog';
// import { Toast } from 'primereact/toast';

// const TimeSheet = () => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [isMonday, setIsMonday] = useState(false);
//   const [showDialog, setShowDialog] = useState(false);
//   const [formDate, setFormDate] = useState(null);

//   const toast = React.useRef(null);

//   // Get the start of the week (Monday)
//   const getStartOfWeek = (date) => {
//     const day = date.getDay();
//     const difference = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust if day is Sunday
//     return new Date(date.setDate(difference));
//   };

//   // Handle Date Selection
//   const handleDateSelect = (date) => {
//     setSelectedDate(date);

//     // Check if the selected date is Monday
//     const selectedDay = date.getDay();
//     if (selectedDay === 1) {
//       setIsMonday(true);
//     } else {
//       setIsMonday(false);
//     }
//   };

//   // Open the Add New Dialog
//   const openDialog = () => {
//     if (!selectedDate) {
//       toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select a date first.' });
//       return;
//     }

//     // Set the form date to the selected Monday
//     const startOfWeekDate = getStartOfWeek(new Date(selectedDate));
//     setFormDate(startOfWeekDate);
//     setShowDialog(true);
//   };

//   // Handle form submission
//   const handleSubmit = () => {
//     if (!formDate) {
//       toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select a valid date.' });
//       return;
//     }

//     // Add further form validation and submission logic here...

//     toast.current.show({ severity: 'success', summary: 'Success', detail: 'Time sheet entry saved successfully.' });
//     setShowDialog(false); // Close the dialog after submission
//   };

//   return (
//     <div className="time-sheet-container">
//       <Toast ref={toast} />

//       <h2>Time Sheet</h2>

//       {/* Display Start of Week */}
//       {selectedDate && (
//         <div className="start-of-week-label">
//           <label>Start of the Week: {getStartOfWeek(new Date(selectedDate)).toDateString()}</label>
//         </div>
//       )}

//       {/* Calendar */}
//       <div className="calendar-container">
//         <label>Select Date</label>
//         <Calendar value={selectedDate} onChange={(e) => handleDateSelect(e.value)} showIcon />
//       </div>

//       {/* Add New Button - Visible only if Monday is selected */}
//       {isMonday && (
//         <div className="add-new-button">
//           <Button label="Add New" className="p-button-success" onClick={openDialog} />
//         </div>
//       )}

//       {/* Add New Dialog */}
//       <Dialog header="Add New Entry" visible={showDialog} style={{ width: '30vw' }} onHide={() => setShowDialog(false)}>
//         <div className="p-field">
//           <label htmlFor="date">Selected Date (Monday - Saturday)</label>
//           <Calendar
//             id="date"
//             value={formDate}
//             onChange={(e) => setFormDate(e.value)}
//             minDate={formDate} // Monday
//             maxDate={new Date(formDate.getFullYear(), formDate.getMonth(), formDate.getDate() + 5)} // Saturday
//             disabledDays={[0]} // Disable Sundays
//             showIcon
//           />
//         </div>

//         <div className="dialog-actions">
//           <Button label="Submit" className="p-button-primary" onClick={handleSubmit} />
//           <Button label="Cancel" className="p-button-secondary" onClick={() => setShowDialog(false)} />
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default TimeSheet;

// import React, { useState, useRef } from 'react';
// import { Calendar } from 'primereact/calendar';
// import { Button } from 'primereact/button';
// import { Dialog } from 'primereact/dialog';
// import { Toast } from 'primereact/toast';

// const TimeSheet = () => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [isMonday, setIsMonday] = useState(false);
//   const [visible, setVisible] = useState(false); // State to manage modal visibility

//   // Function to get the start of the week (Monday) for the selected date
//   const getStartOfWeek = (date) => {
//     const day = date.getDay();
//     const difference = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
//     return new Date(date.setDate(difference));
//   };

//   // Handle Date Selection
//   const handleDateSelect = (date) => {
//     setSelectedDate(date);

//     // Check if the selected date is Monday
//     const selectedDay = date.getDay();
//     setIsMonday(selectedDay === 1);
//   };

//   // Function to show the modal
//   const showDialog = () => {
//     setVisible(true);
//   };

//   // Function to hide the modal
//   const hideDialog = () => {
//     setVisible(false);
//   };

//   // Handle form submission in the modal
//   const handleSubmit = () => {
//     // Add validation logic here
//     // ...

//     // Hide the modal after submission
//     hideDialog();
//   };

//   return (
//     <div className="time-sheet-container">
//       <h2>Time Sheet</h2>

//       {/* Display the Start of the Week */}
//       {selectedDate && (
//         <div className="start-of-week-label">
//           <label>Start of the Week: {getStartOfWeek(new Date(selectedDate)).toDateString()}</label>
//         </div>
//       )}

//       {/* Calendar */}
//       <div className="calendar-container">
//         <label>Select Date</label>
//         <Calendar value={selectedDate} onChange={(e) => handleDateSelect(e.value)} showIcon />
//       </div>

//       {/* Add New Button - Visible only if Monday is selected */}
//       {isMonday && (
//         <div className="add-new-button">
//           <Button label="Add New" className="p-button-success" onClick={showDialog} />
//         </div>
//       )}

//       {/* Modal for Adding New Entry */}
//      // Add New Dialog
// <Dialog header="Add New Entry" visible={showDialog} style={{ width: '30vw' }} onHide={() => setShowDialog(false)}>
//   <div className="p-field">
//     <label htmlFor="date">Selected Date (Monday - Saturday)</label>
//     <Calendar
//       id="date"
//       value={formDate}
//       onChange={(e) => setFormDate(e.value)}
//       minDate={formDate || new Date()} // Set a fallback date
//       maxDate={formDate ? new Date(formDate.getFullYear(), formDate.getMonth(), formDate.getDate() + 5) : null} // Check for formDate
//       disabledDays={[0]} // Disable Sundays
//       showIcon
//     />
//   </div>

//   <div className="dialog-actions">
//     <Button label="Submit" className="p-button-primary" onClick={handleSubmit} />
//     <Button label="Cancel" className="p-button-secondary" onClick={() => setShowDialog(false)} />
//   </div>
// </Dialog>

//     </div>
//   );
// };

// export default TimeSheet;

///Previous Compo Update
import React, { useState, useRef } from "react";
import { Calendar } from "primereact/calendar";
import { Button } from "primereact/button";
import { Dialog } from "primereact/dialog";
import { Toast } from "primereact/toast";
import Spin from "../public/Spin";

const TimeSheet = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isMonday, setIsMonday] = useState(false);
  const [visible, setVisible] = useState(false); // State to manage modal visibility
  const [formDate, setFormDate] = useState(null); // State for the date in the form
  const [loading, setLoading] = useState(false);
  const toast = useRef(null); // Reference for toast notifications

  // Function to get the start of the week (Monday) for the selected date
  const getStartOfWeek = (date) => {
    const day = date.getDay();
    const difference = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(date.setDate(difference));
  };

  // Handle Date Selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);

    // Check if the selected date is Monday
    const selectedDay = date.getDay();
    setIsMonday(selectedDay === 1);
  };

  // Function to show the modal
  const showDialog = () => {
    // Set the form date to the start of the week (Monday) if a date is selected
    if (selectedDate) {
      const startOfWeekDate = getStartOfWeek(new Date(selectedDate));
      setFormDate(startOfWeekDate);
    }
    setVisible(true);
  };

  // Function to hide the modal
  const hideDialog = () => {
    setVisible(false);
  };

  // Handle form submission in the modal
  const handleSubmit = () => {
    if (!formDate) {
      toast.current.show({
        severity: "error",
        summary: "Error",
        detail: "Please select a valid date.",
      });
      return;
    }

    // Add validation logic here
    // ...

    // Hide the modal after submission
    hideDialog();
    toast.current.show({
      severity: "success",
      summary: "Success",
      detail: "Time sheet entry saved successfully.",
    });
  };

  return (
    <div className="time-sheet-container">
      <Toast ref={toast} />
      <h2
        style={{
          fontFamily: "'Arial', sans-serif",
          fontSize: "1.5em",
          color: "black",
          textAlign: "left",
          marginTop: "20px",
          marginBottom: "20px",
          textShadow: "1px 1px 2px #bdc3c7",
        }}
      >
        Time Sheet
      </h2>

      {/* Display the Start of the Week */}
      {selectedDate && (
        <div className="start-of-week-label">
          <label>
            Start of the Week:{" "}
            {getStartOfWeek(new Date(selectedDate)).toDateString()}
          </label>
        </div>
      )}

      {/* Calendar */}
      <div className="calendar-container">
        <label>Select Date </label>
        <Calendar
          value={selectedDate}
          onChange={(e) => handleDateSelect(e.value)}
          showIcon
        />
      </div>

      {/* Add New Button - Visible only if Monday is selected */}
      {isMonday && (
        <div>
          <button
            type="submit"
            className="btn btn-primary"
            style={{ width: "100px", height: "40px", padding: "10px" }}
            onClick={showDialog}
            disabled={loading}
          >
            {loading ? <Spin /> : "Add New"}
          </button>
          {/* <Button label="Add New" style={{padding:"5px"}}className="p-button-success" /> */}
        </div>
      )}

      {/* Modal for Adding New Entry */}
      <Dialog
        header="Add New Entry"
        visible={visible}
        style={{ width: "30vw" }}
        onHide={hideDialog}
      >
        <div className="p-field">
          <label htmlFor="date">Selected Date (Monday - Saturday)</label>
          <Calendar
            id="date"
            value={formDate}
            onChange={(e) => setFormDate(e.value)}
            minDate={formDate || new Date()} // Set a fallback date
            maxDate={
              formDate
                ? new Date(
                    formDate.getFullYear(),
                    formDate.getMonth(),
                    formDate.getDate() + 5
                  )
                : null
            } // Check for formDate
            disabledDays={[0]} // Disable Sundays
            showIcon
          />
        </div>

        <div className="dialog-actions">
          <Button
            label="Submit"
            className="p-button-primary"
            onClick={handleSubmit}
          />
          <Button
            label="Cancel"
            className="p-button-secondary"
            onClick={hideDialog}
          />
        </div>
      </Dialog>
    </div>
  );
};

export default TimeSheet;

///////////////////////////////

// import React, { useState } from 'react';
// import { Calendar } from 'primereact/calendar'; // Assuming you're using PrimeReact
// import { Button } from 'primereact/button';
// import { Dialog } from 'primereact/dialog';
// import { Toast } from 'primereact/toast';

// const TimeSheet = () => {
//   const [selectedDate, setSelectedDate] = useState(null);
//   const [isMonday, setIsMonday] = useState(false);
//   const [showDialog, setShowDialog] = useState(false);
//   const [formDate, setFormDate] = useState(null);

//   const toast = React.useRef(null);

//   // Get the start of the week (Monday)
//   const getStartOfWeek = (date) => {
//     const day = date.getDay();
//     const difference = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust if day is Sunday
//     return new Date(date.setDate(difference));
//   };

//   // Handle Date Selection
//   const handleDateSelect = (date) => {
//     setSelectedDate(date);

//     // Check if the selected date is Monday
//     const selectedDay = date.getDay();
//     if (selectedDay === 1) {
//       setIsMonday(true);
//     } else {
//       setIsMonday(false);
//     }
//   };

//   // Open the Add New Dialog
//   const openDialog = () => {
//     if (!selectedDate) {
//       toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select a date first.' });
//       return;
//     }

//     // Set the form date to the selected Monday
//     const startOfWeekDate = getStartOfWeek(new Date(selectedDate));
//     setFormDate(startOfWeekDate);
//     setShowDialog(true);
//   };

//   // Handle form submission
//   const handleSubmit = () => {
//     if (!formDate) {
//       toast.current.show({ severity: 'error', summary: 'Error', detail: 'Please select a valid date.' });
//       return;
//     }

//     // Add further form validation and submission logic here...

//     toast.current.show({ severity: 'success', summary: 'Success', detail: 'Time sheet entry saved successfully.' });
//     setShowDialog(false); // Close the dialog after submission
//   };

//   return (
//     <div className="time-sheet-container">
//       <Toast ref={toast} />

//       <h2>Time Sheet</h2>

//       {/* Display Start of Week */}
//       {selectedDate && (
//         <div className="start-of-week-label">
//           <label>Start of the Week: {getStartOfWeek(new Date(selectedDate)).toDateString()}</label>
//         </div>
//       )}

//       {/* Calendar */}
//       <div className="calendar-container">
//         <label>Select Date</label>
//         <Calendar value={selectedDate} onChange={(e) => handleDateSelect(e.value)} showIcon />
//       </div>

//       {/* Add New Button - Visible only if Monday is selected */}
//       {isMonday && (
//         <div className="add-new-button">
//           <Button label="Add New" className="p-button-success" onClick={openDialog} />
//         </div>
//       )}

//       {/* Add New Dialog */}
//       <Dialog header="Add New Entry" visible={showDialog} style={{ width: '30vw' }} onHide={() => setShowDialog(false)}>
//         <div className="p-field">
//           <label htmlFor="date">Selected Date (Monday - Saturday)</label>
//           <Calendar
//             id="date"
//             value={formDate}
//             onChange={(e) => setFormDate(e.value)}
//             minDate={formDate} // Monday
//             maxDate={new Date(formDate.getFullYear(), formDate.getMonth(), formDate.getDate() + 5)} // Saturday
//             disabledDays={[0]} // Disable Sundays
//             showIcon
//           />
//         </div>

//         <div className="dialog-actions">
//           <Button label="Submit" className="p-button-primary" onClick={handleSubmit} />
//           <Button label="Cancel" className="p-button-secondary" onClick={() => setShowDialog(false)} />
//         </div>
//       </Dialog>
//     </div>
//   );
// };

// export default TimeSheet;
