//Original//
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
//   const [searchParams, setSearchParams] = useState({});
//   const [searchClicked, setSearchClicked] = useState(false);

//   const headers = [
//     { key: "name",label:"Name"},
//     { key: "dateString", label: "Date" },
//     { key: "timeSheetStepName", label: "Task Name" },
//     { key: "hoursSpent", label: "Hours Spent" },
//     { key: "isApproved", label: "Approve Status" },
//     { key: "comment", label: "Comments" },
//     { key: "projectName", label:"Project Name"},
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

//   const fetchTimeSheets = async (params) => {
//     const { startDate, endDate, userId } = params;
//     setLoading(true);

//     try {
//       const response = await viewTimeSheetByCompany(startDate, endDate, userId);

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

//   const approveTimeSheet = async (timeSheet) => {
//     const response = await approveTimeSheetByCompany(timeSheet.id);

//     if (response.isSuccess) {
//       myToaster.showSuccessToast("Time Sheet approved successfully!");
//       setTimeSheetData((prevData) =>
//         prevData.map((item) =>
//           item.id === timeSheet.id ? { ...item, isApproved: true } : item
//         )
//       );
//     } else {
//       myToaster.showErrorToast(response.message || "Failed to approve time sheet.");
//     }
//   };

//   const onSubmit = async (data) => {
//     const { startDate, endDate, userId } = data;

    

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

//     const params = { startDate: startDateOffset, endDate: endDateOffset, userId };
//     setSearchParams(params);
//     setSearchClicked(true);

//     fetchTimeSheets(params);
//   };

