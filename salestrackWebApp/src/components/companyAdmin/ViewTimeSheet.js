// import React, { useState, useEffect } from "react";
// import { FaTrash, FaEdit } from "react-icons/fa";
// import Grid from "../shared/Grid";
// import { Button, Box, FormControl, TextField } from "@mui/material";
// import BreadcrumbComponent from "../shared/Breadcrumb";
// import {
//   approveTimeSheetByCompany,
//   getAllUsersByCompany,
//   viewTimeSheetByCompany,
// } from "../../Services/CompanyService";
// import { useForm } from "react-hook-form";
// import Spin from "../public/Spin";
// import myToaster from "../../utils/toaster";

// const ViewTimeSheet = () => {
//   const [loading, setLoading] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [timeSheetData, setTimeSheetData] = useState([]);
//   const [searchClicked, setSearchClicked] = useState(false);
//   const headers = [
//     { key: "dateString", label: "Date" },
//     { key: "timeSheetStepName", label: "Time Sheet Steps Name" },
//     { key: "hoursSpent", label: "Hours Spent" },
//     { key: "isApproved",label:"Approve Status"},
//     { key: "comment", label: "Comments" },
//   ];

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     reset,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     fetchUsers();
//   }, []);
//   const approveTimeSheet = async (timeSheet) => {
//     try {
//       setLoading(true);
//       const payload = {
//         id: timeSheet.id,
//         isApproved: true,
//       };
//      console.log("is Approved status ",payload);
//       const response = await approveTimeSheetByCompany(payload);
//       if (response.isSuccess) {
//         myToaster.showSuccessToast("Time sheet approved successfully.");
//         // Refresh the grid data to show the updated approval status
//         onSubmit({
//           startDate: "",
//           endDate: "",
//           userId: "",
//         });
//       } else {
//         myToaster.showErrorToast(response.message);
//       }
//     } catch (error) {
//       myToaster.showErrorToast("Failed to approve the time sheet.");
//     } finally {
//       setLoading(false);
//     }
//   };
  
//   const fetchUsers = async () => {
//     const response = await getAllUsersByCompany();
//     if (response.result) {
//       setUsers(response.result);
//     } else {
//       myToaster.error(response.message);
//     }
//   };
 
//   const onSubmit = async (data) => {
//     const { startDate, endDate, userId } = data;

//     if (!userId) {
//       myToaster.showErrorToast("User ID is required.");
//       return;
//     }

//     const startDateOffset = startDate ? new Date(startDate).toISOString() : null;

//     let endDateOffset = null;
//     if (endDate) {
//       const end = new Date(endDate);
//       end.setHours(23, 59, 59, 999);
//       endDateOffset = end.toISOString();
//     }

//     if (startDate && endDate && endDateOffset < startDateOffset) {
//       myToaster.showErrorToast("End date cannot be earlier than start date.");
//       return;
//     }

//     setLoading(true);
//     setSearchClicked(true);

//     try {
//       const response = await viewTimeSheetByCompany(

//         startDateOffset,
//         endDateOffset,
//         userId
//       );
//       console.log("timesheet is approve",response.result)

//       if (response.isSuccess) {
//         setTimeSheetData(response.result);
//       } else {
//         myToaster.showErrorToast(response.message);
//         setTimeSheetData("")
//       }
//     } catch (error) {
//       myToaster.showErrorToast("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Reset form and state
//   const handleReset = () => {
//     reset({
//       startDate: "",
//       endDate: "",
//       userId: "",
//     }); // Resets the form fields to their default values
//     setTimeSheetData([]); // Clear timeSheetData
//     setSearchClicked(false); // Reset searchClicked state
//   };

//   return (
//     <div>
//       <BreadcrumbComponent
//         labels={{ module: "companyAdmin", currentRoute: "ViewTimeSheet" }}
//       />

//       <div className="time-sheet-filter-container">
//         <div className="flex-container">
//           <FormControl
//             margin="normal"
//             style={{ marginRight: "10px", width: "30%" }}
//           >
//             <TextField
//               label="Start Date"
//               type="date"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               {...register("startDate")}
//             />
//           </FormControl>

//           <FormControl
//             margin="normal"
//             style={{ marginRight: "10px", width: "30%" }}
//           >
//             <TextField
//               label="End Date"
//               type="date"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               {...register("endDate")}
//             />
//           </FormControl>

