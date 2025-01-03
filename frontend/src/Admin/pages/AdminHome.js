import React from "react";
import "../style/AdminHome.scss";
const AdminHome = () => {
  return (
    <div className="admin-home">
      <div className="section">
        <h2>User Management</h2>
        <div className="content">{/* Add user management content here */}</div>
      </div>
      <div className="section">
        <h2>Ticket Management</h2>
        <div className="content">
          {/* Add ticket management content here */}
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
