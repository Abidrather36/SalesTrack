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

  const handleSearch = (e) => setSearchText(e.target.value);

  // General search filter (works across all fields)
  const generalFilteredData = data.filter((item) =>
    Object.values(item).some((value) =>
      String(value).toLowerCase().includes(searchText.toLowerCase())
    )
  );

  // Specific filter logic for the LeadList (customized for specific fields)
  const leadListFilteredData = generalFilteredData.filter((item) =>
    ["leadRank", "leadCategoryName", "processStepName"].some((key) =>
      item[key]?.toString().toLowerCase().includes(searchText.toLowerCase())
    )
  );

  // Paginated filtered data after applying search and specific filter
  const filteredData = leadListFilteredData.length > 0 ? leadListFilteredData : generalFilteredData;

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
              className="btn btn-danger"
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
                      ) : header.key === "hoursSpent" ? (
                        item[header.key] > 5 ? (
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
                          ?.onAddFollowUpdate?.(item)
                      }
                      handleFollowUpHistory={() =>
                        buttons
                          .find((btn) => btn.key === "followUpHistory")
                          ?.onAddFollowUpHistory?.(item)
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
