import React from "react";

function Grid({ headers = [], data = [] ,buttons=[]}) {
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
              {buttons.length>0 && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header.key}>
                    {header.key === "isActive"
                      ? item[header.key]
                        ? "Active"
                        : "Inactive"
                      : item[header.key]}
                  </td>
                ))}
                <td></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="card-footer border-0 py-5">
        <span className="text-muted text-sm">
          Showing 10 items out of 250 results found
        </span>
      </div>
    </div>
  );
}

export default Grid;
