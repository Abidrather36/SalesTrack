import React, { useState } from "react";
import Badge from "react-bootstrap/Badge";
import { FaEdit, FaTrash } from "react-icons/fa";
import ThreeDotMenu from "./ConextMenu";
import TablePagination from "@mui/material/TablePagination";
import { Button } from 'primereact/button';

function Grid({ headers = [], data = [], buttons = [], tableName = "", onAdd }) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5); 
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
    console.log(e.target.value);
  };

  const filteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return (
    <div className="card shadow border-0 mb-7">
      <div className="card-header">
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h5 className="mb-0">{tableName}</h5>
          <div style={{ display: "flex", alignItems: "center" }}>
       
            <input
              type="text"
              placeholder={`Search ${tableName}`}
              name="search"
              id="search"
              value={searchText}
              onChange={handleSearch} 
              style={{ padding: "5px", borderRadius: "4px", border: "1px solid #ddd" }}
            />
          </div>
        </div>
      </div>
      <div className="table-responsive">
        <table className="table table-nowrap">
          <thead className="thead-light">
            <tr>
              {headers.map((item) => (
                <th key={item.key}>{item.label}</th>
              ))}
              {buttons.length > 0 && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header.key}>
                    {header.key === "isActive" ? (
                      item[header.key] ? (
                        <Badge bg="success">Active</Badge>
                      ) : (
                        <Badge bg="danger">Inactive</Badge>
                      )
                    ) : header.key === "userType" ? (
                      item[header.key] === 1 ? (
                        <Badge bg="secondary">Sales Executive</Badge>
                      ) : item[header.key] === 2 ? (
                        <Badge bg="info">Sales Manager</Badge>
                      ) : (
                        "Unknown"
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
            ))}
          </tbody>
        </table>
      </div>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
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
