import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import TablePagination from "@mui/material/TablePagination";
import ThreeDotMenu from "./ConextMenu";
import { MDBBadge } from "mdb-react-ui-kit";
import { FaClock, FaRegClock } from "react-icons/fa";
import "./Grid.css";

function Grid({
  headers = [],
  data = [],
  buttons = [],
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

  // const handleSearch = (e) => setSearchText(e.target.value);

  // const filteredData = data.filter((item) =>
  //   Object.values(item).some((value) =>
  //     String(value).toLowerCase().includes(searchText.toLowerCase())
  //   )
  // );
  const handleSearch = (e) => setSearchText(e.target.value);

const filteredData = data.filter((item) => {
  const searchLower = searchText.toLowerCase();
  
  return (
    String(item.leadRank || "").toLowerCase().includes(searchLower) || // Filter by LeadRank
    String(item.leadCategoryName || "").toLowerCase().includes(searchLower) || // Filter by LeadCategoryName
    String(item.processStepName || "").toLowerCase().includes(searchLower) || // Filter by ProcessStepName
    Object.values(item).some((value) =>
      String(value || "").toLowerCase().includes(searchLower) 
    )
  );
});


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
              className="btn btn-primary"  
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
              {buttons.length > 0 && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((item, index) => (
                <tr key={index}>
                  {headers.map((header) => (
                    <td key={header.key}>
                      {header.key === "isActive" ? (
                        item[header.key] ? (
                          <Badge pill bg="success">
                            Active
                          </Badge>
                        ) : (
                          <Badge bg="danger">Inactive</Badge>
                        )
                      ) : header.key === "finalStatus" ? (
                        item[header.key] === 1 ? (
                          <MDBBadge color="warning" pill>
                            Open
                          </MDBBadge>
                        ) : item[header.key] === 2 ? (
                          <MDBBadge color="danger" pill>
                            Close
                          </MDBBadge>
                        ) : item[header.key] === 3 ? (
                          <MDBBadge color="success" pill>
                            Success
                          </MDBBadge>
                        ) : (
                          <MDBBadge color="primary" pill>
                            Unknown
                          </MDBBadge>
                        )
                      ) : header.key === "userType" ? (
                        item[header.key] === 1 ? (
                          <MDBBadge color="info" pill>
                            SalesExecutive
                          </MDBBadge>
                        ) : item[header.key] === 2 ? (
                          <MDBBadge color="primary" pill>
                            SalesManager
                          </MDBBadge>
                        ) : null
                      ) : header.key === "hoursSpent" ? (
                        item[header.key] > 5 ? ( // Example condition: > 5 hours
                          <span>
                            <FaClock style={{ color: "orange" }} /> {item[header.key]} hrs
                          </span>
                        ) : (
                          <span>
                            <FaRegClock style={{ color: "green" }} /> {item[header.key]} hrs
                          </span>
                        )
                      ) : (
                        item[header.key]
                      )}
                    </td>
                  ))}
                  <td>
                    <ThreeDotMenu
                      options={buttons}
                      handleEdit={() =>
                        buttons
                          .find((btn) => btn.key === "edit")
                          ?.onEditHandler(item)
                      }
                      handleDelete={() =>
                        buttons
                          .find((btn) => btn.key === "delete")
                          ?.onDeleteHandler(item)
                      }
                      handleManageLead={() =>
                        buttons
                          .find((btn) => btn.key === "add")
                          ?.onAddFollowUpdate(item)
                      }
                      handleFollowUpHistory={() =>
                        buttons
                          .find((btn) => btn.key === "followUpHistory")
                          ?.onAddFollowUpHistory(item)
                      }
                      handleManageFollowUpHistory={() =>
                        buttons
                          .find((btn) => btn.key === "manage followUp history")
                          ?.onAddFollowUpHistory(item)
                      }
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={headers.length + 1}
                  style={{ textAlign: "center" }}
                >
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
export default Grid

// import React, { useState } from "react";
// import Badge from "react-bootstrap/Badge";
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
//   addButtonLabel = "Add",
//   loading,
// }) {
//   const [page, setPage] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(10);
//   const [searchText, setSearchText] = useState("");

//   const handleChangePage = (event, newPage) => setPage(newPage);

//   const handleChangeRowsPerPage = (event) => {
//     setRowsPerPage(parseInt(event.target.value, 10));
//     setPage(0);
//   };

//   const handleSearch = (e) => setSearchText(e.target.value);

//   const filteredData = data.filter((item) =>
//     ["leadRank", "leadCategoryName", "processStepName"].some((key) => {
//       return item[key]
//         ?.toString()
//         .toLowerCase()
//         .includes(searchText.toLowerCase());
//     })
//   );

//   const paginatedData = filteredData.slice(
//     page * rowsPerPage,
//     page * rowsPerPage + rowsPerPage
//   );

//   return (
//     <div className="grid-card">
//       <div className="grid-header">
//         <div className="header-left">
//           <h5>{tableName}</h5>
//           {onAdd && (
//             <button
//               onClick={onAdd}
//               className="btn btn-primary"
//               title={`Add new ${tableName}`}
//             >
//               + {addButtonLabel}
//             </button>
//           )}
//         </div>
//         <div className="header-right">
//           <input
//             type="text"
//             className="grid-search"
//             placeholder={`Search ${tableName}`}
//             value={searchText}
//             onChange={handleSearch}
//           />
//         </div>
//       </div>

//       <div className="grid-table-wrapper">
//         <table className="grid-table">
//           <thead>
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
//                     <td key={header.key}>{item[header.key]}</td>
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
//                           ?.onAddFollowUpdate?.(item)
//                       }
//                       handleFollowUpHistory={() =>
//                         buttons
//                           .find((btn) => btn.key === "followUpHistory")
//                           ?.onAddFollowUpHistory?.(item)
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
