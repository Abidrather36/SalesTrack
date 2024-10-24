import React, { useState, useEffect } from "react";
import { Calendar } from "primereact/calendar";
import {Button,Modal,Box,Typography,TextField,FormControl,InputLabel,Select,MenuItem,Snackbar,FormHelperText,} from "@mui/material";
import Spin from "../public/Spin";
import MuiAlert from "@mui/material/Alert";
import { useForm } from "react-hook-form";
import { getAllProcessSteps } from "../../Services/UserService";
import myToaster from "../../utils/toaster";
import { addTimeSheet } from "../../Services/LeadService";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TimeSheet = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isMonday, setIsMonday] = useState(false);
  const [open, setOpen] = useState(false); 
  const [formDate, setFormDate] = useState(null); 
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState(""); 
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [processSteps, setProcessSteps] = useState([]);

  useEffect(() => {
    fetchProcessSteps();
  }, []);
  
  useEffect(() => {
    if (selectedDate) {
      const startOfWeekDate = getStartOfWeek(new Date(selectedDate));
      myToaster.showErrorToast(
        `Start of the Week: ${startOfWeekDate.toDateString()}`
      );
    }
  }, [selectedDate]);;

  const { register, handleSubmit, formState: { errors }, setValue } = useForm();

  const getStartOfWeek = (date) => {
    const day = date.getDay();
    const difference = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(date.setDate(difference));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const selectedDay = date.getDay();
    setIsMonday(selectedDay === 1);
  };

  const showDialog = () => {
    if (selectedDate) {
      const startOfWeekDate = getStartOfWeek(new Date(selectedDate));
      setFormDate(startOfWeekDate);
      setValue("date", startOfWeekDate); // Set the date in the form
    }
    setOpen(true);
  };

  const hideDialog = () => {
    setOpen(false);
  };

  const handleSubmitDate = () => {
    if (!formDate || !processSteps || !comments) {
      setSnackbarSeverity("error");
      setSnackbarMessage(
        "Please select a valid date, process step and Comments."
      );
      setSnackbarOpen(true);
      return;
    }

    hideDialog();
    setSnackbarSeverity("success");
    setSnackbarMessage("Time sheet entry saved successfully.");
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const fetchProcessSteps = async () => {
    try {
      const response = await getAllProcessSteps();
      console.log(response.result);
      setProcessSteps(response.result);
    } catch (error) {
      myToaster.showErrorToast("Failed to fetch process steps.");
    }
  };

  const onSubmit = async (timeSheet) => {
    timeSheet.hoursSpent = Number(timeSheet.hoursSpent);
    console.log(timeSheet)
    const response = await addTimeSheet(timeSheet);
    console.log(response);
    if (response.isSuccess) {
      myToaster.showSuccessToast(response.message);
    } else {
      myToaster.showErrorToast(response.message);
    }
  };

  return (
    <div className="time-sheet-container">
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

      {/* Display the Start of the Week
      {selectedDate && (
        <div className="start-of-week-label">
          <label style={{color:"red"}}>
            Start of the Week:{" "}
            {getStartOfWeek(new Date(selectedDate)).toDateString()}
          </label>
        </div>
      )} */}

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
          <Button
            variant="contained"
            color="primary"
            onClick={showDialog}
            disabled={loading}
            style={{ width: "100px", height: "40px", padding: "10px" }}
          >
            {loading ? <Spin /> : "Add New"}
          </Button>
        </div>
      )}

      {/* Modal for Adding New Entry */}
      <Modal
        open={open}
        onClose={hideDialog}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
          component="form"
          onSubmit={handleSubmit(onSubmit)}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Entry
          </Typography> 
          <br></br>
          <div className="mb-1">
            <label htmlFor="date">Selected Date (Monday - Saturday)</label>
            <input type="date" className="form-control" {...register("date",{required:true})}>
            {errors.date && (
            <span className="text-danger">{errors.date.message}</span>
            )}
            </input>
          </div>
          {/* Process Step Dropdown */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="process-step-label">Process Step</InputLabel>
            <Select
              labelId="process-step-label"
              id="processStep"
              label="Process Step"
              {...register("processStep", { required: true })}
              error={Boolean(errors.processStep)}
            >
              {processSteps.map((step) => (
                <MenuItem key={step.id} value={step.id}>
                  {step.stepName}
                </MenuItem>
              ))}
            </Select>
            {errors.adminProcessStepId && (
              <FormHelperText error>
                {errors.adminProcessStepId.message}
              </FormHelperText>
            )}
          </FormControl>
          <TextField
            id="hoursSpent"
            label="Hours Spent"
            type="number"
            {...register("hoursSpent", { required: false })}
            fullWidth
            sx={{ mb: 2 }}
            placeholder="Enter Hours Spent"
            inputProps={{
              min: 0,
              step: 0.1,
            }}
          />
          {/* Comments Section */}
          <TextField
            id="comment"
            label="Comments"
            multiline
            rows={4}
            {...register("comment", { required: false })}
            fullWidth
            sx={{ mb: 2 }}
            required
            placeholder="Enter your comments here"
            helperText={!comments ? "Comments are required." : ""}
          />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" type="submit">
              Submit
            </Button>
            <Button
              variant="outlined"
              onClick={hideDialog}
              style={{ color: "red" }}
            >
              Cancel
            </Button>
          </div>
        </Box>
      </Modal>

      {/* Snackbar for feedback */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbarSeverity}
          sx={{ width: "100%" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default TimeSheet;
