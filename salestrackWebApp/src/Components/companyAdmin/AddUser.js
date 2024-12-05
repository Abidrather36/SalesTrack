// import React, { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import { useNavigate } from "react-router-dom";
// import myToaster from "../../utils/toaster";
// import { registerUser, UserLists } from "../../Services/UserService";
// import BreadcrumbComponent from "../shared/Breadcrumb";
// import InputField from "../public/InputField";
// import Spin from "../public/Spin";
// import { leadCategoryList } from "../../Services/CompanyService";

// const AddUser = () => {
//   const navigate = useNavigate();
//   const [users, setUsers] = useState([]);
//   const [loading, setLoading] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const onSubmit = async (data) => {
//     setLoading(true);
//     try {
//       data.userType = Number(data.userType);
//       const response = await registerUser(data);
//       if (response.isSuccess) {
//         myToaster.showSuccessToast("User added successfully");
//         setLoading(false);
//         navigate("/companyAdmin/userList");
//       } else {
//         myToaster.showErrorToast(response.message);
//       }
//     } catch (error) {
//       myToaster.showErrorToast("Failed to register user.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchUsers = async () => {
//     const response = await UserLists();
//     if (response.isSuccess) {
//       setUsers(response.result);
//     } else {
//       myToaster.showErrorToast(response.message);
//     }
//     setLoading(false);
//   };

//   const filteredUsers = users?.filter((user) => user.userType === 2);

//   return (
//     <>
//       <BreadcrumbComponent
//         labels={{ module: "companyAdmin", currentRoute: "Register-New-User" }}
//       />
//       <div
//         className="row"
//         style={{ display: "flex", flexDirection: "row", height: "100vh" }}
//       >
//         <div className="col-lg-6 mb-4 mb-lg-0">
//           <img
//             src="https://i.ibb.co/k8TBpyy/illustration-sign-up-log-wireframe-idea-showcasing-various-ui-elements-1278800-10890.jpg"
//             alt="Registration Illustration"
//             className="img-fluid"
//             style={{
//               maxWidth: "100%",
//               height: "65%",
//               marginLeft: "10px",
//               marginTop: "40px",
//               borderRadius: "10px",
//             }}
//           />
//         </div>

//         <div className="col-lg-6 mb-4-lg-0">
//           <div className="login-container">
//             <h2 className="form-title">Register New User</h2>
//             <form
//               className="login-form"
//               onSubmit={handleSubmit(onSubmit)}
//               autoComplete="off"
//             >
//               <div>
//                 <InputField
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   {...register("name", { required: "Name is required" })}
//                 />
//                 {errors.name && (
//                   <span className="text-danger">{errors.name.message}</span>
//                 )}
//               </div>

