import React from "react";
import "./style/DataTable.scss";

const DataTable = () => {
  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            <th>Movie Title</th>
            <th>Showtime</th>
            <th>Seats Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* Example row */}
          <tr>
            <td>Example Movie</td>
            <td>7:00 PM</td>
            <td>50</td>
            <td>
              <button>Edit</button>
              <button>Delete</button>
            </td>
          </tr>
          {/* Add more rows as needed */}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;