//           <div style={{ marginRight: "10px", width: "30%" }}>
//             <select
//               className="form-select mb-3"
//               style={{ height: "50px", marginTop: "10px" }}
//               defaultValue=""
//               {...register("userId", { required: "Please select a user" })}
//             >
//               <option value="">Select user</option>
//               {users.map((user) => (
//                 <option key={user.id} value={user.id}>
//                   {user.name}
//                 </option>
//               ))}
//             </select>
//             {errors.userId && (
//               <span className="text-danger">{errors.userId.message}</span>
//             )}
//           </div>

//           <Box sx={{ marginLeft: "10px" }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubmit(onSubmit)}
//               disabled={loading}
//               style={{ height: "40px", marginTop: "-50px" }}
//             >
//               {loading ? <Spin /> : "Search"}
//             </Button>
//           </Box>

//           <Box sx={{ marginLeft: "10px" }}>
//             <Button
//               variant="outlined"
//               className="btn btn-danger"
//               onClick={handleReset}
//               style={{ color:"white",height: "40px", marginTop: "-50px" ,backgroundColor:"red"}}
//             >
//               Reset
//             </Button>
//           </Box>
//         </div>
//       </div>

//       <style jsx>{`
//         .time-sheet-filter-container {
//           max-width: 800px;
//           margin: 0 auto;
//           padding: 20px;
//         }

//         .flex-container {
//           display: flex;
//           align-items: flex-end;
//         }
//       `}</style>

//       {/* Render Grid only if search has been clicked */}
//       <div>
//         {searchClicked &&
//           (loading ? (
//             <p style={{ marginLeft: "32px" }}>Loading Time Sheet...</p>
//           ) : timeSheetData.length === 0 ? (
//             <p style={{ marginLeft: "32px" }}>No Time Sheet entries available</p>
//           ) : (
//             <Grid
//               buttons={[
//                 {
//                   key: "Approve",
//                   title: "Approve",
//                   className: "btn btn-primary",
//                   onEditHandler: (data) => approveTimeSheet(data),
//                   icon: <FaEdit />,
//                 },
//                 // {
//                 //   key: "delete",
//                 //   title: "Delete",
//                 //   className: "btn btn-danger",
//                 //   icon: <FaTrash />,
//                 // },
//               ]}
//               headers={headers}
//               data={Array.isArray(timeSheetData) ? timeSheetData : []}
//               loading={loading}
//               tableName="Time Sheet"
//             />
//           ))}
           
//       </div>
//     </div>
//   );
// };

// export default ViewTimeSheet;





// import React, { useState, useEffect } from "react";
// import { FaCheck } from "react-icons/fa";
// import Grid from "../shared/Grid";
// import { Button, Box, FormControl, TextField } from "@mui/material";
// import BreadcrumbComponent from "../shared/Breadcrumb";
// import {
//   getAllUsersByCompany,
//   viewTimeSheetByCompany,
//   approveTimeSheetByCompany,
// } from "../../Services/CompanyService";
// import { useForm } from "react-hook-form";
// import Spin from "../public/Spin";
// import myToaster from "../../utils/toaster";

// const ViewTimeSheet = () => {
//   const [loading, setLoading] = useState(false);
//   const [users, setUsers] = useState([]);
//   const [timeSheetData, setTimeSheetData] = useState([]);
//   const [searchClicked, setSearchClicked] = useState(false);
  
//   const headers = [
//     { key: "dateString", label: "Date" },
//     { key: "timeSheetStepName", label: "Time Sheet Steps Name" },
//     { key: "hoursSpent", label: "Hours Spent" },
//     { key: "isApproved", label: "Approve Status" },
//     { key: "comment", label: "Comments" },
//   ];

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm();

//   useEffect(() => {
//     fetchUsers();
//   }, []);

//   const fetchUsers = async () => {
//     const response = await getAllUsersByCompany();
//     if (response.result) {
//       setUsers(response.result);
//     } else {
//       myToaster.error(response.message);
//     }
//   };

//   const approveTimeSheet = async (timeSheet) => {
//     console.log(timeSheet)
//     let userId=timeSheet.id;
//     const response = await approveTimeSheetByCompany(userId);
//     if(response.isSuccess){
//       myToaster.showSuccessToast(response.message);  
//     }
 
//   };

//   const onSubmit = async (data) => {
//     const { startDate, endDate, userId } = data;

//     if (!userId) {
//       myToaster.showErrorToast("User ID is required.");
//       return;
//     }

//     const startDateOffset = startDate ? new Date(startDate).toISOString() : null;

