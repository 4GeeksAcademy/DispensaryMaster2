// src/Layout.js
import React from "react";
import { useNavigate } from "react-router-dom";
import { FaBell, FaSearch, FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import "../../styles/navbar.css";

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    // Clear user session (e.g., remove token from localStorage)
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to login page
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white shadow-sm">
      <div className="container-fluid d-flex justify-content-between align-items-center">
        {/* Branding/Logo */}
        <a className="navbar-brand d-flex align-items-center" href="/">
          <img
            src="/docs/assets/fulllogo.jpg" // Updated path to your logo
            alt="DispenseMaster Logo"
            className="logo"
            style={{ height: "40px", marginRight: "10px" }}
          />
          <span className="fw-bold text-primary">DispenseMaster</span>
        </a>

        {/* Search Bar */}
        <form className="d-flex" style={{ flexGrow: 1, maxWidth: "400px" }}>
          <input
            className="form-control me-2"
            type="search"
            placeholder="Search..."
            aria-label="Search"
          />
          <button className="btn btn-outline-primary" type="submit">
            <FaSearch />
          </button>
        </form>

        {/* Notification Icon */}
        <div className="dropdown">
          <button
            className="btn btn-light position-relative"
            id="notificationsDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaBell className="text-secondary fs-5" />
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              4
            </span>
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="notificationsDropdown"
          >
            <li>
              <a className="dropdown-item" href="/alerts">
                New Order Received
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/alerts">
                Low Inventory Alert
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/alerts">
                Compliance Update
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <a className="dropdown-item" href="/notifications">
                View All Notifications
              </a>
            </li>
          </ul>
        </div>

        {/* User Profile Dropdown */}
        <div className="dropdown ms-3">
          <button
            className="btn btn-light dropdown-toggle"
            id="userDropdown"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <FaUserCircle className="text-secondary fs-4" /> Matthew Parker
          </button>
          <ul
            className="dropdown-menu dropdown-menu-end"
            aria-labelledby="userDropdown"
          >
            <li>
              <a className="dropdown-item" href="/profile-settings">
                Profile Settings
              </a>
            </li>
            <li>
              <a className="dropdown-item" href="/system-settings">
                System Settings
              </a>
            </li>
            <li>
              <hr className="dropdown-divider" />
            </li>
            <li>
              <button className="dropdown-item text-danger" onClick={handleSignOut}>
                <FaSignOutAlt className="me-2" /> Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
