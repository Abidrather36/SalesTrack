import React, { useState, useRef } from "react";
import { Calendar } from "primereact/calendar";
import {
  Button,
  Modal,
  Box,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
} from "@mui/material";
import Spin from "../public/Spin";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const TimeSheet = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [isMonday, setIsMonday] = useState(false);
  const [open, setOpen] = useState(false); // State to manage modal visibility
  const [formDate, setFormDate] = useState(null); // State for the date in the form
  const [loading, setLoading] = useState(false);
  const [processStep, setProcessStep] = useState(""); // State for selected process step
  const [comments, setComments] = useState(""); // State for comments
  const [hoursspent, setHoursSpent] = useState();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Example process steps, replace with your data
  const processSteps = [
    { label: "Step 1", value: "step1" },
    { label: "Step 2", value: "step2" },
    { label: "Step 3", value: "step3" },
  ];

  // Function to get the start of the week (Monday) for the selected date
  const getStartOfWeek = (date) => {
    const day = date.getDay();
    const difference = date.getDate() - day + (day === 0 ? -6 : 1); // Adjust when day is Sunday
    return new Date(date.setDate(difference));
  };

  // Handle Date Selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const selectedDay = date.getDay();
    setIsMonday(selectedDay === 1);
  };

  // Function to show the modal
  const showDialog = () => {
    if (selectedDate) {
      const startOfWeekDate = getStartOfWeek(new Date(selectedDate));
      setFormDate(startOfWeekDate);
    }
    setOpen(true);
    setProcessStep(""); // Reset process step
    setComments(""); // Reset comments
    setHoursSpent(0);
  };

  // Function to hide the modal
  const hideDialog = () => {
    setOpen(false);
  };

  // Handle form submission in the modal
  const handleSubmit = () => {
    if (!formDate || !processStep || !comments) {
      setSnackbarSeverity("error");
      setSnackbarMessage("Please select a valid date,process step and Comments.");
      setSnackbarOpen(true);
      return;
    }

    // Add validation logic here
    // ...

    // Hide the modal after submission
    hideDialog();
    setSnackbarSeverity("success");
    setSnackbarMessage("Time sheet entry saved successfully.");
    setSnackbarOpen(true);
  };

  // Snackbar close handler
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
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
            width: 400,
            bgcolor: "background.paper",
            border: "2px solid #000",
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add New Entry
          </Typography>

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
              inputStyle={{
                width: "100%",
                padding: "10px",
                boxSizing: "border-box",
              }}
              style={{
                width: "100%",
                marginBottom: "16px",
              }}
            />
          </div>

          {/* Process Step Dropdown */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel id="process-step-label">Process Step</InputLabel>
            <Select
              labelId="process-step-label"
              value={processStep}
              onChange={(e) => setProcessStep(e.target.value)}
              label="Process Step"
              required
            >
              {processSteps.map((step) => (
                <MenuItem key={step.value} value={step.value}>
                  {step.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            id="hoursspent"
            label="Hours Spent"
            value={hoursspent}
            type="number"
            onChange={(e) => setHoursSpent(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            placeholder="Enter Hours Spent"
            inputProps={{
              min: 0, // Prevent negative numbers
              step: 0.1, // Allow decimal inputs if needed, change to 1 if only whole numbers are allowed
            }}
          />

          {/* Comments Section */}
          <TextField
            id="comments"
            label="Comments"
            multiline
            rows={4}
            value={comments}
            onChange={(e) => setComments(e.target.value)}
            fullWidth
            sx={{ mb: 2 }}
            required
            placeholder="Enter your comments here"
            helperText={!comments ? "Comments are required." : ""}
          />

          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <Button variant="contained" color="primary" onClick={handleSubmit}>
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
        anchorOrigin={{ vertical: "top", horizontal: "right" }} // Position the snackbar at the top right
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
