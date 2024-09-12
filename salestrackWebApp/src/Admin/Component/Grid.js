import React from 'react';

function Grid({ headers = [], data = [], buttons = [] }) {
  return (
    <div>
      {data.length > 0 ? (
        <table className="table table-hover">
          <thead>
            <tr>
              {headers.map((header) => (
                <th key={header.key}>{header.label}</th>
              ))}
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                {headers.map((header) => (
                  <td key={header.key}>{item[header.key]}</td> 
                ))}

                <td>
                  {buttons.map((btn, idx) => (
                    <button
                      key={idx}
                      className={btn.className}
                      onClick={() => btn.onClick(item)}
                    >
                      {btn.label}
                    </button>
                  ))}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data found.</p>
      )}
    </div>
  );
}

export default Grid;
