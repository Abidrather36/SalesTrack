import React, { useState } from "react";
import { toast } from "react-toastify";
import { FaUpload, FaPlus, FaSave } from "react-icons/fa";
import * as XLSX from "xlsx";
import "./bulkExample.css"; // Add appropriate styling

const BulkInsert = () => {
  const [data, setData] = useState([]);
  const [errors, setErrors] = useState([]);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onload = (event) => {
      const binaryStr = event.target.result;
      const workbook = XLSX.read(binaryStr, { type: "binary" });
      const sheetName = workbook.SheetNames[0];
      const sheetData = XLSX.utils.sheet_to_json(workbook.Sheets[sheetName]);

      setData(sheetData); // Assuming JSON structure matches the required data
    };

    reader.readAsBinaryString(file);
  };

  const addNewRow = () => {
    setData([...data, { name: "", email: "", phone: "" }]);
  };

  const handleInputChange = (index, field, value) => {
    const updatedData = [...data];
    updatedData[index][field] = value;
    setData(updatedData);
  };

  const validateAndSubmit = () => {
    const invalidRows = data.filter(
      (item) => !item.name || !item.email || !item.phone
    );
    if (invalidRows.length > 0) {
      setErrors(invalidRows);
      toast.error("Please fix validation errors before submitting.");
      return;
    }

    // Submit valid data to the backend
    console.log("Submitting data:", data);
    toast.success("Bulk data submitted successfully!");
  };

  return (
    <div className="bulk-insert-page">
      <h2>Bulk Insertion</h2>
      <div className="upload-section">
        <label htmlFor="file-upload" className="btn btn-primary">
          <FaUpload /> Upload File
        </label>
        <input
          id="file-upload"
          type="file"
          accept=".csv, .xlsx"
          style={{ display: "none" }}
          onChange={handleFileUpload}
        />
      </div>

      <div className="manual-entry">
        <h4>Manual Entry</h4>
        <table className="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index}>
                <td>
                  <input
                    type="text"
                    value={row.name || ""}
                    onChange={(e) =>
                      handleInputChange(index, "name", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="email"
                    value={row.email || ""}
                    onChange={(e) =>
                      handleInputChange(index, "email", e.target.value)
                    }
                  />
                </td>
                <td>
                  <input
                    type="text"
                    value={row.phone || ""}
                    onChange={(e) =>
                      handleInputChange(index, "phone", e.target.value)
                    }
                  />
                </td>
                <td>
                  <button
                    className="btn btn-danger"
                    onClick={() =>
                      setData(data.filter((_, i) => i !== index))
                    }
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn btn-secondary" onClick={addNewRow}>
          <FaPlus /> Add Row
        </button>
      </div>

      <div className="action-buttons">
        <button className="btn btn-success" onClick={validateAndSubmit}>
          <FaSave /> Submit
        </button>
      </div>

      {errors.length > 0 && (
        <div className="error-section">
          <h4>Validation Errors</h4>
          <ul>
            {errors.map((error, index) => (
              <li key={index}>Row {index + 1} is invalid.</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default BulkInsert;
