import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onCategoryChange, toggleTheme, theme }) => {
  return (
    <nav className="navbar">
      <h2 className="logo">TradeHub Ebooks</h2>
      <ul className="nav-links">
        <li onClick={() => onCategoryChange("all")}>All</li>
        <li onClick={() => onCategoryChange("Technical Analysis")}>Technical Analysis</li>
        <li onClick={() => onCategoryChange("Price Action")}>Price Action</li>
        <li onClick={() => onCategoryChange("Fundamental Analysis")}>Fundamental Analysis</li>
        <li onClick={() => onCategoryChange("Other")}>Other</li>
      </ul>
      <button className="theme-switcher" onClick={toggleTheme}>
        {theme === "light" ? "🌙 Dark Mode" : "☀️ Light Mode"}
      </button>
    </nav>
  );
};

export default Navbar;
