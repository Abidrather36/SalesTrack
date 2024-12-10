import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import axios from 'axios';

const LeadRegistration = () => {
  const [fileData, setFileData] = useState([]);
  const [companies, setCompanies] = useState([]);  // To store companies
  const [selectedCompany, setSelectedCompany] = useState('');
  const [leads, setLeads] = useState([]);
  
  // Fetch companies from backend to populate dropdown (if needed)
  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        const response = await axios.get('/api/companies');  // Adjust to your backend endpoint
        setCompanies(response.data);
      } catch (error) {
        console.error("Error fetching companies:", error);
      }
    };
    fetchCompanies();
  }, []);

  // Handle file upload and extract data from Excel
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (evt) => {
      const binaryString = evt.target.result;
      const wb = XLSX.read(binaryString, { type: 'binary' });
      
      // Assuming the Excel file has a sheet named 'Sheet1'
      const ws = wb.Sheets['Sheet1'];
      const jsonData = XLSX.utils.sheet_to_json(ws);

      // Separate company and lead data
      const extractedCompanies = [];
      const extractedLeads = [];

      jsonData.forEach(row => {
        // If the company is not in the list, add it
        if (!extractedCompanies.includes(row.CompanyName)) {
          extractedCompanies.push(row.CompanyName);
        }

        extractedLeads.push({
          companyName: row.CompanyName,
          leadName: row.LeadName,
          leadPhoneNumber: row.LeadPhoneNumber,
        });
      });

      // Update state with extracted data
      setCompanies(extractedCompanies);
      setLeads(extractedLeads);
      setFileData(jsonData);  // Optionally, store raw data for debugging or further processing
    };
    reader.readAsBinaryString(file);
  };

  // Handle submitting the leads to backend
  const handleSubmit = async () => {
    if (!selectedCompany) {
      alert("Please select a company before submitting leads.");
      return;
    }

    const filteredLeads = leads.filter(lead => lead.companyName === selectedCompany);

    try {
      const response = await axios.post('/api/submit-leads', { leads: filteredLeads });
      console.log("Server Response:", response.data);
      alert("Leads submitted successfully!");
    } catch (error) {
      console.error("Error submitting leads:", error);
      alert("There was an error submitting the leads.");
    }
  };

  return (
    <div>
      <h2>Upload Excel File</h2>
      <input type="file" accept=".xlsx,.xls" onChange={handleFileUpload} />
      
      <div>
        <h3>Company Selection</h3>
        <select 
          value={selectedCompany} 
          onChange={(e) => setSelectedCompany(e.target.value)}
        >
          <option value="">Select a Company</option>
          {companies.map((company, index) => (
            <option key={index} value={company}>{company}</option>
          ))}
        </select>
      </div>

      <div>
        <h3>Leads Extracted</h3>
        <ul>
          {leads
            .filter(lead => lead.companyName === selectedCompany)  // Only show leads for the selected company
            .map((lead, index) => (
              <li key={index}>
                {lead.leadName} - {lead.leadPhoneNumber}
              </li>
            ))}
        </ul>
      </div>

      <button onClick={handleSubmit}>Submit Leads</button>
    </div>
  );
};

export default LeadRegistration;