//     let endDateOffset = null;
//     if (endDate) {
//       const end = new Date(endDate);
//       end.setHours(23, 59, 59, 999);
//       endDateOffset = end.toISOString();
//     }

//     if (startDate && endDate && endDateOffset < startDateOffset) {
//       myToaster.showErrorToast("End date cannot be earlier than start date.");
//       return;
//     }

//     setLoading(true);
//     setSearchClicked(true);

//     try {
//       const response = await viewTimeSheetByCompany(
//         startDateOffset,
//         endDateOffset,
//         userId
//       );

//       if (response.isSuccess) {
//         setTimeSheetData(response.result);
//       } else {
//         myToaster.showErrorToast(response.message);
//         setTimeSheetData([]);
//       }
//     } catch (error) {
//       myToaster.showErrorToast("An error occurred. Please try again.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleReset = () => {
//     reset({
//       startDate: "",
//       endDate: "",
//       userId: "",
//     });
//     setTimeSheetData([]);
//     setSearchClicked(false);
//   };

//   return (
//     <div>
//       <BreadcrumbComponent
//         labels={{ module: "companyAdmin", currentRoute: "ViewTimeSheet" }}
//       />

//       <div className="time-sheet-filter-container">
//         <div className="flex-container">
//           <FormControl
//             margin="normal"
//             style={{ marginRight: "10px", width: "30%" }}
//           >
//             <TextField
//               label="Start Date"
//               type="date"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               {...register("startDate")}
//             />
//           </FormControl>

//           <FormControl
//             margin="normal"
//             style={{ marginRight: "10px", width: "30%" }}
//           >
//             <TextField
//               label="End Date"
//               type="date"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               {...register("endDate")}
//             />
//           </FormControl>

//           <div style={{ marginRight: "10px", width: "30%" }}>
//             <select
//               className="form-select mb-3"
//               style={{ height: "50px", marginTop: "10px" }}
//               defaultValue=""
//               {...register("userId", { required: "Please select a user" })}
//             >
//               <option value="">Select user</option>
//               {users.map((user) => (
//                 <option key={user.id} value={user.id}>
//                   {user.name}
//                 </option>
//               ))}
//             </select>
//             {errors.userId && (
//               <span className="text-danger">{errors.userId.message}</span>
//             )}
//           </div>

//           <Box sx={{ marginLeft: "10px" }}>
//             <Button
//               variant="contained"
//               color="primary"
//               onClick={handleSubmit(onSubmit)}
//               disabled={loading}
//               style={{ height: "40px", marginTop: "-50px" }}
//             >
//               {loading ? <Spin /> : "Search"}
//             </Button>
//           </Box>

//           <Box sx={{ marginLeft: "10px" }}>
//             <Button
//               variant="outlined"
//               className="btn btn-danger"
//               onClick={handleReset}
//               style={{
//                 color: "white",
//                 height: "40px",
//                 marginTop: "-50px",
//                 backgroundColor: "red",
//               }}
//             >
//               Reset
//             </Button>
//           </Box>
//         </div>
//       </div>

//       <style jsx>{`
//         .time-sheet-filter-container {
//           max-width: 800px;
//           margin: 0 auto;
//           padding: 20px;
//         }

//         .flex-container {
//           display: flex;
//           align-items: flex-end;
//         }
//       `}</style>

//       <div>
//         {searchClicked &&
//           (loading ? (
//             <p style={{ marginLeft: "32px" }}>Loading Time Sheet...</p>
//           ) : timeSheetData.length === 0 ? (
//             <p style={{ marginLeft: "32px" }}>No Time Sheet entries available</p>
//           ) : (
//             <Grid
//               buttons={[
//                 {
//                   key: "Approve",
//                   title: "Approve",
//                   className: "btn btn-primary",
//                   onApproveHandler: (data) => approveTimeSheet(data),
//                   icon: <FaCheck />,
//                 },
//               ]}
//               headers={headers}
//               data={Array.isArray(timeSheetData) ? timeSheetData : []}
//               loading={loading}
//               tableName="Time Sheet"
//             />
//           ))}
//       </div>
//     </div>
//   );
// };

// export default ViewTimeSheet;

import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";
import Grid from "../shared/Grid";
import { Button, Box, FormControl, TextField } from "@mui/material";
import BreadcrumbComponent from "../shared/Breadcrumb";
import {
  getAllUsersByCompany,
  viewTimeSheetByCompany,
  approveTimeSheetByCompany,
} from "../../Services/CompanyService";
import { useForm } from "react-hook-form";
import Spin from "../public/Spin";
import myToaster from "../../utils/toaster";

