import React, { useState, useEffect } from "react";
import {
  Button,
  Modal,
  TextField,
  MenuItem,
  Box,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import BreadcrumbComponent from "../shared/Breadcrumb";
import { addTimeSheet, getAllProjectsByUser } from "../../Services/LeadService";
import myToaster from "../../utils/toaster";

const TimeSheet = () => {
  const [open, setOpen] = useState(false);
  const [taskOptions, setTaskOptions] = useState([]);
  const [projectOptions, setProjectOptions] = useState([]);
  const [timesheet, setTimeSheet] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const fetchProjects = async () => {
    const userId = JSON.parse(localStorage.getItem("user")).userId;
    console.log(userId);
    const response = await getAllProjectsByUser(userId);
    console.log(response.result);
    setProjectOptions(response.result);
  };
  const onSubmit = async (data) => {
    const response = await addTimeSheet(data);
    console.log("Form Data:", data);
    if (response.isSuccess) {
      setTimeSheet(response.result);
      myToaster.showSuccessToast(response.message);
      handleClose();
    } else {
      myToaster.showErrorToast(response.message);
    }
    handleClose();
  };

  return (
    <>
      <BreadcrumbComponent
        labels={{
          module: "salesExecutive",
          currentRoute: "Register-Time-Sheet",
        }}
      />

      <Button variant="contained" color="primary" onClick={handleOpen}>
        Add New Task
      </Button>

      <Modal open={open} onClose={handleClose}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 500,
            bgcolor: "background.paper",
            borderRadius: 2,
            boxShadow: 24,
            p: 4,
          }}
        >
          <Typography variant="h6" component="h2" sx={{ mb: 2 }}>
            Task Details Form
          </Typography>

          <form onSubmit={handleSubmit(onSubmit)}>
            <TextField
              label="Enter Date"
              type="date"
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              {...register("date", { required: "Date is required" })}
              error={!!errors.date}
              helperText={errors.date?.message}
            />
            <TextField
              label="Select Task"
              select
              fullWidth
              margin="normal"
              defaultValue=""
              {...register("timeSheetStepName", {
                required: "Task is required",
              })}
              error={!!errors.timeSheetStepName}
              helperText={errors.timeSheetStepName?.message}
            >
              {taskOptions && taskOptions.length > 0 ? (
                taskOptions.map((task, index) => (
                  <MenuItem key={index} value={task}>
                    {task}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No tasks available</MenuItem>
              )}
            </TextField>

            <TextField
              label="Select Project"
              select
              fullWidth
              margin="normal"
              defaultValue=""
              {...register("project", { required: "Project is required" })}
              error={!!errors.project}
              helperText={errors.project?.message}
            >
              {projectOptions && projectOptions.length > 0 ? (
                projectOptions.map((project) => (
                  <MenuItem key={project.id} value={project.id}>
                    {project.projectName}
                  </MenuItem>
                ))
              ) : (
                <MenuItem disabled>No projects available</MenuItem>
              )}
            </TextField>

            <TextField
              label="Hours Spent"
              type="number"
              fullWidth
              margin="normal"
              InputProps={{ inputProps: { min: 0 } }}
              {...register("hoursSpent", {
                required: "Hours spent is required",
              })}
              error={!!errors.hoursSpent}
              helperText={errors.hoursSpent?.message}
            />

            <TextField
              label="Comments"
              multiline
              rows={3}
              fullWidth
              margin="normal"
              {...register("comments")}
            />

            <Box
              sx={{ mt: 1, display: "flex", justifyContent: "space-between" }}
            >
              <Button variant="contained" color="error" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" type="submit">
                Save
              </Button>
            </Box>
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default TimeSheet;