//               <div>
//                 <InputField
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   {...register("email", {
//                     required: "Email is required",
//                   })}
//                 />
//                 {errors.email && (
//                   <span className="text-danger">{errors.email.message}</span>
//                 )}
//               </div>

//               <div>
//                 <InputField
//                   type="text"
//                   name="phoneNumber"
//                   placeholder="Phone Number"
//                   {...register("phoneNumber", {
//                     required: "Phone number is required",
//                     maxLength: {
//                       value: 10,
//                       message: "Phone number should be exactly 10 digits",
//                     },
//                     minLength: {
//                       value: 10,
//                       message: "Phone number should be exactly 10 digits",
//                     },
//                     pattern: {
//                       value: /^[0-9]+$/,
//                       message: "Phone number should contain only digits",
//                     },
//                   })}
//                 />
//                 {errors.phoneNumber && (
//                   <span style={{ color: "red" }}>
//                     {errors.phoneNumber.message}
//                   </span>
//                 )}
//               </div>

//               <div>
//                 <InputField
//                   as="select"
//                   name="userType"
//                   {...register("userType", {
//                     required: "User Type is required",
//                   })}
//                 >
//                   <option value="">Select User Type</option>
//                   <option value="1">Sales Executive</option>
//                   <option value="2">Sales Manager</option>
//                 </InputField>
//                 {errors.userType && (
//                   <span className="text-danger">{errors.userType.message}</span>
//                 )}
//               </div>

//               <div>
//                 <InputField
//                   as="select"
//                   name="reportsTo"
//                   {...register("reportsTo", {
//                     required: "Reports To is required",
//                   })}
//                 >
//                   <option value="">Select Reports To</option>
//                   {/* <option value="BAEB4883-428A-46D8-A0E5-8C5CEC0488E3"> */}
//                   <option value="c3188984-f7c5-4460-9d77-18d550740e57">
//                     Ram
//                   </option>
//                   {filteredUsers?.map((user) => (
//                     <option key={user.id} value={user.id}>
//                       {user.name}
//                     </option>
//                   ))}
//                 </InputField>
//                 {errors.reportsTo && (
//                   <span className="error-message">
//                     {errors.reportsTo.message}
//                   </span>
//                 )}
//               </div>
//               <div>
//                 <InputField type="file" name="file" {...register("file")} />
//                 {errors.file && (
//                   <span className="text-danger">{errors.file.message}</span>
//                 )}
//               </div>

//               {loading ? (
//                 <button type="submit" className="login-button" disabled>
//                   <Spin />
//                 </button>
//               ) : (
//                 <button
//                   type="submit"
//                   className="btn btn-primary"
//                   style={{ width: "100%" }}
//                 >
//                   Register User
//                 </button>
//               )}
//             </form>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default AddUser;

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import myToaster from "../../utils/toaster";
import { registerUser, UserLists } from "../../Services/UserService";
import BreadcrumbComponent from "../shared/Breadcrumb";
import InputField from "../public/InputField";
import Spin from "../public/Spin";

const AddUser = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("phoneNumber", data.phoneNumber);
      formData.append("userType", Number(data.userType));
      formData.append("reportsTo", data.reportsTo);

      if (data.file && data.file[0]) {
        formData.append("file", data.file[0]);
      }
      const response = await registerUser(formData);
      if (response.isSuccess) {
        myToaster.showSuccessToast("User added successfully");
        navigate("/companyAdmin/userList");
      } else {
        myToaster.showErrorToast(response.message);
      }
    } catch (error) {
      myToaster.showErrorToast("Failed to register user.");
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async () => {
    const response = await UserLists();
    if (response.isSuccess) {
      setUsers(response.result);
    } else {
      myToaster.showErrorToast(response.message);
    }
  };

  const filteredUsers = users?.filter((user) => user.userType === 2);

  return (
    <>
      <BreadcrumbComponent
        labels={{ module: "companyAdmin", currentRoute: "Register-New-User" }}
      />
      <div className="row" style={{ height: "100vh", display: "flex" }}>
        <div className="col-lg-6">
          <img
            src="https://i.ibb.co/k8TBpyy/illustration-sign-up-log-wireframe-idea-showcasing-various-ui-elements-1278800-10890.jpg"
            alt="Registration Illustration"
            className="img-fluid"
            style={{
              maxWidth: "100%",
              height: "65%",
              margin: "40px 10px 0",
              borderRadius: "10px",
            }}
          />
        </div>

        <div className="col-lg-6">
          <div className="login-container">
            <h2 className="form-title">Register New User</h2>
            <form
              className="login-form"
              onSubmit={handleSubmit(onSubmit)}
              autoComplete="off"
            >
              <div>
                <InputField
                  type="text"
                  name="name"
                  placeholder="Name"
                  {...register("name", { required: "Name is required" })}
                />
                {errors.name && (
                  <span className="text-danger">{errors.name.message}</span>
                )}
              </div>

              <div>
                <InputField
                  type="email"
                  name="email"
                  placeholder="Email"
                  {...register("email", { required: "Email is required" })}
                />
                {errors.email && (
                  <span className="text-danger">{errors.email.message}</span>
                )}
              </div>

              <div>
                <InputField
                  type="text"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  {...register("phoneNumber", {
                    required: "Phone number is required",
                    maxLength: {
                      value: 10,
                      message: "Phone number should be exactly 10 digits",
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number should be exactly 10 digits",
                    },
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Phone number should contain only digits",
                    },
                  })}
                />
                {errors.phoneNumber && (
                  <span className="text-danger">{errors.phoneNumber.message}</span>
                )}
              </div>

              <div>
                <InputField
                  as="select"
                  name="userType"
                  {...register("userType", {
                    required: "User Type is required",
                  })}
                >
                  <option value="">Select User Type</option>
                  <option value="1">Sales Executive</option>
                  <option value="2">Sales Manager</option>
                </InputField>
                {errors.userType && (
                  <span className="text-danger">{errors.userType.message}</span>
                )}
              </div>

              <div>
            <InputField
                   as="select"
                   name="reportsTo"
                  {...register("reportsTo", {
                                         required: "Reports To is required",
                   })}
                 >
                   <option value="">Select Reports To</option>
                   <option value="BAEB4883-428A-46D8-A0E5-8C5CEC0488E3">
                   {/* <option value="c3188984-f7c5-4460-9d77-18d550740e57"> */}
                     Ram
                   </option>
                   {filteredUsers?.map((user) => (
                     <option key={user.id} value={user.id}>
                       {user.name}
                     </option>
                   ))}
                 </InputField>
                 {errors.reportsTo && (
                   <span className="error-message">
                     {errors.reportsTo.message}
                   </span>
                )}
               </div>

              <div>
                <InputField
                  type="file"
                  name="file"
                  {...register("file")}
                />
                <span className="form-text">File upload is optional</span>
              </div>

              <button
                type="submit"
                className="btn btn-primary"
                style={{ width: "100%" }}
                disabled={loading}
              >
                {loading ? <Spin /> : "Register User"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddUser;

