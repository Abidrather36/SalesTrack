import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import myToaster from "../../utils/toaster";
import { addBulkLeads } from "../../Services/LeadService";
import { CircularProgress } from "@mui/material";
import Spin from "../../../src/Components/public/Spin"
import BreadcrumbComponent from "../../../src/Components/shared/Breadcrumb";
import { useNavigate } from "react-router-dom";

const ExcelToGrid = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [processingFile, setProcessingFile] = useState(false); // Spinner state for file upload
  const navigate=useNavigate();
  const fileInputRef =useRef(null); 

  let user = JSON.parse(localStorage.getItem("user"))
  // Handle file upload
  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setProcessingFile(true); // Start showing spinner
      const reader = new FileReader();
      reader.onload = (e) => {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const worksheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });

        // Convert array of arrays to object array
        const headers = jsonData[0];
        const rows = jsonData.slice(1).map((row) =>
          headers.reduce((acc, header, index) => {
            acc[header] = row[index] || "";
            return acc;
          }, {})
        );

        setData(rows);
      };
      reader.onloadend = () => {
        setProcessingFile(false); // Stop showing spinner after processing is done
      };
      reader.readAsArrayBuffer(file);
    }
  };

  // Reset uploaded data
  const handleReset = () => {
    setData([]);
    setSelectedRows([]);
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // Reset the file input value
    }
  };

  // Toggle single row selection
  const toggleRowSelection = (row) => {
    setSelectedRows((prev) =>
      prev.includes(row) ? prev.filter((item) => item !== row) : [...prev, row]
    );
  };

  // Toggle select all rows
  const toggleSelectAll = () => {
    if (selectedRows.length === data.length) {
      setSelectedRows([]);
    } else {
      setSelectedRows([...data]);
    }
  };



  // Handle form submission
  // const handleSubmit = async () => {
  //   const selectedData = data.filter((row) => selectedRows.includes(row));
  //   if (selectedData.length === 0) {
  //     myToaster.showErrorToast("No records selected for submission!");
  //     return;
  //   }

  //   const formattedData = selectedData.map((row) => ({
  //     name: row.name || "",
  //     email: row.email || "",
  //     phoneNumber: String(row.phoneNumber || ""),
  //     leadSourceName: row.leadSourceName || "",
  //     leadCompany:row.leadCompany || "",
  //     companyId: row.companyId || "3fa85f64-5717-4562-b3fc-2c963f66afa6", // Default GUID for companyId
  //     leadCategoryId: row.leadCategoryId ? row.leadCategoryId : "3fa85f64-5717-4562-b3fc-2c963f66afa6", // Default GUID for leadCategoryId
  //     assignTo: row.assignTo || "3fa85f64-5717-4562-b3fc-2c963f66afa6", // Default GUID for assignTo
  //     leadRank: Number(row.LeadRank) || 0, // Fallback to 0 for leadRank
  //     assignToUser:row.AssignToUser || "",
  //     designation:row.designation || "",
  //     department:row.department || ""
  //   }));
    
  
  //         setLoading(true);
  //         console.log("formatedd data",formattedData);
  //         try {
  //           const response = await addBulkLeads(formattedData);
        
  //           console.log("multiple leads res =>", response);
        
  //           if (response.isSuccess) {
  //             myToaster.showSuccessToast(`Successfully added ${selectedData.length} leads.`);
  //             handleReset();
  //             if(user.userRole==3){
  //               navigate("/salesExecutive/leadList");
  //             }
  //             else if(user.userRole==4){
  //               navigate("/salesManager/leadList");
  //             }
  //             else{
  //               myToaster.showErrorToast("UnAuthorized role pleas etry again");
  //             }
              
  //           } else {
  //             myToaster.showErrorToast(response.message || "An error occurred.");
  //           }
  //         } catch (error) {
  //           console.error("API Error:", error);
        
  //           // Extract error message from Axios response
  //           const errorMessage =
  //             error.response?.data?.message || // Backend error message
  //             "An error occurred while submitting leads."; // Fallback message
        
  //           myToaster.showErrorToast(errorMessage);
  //         } finally {
  //           setLoading(false);
  //         }
  //       };

  const handleSubmit = async () => {
    const selectedData = data.filter((row) => selectedRows.includes(row));
    if (selectedData.length === 0) {
      myToaster.showErrorToast("No records selected for submission!");
      return;
    }
  
    const formattedData = selectedData.map((row) => ({
      name: row.name || "",
      email: row.email || "",
      phoneNumber: String(row.phoneNumber || ""),
      leadSourceName: row.leadSourceName || "",
      leadCompany: row.leadCompany || "",
      companyId: row.companyId || "3fa85f64-5717-4562-b3fc-2c963f66afa6", // Default GUID for companyId
      leadCategoryId: row.leadCategoryId ? row.leadCategoryId : "3fa85f64-5717-4562-b3fc-2c963f66afa6", // Default GUID for leadCategoryId
      assignTo: row.assignTo || "3fa85f64-5717-4562-b3fc-2c963f66afa6", // Default GUID for assignTo
      leadRank: Number(row.LeadRank) || 0, // Fallback to 0 for leadRank
      assignToUser: row.AssignToUser || "",
      designation: row.designation || "",
      department: row.department || "",
    }));
  
    setLoading(true);
    console.log("formatted data", formattedData);
    try {
      const response = await addBulkLeads(formattedData);
  
      console.log("multiple leads res =>", response);
  
      if (response.isSuccess) {
        // Parse the response message to get added and skipped counts
        const message = response.message || "";
        const addedCount = message.match(/Successfully added (\d+) new lead\(s\)/)?.[1] || 0;
        const skippedCount = message.match(/(\d+) email\(s\) were skipped/)?.[1] || 0;
  
        myToaster.showSuccessToast(
          `Successfully added ${addedCount} lead(s). ${skippedCount} email(s) were skipped as they already exist.`
        );
        handleReset();
        if (user.userRole === 3) {
          navigate("/salesExecutive/leadList");
        } else if (user.userRole === 4) {
          navigate("/salesManager/leadList");
        } else {
          myToaster.showErrorToast("Unauthorized role. Please try again.");
        }
      } else {
        myToaster.showErrorToast(response.message || "An error occurred.");
      }
    } catch (error) {
      console.error("API Error:", error);
  
      // Extract error message from Axios response
      const errorMessage =
        error.response?.data?.message || // Backend error message
        "An error occurred while submitting leads."; // Fallback message
  
      myToaster.showErrorToast(errorMessage);
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
    <BreadcrumbComponent
    labels={{
      module: "salesExecutive",
      currentRoute: "Excel-Upload",
    }}
  />
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2 style={{ textAlign: "center", color: "#333", marginBottom: "20px" }}>Excel File Upload</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "10px" }}>
        <input
          ref={fileInputRef} 
          type="file"
          accept=".xlsx, .xls"
          onChange={handleFileUpload}
          style={{
            padding: "10px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "5px",
            backgroundColor: "#f9f9f9",
            cursor: "pointer",
          }}
        />
        <button
          onClick={handleReset}
          style={{
            padding: "10px 20px",
            fontSize: "16px",
            backgroundColor: "#dc3545",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Reset
        </button>
      </div>
      {processingFile && (
        <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
          <CircularProgress />
        </div>
      )}
      {data.length > 0 && !processingFile && (
        <>
          <div style={{ marginTop: "20px", overflowX: "auto" }}>
            <table style={{ borderCollapse: "collapse", width: "100%", border: "1px solid #ddd" }}>
              <thead>
                <tr style={{ backgroundColor: "#007bff", color: "#fff", textAlign: "left" }}>
                  {Object.keys(data[0]).map((key) => (
                    <th key={key} style={{ padding: "10px", border: "1px solid #ddd" }}>
                      {key}
                    </th>
                  ))}
                  <th style={{ padding: "10px", border: "1px solid #ddd" }}>
                    <input
                      type="checkbox"
                      checked={selectedRows.length === data.length}
                      onChange={toggleSelectAll}
                    />
                  </th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    style={{ backgroundColor: rowIndex % 2 === 0 ? "#f9f9f9" : "#fff" }}
                  >
                    {Object.values(row).map((cell, cellIndex) => (
                      <td key={cellIndex} style={{ padding: "10px", border: "1px solid #ddd" }}>
                        {cell}
                      </td>
                    ))}
                    <td style={{ padding: "10px", border: "1px solid #ddd", textAlign: "center" }}>
                      <input
                        type="checkbox"
                        checked={selectedRows.includes(row)}
                        onChange={() => toggleRowSelection(row)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <button
            disabled={loading}
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
            {loading ? <Spin/> : "Submit Selected Records"}
          </button>
        </>
      )}
    </div>
    </>
  );
};

export default ExcelToGrid;
