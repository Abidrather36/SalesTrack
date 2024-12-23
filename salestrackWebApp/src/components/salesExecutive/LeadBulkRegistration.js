// import React, { useState, useEffect } from 'react';
// import * as XLSX from 'xlsx';
// import axios from 'axios';

// const LeadRegistration = () => {
//   const [fileData, setFileData] = useState([]);
//   const [companies, setCompanies] = useState([]);  // To store companies
//   const [selectedCompany, setSelectedCompany] = useState('');
//   const [leads, setLeads] = useState([]);
  
//   // Fetch companies from backend to populate dropdown (if needed)
//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const response = await axios.get('/api/companies');  // Adjust to your backend endpoint
//         setCompanies(response.data);
//       } catch (error) {
//         console.error("Error fetching companies:", error);
//       }
//     };
//     fetchCompanies();
//   }, []);

//   // Handle file upload and extract data from Excel
//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const binaryString = evt.target.result;
//       const wb = XLSX.read(binaryString, { type: 'binary' });
      
//       // Assuming the Excel file has a sheet named 'Sheet1'
//       const ws = wb.Sheets['Sheet1'];
//       const jsonData = XLSX.utils.sheet_to_json(ws);

//       // Separate company and lead data
//       const extractedCompanies = [];
//       const extractedLeads = [];

//       jsonData.forEach(row => {
//         // If the company is not in the list, add it
//         if (!extractedCompanies.includes(row.CompanyName)) {
//           extractedCompanies.push(row.CompanyName);
//         }

//         extractedLeads.push({
//           companyName: row.CompanyName,
//           leadName: row.LeadName,
//           leadPhoneNumber: row.LeadPhoneNumber,
//         });
//       });

//       // Update state with extracted data
//       setCompanies(extractedCompanies);
//       setLeads(extractedLeads);
//       setFileData(jsonData);  // Optionally, store raw data for debugging or further processing
//     };
//     reader.readAsBinaryString(file);
//   };

//   // Handle submitting the leads to backend
//   const handleSubmit = async () => {
//     if (!selectedCompany) {
//       alert("Please select a company before submitting leads.");
//       return;
//     }

//     const filteredLeads = leads.filter(lead => lead.companyName === selectedCompany);

//     try {
//       const response = await axios.post('/api/submit-leads', { leads: filteredLeads });
//       console.log("Server Response:", response.data);
//       alert("Leads submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting leads:", error);
//       alert("There was an error submitting the leads.");
//     }
//   };

//   return (
//     <div>
//       <h2>Upload Excel File</h2>
//       <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
      
//       <div>
//         <h3>Company Selection</h3>
//         <select 
//           value={selectedCompany} 
//           onChange={(e) => setSelectedCompany(e.target.value)}
//         >
//           <option value="">Select a Company</option>
//           {companies.map((company, index) => (
//             <option key={index} value={company}>{company}</option>
//           ))}
//         </select>
//       </div>

//       <div>
//         <h3>Leads Extracted</h3>
//         <ul>
//           {leads
//             .filter(lead => lead.companyName === selectedCompany)  // Only show leads for the selected company
//             .map((lead, index) => (
//               <li key={index}>
//                 {lead.leadName} - {lead.leadPhoneNumber}
//               </li>
//             ))}
//         </ul>
//       </div>

//       <button onClick={handleSubmit}>Submit Leads</button>
//     </div>
//   );
// };

// export default LeadRegistration;


import React, { useState, useEffect } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import myToaster from "../../utils/toaster";

