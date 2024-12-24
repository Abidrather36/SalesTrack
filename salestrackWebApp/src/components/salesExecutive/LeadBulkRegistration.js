
// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import { useTable } from "react-table";

// const ExcelToGrid = () => {
//   const [columns, setColumns] = useState([]); // For grid column headers
//   const [data, setData] = useState([]); // For grid data
//   const [selectedRows, setSelectedRows] = useState([]); // For tracking selected rows

//   // Handle file upload and process Excel data
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const binaryString = evt.target.result;
//       const workbook = XLSX.read(binaryString, { type: "binary" });

//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(sheet);

//       if (jsonData.length > 0) {
//         const headers = Object.keys(jsonData[0]).map((key) => ({
//           Header: key,
//           accessor: key,
//         }));
//         setColumns([
//           {
//             Header: "Select",
//             id: "select",
//             Cell: ({ row }) => (
//               <input
//                 type="checkbox"
//                 checked={selectedRows.includes(row.original.ID)}
//                 onChange={() => handleRowSelection(row.original.ID)}
//               />
//             ),
//           },
//           ...headers,
//         ]);
//         setData(jsonData);
//       }
//     };
//     reader.readAsBinaryString(file);
//   };

//   // Handle row selection
//   const handleRowSelection = (id) => {
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
//     );
//   };

//   // Handle "Select All" functionality
//   const handleSelectAll = (e) => {
//     if (e.target.checked) {
//       setSelectedRows(data.map((row) => row.ID)); // Assuming `ID` is the unique identifier
//     } else {
//       setSelectedRows([]);
//     }
//   };

//   // Handle form submission
//   const handleSubmit = () => {
//     const selectedData = data.filter((row) => selectedRows.includes(row.ID));
//     console.log("Selected Data for Submission:", selectedData);
//     alert(`Selected ${selectedData.length} records for submission!`);
//     // Add your backend submission logic here
//   };

//   // Define the table structure using react-table
//   const tableInstance = useTable({ columns, data });
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     tableInstance;

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2 style={{ textAlign: "center", color: "#333" }}>
//         Excel File Upload and Grid
//       </h2>
//       <input
//         type="file"
//         accept=".xlsx, .xls"
//         onChange={handleFileUpload}
//         style={{
//           display: "block",
//           margin: "0 auto 20px",
//           padding: "10px",
//           fontSize: "16px",
//           border: "1px solid #ccc",
//           borderRadius: "5px",
//         }}
//       />

//       {data.length > 0 ? (
//         <div style={{ overflowX: "auto" }}>
//           <table
//             {...getTableProps()}
//             style={{
//               borderCollapse: "collapse",
//               width: "100%",
//               marginTop: "20px",
//               border: "1px solid #ddd",
//             }}
//           >
//             <thead>
//               {headerGroups.map((headerGroup) => (
//                 <tr
//                   {...headerGroup.getHeaderGroupProps()}
//                   style={{ backgroundColor: "#f9f9f9" }}
//                 >
//                   {headerGroup.headers.map((column, index) => (
//                     <th
//                       {...column.getHeaderProps()}
//                       style={{
//                         padding: "10px",
//                         border: "1px solid #ddd",
//                         textAlign: "left",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {column.id === "select" ? (
//                         <input
//                           type="checkbox"
//                           onChange={handleSelectAll}
//                           checked={
//                             selectedRows.length === data.length &&
//                             selectedRows.length > 0
//                           }
//                         />
//                       ) : (
//                         column.render("Header")
//                       )}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//               {rows.map((row) => {
//                 prepareRow(row);
//                 return (
//                   <tr
//                     {...row.getRowProps()}
//                     style={{
//                       backgroundColor: row.index % 2 === 0 ? "#fff" : "#f7f7f7",
//                     }}
//                   >
//                     {row.cells.map((cell) => (
//                       <td
//                         {...cell.getCellProps()}
//                         style={{
//                           padding: "10px",
//                           border: "1px solid #ddd",
//                         }}
//                       >
//                         {cell.render("Cell")}
//                       </td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//           <button
//             onClick={handleSubmit}
//             style={{
//               display: "block",
//               margin: "20px auto",
//               padding: "10px 20px",
//               fontSize: "16px",
//               backgroundColor: "#007bff",
//               color: "#fff",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             Submit Selected Records
//           </button>
//         </div>
//       ) : (
//         <p style={{ textAlign: "center", color: "#777" }}>
//           No data to display. Please upload an Excel file.
//         </p>
//       )}
//     </div>
//   );
// };

// export default ExcelToGrid;


// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import { useTable } from "react-table";

