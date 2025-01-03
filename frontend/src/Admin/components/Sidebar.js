import React from "react";
import "./Sidebar.scss";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <div className="sidebar-logo">Admin Panel</div>
      <ul className="sidebar-menu">
        <li className="sidebar-menu-item">
          <a href="/dashboard">Dashboard</a>
        </li>
        <li className="sidebar-menu-item">
          <a href="/movies">Movies</a>
        </li>
        <li className="sidebar-menu-item">
          <a href="/showtimes">Showtimes</a>
        </li>
        <li className="sidebar-menu-item">
          <a href="/tickets">Tickets</a>
        </li>
        <li className="sidebar-menu-item">
          <a href="/users">Users</a>
        </li>
        <li className="sidebar-menu-item">
          <a href="/settings">Settings</a>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
