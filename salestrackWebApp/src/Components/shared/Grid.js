// import React, { useState } from "react";
// import Badge from "react-bootstrap/Badge";
// import { FaEdit, FaTrash } from "react-icons/fa";
// import ThreeDotMenu from "./ConextMenu";
// import TablePagination from "@mui/material/TablePagination";
// import { Button } from 'primereact/button';
// import myToaster from "../../utils/toaster";

// function Grid({ headers = [], data = [], buttons = [], tableName = "", onAdd, addButtonLabel }) {
 
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
//     console.log(e.target.value);
//   };

//   const filteredData = data.filter((item) =>
//     Object.values(item).some((value) =>
//       String(value).toLowerCase().includes(searchText.toLowerCase())
//     )
//   );

//   const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

//   return (
//     <>
//     {data.length===0 && (
//       myToaster.showErrorToast("no data available")
//     )}:
//     <div className="card shadow border-0 mb-7">
//       <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
//         <div style={{ flexDirection: "column", alignItems: "flex-start" }}>
//           <h5 className="mb-0">{tableName}</h5>
//           {addButtonLabel !=="null" && (
//             <button onClick={onAdd} className="btn btn-success btn-small" style={{ marginTop: "10px", padding: "7px", fontSize: "15px" }}>
//             { `+ ${addButtonLabel}`}
//           </button>
//           )}
         

//         </div>
//         <div>
//           <input
//             type="text"
//             placeholder={`Search ${tableName}`}
//             name="search"
//             id="search"
//             value={searchText}
//             onChange={handleSearch}
//             style={{ padding: "5px", borderRadius: "4px", border: "1px solid #ddd" }}
//           />
//         </div>
//       </div>
//       <div className="table-responsive">
//         <table className="table table-nowrap">
//           <thead className="thead-light">
//             <tr>
//               {headers.map((item) => (
//                 <th key={item.key}>{item.label}</th>
//               ))}
//               {buttons.length > 0 && <th>Actions</th>}
//             </tr>
//           </thead>
//           <tbody>
//             {paginatedData.map((item, index) => (
//               <tr key={index}>
//                 {headers.map((header) => (
//                   <td key={header.key}>
//                     {header.key === "isActive" ? (
//                       item[header.key] ? (
//                         <Badge bg="success">Active</Badge>
//                       ) : (
//                         <Badge bg="danger">Inactive</Badge>
//                       )
//                     ): header.key === "userType" ? (
//                       item[header.key] === 1 ? (
//                         <span style={{ 
//                           backgroundColor: '#00b4d8', 
//                           color: 'white', 
//                           padding: '5px 10px', 
//                           borderRadius: '5px',
//                           fontWeight: 'bold' ,
//                           borderRadius: ".375rem",
//                         }}>
//                           Sales Executive
//                         </span>
//                       ) : item[header.key] === 2 ? (
//                         <span style={{ 
//                           backgroundColor: '#d90429', 
//                           color: 'white', 
//                           padding: '5px 10px', 
//                           borderRadius: '5px',
//                           fontWeight: 'bold',
//                           borderRadius: ".375rem",
//                         }}>
//                           Sales Manager
//                         </span>
//                       ) : (
//                         "Unknown"
//                       )
//                     )
//                      : (
//                       item[header.key]
//                     )}
//                   </td>
//                 ))}
//                 <td>
//                   <ThreeDotMenu
//                     options={buttons}
//                     handleEdit={() =>
//                       buttons.find((btn) => btn.key === "edit")?.onEditHandler(item)
//                     }
//                     handleDelete={() =>
//                       buttons.find((btn) => btn.key === "delete")?.onDeleteHandler(item)
//                     }
//                   />
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
//       <TablePagination
//         rowsPerPageOptions={[5, 10, 25]}
//         component="div"
//         count={filteredData.length}
//         rowsPerPage={rowsPerPage}
//         page={page}
//         onPageChange={handleChangePage}
//         onRowsPerPageChange={handleChangeRowsPerPage}
//       />
//     </div>
    
//     </>
//   );
// }

// export default Grid;




import React, { useState, useEffect } from "react";
import Badge from "react-bootstrap/Badge";
import TablePagination from "@mui/material/TablePagination";
import myToaster from "../../utils/toaster";
import ThreeDotMenu from "./ConextMenu";

function Grid({ headers = [], data = [], buttons = [], tableName = "", onAdd, addButtonLabel, loading }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchText, setSearchText] = useState("");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (e) => {
    setSearchText(e.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <>
      <div className="card shadow border-0 mb-7">
        <div className="card-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ flexDirection: "column", alignItems: "flex-start" }}>
            <h5 className="mb-0">{tableName}</h5>
            {addButtonLabel && (
              <button onClick={onAdd} className="btn btn-success btn-small" style={{ marginTop: "10px", padding: "7px", fontSize: "15px" }}>
                {`+ ${addButtonLabel}`}
              </button>
            )}
          </div>
          <div>
            <input
              type="text"
              placeholder={`Search ${tableName}`}
              value={searchText}
              onChange={handleSearch}
              style={{ padding: "5px", borderRadius: "4px", border: "1px solid #ddd" }}
            />
          </div>
        </div>
        <div className="table-responsive">
          <table className="table table-nowrap">
            <thead className="thead-light">
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
                            <Badge bg="success">Active</Badge>
                          ) : (
                            <Badge bg="danger">Inactive</Badge>
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
                          buttons.find((btn) => btn.key === "edit")?.onEditHandler(item)
                        }
                        handleDelete={() =>
                          buttons.find((btn) => btn.key === "delete")?.onDeleteHandler(item)
                        }
                      />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={headers.length + 1} style={{ textAlign: "center" }}>
                    {loading ? "Loading data..." : "No data available"}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <TablePagination
          rowsPerPageOptions={[ 10,15, 25]}
          component="div"
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </div>
    </>
  );
}

export default Grid;
