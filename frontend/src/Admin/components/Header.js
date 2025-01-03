import React from "react";
import "../style/Header.css";

const Header = () => {
  return (
    <div className="header">
      <div className="header__logo">Cinema Admin</div>
      <nav className="header__nav">
        <a href="/dashboard" className="header__nav-item">
          Dashboard
        </a>
        <a href="/movies" className="header__nav-item">
          Movies
        </a>
        <a href="/showtimes" className="header__nav-item">
          Showtimes
        </a>
        <a href="/logout" className="header__nav-item">
          Logout
        </a>
      </nav>
    </div>
  );
};

export default Header;