//   const handleReset = () => {
//     reset({
//       startDate: "",
//       endDate: "",
//       userId: "",
//     });
//     setTimeSheetData([]);
//     setSearchParams({});
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
//               {...register("userId")}
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
//                   show: (data) => !data.isApproved,
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
    { key: "name", label: "Name" },
    { key: "dateString", label: "Date" },
    { key: "timeSheetStepName", label: "Task Name" },
    { key: "hoursSpent", label: "Hours Spent" },
    { key: "isApproved", label: "Approve Status" },
    { key: "comment", label: "Comments" },
    { key: "projectName", label: "Project Name" },
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
      setTimeSheetData((prevData) =>
        prevData.map((item) =>
          item.id === timeSheet.id ? { ...item, isApproved: true } : item
        )
      );
    } else {
      myToaster.showErrorToast(response.message || "Failed to approve time sheet.");
    }
  };

  // Function to approve all unapproved time sheets
  const approveAllTimeSheets = async () => {
    const unapprovedTimeSheets = timeSheetData.filter(item => !item.isApproved);

    if (unapprovedTimeSheets.length === 0) {
      myToaster.showErrorToast("All time sheets are already approved.");
      return;
    }

    setLoading(true);
    try {
      for (const timeSheet of unapprovedTimeSheets) {
        const response = await approveTimeSheetByCompany(timeSheet.id);

        if (response.isSuccess) {
          setTimeSheetData(prevData =>
            prevData.map(item =>
              item.id === timeSheet.id ? { ...item, isApproved: true } : item
            )
          );
        } else {
          myToaster.showErrorToast(response.message || "Failed to approve some time sheets.");
        }
      }

      myToaster.showSuccessToast("All unapproved time sheets have been approved.");
    } catch (error) {
      myToaster.showErrorToast("An error occurred while approving time sheets.");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async (data) => {
    const { startDate, endDate, userId } = data;

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
              {...register("userId")}
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

          {/* Approve All Button - Visible only when timeSheetData is available */}
          {timeSheetData.length > 0 && (
            <Box sx={{ marginLeft: "10px" }}>
              <Button
                className="approve-all-btn"
                variant="contained"
                onClick={approveAllTimeSheets}
                disabled={loading}
                style={{
                  height: "40px",
                  marginTop: "-50px",
                  backgroundColor: "green",
                  width: "140px",
                }}
              >
                {loading ? <Spin /> : "Approve All"}
              </Button>
            </Box>
          )}
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
                  show: (data) => !data.isApproved, // Only show if not approved
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


//Working fine With Approve In Grid //
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
//   const [searchParams, setSearchParams] = useState({});
//   const [searchClicked, setSearchClicked] = useState(false);

//   const headers = [
//     { key: "name", label: "Name" },
//     { key: "dateString", label: "Date" },
//     { key: "timeSheetStepName", label: "Task Name" },
//     { key: "hoursSpent", label: "Hours Spent" },
//     { key: "isApproved", label: "Approve Status" },
//     { key: "comment", label: "Comments" },
//     { key: "projectName", label: "Project Name" },
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

//   const fetchTimeSheets = async (params) => {
//     const { startDate, endDate, userId } = params;
//     setLoading(true);

//     try {
//       const response = await viewTimeSheetByCompany(startDate, endDate, userId);

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

//   const approveTimeSheet = async (timeSheet) => {
//     const response = await approveTimeSheetByCompany(timeSheet.id);

//     if (response.isSuccess) {
//       myToaster.showSuccessToast("Time Sheet approved successfully!");
//       setTimeSheetData((prevData) =>
//         prevData.map((item) =>
//           item.id === timeSheet.id ? { ...item, isApproved: true } : item
//         )
//       );
//     } else {
//       myToaster.showErrorToast(response.message || "Failed to approve time sheet.");
//     }
//   };

//   const approveAllTimeSheets = async () => {
//     setLoading(true); // Start loading

//     try {
//       // Filter out time sheets that are not approved
//       const unapprovedTimeSheets = timeSheetData.filter((sheet) => !sheet.isApproved);

//       // If there are no unapproved sheets, show a message
//       if (unapprovedTimeSheets.length === 0) {
//         myToaster.showErrorToast("All time sheets are already approved.");
//         return;
//       }

//       // Loop through unapproved sheets and approve them
//       for (const timeSheet of unapprovedTimeSheets) {
//         await approveTimeSheet(timeSheet);
//       }

//       // After all approvals, show success message
//       myToaster.showSuccessToast("All Time Sheets approved successfully!");
//     } catch (error) {
//       myToaster.showErrorToast("Error occurred while approving all time sheets.");
//     } finally {
//       setLoading(false); // Stop loading
//     }
//   };

//   const onSubmit = async (data) => {
//     const { startDate, endDate, userId } = data;

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

//     const params = { startDate: startDateOffset, endDate: endDateOffset, userId };
//     setSearchParams(params);
//     setSearchClicked(true);

//     fetchTimeSheets(params);
//   };

//   const handleReset = () => {
//     reset({
//       startDate: "",
//       endDate: "",
//       userId: "",
//     });
//     setTimeSheetData([]);
//     setSearchParams({});
//     setSearchClicked(false);
//   };

//   return (
//     <div>
//       <BreadcrumbComponent
//         labels={{ module: "companyAdmin", currentRoute: "ViewTimeSheet" }}
//       />

//       <div className="time-sheet-filter-container">
//         <div className="flex-container">
//           <FormControl margin="normal" style={{ marginRight: "10px", width: "30%" }}>
//             <TextField
//               label="Start Date"
//               type="date"
//               InputLabelProps={{
//                 shrink: true,
//               }}
//               {...register("startDate")}
//             />
//           </FormControl>

//           <FormControl margin="normal" style={{ marginRight: "10px", width: "30%" }}>
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
//               {...register("userId")}
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
//             <>
            
//               <Grid
//                 buttons={[
//                   {
//                     key: "ApproveAll",
//                     title: "Approve All",
//                     className: "btn btn-primary",
//                     onApproveHandler: approveAllTimeSheets,
//                     icon: <FaCheck />,
//                     show:(data)=>!data.isApproved
//                   },
//                   {
//                     key: "Approve",
//                     title: "Approve",
//                     className: "btn btn-primary",
//                     onApproveHandler: (data) => approveTimeSheet(data),
//                     icon: <FaCheck />,
//                     show: (data) => !data.isApproved,
//                   },
//                 ]}
//                 headers={headers}
//                 data={Array.isArray(timeSheetData) ? timeSheetData : []}
//                 loading={loading}
//                 tableName="Time Sheet"
//               />
//             </>
//           ))}
//       </div>
//     </div>
//   );
// };

// export default ViewTimeSheet;

