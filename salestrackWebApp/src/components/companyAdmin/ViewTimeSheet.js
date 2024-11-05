import React, { useState, useEffect } from "react";
import {
  Button,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText,
  TextField,
} from "@mui/material";
import BreadcrumbComponent from "../shared/Breadcrumb";
import { getAllUsersByCompany, viewTimeSheetByCompany } from "../../Services/CompanyService";
import { useForm } from "react-hook-form";
import Spin from "../public/Spin";
import { getAllUsers } from "../../Services/AuthService";
import myToaster from "../../utils/toaster";

const ViewTimeSheet = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [timeSheetData, setTimeSheetData] = useState(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      startDate: null,
      endDate: null,
      user: "",
    },
  });

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getAllUsersByCompany();
    console.log(response);
    if (response.result) {
      setUsers(response.result);
    } else {
      myToaster.error(response.message);
    }
  };

  const onSubmit =async  (data) => {
    const { startDate, endDate, userId } = data;

    const startDateOffset = new Date(startDate).toISOString();
    const endDateOffset = new Date(endDate).toISOString();
    setLoading(true);
    const response =await viewTimeSheetByCompany(startDateOffset,endDateOffset,userId)
    
    if(response.isSuccess){
      setTimeSheetData(response.result)
    }
    else{
      myToaster.showErrorToast(response.message);
      setLoading(false);
    }
  };

  return (
    <div>
      <BreadcrumbComponent
        labels={{ module: "companyAdmin", currentRoute: "View-Time-Sheet" }}
      />

      <div className="time-sheet-filter-container">
        <div className="flex-container">
          <FormControl
            margin="normal"
            style={{ marginRight: "10px", width: "30%" }}
          >
            <TextField
              label="Start Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("startDate", {
                required: "Please select a start date",
              })}
              onChange={(e) => setValue("startDate", e.target.value)}
              error={Boolean(errors.startDate)}
              helperText={errors.startDate ? errors.startDate.message : ""}
              fullWidth
            />
          </FormControl>

          <FormControl
            margin="normal"
            style={{ marginRight: "10px", width: "30%" }}
          >
            <TextField
              label="End Date"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              {...register("endDate", {
                required: "Please select an end date",
              })}
              onChange={(e) => setValue("endDate", e.target.value)}
              error={Boolean(errors.endDate)}
              helperText={errors.endDate ? errors.endDate.message : ""}
              fullWidth
            />
          </FormControl>

          <select
            className="form-select mb-3"
            style={{ marginRight: "10px", width: "30%" }}
            defaultValue=""
            {...register("userId", { required: "Please select a user" })}
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>

          {/* Submit Button in the same row */}
          <Box sx={{ marginLeft: "10px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              style={{ height: "40px", marginTop: "-40px" }}
            >
              {loading ? <Spin /> : "Search"}
            </Button>
          </Box>
        </div>
      </div>

      <style jsx>{`
        .time-sheet-filter-container {
          max-width: 800px;
          margin: 0 auto;
          padding: 20px;
        }

        .flex-container {
          display: flex;
          align-items: flex-end; /* Aligns items to the bottom */
        }
      `}</style>
    </div>
  );
};

export default ViewTimeSheet;
