import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import myToaster from "../../utils/toaster";
import { addLead, getAllLeadCompanies } from "../../Services/LeadService";
import BreadcrumbComponent from "../shared/Breadcrumb";
import InputField from "../public/InputField";
import Spin from "../public/Spin";
import { leadSources as getLeadSources } from "../../Services/LeadSource";
import { UserLists } from "../../Services/UserService";
import leadImage from "../../utils/build/assets/img/illustrated-woman-being-intern-company_23-2148726151 (1).avif";
import { getLeadCategoriesByCompany } from "../../Services/LeadService";
const AddLead = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [leadSources, setLeadSources] = useState([]);
  const [users, setUsers] = useState([]);
  const [leadCategories, setLeadCategories] = useState([]);
  const [leadCompanyList, setLeadCompanyList] = useState([]);
  const [showSpinner, setShowSpinner] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchLeadSources();
      await fetchUsers();
      await fetchLeadCategories();
      await fetchLeadCompanies();
      
    };
    fetchData();
  }, []);

 let user= JSON.parse( localStorage.getItem("user"));
 console.log("userRole",user);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const fetchLeadCompanies = async () => {
    const response = await getAllLeadCompanies();
    console.log("lead Company ->",response.result)
    if (response.isSuccess) {
      setLeadCompanyList(response.result);
      setShowSpinner(false);
    } else {
      myToaster.showErrorToast(response.message);
    }
  };
  const fetchLeadSources = async () => {
    try {
      const res = await getLeadSources();
      if (res && res.result) {
        setLeadSources(res.result);
      } else {
        // myToaster.showErrorToast("No lead sources found.");
      }
    } catch (error) {
      // myToaster.showErrorToast("Failed to load lead sources.");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await UserLists();
      if (res && res.result) {
        setUsers(res.result);
      } else {
        // myToaster.showErrorToast("No users found.");
      }
    } catch (error) {
      // myToaster.showErrorToast("Failed to load users.");
    }
  };
  const fetchLeadCategories = async () => {
    const response = await getLeadCategoriesByCompany();
    console.log("lead category for companies are :",response.result)
    if (response.isSuccess) {
      setLeadCategories(response.result);
    } else {
      // myToaster.showErrorToast(response.message);
    }
  };
  const onSubmit = async (data) => {
    setLoading(true);
    data.leadRank = Number(data.leadRank);
    try {
      const response = await addLead(data);
      if (response.isSuccess) {
        myToaster.showSuccessToast(response.message);
        if(user.userRole== 3){
          console.log("------",user)
          navigate("/salesExecutive/leadList");
        }
        else if(user.userRole==4)
          {
          navigate("/salesManager/leadList");
        }
      } else {
        // myToaster.showErrorToast(response.message);
      }
    } catch (error) {
      // myToaster.showErrorToast("Failed to register lead. Please try again.");
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
      <div
        className="wrapper"
        style={{
          marginTop: "-80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
          padding: "50px",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            padding: "20px",
            width: "100%",
            maxWidth: "900px",
          }}
        >
          <div className="col-lg-8 mb-4-lg-0">
            <div
              className="login-container"
              style={{
                background: "#fff",
                padding: "35px",
                borderRadius: "10px",
                boxShadow: "0 0 15px rgba(0,0,0,0.1)",
                maxWidth: "900px",
                width: "100%",
                alignContent: "center",
                display: "center",
                marginLeft: "140px",
              }}
            >
              <h2
                className="form-title"
                style={{
                  fontFamily: "'tungstenw05-medium', 'Oswald', sans-serif",
                  fontSize: "2rem",
                  fontWeight: "bold",
                }}
              >
                Register New Lead
              </h2>

              <form
                className="login-form"
                onSubmit={handleSubmit(onSubmit)}
                autoComplete="off"
              >
                <div className="row">
                  <div className="col-lg-6 mb-3">
                    <InputField
                      as="select"
                      name="leadCompanyId"
                      style={{ padding: "0px 1.25rem 0 1.12rem" }}
                      {...register("leadCompanyId", {
                        required: "Lead Company is required",
                      })}
                    >
                      <option value="">Select Lead Company</option>
                      {leadCompanyList.map((company) => (
                        <option key={company.id} value={company.id}>
                          {company.leadCompanyName}
                        </option>
                      ))}
                    </InputField>
                    {errors.leadCompanyId && (
                      <span className="error-message">
                        {errors.leadCompanyId.message}
                      </span>
                    )}
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
                          /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[A-Za-z]{2,}$/.test(
                            value
                          ) || "Invalid email address",
                      })}
                    />
                    {errors.email && (
                      <span className="error-message">
                        {errors.email.message}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-6 mb-3">
                    <InputField
                      type="text"
                      name="name"
                      style={{ padding: "0px 1.25rem 0 1.12rem" }}
                      placeholder="Enter name "
                      {...register("name", {
                        required: "name is required",
                      })}
                    />
                    {errors.name && (
                      <span className="error-message">
                        {errors.name.message}
                      </span>
                    )}
                  </div>

                  <div className="col-lg-6 mb-3">
                    <InputField
                      type="text"
                      name="phoneNumber"
                      maxLength="10"
                      style={{ padding: "0px 1.25rem 0 1.12rem" }}
                      placeholder="Phone Number"
                      {...register("phoneNumber", {
                        required: false,
                        pattern: {
                          value: /^[0-9]{10}$/,
                          message: "Phone number must be 10 digits",
                        },
                      })}
                    />
                    {errors.phoneNumber && (
                      <span className="error-message">
                        {errors.phoneNumber.message}
                      </span>
                    )}
                  </div>

                  <div className="col-lg-6 mb-3">
                    <InputField
                      as="select"
                      name="leadSourceId"
                      style={{ padding: "0px 1.25rem 0 1.12rem" }}
                      {...register("leadSourceId", {
                        required: "Lead Source is required",
                      })}
                    >
                      <option value="">Select Lead Source</option>
                      {leadSources.map((source) => (
                        <option key={source.id} value={source.id}>
                          {source.leadSourceName}
                        </option>
                      ))}
                    </InputField>
                    {errors.leadSourceId && (
                      <span className="error-message">
                        {errors.leadSourceId.message}
                      </span>
                    )}
                  </div>

                  {/* Updated Comment Field as textarea */}
                  <div className="col-lg-6 mb-3">
                    <textarea
                      name="comment"
                      style={{
                        padding: "0px 1.25rem 0 1.12rem",
                        width: "100%",
                        borderRadius: "5px",
                        border: "1px solid #ccc",
                      }}
                      placeholder="Comment"
                      {...register("comment")}
                    />
                  </div>

                  <div className="col-lg-6 mb-3">
                    <InputField
                      as="select"
                      name="assignTo"
                      style={{ padding: "0px 1.25rem 0 1.12rem" }}
                      {...register("assignTo", {
                        required: "Assign To is required",
                      })}
                    >
                      <option value="">Assign To</option>
                      {users.map((user) => (
                        <option key={user.id} value={user.id}>
                          {user.name}
                        </option>
                      ))}
                    </InputField>
                    {errors.assignTo && (
                      <span className="error-message">
                        {errors.assignTo.message}
                      </span>
                    )}
                  </div>
                  <div className="col-lg-6 mb-3">
                    <InputField
                      as="select"
                      name="leadRank"
                      style={{ padding: "0px 1.25rem 0 1.12rem" }}
                      {...register("leadRank", {
                        valueAsNumber: true,
                      })}
                    >
                      <option value="">Select Lead Rank</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </InputField>
                    {errors.leadRank && (
                      <span className="error-message">
                        {errors.leadRank.message}
                      </span>
                    )}
                  </div>

                  <div className="col-lg-6 mb-3">
                    <InputField
                      as="select"
                      name="leadCategoryId" // Update here to bind to leadCategoryId
                      style={{ padding: "0px 1.25rem 0 1.12rem" }}
                      {...register("leadCategoryId", {
                        required: "Lead Category is required",
                      })}
                    >
                      <option value="">Lead Category</option>
                      {leadCategories.map((leadCategory) => (
                        <option key={leadCategory.id} value={leadCategory.id}>
                          {" "}
                          {/* Bind the ID */}
                          {leadCategory.leadCategoryName}
                        </option>
                      ))}
                    </InputField>
                    {errors.leadCategoryId && (
                      <span className="error-message">
                        {errors.leadCategoryId.message}
                      </span>
                    )}
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
