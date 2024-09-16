import React from "react";
import ThreeDotMenu from "../shared/ConextMenu";
import Badge from 'react-bootstrap/Badge';
import Stack from 'react-bootstrap/Stack';

function Grid({ headers = [], data = [], buttons = [] }) {
  if (!Array.isArray(headers)) {
    console.log("no data in headers");
  }

  return (
    <div className="card shadow border-0 mb-7">
      <div className="card-header">
        <h5 className="mb-0">Enquiries</h5>
      </div>
      <div className="table-responsive">
        <table className="table  table-nowrap">
          <thead className="thead-light">
            <tr>
              {headers.map((item) => {
                return <th key={item.key}>{item.label}</th>;
              })}
              {buttons.length > 0 && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header.key}>
                    {header.key === "isActive"
                      ? item[header.key]
                        ?  <Badge bg="success">Active</Badge>
                        :  <Badge bg="danger">InActive</Badge>
                      : header.key === "userType"
                      ? item[header.key] === 1
                        ? "Sales Executive"
                        : item[header.key] === 2
                        ? "Sales Manager"
                        : "Unknown"
                      : item[header.key]}
                  </td>
                ))}
                <td>
                  <ThreeDotMenu props={["Edit", "Delete"]} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Grid;
