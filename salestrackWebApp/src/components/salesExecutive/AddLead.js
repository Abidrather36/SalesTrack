import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import myToaster from "../../utils/toaster";
import { addLead } from "../../Services/LeadService";
import BreadcrumbComponent from "../shared/Breadcrumb";
import InputField from "../public/InputField";
import Spin from "../public/Spin";
import { leadSources as getLeadSources } from "../../Services/LeadSource";
import { UserLists } from "../../Services/UserService";

const AddLead = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [leadSources, setLeadSources] = useState([]);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      await fetchLeadSources();
      await fetchUsers();
    };
    fetchData();
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchLeadSources = async () => {
    try {
      const res = await getLeadSources();
      if (res && res.result) {
        setLeadSources(res.result);
      } else {
        myToaster.showErrorToast("No lead sources found.");
      }
    } catch (error) {
      myToaster.showErrorToast("Failed to load lead sources.");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await UserLists();
      if (res && res.result) {
        setUsers(res.result);
      } else {
        myToaster.showErrorToast("No users found.");
      }
    } catch (error) {
      myToaster.showErrorToast("Failed to load users.");
    }
  };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await addLead(data);
      if (response.isSuccess) {
        myToaster.showSuccessToast(response.message);
        navigate("/salesExecutive/leadList");
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (error) {
      myToaster.showErrorToast("Failed to register lead. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <BreadcrumbComponent
        labels={{
          module: "salesExecutive",
          currentRoute: "Register-New-Lead",
        }}
      />
      <div className="wrapper" style={{ display: "flex", flexDirection: "row", justifyContent: "space-between", flexWrap: "wrap", width: "100%" }}>
        <div style={{ flex: 1, marginTop:"50px"}}>
          <img
            src="https://i.ibb.co/F4JnXXX/people-checking-giant-check-list-background-23-2148086410.jpg"
            style={{ width: "100%", height: "auto", borderRadius: "10px",marginRight:"100px" }}
            alt="Lead Registration"
          />
        </div>

        <div style={{ flex: 1, padding: "20px" }}>
          <div className="col-lg-8 mb-4-lg-0">
            <div
              className="login-container"
              style={{
                background: "#fff",
                padding: "35px",
                borderRadius: "10px",
                boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                width:"130%",
                height:"auto"
              }}
            >
              <h2 className="form-title">Register New Lead</h2>
              <form className="login-form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <InputField
                      type="text"
                      name="name"
                      style={{ padding: "0px 1.25rem 0 1.12rem" }} 
                      placeholder="Lead Name"
                      {...register("name", { required: "Lead Name is required" })}
                    />
                    {errors.name && <span className="error-message">{errors.name.message}</span>}
                  </div>

                  <div className="col-lg-6 mb-3">
                    <InputField
                      type="email"
                      name="email"
                      style={{ padding: "0px 1.25rem 0 1.12rem" }} 
                      placeholder="Email"
                      {...register("email", {
                        required: "Email is required",
                        validate: (value) =>
                          /^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(value) || "Invalid email address",
                      })}
                    />
                    {errors.email && <span className="error-message">{errors.email.message}</span>}
                  </div>

                  <div className="col-lg-6 mb-3">
                    <InputField
                      type="text"
                      name="phoneNumber"
                      style={{ padding: "0px 1.25rem 0 1.12rem" }} 
                      placeholder="Phone Number"
                      {...register("phoneNumber")}
                    />
                  </div>

                  <div className="col-lg-6 mb-3">
                    <InputField
                      as="select"
                      name="leadSourceId"
                      style={{ padding: "0px 1.25rem 0 1.12rem" }} 
                      {...register("leadSourceId", { required: "Lead Source is required" })}
                    >
                      <option value="">Select Lead Source</option>
                      {leadSources.map((source) => (
                        <option key={source.id} value={source.id}>
                          {source.leadSourceName}
                        </option>
                      ))}
                    </InputField>
                    {errors.leadSourceId && <span className="error-message">{errors.leadSourceId.message}</span>}
                  </div>

                  <div className="col-lg-6 mb-3">
                    <InputField
                      type="text"
                      name="comment"
                      style={{ padding: "0px 1.25rem 0 1.12rem" }} 
                      placeholder="Comment"
                      {...register("comment")}
                    />
                  </div>

                  <div className="col-lg-6 mb-3">
                    <InputField
                      as="select"
                      name="assignTo"
                      style={{ padding: "0px 1.25rem 0 1.12rem" }} 

                      {...register("assignTo", { required: "Assign To is required" })}
                    >
                      <option value="">Assign To</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </InputField>
                    {errors.assignTo && <span className="error-message">{errors.assignTo.message}</span>}
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary"
                  style={{ width: "100%" }}
                  disabled={loading}
                >
                  {loading ? <Spin /> : "Register Lead"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddLead;
