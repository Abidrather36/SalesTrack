import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "react-bootstrap";
import { addUser } from "../../Services/AuthService";
import myToaster from "../../utils/toaster";
import InputField from "../public/InputField";
const AddUser = () => {
  const [loading, setLoading] = useState(false);
  const managerId = "91855f4a-f9af-4044-8535-90f8ec8021c2";

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const isValidEmail = (email) => /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      data.userType = Number(data.userType);
      const response = await addUser(data);
      if (response.isSuccess) {
        myToaster.showSuccessToast(response.message);
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (error) {
      myToaster.showErrorToast("Failed to register user.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card shadow-sm border-0 px-2 rounded-2 mb-3 mx-auto w-50 bg-light">
      <div className="card-header bg-transparent border-0 text-center">
        <h3>Register New User</h3>
      </div>
      <div className="card-body">
        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className="form-group">
            <InputField
              type="text"
              name="name"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && <span className="error-message">{errors.name.message}</span>}
          </div>

          <div className="form-group">
            <InputField
              type="email"
              name="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                validate: value => isValidEmail(value) || "Invalid email address"
              })}
            />
            {errors.email && <span className="error-message">{errors.email.message}</span>}
          </div>

          <div className="form-group">
            <InputField
              type="text"
              name="phoneNumber"
              placeholder="Phone Number (Optional)"
              {...register("phoneNumber")}
            />
          </div>

          <div className="form-group">
            <InputField
              as="select"
              name="userType"
              {...register("userType", { required: "User Type is required" })}
            >
              <option value="">Select User Type</option>
              <option value="1">Sales Executive</option>
              <option value="2">Sales Manager</option>
            </InputField>
            {errors.userType && <span className="error-message">{errors.userType.message}</span>}
          </div>

          <div className="form-group">
            <InputField
              as="select"
              name="reportsTo"
              {...register("reportsTo", { required: "Reports To is required" })}
            >
              <option value="">Select</option>
              <option value={managerId}>Manager</option>
            </InputField>
            {errors.reportsTo && <span className="error-message">{errors.reportsTo.message}</span>}
          </div>

          <p className="text-center mt-3">
            <Button type="submit" className="btn btn-primary w-100" disabled={loading}>
              {loading ? "Registering..." : "Register"}
            </Button>
          </p>
        </form>
      </div>
    </div>
  );
};

export default AddUser;