const ViewTimeSheet = () => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);
  const [timeSheetData, setTimeSheetData] = useState([]);
  const [searchParams, setSearchParams] = useState({});
  const [searchClicked, setSearchClicked] = useState(false);

  const headers = [
    { key: "dateString", label: "Date" },
    { key: "timeSheetStepName", label: "Time Sheet Steps Name" },
    { key: "hoursSpent", label: "Hours Spent" },
    { key: "isApproved", label: "Approve Status" },
    { key: "comment", label: "Comments" },
  ];

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const response = await getAllUsersByCompany();
    if (response.result) {
      setUsers(response.result);
    } else {
      myToaster.error(response.message);
    }
  };

  const fetchTimeSheets = async (params) => {
    const { startDate, endDate, userId } = params;
    setLoading(true);

    try {
      const response = await viewTimeSheetByCompany(startDate, endDate, userId);

      if (response.isSuccess) {
        setTimeSheetData(response.result);
      } else {
        myToaster.showErrorToast(response.message);
        setTimeSheetData([]);
      }
    } catch (error) {
      myToaster.showErrorToast("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const approveTimeSheet = async (timeSheet) => {
    const response = await approveTimeSheetByCompany(timeSheet.id);

    if (response.isSuccess) {
      myToaster.showSuccessToast("Time Sheet approved successfully!");
      fetchTimeSheets(searchParams); // Refresh the time sheet list
    } else {
      myToaster.showErrorToast(response.message || "Failed to approve time sheet.");
    }
  };

  const onSubmit = async (data) => {
    const { startDate, endDate, userId } = data;

    if (!userId) {
      myToaster.showErrorToast("User ID is required.");
      return;
    }

    const startDateOffset = startDate ? new Date(startDate).toISOString() : null;

    let endDateOffset = null;
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      endDateOffset = end.toISOString();
    }

    if (startDate && endDate && endDateOffset < startDateOffset) {
      myToaster.showErrorToast("End date cannot be earlier than start date.");
      return;
    }

    const params = { startDate: startDateOffset, endDate: endDateOffset, userId };
    setSearchParams(params);
    setSearchClicked(true);

    fetchTimeSheets(params);
  };

  const handleReset = () => {
    reset({
      startDate: "",
      endDate: "",
      userId: "",
    });
    setTimeSheetData([]);
    setSearchParams({});
    setSearchClicked(false);
  };

  return (
    <div>
      <BreadcrumbComponent
        labels={{ module: "companyAdmin", currentRoute: "ViewTimeSheet" }}
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
              {...register("startDate")}
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
              {...register("endDate")}
            />
          </FormControl>

          <div style={{ marginRight: "10px", width: "30%" }}>
            <select
              className="form-select mb-3"
              style={{ height: "50px", marginTop: "10px" }}
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
            {errors.userId && (
              <span className="text-danger">{errors.userId.message}</span>
            )}
          </div>

          <Box sx={{ marginLeft: "10px" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSubmit(onSubmit)}
              disabled={loading}
              style={{ height: "40px", marginTop: "-50px" }}
            >
              {loading ? <Spin /> : "Search"}
            </Button>
          </Box>

          <Box sx={{ marginLeft: "10px" }}>
            <Button
              variant="outlined"
              className="btn btn-danger"
              onClick={handleReset}
              style={{
                color: "white",
                height: "40px",
                marginTop: "-50px",
                backgroundColor: "red",
              }}
            >
              Reset
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
          align-items: flex-end;
        }
      `}</style>

      <div>
        {searchClicked &&
          (loading ? (
            <p style={{ marginLeft: "32px" }}>Loading Time Sheet...</p>
          ) : timeSheetData.length === 0 ? (
            <p style={{ marginLeft: "32px" }}>No Time Sheet entries available</p>
          ) : (
            <Grid
              buttons={[
                {
                  key: "Approve",
                  title: "Approve",
                  className: "btn btn-primary",
                  onApproveHandler: (data) => approveTimeSheet(data),
                  icon: <FaCheck />,
                },
              ]}
              headers={headers}
              data={Array.isArray(timeSheetData) ? timeSheetData : []}
              loading={loading}
              tableName="Time Sheet"
            />
          ))}
      </div>
    </div>
  );
};

export default ViewTimeSheet;



