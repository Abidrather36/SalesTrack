import React, { useState, useEffect } from 'react';
import { Calendar } from 'primereact/calendar';
import { Button, Box, FormControl, InputLabel, Select, MenuItem, Typography, FormHelperText } from "@mui/material";
import BreadcrumbComponent from '../shared/Breadcrumb';
import { useForm } from 'react-hook-form';
import Spin from "../public/Spin";

const ViewTimeSheet = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  
  const { register, handleSubmit, setValue, formState: { errors } } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
      user: ''
    }
  });

  // Fetch users on component mount
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      // Mock data - replace with actual API call
      const response = [{ id: 1, name: 'User 1' }, { id: 2, name: 'User 2' }];
      setUsers(response);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    }
  };

  const onSubmit = (data) => {
    if (!data.startDate || !data.endDate || !data.user) {
      alert("Please select start date, end date, and a user to view the timesheet.");
      return;
    }

    setLoading(true);

    // Mock API call or processing function
    setTimeout(() => {
      setLoading(false);
      alert("Timesheet data fetched successfully!");
    }, 2000); // Simulate async operation
  };

  return (
    <div>
      <BreadcrumbComponent labels={{ module: "companyAdmin", currentRoute: "View-Time-Sheet" }} />
      
      <div className="time-sheet-filter-container">
        <Typography variant="h5" style={{ marginBottom: "20px" }}>View Time Sheet</Typography>

        {/* Start Date Picker */}
        <FormControl fullWidth margin="normal">
          <label>Start Date</label>
          <Calendar 
            value=""
            onChange={(e) => setValue('startDate', e.value)} 
            showIcon 
          />
          {errors.startDate && <FormHelperText error>Please select a start date</FormHelperText>}
        </FormControl>

        {/* End Date Picker */}
        <FormControl fullWidth margin="normal">
          <label>End Date</label>
          <Calendar 
            value=""
            onChange={(e) => setValue('endDate', e.value)} 
            showIcon 
          />
          {errors.endDate && <FormHelperText error>Please select an end date</FormHelperText>}
        </FormControl>

        {/* User Selection Dropdown */}
        <FormControl fullWidth margin="normal">
          <InputLabel id="user-select-label">Users</InputLabel>
          <Select
            labelId="user-select-label"
            {...register("user", { required: "Please select a user" })}
            onChange={(e) => setValue("user", e.target.value)}
            error={Boolean(errors.user)}
          >
            {users.map((user) => (
              <MenuItem key={user.id} value={user.id}>{user.name}</MenuItem>
            ))}
          </Select>
          {errors.user && <FormHelperText error>{errors.user.message}</FormHelperText>}
        </FormControl>

        {/* Submit Button */}
        <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
          <Button 
            variant="contained" 
            color="primary" 
            onClick={handleSubmit(onSubmit)} 
            disabled={loading}
            style={{ width: "150px", height: "40px" }}
          >
            {loading ? <Spin /> : "Submit"}
          </Button>
        </Box>
      </div>

      <style jsx>{`
        .time-sheet-filter-container {
          max-width: 600px;
          margin: 0 auto;
          padding: 20px;
        }
      `}</style>
    </div>
  );
};

export default ViewTimeSheet;
