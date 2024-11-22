// import React, { useState } from "react";
// import Badge from "react-bootstrap/Badge";
// import TablePagination from "@mui/material/TablePagination";
// import ThreeDotMenu from "./ConextMenu";
// import { MDBBadge } from "mdb-react-ui-kit";
// import { FaClock, FaHourglassHalf ,FaRegClock} from "react-icons/fa";
// import "./Grid.css"

// function Grid({
//   headers = [],
//   data = [],
//   buttons = [],
//   tableName = "",
//   onAdd,
//   addButtonLabel,
//   loading,
// }) {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchText, setSearchText] = useState("");

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearch = (e) => {
//     setSearchText(e.target.value);
//   };

//   const filteredData = data.filter((item) =>
//     Object.values(item).some((value) =>
//       String(value).toLowerCase().includes(searchText.toLowerCase())
//     )
//   );

//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <div className="card shadow border-0 mb-7">
//       <div
//         className="card-header"
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <div style={{ flexDirection: "column", alignItems: "flex-start" }}>
//           <h5 className="mb-0">{tableName}</h5>
//           {addButtonLabel && (
//             <button
//               onClick={onAdd}
//               className="btn btn-success btn-small"
//               style={{ marginTop: "10px", padding: "7px", fontSize: "15px" }}
//             >
//               {`+ ${addButtonLabel}`}
//             </button>
//           )}
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder={`Search ${tableName}`}
//             value={searchText}
//             onChange={handleSearch}
//             style={{
//               padding: "5px",
//               borderRadius: "4px",
//               border: "1px solid #ddd",
//             }}
//           />
//         </div>
//       </div>
//       <div className="table-responsive">
//         <table className="table table-nowrap">
//           <thead className="thead-light">
//             <tr>
//               {headers.map((header) => (
//                 <th key={header.key}>{header.label}</th>
//               ))}
//               {buttons.length > 0 && <th>Actions</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.length > 0 ? (
//               paginatedData.map((item, index) => (
//                 <tr key={index}>
//                   {headers.map((header) => (
//                     <td key={header.key}>
//                       {header.key === "isActive" ? (
//                         item[header.key] ? (
//                           <Badge pill bg="success">
//                             Active
//                           </Badge>
//                         ) : (
//                           <Badge bg="danger">Inactive</Badge>
//                         )
//                       ) : header.key === "finalStatus" ? (
//                         item[header.key] === 1 ? (
//                           <MDBBadge color="warning" pill>
//                             Open
//                           </MDBBadge>
//                         ) : item[header.key] === 2 ? (
//                           <MDBBadge color="danger" pill>
//                             Close
//                           </MDBBadge>
//                         ) : item[header.key] === 3 ? (
//                           <MDBBadge color="success" pill>
//                             Success
//                           </MDBBadge>
//                         ) : (
//                           <MDBBadge color="primary" pill>
//                             Unknown
//                           </MDBBadge>
//                         )
//                       ) : header.key === "userType" ? (
//                         item[header.key] === 1 ? (
//                           <MDBBadge color="info" pill>
//                             SalesExecutive
//                           </MDBBadge>
//                         ) : item[header.key] === 2 ? (
//                           <MDBBadge color="primary" pill>
//                           SalesManager
//                         </MDBBadge>

//                         ) : null
//                       ) : header.key === "hoursSpent" ? (
//                         item[header.key] > 5 ? ( // Example condition: > 5 hours
//                           <span>
//                             <FaClock style={{ color: "orange" }} /> {item[header.key]} hrs
//                           </span>
//                         ) : (
//                           <span>
//                             <FaRegClock  style={{ color: "green" }} /> {item[header.key]} hrs
//                           </span>
//                         )
//                       ) : 
                      
//                       (
//                         item[header.key]
//                       )}
//                     </td>
//                   ))}
//                   <td>
//                     <ThreeDotMenu
//                       options={buttons}
//                       handleEdit={() =>
//                         buttons
//                           .find((btn) => btn.key === "edit")
//                           ?.onEditHandler(item)
//                       }
//                       handleDelete={() =>
//                         buttons
//                           .find((btn) => btn.key === "delete")
//                           ?.onDeleteHandler(item)
//                       }
//                       handleManageLead={() =>
//                         buttons
//                           .find((btn) => btn.key === "add")
//                           ?.onAddFollowUpdate(item)
//                       }
//                       handleFollowUpHistory={() =>
//                         buttons
//                           .find((btn) => btn.key === "followUpHistory")
//                           ?.onAddFollowUpHistory(item)
//                       }
//                      handleManageFollowUpHistory={()=>
//                       buttons
//                       .find((btn)=>btn.key === "manage followUp history")
//                       ?.onAddFollowUpHistory(item)
//                      }
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan={headers.length + 1}
//                   style={{ textAlign: "center" }}
//                 >
//                   {loading ? "Loading data..." : "No data available"}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <TablePagination
//         rowsPerPageOptions={[10, 15, 25]}
//         component="div"
//         count={filteredData.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </div>
//   );
// }

import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import TablePagination from "@mui/material/TablePagination";
import ThreeDotMenu from "./ConextMenu"
import { MDBBadge } from "mdb-react-ui-kit";
import { FaClock, FaHourglassHalf ,FaRegClock} from "react-icons/fa";
import "./Grid.css"

function Grid({
  headers = [],
  data = [],
  actions = [],
  tableName = "",
  onAdd,
  addButtonLabel = "Add",
  loading,
}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  const handleChangePage = (event, newPage) => setPage(newPage);

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (e) => setSearchText(e.target.value);

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <div className="grid-card">
      <div className="grid-header">
        <div className="header-left">
          <h5>{tableName}</h5>
          {onAdd && (
            <button
              onClick={onAdd}
              className="grid-add-button"
              title={`Add new ${tableName}`}
            >
              + {addButtonLabel}
            </button>
          )}
        </div>
        <div className="header-right">
          <input
            type="text"
            className="grid-search"
            placeholder={`Search ${tableName}`}
            value={searchText}
            onChange={handleSearch}
          />
        </div>
      </div>

      <div className="grid-table-wrapper">
        <table className="grid-table">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header.key}>{header.label}</th>
              ))}
              {actions.length > 0 && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index}>
                  {headers.map((header) => (
                    <td key={header.key}>
                      {header.key === "isActive" ? (
                        <Badge bg={item[header.key] ? "success" : "danger"}>
                          {item[header.key] ? "Active" : "Inactive"}
                        </Badge>
                      ) : header.key === "finalStatus" ? (
                        <MDBBadge
                          color={
                            item[header.key] === 1
                              ? "warning"
                              : item[header.key] === 2
                              ? "danger"
                              : item[header.key] === 3
                              ? "success"
                              : "primary"
                          }
                          pill
                        >
                          {item[header.key] === 1
                            ? "Open"
                            : item[header.key] === 2
                            ? "Close"
                            : item[header.key] === 3
                            ? "Success"
                            : "Unknown"}
                        </MDBBadge>
                      ) : header.key === "hoursSpent" ? (
                        <span>
                          {item[header.key] > 5 ? (
                            <FaClock style={{ color: "orange" }} />
                          ) : (
                            <FaRegClock style={{ color: "green" }} />
                          )}{" "}
                          {item[header.key]} hrs
                        </span>
                      ) : (
                        item[header.key]
                      )}
                    </td>
                  ))}
                  {actions.length > 0 && (
                    <td>
                      <ThreeDotMenu
                        options={actions}
                        item={item}
                        onEdit={() =>
                          actions.find((action) => action.key === "edit")?.onEdit(item)
                        }
                        onDelete={() =>
                          actions
                            .find((action) => action.key === "delete")
                            ?.onDelete(item)
                        }
                      />
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={headers.length + 1} className="grid-no-data">
                  {loading ? "Loading data..." : "No data available"}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <TablePagination
        rowsPerPageOptions={[10, 15, 25]}
        component="div"
        count={filteredData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </div>
  );
}

export default Grid;

// import React, { useState } from "react";
// import TablePagination from "@mui/material/TablePagination";
// import ThreeDotMenu from "./ConextMenu";
// import { MDBBadge } from "mdb-react-ui-kit";
// import { FaClock, FaRegClock } from "react-icons/fa";
// import "./Grid.css";

// function Grid({
//   headers = [],
//   data = [],
//   buttons = [],
//   tableName = "",
//   onAdd,
//   addButtonLabel,
//   loading,
// }) {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchText, setSearchText] = useState("");

//   const handleChangePage = (event, newPage) => {
//     setPage(newPage);
//   };

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearch = (e) => {
//     setSearchText(e.target.value);
//   };

//   const filteredData = data.filter((item) =>
//     Object.values(item).some((value) =>
//       String(value).toLowerCase().includes(searchText.toLowerCase())
//     )
//   );

//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <div className="card shadow border-0 mb-7">
//       <div
//         className="card-header"
//         style={{
//           display: "flex",
//           justifyContent: "space-between",
//           alignItems: "center",
//         }}
//       >
//         <div style={{ flexDirection: "column", alignItems: "flex-start" }}>
//           <h5 className="mb-0">{tableName}</h5>
//           {addButtonLabel && (
//             <button
//               onClick={onAdd}
//               className="btn btn-success btn-small"
//               style={{ marginTop: "10px", padding: "7px", fontSize: "15px" }}
//             >
//               {`+ ${addButtonLabel}`}
//             </button>
//           )}
//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder={`Search ${tableName}`}
//             value={searchText}
//             onChange={handleSearch}
//             style={{
//               padding: "5px",
//               borderRadius: "4px",
//               border: "1px solid #ddd",
//             }}
//           />
//         </div>
//       </div>
//       <div className="table-responsive">
//         <table className="table table-hover table-bordered">
//           <thead
//              style={{
//               fontFamily: "'Playfair Display', serif", // Premium font style
//               fontWeight: "bold",
//               fontSize: "18px", // Slightly larger font size for prominence
//               letterSpacing: "1.5px", // Adds an elegant spacing
//               textTransform: "uppercase", // Makes the text stand out
//               borderBottom: "2px solid #ccc", // Clean border for separation
//               textAlign: "center", // Aligns text centrally
//               textShadow: "0 1px 1px rgba(0, 0, 0, 0.1)", // Subtle shadow for depth
//             }}
//           >
//             <tr>
//               {headers.map((header) => (
//                 <th
//                   key={header.key}
//                   style={{
//                     padding: "15px",
//                     textAlign: "center",
//                     fontWeight: "bold",
//                     letterSpacing: "0.5px",
//                   }}
//                 >
//                   {header.label}
//                 </th>
//               ))}
//               {buttons.length > 0 && (
//                 <th
//                   style={{
//                     padding: "15px",
//                     textAlign: "center",
//                     fontWeight: "bold",
//                     letterSpacing: "0.5px",
//                   }}
//                 >
//                   Actions
//                 </th>
//               )}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.length > 0 ? (
//               paginatedData.map((item, index) => (
//                 <tr key={index}>
//                   {headers.map((header) => (
//                     <td key={header.key}>
//                       {header.key === "isActive" ? (
//                         item[header.key] ? (
//                           <MDBBadge color="success" pill>
//                             Active
//                           </MDBBadge>
//                         ) : (
//                           <MDBBadge color="danger" pill>
//                             Inactive
//                           </MDBBadge>
//                         )
//                       ) : header.key === "finalStatus" ? (
//                         item[header.key] === 1 ? (
//                           <MDBBadge color="warning" pill>
//                             Open
//                           </MDBBadge>
//                         ) : item[header.key] === 2 ? (
//                           <MDBBadge color="danger" pill>
//                             Close
//                           </MDBBadge>
//                         ) : item[header.key] === 3 ? (
//                           <MDBBadge color="success" pill>
//                             Success
//                           </MDBBadge>
//                         ) : (
//                           <MDBBadge color="primary" pill>
//                             Unknown
//                           </MDBBadge>
//                         )
//                       ) : header.key === "hoursSpent" ? (
//                         item[header.key] > 5 ? (
//                           <span>
//                             <FaClock style={{ color: "orange" }} />{" "}
//                             {item[header.key]} hrs
//                           </span>
//                         ) : (
//                           <span>
//                             <FaRegClock style={{ color: "green" }} />{" "}
//                             {item[header.key]} hrs
//                           </span>
//                         )
//                       ) : (
//                         item[header.key]
//                       )}
//                     </td>
//                   ))}
//                   <td>
//                     <ThreeDotMenu
//                       options={buttons}
//                       handleEdit={() =>
//                         buttons
//                           .find((btn) => btn.key === "edit")
//                           ?.onEditHandler(item)
//                       }
//                       handleDelete={() =>
//                         buttons
//                           .find((btn) => btn.key === "delete")
//                           ?.onDeleteHandler(item)
//                       }
//                       handleManageLead={() =>
//                         buttons
//                           .find((btn) => btn.key === "add")
//                           ?.onAddFollowUpdate(item)
//                       }
//                       handleFollowUpHistory={() =>
//                         buttons
//                           .find((btn) => btn.key === "followUpHistory")
//                           ?.onAddFollowUpHistory(item)
//                       }
//                     />
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td
//                   colSpan={headers.length + 1}
//                   style={{ textAlign: "center" }}
//                 >
//                   {loading ? "Loading data..." : "No data available"}
//                 </td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//       <TablePagination
//         rowsPerPageOptions={[10, 15, 25]}
//         component="div"
//         count={filteredData.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </div>
//   );
// }

// export default Grid;