// const ExcelToGrid = () => {
//   const [columns, setColumns] = useState([]);
//   const [data, setData] = useState([]);
//   const [selectedRows, setSelectedRows] = useState([]);

//   // Handle file upload and process Excel data
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) {
//       alert("No file selected!");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       try {
//         const binaryString = evt.target.result;
//         const workbook = XLSX.read(binaryString, { type: "binary" });

//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
//         const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//         if (jsonData.length === 0) {
//           alert("The uploaded file is empty.");
//           return;
//         }

//         const headers = jsonData[0].map((key, index) => ({
//           Header: key || `Column ${index + 1}`,
//           accessor: key || `column_${index + 1}`,
//         }));

//         const rows = jsonData.slice(1).map((row, rowIndex) =>
//           headers.reduce((acc, col, colIndex) => {
//             acc[col.accessor] = row[colIndex] || "";
//             acc.ID = rowIndex + 1; // Add unique ID for selection
//             return acc;
//           }, {})
//         );

//         setColumns([
//           ...headers,
//           {
//             Header: "Select",
//             id: "select",
//             Cell: ({ row }) => (
//               <input
//                 type="checkbox"
//                 checked={selectedRows.includes(row.original.ID)}
//                 onChange={() => handleRowSelection(row.original.ID)}
//               />
//             ),
//           },
//         ]);
//         setData(rows);
//       } catch (error) {
//         alert("Failed to process the file. Please upload a valid Excel file.");
//         console.error(error);
//       }
//     };

//     reader.readAsBinaryString(file);
//   };

//   const handleRowSelection = (id) => {
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
//     );
//   };

//   const handleSubmit = () => {
//     const selectedData = data.filter((row) => selectedRows.includes(row.ID));
//     console.log("Selected Data:", selectedData);
//     alert(`Selected ${selectedData.length} records.`);
//   };

//   const clearData = () => {
//     setColumns([]);
//     setData([]);
//     setSelectedRows([]);
//   };

//   const tableInstance = useTable({ columns, data });
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     tableInstance;

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2 style={{ textAlign: "center", color: "#333" }}>Excel to Grid</h2>
//       <div style={{ textAlign: "center", marginBottom: "20px" }}>
//         <input
//           type="file"
//           accept=".xlsx, .xls"
//           onChange={handleFileUpload}
//           style={{
//             padding: "10px",
//             fontSize: "16px",
//             border: "1px solid #ccc",
//             borderRadius: "5px",
//             marginRight: "10px",
//           }}
//         />
//         <button
//           onClick={clearData}
//           style={{
//             padding: "10px 20px",
//             fontSize: "16px",
//             backgroundColor: "#dc3545",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Clear Data
//         </button>
//       </div>

//       {data.length > 0 ? (
//         <div style={{ overflowX: "auto" }}>
//           <table
//             {...getTableProps()}
//             style={{
//               borderCollapse: "collapse",
//               width: "100%",
//               marginTop: "20px",
//               border: "1px solid #ddd",
//             }}
//           >
//             <thead>
//               {headerGroups.map((headerGroup) => (
//                 <tr
//                   {...headerGroup.getHeaderGroupProps()}
//                   style={{ backgroundColor: "#f9f9f9" }}
//                 >
//                   {headerGroup.headers.map((column) => (
//                     <th
//                       {...column.getHeaderProps()}
//                       style={{
//                         padding: "10px",
//                         border: "1px solid #ddd",
//                         textAlign: "left",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {column.render("Header")}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//               {rows.map((row) => {
//                 prepareRow(row);
//                 return (
//                   <tr
//                     {...row.getRowProps()}
//                     style={{
//                       backgroundColor:
//                         row.index % 2 === 0 ? "#fff" : "#f7f7f7",
//                     }}
//                   >
//                     {row.cells.map((cell) => (
//                       <td
//                         {...cell.getCellProps()}
//                         style={{
//                           padding: "10px",
//                           border: "1px solid #ddd",
//                         }}
//                       >
//                         {cell.render("Cell")}
//                       </td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//           <button
//             onClick={handleSubmit}
//             style={{
//               display: "block",
//               margin: "20px auto",
//               padding: "10px 20px",
//               fontSize: "16px",
//               backgroundColor: "#007bff",
//               color: "#fff",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             Submit Selected Records
//           </button>
//         </div>
//       ) : (
//         <p style={{ textAlign: "center", color: "#777" }}>
//           No data to display. Please upload an Excel file.
//         </p>
//       )}
//     </div>
//   );
// };

// export default ExcelToGrid;


// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import { useTable } from "react-table";

// const ExcelToGrid = () => {
//   const [columns, setColumns] = useState([]);
//   const [data, setData] = useState([]);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);

//   // Handle file upload and process Excel data
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) {
//       alert("No file selected!");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       try {
//         const binaryString = evt.target.result;
//         const workbook = XLSX.read(binaryString, { type: "binary" });

//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
//         const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//         if (jsonData.length === 0) {
//           alert("The uploaded file is empty.");
//           return;
//         }

//         const headers = jsonData[0].map((key, index) => ({
//           Header: key || `Column ${index + 1}`,
//           accessor: key || `column_${index + 1}`,
//         }));

//         const rows = jsonData.slice(1).map((row, rowIndex) =>
//           headers.reduce((acc, col, colIndex) => {
//             acc[col.accessor] = row[colIndex] || "";
//             acc.ID = rowIndex + 1; // Add unique ID for selection
//             return acc;
//           }, {})
//         );

//         setColumns([
//           ...headers,
//           {
//             Header: (
//               <label htmlFor="selectAll">
//                 <input
//                   type="checkbox"
//                   id="selectAll"
//                   checked={selectAll}
//                   onChange={handleSelectAll}
//                   style={{ marginRight: "10px" }}
//                 />
//                 Select All
//               </label>
//             ),
//             id: "selectAll",
//             Cell: ({ row }) => (
//               <input
//                 type="checkbox"
//                 checked={selectedRows.includes(row.original.ID)}
//                 onChange={() => handleRowSelection(row.original.ID)}
//               />
//             ),
//           },
//         ]);
//         setData(rows);
//       } catch (error) {
//         alert("Failed to process the file. Please upload a valid Excel file.");
//         console.error(error);
//       }
//     };

//     reader.readAsBinaryString(file);
//   };

//   const handleSelectAll = (e) => {
//     const isChecked = e.target.checked;
//     setSelectAll(isChecked);
//     if (isChecked) {
//       const allRowIDs = data.map((row) => row.ID);
//       setSelectedRows(allRowIDs);
//     } else {
//       setSelectedRows([]);
//     }
//   };

//   const handleRowSelection = (id) => {
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
//     );
//   };

//   const handleSubmit = () => {
//     const selectedData = data.filter((row) => selectedRows.includes(row.ID));
//     console.log("Selected Data:", selectedData);
//     alert(`Selected ${selectedData.length} records.`);
//   };

//   const clearData = () => {
//     setColumns([]);
//     setData([]);
//     setSelectedRows([]);
//     setSelectAll(false);
//   };

//   const tableInstance = useTable({ columns, data });
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = tableInstance;

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2 style={{ textAlign: "center", color: "#333" }}>Excel to Grid</h2>
//       <div style={{ textAlign: "center", marginBottom: "20px" }}>
//         <input
//           type="file"
//           accept=".xlsx, .xls"
//           onChange={handleFileUpload}
//           style={{
//             padding: "10px",
//             fontSize: "16px",
//             border: "1px solid #ccc",
//             borderRadius: "5px",
//             marginRight: "10px",
//           }}
//         />
//         <button
//           onClick={clearData}
//           style={{
//             padding: "10px 20px",
//             fontSize: "16px",
//             backgroundColor: "#dc3545",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Clear Data
//         </button>
//       </div>

//       {data.length > 0 ? (
//         <div style={{ overflowX: "auto" }}>
//           <table
//             {...getTableProps()}
//             style={{
//               borderCollapse: "collapse",
//               width: "100%",
//               marginTop: "20px",
//               border: "1px solid #ddd",
//             }}
//           >
//             <thead>
//               {headerGroups.map((headerGroup) => (
//                 <tr
//                   {...headerGroup.getHeaderGroupProps()}
//                   style={{ backgroundColor: "#f9f9f9" }}
//                 >
//                   {headerGroup.headers
//                     .slice(0, -1) // Exclude "Select All" from the beginning
//                     .map((column) => (
//                       <th
//                         {...column.getHeaderProps()}
//                         style={{
//                           padding: "10px",
//                           border: "1px solid #ddd",
//                           textAlign: "left",
//                           fontWeight: "bold",
//                         }}
//                       >
//                         {column.render("Header")}
//                       </th>
//                     ))}
//                   <th
//                     {...headerGroup.headers[headerGroup.headers.length - 1].getHeaderProps()} // Get props for "Select All" column
//                     style={{
//                       padding: "10px",
//                       border: "1px solid #ddd",
//                       textAlign: "left",
//                       fontWeight: "bold",
//                     }}
//                   >
//                     {headerGroup.headers[headerGroup.headers.length - 1].render("Header")}
//                   </th>
//                 </tr>
//               ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//               {rows.map((row) => {
//                 prepareRow(row);
//                 return (
//                   <tr
//                     {...row.getRowProps()}
//                     style={{
//                       backgroundColor: row.index % 2 === 0 ? "#fff" : "#f7f7f7",
//                     }}
//                   >
//                     {row.cells
//                       .slice(0, -1) // Exclude "Select All" from the beginning
//                       .map((cell) => (
//                         <td
//                           {...cell.getCellProps()}
//                           style={{ padding: "10px", border: "1px solid #ddd" }}
//                         >
//                           {cell.render("Cell")}
//                         </td>
//                       ))}
//                     <td
//                       {...row.cells[row.cells.length - 1].getCellProps()} // Get props for "Select All" column
//                       style={{ padding: "10px", border: "1px solid #ddd" }}
//                     >
//                       {row.cells[row.cells.length - 1].render("Cell")}
//                     </td>
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//           <button
//             onClick={handleSubmit}
//             style={{
//               display: "block",
//               margin: "20px auto",
//               padding: "10px 20px",
//               fontSize: "16px",
//               backgroundColor: "#007bff",
//               color: "#fff",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             Submit Selected Records
//           </button>
//         </div>
//       ) : (
//         <p style={{ textAlign: "center", color: "#777" }}>
//           No data to display. Please upload an Excel file.
//         </p>
//       )}
//     </div>
//   );
// };

// export default ExcelToGrid;

// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import { useTable } from "react-table";
// import myToaster from "../../utils/toaster";

// const ExcelToGrid = () => {
//   const [columns, setColumns] = useState([]);
//   const [data, setData] = useState([]);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);

//   // Handle file upload and process Excel data
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) {
//       myToaster.showErrorToast("No file selected!");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       try {
//         const binaryString = evt.target.result;
//         const workbook = XLSX.read(binaryString, { type: "binary" });

//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
//         const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//         if (jsonData.length === 0) {
//           alert("The uploaded file is empty.");
//           return;
//         }

//         const headers = jsonData[0].map((key, index) => ({
//           Header: key || `Column ${index + 1}`,
//           accessor: key ? key.replace(/[^a-zA-Z0-9]/g, "_") : `column_${index + 1}`, // Sanitize accessor
//         }));

//         const rows = jsonData.slice(1).map((row, rowIndex) =>
//           headers.reduce((acc, col, colIndex) => {
//             acc[col.accessor] = row[colIndex] || "";
//             acc.ID = rowIndex; // Add unique ID for selection (starting from 0)
//             return acc;
//           }, {})
//         );

//         setColumns([
//           {
//             Header: (
//               <label htmlFor="selectAll">
//                 <input
//                   type="checkbox"
//                   id="selectAll"
//                   checked={selectAll}
//                   onChange={handleSelectAll}
//                   style={{ marginRight: "10px",  }}
//                 />
//                 Select All
//               </label>
//             ),
//             id: "selection", 
//             Cell: ({ row }) => (
//               <input
//                 type="checkbox"
//                 checked={selectedRows.includes(row.original.ID)}
//                 onChange={() => handleRowSelection(row.original.ID)}
              
//               />
//             ),
//           },
//           ...headers, // Spread headers after the selection column
//         ]);
//         setData(rows);
//         setSelectedRows([]); // Clear selected rows on new file upload
//         setSelectAll(false); // Reset selectAll state
//       } catch (error) {
//         alert("Failed to process the file. Please upload a valid Excel file.");
//         console.error(error);
//       }
//     };

//     reader.readAsBinaryString(file);
//   };

//   const handleSelectAll = (e) => {
//     const isChecked = e.target.checked;
//     setSelectAll(isChecked);
//     if (isChecked) {
//       const allRowIDs = data.map((row) => row.ID);
//       setSelectedRows(allRowIDs);
//     } else {
//       setSelectedRows([]);
//     }
//   };

//   const handleRowSelection = (id) => {
    
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
//     );
//      // Update selectAll state based on individual row selections
//      if (selectedRows.length === data.length -1 && !selectedRows.includes(id)) {
//         setSelectAll(true);
//     } else if (selectedRows.length === data.length)
//     {
//         setSelectAll(false);
//     }
//   };

//   const handleSubmit = () => {
//     const selectedData = data.filter((row) => selectedRows.includes(row.ID));
//     console.log("Selected Data:", selectedData);
//     myToaster.showSuccessToast(`Selected ${selectedData.length} records.`);
//   };

//   const clearData = () => {
//     setColumns([]);
//     setData([]);
//     setSelectedRows([]);
//     setSelectAll(false);
//     // Reset the file input element
//     const fileInput = document.querySelector('input[type="file"]');
//     if (fileInput) {
//         fileInput.value = "";
//     }
//   };

//   const tableInstance = useTable({ columns, data });
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = tableInstance;

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2 style={{ textAlign: "center", color: "#333" }}>Excel to Grid</h2>
//       <div style={{ textAlign: "center", marginBottom: "20px" }}>
//         <input
//           type="file"
//           accept=".xlsx, .xls"
//           onChange={handleFileUpload}
//           style={{
//             padding: "10px",
//             fontSize: "16px",
//             border: "1px solid #ccc",
//             borderRadius: "5px",
//             marginRight: "10px",
//           }}
//         />
//         <button
//           onClick={clearData}
//           style={{
//             padding: "10px 20px",
//             fontSize: "16px",
//             backgroundColor: "#dc3545",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Clear Data
//         </button>
//       </div>

//       {data.length > 0 ? (
//         <div style={{ overflowX: "auto" }}>
//           <table
//             {...getTableProps()}
//             style={{
//               borderCollapse: "collapse",
//               width: "100%",
//               marginTop: "20px",
//               border: "1px solid #ddd",
//             }}
//           >
//             <thead>
//               {headerGroups.map((headerGroup) => (
//                 <tr
//                   {...headerGroup.getHeaderGroupProps()}
//                   style={{ backgroundColor: "#f9f9f9" }}
//                 >
//                   {headerGroup.headers.map((column) => (
//                     <th
//                       {...column.getHeaderProps()}
//                       style={{
//                         padding: "10px",
//                         border: "1px solid #ddd",
//                         textAlign: "left",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {column.render("Header")}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//               {rows.map((row) => {
//                 prepareRow(row);
//                 return (
//                   <tr
//                     {...row.getRowProps()}
//                     style={{
//                       backgroundColor: row.index % 2 === 0 ? "#fff" : "#f7f7f7",
//                     }}
//                   >
//                     {row.cells.map((cell) => (
//                       <td
//                         {...cell.getCellProps()}
//                         style={{ padding: "10px", border: "1px solid #ddd" }}
//                       >
//                         {cell.render("Cell")}
//                       </td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//           <button
//             onClick={handleSubmit}
//             style={{
//               display: "block",
//               margin: "20px auto",
//               padding: "10px 20px",
//               fontSize: "16px",
//               backgroundColor: "#007bff",
//               color: "#fff",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             Submit Selected Records
//           </button>
//         </div>
//       ) : (
//         <p style={{ textAlign: "center", color: "#777" }}>
//           No data to display. Please upload an Excel file.
//         </p>
//       )}
//     </div>
//   );
// };

// export default ExcelToGrid;

// import React, { useState } from "react";
// import * as XLSX from "xlsx";
// import { useTable } from "react-table";

// const ExcelToGrid = () => {
//   const [columns, setColumns] = useState([]);
//   const [data, setData] = useState([]);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectAll, setSelectAll] = useState(false);

//   // Handle file upload and process Excel data
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) {
//       alert("No file selected!");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       try {
//         const binaryString = evt.target.result;
//         const workbook = XLSX.read(binaryString, { type: "binary" });

//         const sheetName = workbook.SheetNames[0];
//         const sheet = workbook.Sheets[sheetName];
//         const jsonData = XLSX.utils.sheet_to_json(sheet, { header: 1 });

//         if (jsonData.length === 0) {
//           alert("The uploaded file is empty.");
//           return;
//         }

//         const headers = jsonData[0].map((key, index) => ({
//           Header: key || `Column ${index + 1}`,
//           accessor: key ? key.replace(/[^a-zA-Z0-9]/g, "_") : `column_${index + 1}`, // Sanitize accessor
//         }));

//         const rows = jsonData.slice(1).map((row, rowIndex) =>
//           headers.reduce((acc, col, colIndex) => {
//             acc[col.accessor] = row[colIndex] || "";
//             acc.ID = rowIndex; // Add unique ID for selection (starting from 0)
//             return acc;
//           }, {})
//         );

//         setColumns([
//           ...headers, // Spread data headers first
//           {
//             Header: (
//               <label htmlFor="selectAll" style={{ display: 'flex', alignItems: 'center' }}>
//                 <input
//                   type="checkbox"
//                   id="selectAll"
//                   checked={selectAll}
//                   onChange={handleSelectAll}
//                   style={{ marginRight: "10px" }}
//                 />
//                 Select All
//               </label>
//             ),
//             id: "selection",
//             Cell: ({ row }) => (
//               <input
//                 type="checkbox"
//                 checked={selectedRows.includes(row.original.ID)}
//                 onChange={() => handleRowSelection(row.original.ID)}
//               />
//             ),
//           }, // Add selection column at the end
//         ]);
//         setData(rows);
//         setSelectedRows([]); // Clear selected rows on new file upload
//         setSelectAll(false); // Reset selectAll state
//       } catch (error) {
//         alert("Failed to process the file. Please upload a valid Excel file.");
//         console.error(error);
//       }
//     };

//     reader.readAsBinaryString(file);
//   };

//   const handleSelectAll = (e) => {
//     const isChecked = e.target.checked;
//     setSelectAll(isChecked);
//     if (isChecked) {
//       const allRowIDs = data.map((row) => row.ID);
//       setSelectedRows(allRowIDs);
//     } else {
//       setSelectedRows([]);
//     }
//   };

//   const handleRowSelection = (id) => {
    
//     setSelectedRows((prev) =>
//       prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
//     );
//      // Update selectAll state based on individual row selections
//      if (selectedRows.length === data.length -1 && !selectedRows.includes(id)) {
//         setSelectAll(true);
//     } else if (selectedRows.length === data.length)
//     {
//         setSelectAll(false);
//     }
//   };

//   const handleSubmit = () => {
//     const selectedData = data.filter((row) => selectedRows.includes(row.ID));
//     console.log("Selected Data:", selectedData);
//     alert(`Selected ${selectedData.length} records.`);
//   };

//   const clearData = () => {
//     setColumns([]);
//     setData([]);
//     setSelectedRows([]);
//     setSelectAll(false);
//     // Reset the file input element
//     const fileInput = document.querySelector('input[type="file"]');
//     if (fileInput) {
//         fileInput.value = "";
//     }
//   };

//   const tableInstance = useTable({ columns, data });
//   const {
//     getTableProps,
//     getTableBodyProps,
//     headerGroups,
//     rows,
//     prepareRow,
//   } = tableInstance;

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2 style={{ textAlign: "center", color: "#333" }}>Excel to Grid</h2>
//       <div style={{ textAlign: "center", marginBottom: "20px" }}>
//         <input
//           type="file"
//           accept=".xlsx, .xls"
//           onChange={handleFileUpload}
//           style={{
//             padding: "10px",
//             fontSize: "16px",
//             border: "1px solid #ccc",
//             borderRadius: "5px",
//             marginRight: "10px",
//           }}
//         />
//         <button
//           onClick={clearData}
//           style={{
//             padding: "10px 20px",
//             fontSize: "16px",
//             backgroundColor: "#dc3545",
//             color: "#fff",
//             border: "none",
//             borderRadius: "5px",
//             cursor: "pointer",
//           }}
//         >
//           Clear Data
//         </button>
//       </div>

//       {data.length > 0 ? (
//         <div style={{ overflowX: "auto" }}>
//           <table
//             {...getTableProps()}
//             style={{
//               borderCollapse: "collapse",
//               width: "100%",
//               marginTop: "20px",
//               border: "1px solid #ddd",
//             }}
//           >
//             <thead>
//               {headerGroups.map((headerGroup) => (
//                 <tr
//                   {...headerGroup.getHeaderGroupProps()}
//                   style={{ backgroundColor: "#f9f9f9" }}
//                 >
//                   {headerGroup.headers.map((column) => (
//                     <th
//                       {...column.getHeaderProps()}
//                       style={{
//                         padding: "10px",
//                         border: "1px solid #ddd",
//                         textAlign: "left",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {column.render("Header")}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//               {rows.map((row) => {
//                 prepareRow(row);
//                 return (
//                   <tr
//                     {...row.getRowProps()}
//                     style={{
//                       backgroundColor: row.index % 2 === 0 ? "#fff" : "#f7f7f7",
//                     }}
//                   >
//                     {row.cells.map((cell) => (
//                       <td
//                         {...cell.getCellProps()}
//                         style={{ padding: "10px", border: "1px solid #ddd" }}
//                       >
//                         {cell.render("Cell")}
//                       </td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//           <button
//             onClick={handleSubmit}
//             style={{
//               display: "block",
//               margin: "20px auto",
//               padding: "10px 20px",
//               fontSize: "16px",
//               backgroundColor: "#007bff",
//               color: "#fff",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             Submit Selected Records
//           </button>
//         </div>
//       ) : (
//         <p style={{ textAlign: "center", color: "#777" }}>
//           No data to display. Please upload an Excel file.
//         </p>
//       )}
//     </div>
//   );
// };

// export default ExcelToGrid;

// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import { useTable } from "react-table";

// const ExcelToGrid = () => {
//   const [columns, setColumns] = useState([]);
//   const [data, setData] = useState([]);
//   const [selectedRows, setSelectedRows] = useState([]);
//   const [selectAllChecked, setSelectAllChecked] = useState(false);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const binaryString = evt.target.result;
//       const workbook = XLSX.read(binaryString, { type: "binary" });

//       const sheetName = workbook.SheetNames[0];
//       const sheet = workbook.Sheets[sheetName];
//       const jsonData = XLSX.utils.sheet_to_json(sheet);

//       if (jsonData.length > 0) {
//         const headers = Object.keys(jsonData[0]).map((key) => ({
//           Header: key,
//           accessor: key,
//         }));

//         setColumns([
//           {
//             Header: "Select",
//             id: "select",
//             Cell: ({ row }) => (
//               <input
//                 type="checkbox"
//                 checked={selectedRows.includes(row.index)}
//                 onChange={() => handleRowSelection(row.index)}
//               />
//             ),
//           },
//           ...headers,
//         ]);
//         setData(jsonData);
//       }
//     };
//     reader.readAsBinaryString(file);
//   };

//   const handleRowSelection = (index) => {
//     setSelectedRows((prevSelectedRows) => {
//       const updatedSelectedRows = prevSelectedRows.includes(index)
//         ? prevSelectedRows.filter((rowIndex) => rowIndex !== index)
//         : [...prevSelectedRows, index];

//       setSelectAllChecked(updatedSelectedRows.length === data.length);

//       return updatedSelectedRows;
//     });
//   };

//   const handleSelectAll = (e) => {
//     setSelectAllChecked(e.target.checked);
//     setSelectedRows(e.target.checked ? data.map((_, index) => index) : []);
//   };

//   useEffect(() => {
//     setSelectAllChecked(selectedRows.length === data.length && data.length > 0);
//   }, [data, selectedRows]);

//   const handleSubmit = () => {
//     const selectedData = data.filter((_, index) =>
//       selectedRows.includes(index)
//     );
//     console.log("Selected Data for Submission:", selectedData);
//     alert(`Selected ${selectedData.length} records for submission!`);
//     // Add your backend submission logic here
//   };

//   const tableInstance = useTable({ columns, data });
//   const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
//     tableInstance;

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h2 style={{ textAlign: "center", color: "#333" }}>
//         Excel File Upload and Grid
//       </h2>
//       <input
//         type="file"
//         accept=".xlsx, .xls"
//         onChange={handleFileUpload}
//         style={{
//           display: "block",
//           margin: "0 auto 20px",
//           padding: "10px",
//           fontSize: "16px",
//           border: "1px solid #ccc",
//           borderRadius: "5px",
//         }}
//       />

//       {data.length > 0 ? (
//         <div style={{ overflowX: "auto" }}>
//           <table
//             {...getTableProps()}
//             style={{
//               borderCollapse: "collapse",
//               width: "100%",
//               marginTop: "20px",
//               border: "1px solid #ddd",
//             }}
//           >
//             <thead>
//               {headerGroups.map((headerGroup) => (
//                 <tr
//                   {...headerGroup.getHeaderGroupProps()}
//                   style={{ backgroundColor: "#f9f9f9" }}
//                 >
//                   {headerGroup.headers.map((column, index) => (
//                     <th
//                       {...column.getHeaderProps()}
//                       style={{
//                         padding: "10px",
//                         border: "1px solid #ddd",
//                         textAlign: "left",
//                         fontWeight: "bold",
//                       }}
//                     >
//                       {column.id === "select" ? (
//                         <input
//                           type="checkbox"
//                           onChange={handleSelectAll}
//                           checked={selectAllChecked}
//                         />
//                       ) : (
//                         column.render("Header")
//                       )}
//                     </th>
//                   ))}
//                 </tr>
//               ))}
//             </thead>
//             <tbody {...getTableBodyProps()}>
//               {rows.map((row) => {
//                 prepareRow(row);
//                 return (
//                   <tr
//                     {...row.getRowProps()}
//                     style={{
//                       backgroundColor: row.index % 2 === 0 ? "#fff" : "#f7f7f7",
//                     }}
//                   >
//                     {row.cells.map((cell) => (
//                       <td
//                         {...cell.getCellProps()}
//                         style={{
//                           padding: "10px",
//                           border: "1px solid #ddd",
//                         }}
//                       >
//                         {cell.render("Cell")}
//                       </td>
//                     ))}
//                   </tr>
//                 );
//               })}
//             </tbody>
//           </table>
//           <button
//             onClick={handleSubmit}
//             style={{
//               display: "block",
//               margin: "20px auto",
//               padding: "10px 20px",
//               fontSize: "16px",
//               backgroundColor: "#007bff",
//               color: "#fff",
//               border: "none",
//               borderRadius: "5px",
//               cursor: "pointer",
//             }}
//           >
//             Submit Selected Records
//           </button>
//         </div>
//       ) : (
//         <p style={{ textAlign: "center", color: "#777" }}>
//           No data to display. Please upload an Excel file.
//         </p>
//       )}
//     </div>
//   );
// };

// export default ExcelToGrid;

import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import { useTable } from "react-table";

const ExcelToGrid = () => {
  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [selectAllChecked, setSelectAllChecked] = useState(false);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryString = evt.target.result;
      const workbook = XLSX.read(binaryString, { type: "binary" });

      const sheetName = workbook.SheetNames[0];
      const sheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(sheet);

      if (jsonData.length > 0) {
        const headers = Object.keys(jsonData[0]).map((key) => ({
          Header: key,
          accessor: key,
        }));

        setColumns([
          {
            Header: "Select",
            id: "select",
            Cell: ({ row }) => (
              <input
                type="checkbox"
                checked={selectedRows.includes(row.index)}
                onChange={() => handleRowSelection(row.index)}
              />
            ),
          },
          ...headers,
        ]);
        setData(jsonData);
      }
    };
    reader.readAsBinaryString(file);
  };

  const handleRowSelection = (index) => {
    setSelectedRows((prevSelectedRows) => {
      const updatedSelectedRows = prevSelectedRows.includes(index)
        ? prevSelectedRows.filter((rowIndex) => rowIndex !== index)
        : [...prevSelectedRows, index];

      setSelectAllChecked(updatedSelectedRows.length === data.length);

      return updatedSelectedRows;
    });
  };

  const handleSelectAll = (e) => {
    setSelectAllChecked(e.target.checked);
    setSelectedRows(e.target.checked ? data.map((_, index) => index) : []);
  };

  useEffect(() => {
    setSelectAllChecked(selectedRows.length === data.length && data.length > 0);
  }, [data, selectedRows]);

  const handleSubmit = () => {
    const selectedData = data.filter((_, index) =>
      selectedRows.includes(index)
    );
    console.log("Selected Data for Submission:", selectedData);
    alert(`Selected ${selectedData.length} records for submission!`);
  };

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333" }}>
        Excel File Upload and Grid
      </h2>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileUpload}
        style={{
          display: "block",
          margin: "0 auto 20px",
          padding: "10px",
          fontSize: "16px",
          border: "1px solid #ccc",
          borderRadius: "5px",
        }}
      />

      {data.length > 0 ? (
        <div style={{ overflowX: "auto" }}>
          <table
            {...getTableProps()}
            style={{
              borderCollapse: "collapse",
              width: "100%",
              marginTop: "20px",
              border: "1px solid #ddd",
            }}
          >
            <thead>
              {headerGroups.map((headerGroup) => (
                <tr
                  {...headerGroup.getHeaderGroupProps()}
                  style={{ backgroundColor: "#f9f9f9" }}
                >
                  {headerGroup.headers.map((column) => (
                    <th
                      {...column.getHeaderProps()}
                      style={{
                        padding: "10px",
                        border: "1px solid #ddd",
                        textAlign: "left",
                        fontWeight: "bold",
                      }}
                    >
                      {column.id === "select" ? (
                        <input
                          type="checkbox"
                          onChange={handleSelectAll}
                          checked={selectAllChecked}
                        />
                      ) : (
                        column.render("Header")
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()}>
              {rows.map((row) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    style={{
                      backgroundColor: row.index % 2 === 0 ? "#fff" : "#f7f7f7",
                    }}
                  >
                    {row.cells.map((cell) => (
                      <td
                        {...cell.getCellProps()}
                        style={{
                          padding: "10px",
                          border: "1px solid #ddd",
                        }}
                      >
                        {cell.render("Cell")}
                      </td>
                    ))}
                  </tr>
                );
              })}
            </tbody>
          </table>
          <button
            onClick={handleSubmit}
            style={{
              display: "block",
              margin: "20px auto",
              padding: "10px 20px",
              fontSize: "16px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Submit Selected Records
          </button>
        </div>
      ) : (
        <p style={{ textAlign: "center", color: "#777" }}>
          No data to display. Please upload an Excel file.
        </p>
      )}
    </div>
  );
};

export default ExcelToGrid;