const LeadRegistration = () => {
  const [fileData, setFileData] = useState([]);
  const [companies, setCompanies] = useState([]);
  const [selectedCompany, setSelectedCompany] = useState("");
  const [leads, setLeads] = useState([]);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get("/api/companies");
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryString = evt.target.result;
      const wb = XLSX.read(binaryString, { type: "binary" });
      const ws = wb.Sheets["Sheet1"];
      const jsonData = XLSX.utils.sheet_to_json(ws);

      const extractedCompanies = [];
      const extractedLeads = [];

      jsonData.forEach((row) => {
        if (!extractedCompanies.includes(row.CompanyName)) {
          extractedCompanies.push(row.CompanyName);
        }

        extractedLeads.push({
          companyName: row.CompanyName,
          leadName: row.LeadName,
          leadPhoneNumber: row.LeadPhoneNumber,
        });
      });

      setCompanies(extractedCompanies);
      setLeads(extractedLeads);
      setFileData(jsonData);
    };
    reader.readAsBinaryString(file);
  };

  const handleSubmit = async () => {
    if (!selectedCompany) {
      myToaster.showErrorToast("Please select a company before submitting leads.");
      return;
    }

    const filteredLeads = leads.filter(
      (lead) => lead.companyName === selectedCompany
    );

    try {
      const response = await axios.post("/api/submit-leads", {
        leads: filteredLeads,
      });
      console.log("Server Response:", response.data);
      myToaster.showSuccessToast("Leads submitted successfully!");
    } catch (error) {
      console.error("Error submitting leads:", error);
      myToaster.showErrorToast("There was an error submitting the leads.");
    }
  };

  return (
    <>
      <div
        className="wrapper"
        style={{
          marginTop: "-80px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "70vh",
          padding: "50px",
          overflowX: "auto",
        }}
      >
        <div
          style={{
            padding: "20px",
            width: "50%",
            maxWidth: "900px",
          }}
        >
          <div
            className="login-container"
            style={{
              background: "#fff",
              padding: "35px",
              borderRadius: "10px",
              boxShadow: "0 0 15px rgba(0,0,0,0.1)",
              maxWidth: "900px",
              width: "100%",
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
              Lead Registration
            </h2>

            <div style={{ marginBottom: "20px" }}>
              <input
                type="file"
                accept=".xlsx,.xls"
                onChange={handleFileUpload}
                style={{ marginBottom: "10px" }}
              />
              <select
                value={selectedCompany}
                onChange={(e) => setSelectedCompany(e.target.value)}
                style={{
                  width: "70%",
                  padding: "10px",
                  borderRadius: "5px",
                  border: "1px solid #ccc",
                  marginBottom: "20px",
                }}
              >
                <option value="">Select a Company</option>
                {companies.map((company, index) => (
                  <option key={index} value={company}>
                    {company}
                  </option>
                ))}
              </select>
            </div>

            <div style={{ marginBottom: "20px" }}>
              <h3>Leads Extracted</h3>
              <ul>
                {leads
                  .filter((lead) => lead.companyName === selectedCompany)
                  .map((lead, index) => (
                    <li key={index}>
                      {lead.leadName} - {lead.leadPhoneNumber}
                    </li>
                  ))}
              </ul>
            </div>

            <button
              onClick={handleSubmit}
              className="btn btn-primary"
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                fontWeight: "bold",
              }}
            >
              Submit Leads
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default LeadRegistration;


// import React, { useState, useEffect } from 'react';
// import * as XLSX from 'xlsx';
// import axios from 'axios';
// import myToaster from '../../utils/toaster';

// const LeadRegistration = () => {
//   const [fileData, setFileData] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [selectedCompany, setSelectedCompany] = useState('');
//   const [leads, setLeads] = useState([]);

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const response = await axios.get('/api/companies'); // Adjust to your backend endpoint
//         setCompanies(response.data);
//       } catch (error) {
//         console.error('Error fetching companies:', error);
//       }
//     };
//     fetchCompanies();
//   }, []);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const binaryString = evt.target.result;
//       const wb = XLSX.read(binaryString, { type: 'binary' });
//       const ws = wb.Sheets['Sheet1'];
//       const jsonData = XLSX.utils.sheet_to_json(ws);

//       const extractedCompanies = [];
//       const extractedLeads = [];

//       jsonData.forEach((row) => {
//         if (!extractedCompanies.includes(row.CompanyName)) {
//           extractedCompanies.push(row.CompanyName);
//         }
//         extractedLeads.push({
//           companyName: row.CompanyName,
//           leadName: row.LeadName,
//           leadPhoneNumber: row.LeadPhoneNumber,
//         });
//       });

//       setCompanies(extractedCompanies);
//       setLeads(extractedLeads);
//       setFileData(jsonData);
//     };
//     reader.readAsBinaryString(file);
//   };

//   const handleSubmit = async () => {
//     if (!selectedCompany) {
//       myToaster.showErrorToast('Please select a company before submitting leads.');
//       return;
//     }

//     const filteredLeads = leads.filter((lead) => lead.companyName === selectedCompany);

//     try {
//       const response = await axios.post('/api/submit-leads', { leads: filteredLeads });
//       console.log('Server Response:', response.data);
//       myToaster.showErrorToast('Leads submitted successfully!');
//     } catch (error) {
//       console.error('Error submitting leads:', error);
//       alert('There was an error submitting the leads.');
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex flex-col items-center p-4">
//       <div className="w-full max-w-4xl bg-white rounded-lg shadow-lg p-6">
//         <h2 className="text-2xl font-bold text-center text-blue-700 mb-4">
//           Lead Registration
//         </h2>

//         <div className="flex flex-col items-center gap-6">
//           {/* File Upload */}
//           <div className="w-full">
//             <label className="block text-lg font-semibold text-blue-600 mb-2">
//               Upload Excel File
//             </label>
//             <input
//               type="file"
//               accept=".xlsx,.xls"
//               onChange={handleFileUpload}
//               className="block w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             />
//           </div>

//           {/* Company Selection */}
//           <div className="w-full">
//             <label className="block text-lg font-semibold text-blue-600 mb-2">
//               Select Company
//             </label>
//             <select
//               value={selectedCompany}
//               onChange={(e) => setSelectedCompany(e.target.value)}
//               className="block w-full px-4 py-2 border border-blue-300 rounded-lg shadow-sm focus:ring-blue-500 focus:border-blue-500"
//             >
//               <option value="">Choose a Company</option>
//               {companies.map((company, index) => (
//                 <option key={index} value={company}>
//                   {company}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Leads Display */}
//           <div className="w-full">
//             <h3 className="text-lg font-semibold text-blue-600 mb-4">Leads</h3>
//             <ul className="bg-blue-50 rounded-lg shadow-inner p-4 space-y-2">
//               {leads
//                 .filter((lead) => lead.companyName === selectedCompany)
//                 .map((lead, index) => (
//                   <li
//                     key={index}
//                     className="p-3 bg-white rounded-lg shadow-md hover:shadow-lg transition"
//                   >
//                     <span className="font-bold text-blue-800">{lead.leadName}</span>{' '}
//                     - {lead.leadPhoneNumber}
//                   </li>
//                 ))}
//             </ul>
//           </div>

//           {/* Submit Button */}
//           <button
//             onClick={handleSubmit}
//             className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
//           >
//             Submit Leads
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeadRegistration;
// import React, { useState, useEffect } from "react";
// import * as XLSX from "xlsx";
// import axios from "axios";

// const LeadRegistration = () => {
//   const [fileData, setFileData] = useState([]);
//   const [companies, setCompanies] = useState([]);
//   const [selectedCompany, setSelectedCompany] = useState("");
//   const [leads, setLeads] = useState([]);

//   useEffect(() => {
//     const fetchCompanies = async () => {
//       try {
//         const response = await axios.get("/api/companies"); // Adjust to your backend endpoint
//         setCompanies(response.data);
//       } catch (error) {
//         console.error("Error fetching companies:", error);
//       }
//     };
//     fetchCompanies();
//   }, []);

//   const handleFileUpload = (e) => {
//     const file = e.target.files[0];
//     if (!file) return;

//     const reader = new FileReader();
//     reader.onload = (evt) => {
//       const binaryString = evt.target.result;
//       const wb = XLSX.read(binaryString, { type: "binary" });
//       const ws = wb.Sheets["Sheet1"];
//       const jsonData = XLSX.utils.sheet_to_json(ws);

//       const extractedCompanies = [];
//       const extractedLeads = [];

//       jsonData.forEach((row) => {
//         if (!extractedCompanies.includes(row.CompanyName)) {
//           extractedCompanies.push(row.CompanyName);
//         }
//         extractedLeads.push({
//           companyName: row.CompanyName,
//           leadName: row.LeadName,
//           leadPhoneNumber: row.LeadPhoneNumber,
//         });
//       });

//       setCompanies(extractedCompanies);
//       setLeads(extractedLeads);
//       setFileData(jsonData);
//     };
//     reader.readAsBinaryString(file);
//   };

//   const handleSubmit = async () => {
//     if (!selectedCompany) {
//       alert("Please select a company before submitting leads.");
//       return;
//     }

//     const filteredLeads = leads.filter(
//       (lead) => lead.companyName === selectedCompany
//     );

//     try {
//       const response = await axios.post("/api/submit-leads", {
//         leads: filteredLeads,
//       });
//       console.log("Server Response:", response.data);
//       alert("Leads submitted successfully!");
//     } catch (error) {
//       console.error("Error submitting leads:", error);
//       alert("There was an error submitting the leads.");
//     }
//   };

//   return (
//     <div style={{ minHeight: "100vh", backgroundColor: "#f7fafc", padding: "2rem" }}>
//       <div
//         style={{
//           maxWidth: "800px",
//           margin: "0 auto",
//           backgroundColor: "#ffffff",
//           borderRadius: "8px",
//           boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
//           padding: "1.5rem",
//         }}
//       >
//         <h2 style={{ textAlign: "center", fontSize: "1.5rem", color: "#2b6cb0" }}>
//           Lead Registration
//         </h2>

//         <div style={{ marginTop: "1rem" }}>
//           <label style={{ fontWeight: "600", color: "#2c5282", display: "block", marginBottom: "0.5rem" }}>
//             Upload Excel File
//           </label>
//           <input
//             type="file"
//             accept=".xlsx,.xls"
//             onChange={handleFileUpload}
//             style={{
//               width: "100%",
//               padding: "0.5rem",
//               border: "1px solid #cbd5e0",
//               borderRadius: "4px",
//             }}
//           />
//         </div>

//         <div style={{ marginTop: "1.5rem" }}>
//           <label style={{ fontWeight: "600", color: "#2c5282", display: "block", marginBottom: "0.5rem" }}>
//             Select Company
//           </label>
//           <select
//             value={selectedCompany}
//             onChange={(e) => setSelectedCompany(e.target.value)}
//             style={{
//               width: "100%",
//               padding: "0.5rem",
//               border: "1px solid #cbd5e0",
//               borderRadius: "4px",
//             }}
//           >
//             <option value="">Choose a Company</option>
//             {companies.map((company, index) => (
//               <option key={index} value={company}>
//                 {company}
//               </option>
//             ))}
//           </select>
//         </div>

//         <div style={{ marginTop: "1.5rem" }}>
//           <h3 style={{ fontWeight: "600", color: "#2b6cb0", marginBottom: "0.5rem" }}>
//             Leads
//           </h3>
//           <ul style={{ backgroundColor: "#edf2f7", borderRadius: "4px", padding: "1rem" }}>
//             {leads
//               .filter((lead) => lead.companyName === selectedCompany)
//               .map((lead, index) => (
//                 <li
//                   key={index}
//                   style={{
//                     padding: "0.75rem",
//                     backgroundColor: "#ffffff",
//                     borderRadius: "4px",
//                     marginBottom: "0.5rem",
//                     boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//                   }}
//                 >
//                   <strong style={{ color: "#2c5282" }}>{lead.leadName}</strong> - {lead.leadPhoneNumber}
//                 </li>
//               ))}
//           </ul>
//         </div>

//         <div style={{ marginTop: "1.5rem" }}>
//           <button
//             onClick={handleSubmit}
//             style={{
//               width: "100%",
//               padding: "0.75rem",
//               backgroundColor: "#2b6cb0",
//               color: "#ffffff",
//               fontWeight: "600",
//               border: "none",
//               borderRadius: "4px",
//               cursor: "pointer",
//               boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
//             }}
//           >
//             Submit Leads
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default LeadRegistration;
