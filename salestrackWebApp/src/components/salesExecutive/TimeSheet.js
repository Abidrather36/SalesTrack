import React, { useState, useEffect } from "react";
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
  FormHelperText,
} from "@mui/material";
import Spin from "../public/Spin";
import MuiAlert from "@mui/material/Alert";
import { useForm } from "react-hook-form";
import { getAllProcessSteps } from "../../Services/UserService";
import myToaster from "../../utils/toaster";
import { addTimeSheet } from "../../Services/LeadService";
import BreadcrumbComponent from "../shared/Breadcrumb";
import { useNavigate } from "react-router-dom";
import InputField from "../public/InputField";

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
  const [minDate, setMinDate] = useState(null);
  const [maxDate, setMaxDate] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
  }, []);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setValue,
  } = useForm();

  const getStartOfWeek = (date) => {
    const day = date.getDay();
    const difference = date.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(date.setDate(difference));
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    const selectedDay = date.getDay();
    setIsMonday(selectedDay === 1);

    if (selectedDay === 1) {
      const startOfWeekDate = getStartOfWeek(new Date(date));
      const endOfWeekDate = new Date(startOfWeekDate);
      endOfWeekDate.setDate(startOfWeekDate.getDate() + 5);
      setMinDate(startOfWeekDate);
      setMaxDate(endOfWeekDate);
    } else {
      const startOfWeekDate = getStartOfWeek(new Date(date));
      myToaster.showErrorToast(
        `Please select a Monday to add a new timesheet entry. Start of the Week: ${startOfWeekDate.toDateString()}`
      );
    }
  };

  const showDialog = () => {
    if (selectedDate) {
      const startOfWeekDate = getStartOfWeek(new Date(selectedDate));
      setFormDate(startOfWeekDate);
      setValue("date", startOfWeekDate);
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
        "Please select a valid date, process step, and comments."
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

  const onSubmit = async (timeSheet) => {
    setLoading(true);
    timeSheet.date = new Date(timeSheet.date);
    timeSheet.hoursSpent = Number(timeSheet.hoursSpent);
    console.log(timeSheet);
    const response = await addTimeSheet(timeSheet);
    console.log(response.result);
    if (response.isSuccess) {
      myToaster.showSuccessToast(response.message);
      navigate("/salesExecutive/timeSheetList");
    } else {
      myToaster.showErrorToast(response.message);
    }
    setLoading(false);
  };

  return (
    <>
      <BreadcrumbComponent
        labels={{
          module: "salesExecutive",
          currentRoute: "Register-Time-Sheet",
        }}
      />
      <div className="time-sheet-container">
        {/* Calendar */}
        <div className="calendar-container">
          <label style={{ marginRight: "10px" }}>Select Date </label>
          <Calendar
            value={selectedDate}
            onChange={(e) => handleDateSelect(e.value)}
            showIcon
          />
        </div>

        {/* Add New Button - Visible only if Monday is selected */}
        {isMonday && (
          <div className="mt-3">
            <button
              className="btn btn-primary p-2 "
              onClick={showDialog}
              disabled={loading}
            >
              {loading ? <Spin /> : "Add Time sheet"}
            </button>
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
              Add New Time Sheet
            </Typography>
            <br />

            {/* Calendar restricted to the selected week's range */}
            <div className="mb-1">
              <label htmlFor="date">Selected Date</label>
              <Calendar
                minDate={minDate}
                maxDate={maxDate}
                {...register("date", { required: "Date is required" })}
                showIcon
                panelClassName="modal-calendar"
              />
              {errors.date && (
                <span className="text-danger">{errors.date.message}</span>
              )}
            </div>

            {/* Process Step Dropdown */}
            <div className="mb-3">
              <TextField
                id="timeSheetStepName"
                name="timeSheetStepName"
                type="text"
                variant="outlined"
                placeholder="Enter Time Sheet Step"
                {...register("timeSheetStepName", {
                  required: "Time Sheet Step is required",
                })}
                error={Boolean(errors.timeSheetStepName)}
                helperText={errors.timeSheetStepName?.message || ""}
                fullWidth
                sx={{ mt: 1 }}
              />
            </div>

            <TextField
              id="hoursSpent"
              label="Hours Spent"
              type="number"
              {...register("hoursSpent", { required: false })}
              fullWidth
              sx={{ mb: 2 }}
              placeholder="Enter Hours Spent"
              required="Hours is required"
            />

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
              <Button
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
              >
                {loading ? <Spin /> : "Submit"}
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

      {/* CSS for z-index adjustment */}
      <style jsx global>{`
        .p-datepicker {
          z-index: 1400 !important; /* Ensure it is above the modal */
        }
      `}</style>
    </>
  );
};

export default TimeSheet;
