import React, { useState } from "react";
import { Button, TextField, Box, Typography } from "@mui/material";
import myToaster from "../../utils/toaster"; // Adjust the path as per your project
import axios from "axios";

function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error as the user types
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.oldPassword) {
      newErrors.oldPassword = "Enter Old Password";
    }
    if (!formData.newPassword) {
      newErrors.newPassword = "Enter New Password";
    }
    if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Form is valid if no errors
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return; // Stop submission if validation fails
    }

    try {
      const response = await axios.post("/api/User/ChangePassword", formData);
      if (response.data.success) {
        myToaster.showSuccessToast("Password changed successfully!");
        setFormData({ oldPassword: "", newPassword: "", confirmPassword: "" }); // Reset form
      } else {
        myToaster.showErrorToast(response.data.message || "Password change failed!");
      }
    } catch (error) {
      console.error("Error changing password:", error);
      myToaster.showErrorToast("An error occurred while changing the password.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        maxWidth: 400,
        margin: "0 auto",
        padding: 3,
        display: "flex",
        flexDirection: "column",
        gap: 2,
      }}
    >
      <Typography variant="h5" align="center" gutterBottom>
        Change Password
      </Typography>

      <TextField
        label="Old Password"
        name="oldPassword"
        type="password"
        value={formData.oldPassword}
        onChange={handleChange}
        error={!!errors.oldPassword}
        helperText={errors.oldPassword}
        fullWidth
        required
      />

      <TextField
        label="New Password"
        name="newPassword"
        type="password"
        value={formData.newPassword}
        onChange={handleChange}
        error={!!errors.newPassword}
        helperText={errors.newPassword}
        fullWidth
        required
      />

      <TextField
        label="Confirm Password"
        name="confirmPassword"
        type="password"
        value={formData.confirmPassword}
        onChange={handleChange}
        error={!!errors.confirmPassword}
        helperText={errors.confirmPassword}
        fullWidth
        required
      />

      <Button type="submit" variant="contained" color="primary" fullWidth>
        Change Password
      </Button>
    </Box>
  );
}

export default ChangePassword;

