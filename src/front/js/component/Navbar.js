// src/Layout.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import "../../styles/navbar.css"
import logo from "../../../../docs/assets/logo.jpg"

const Navbar = () => {
  const navigate = useNavigate();

  const handleSignOut = () => {
    sessionStorage.clear()
    navigate('/login'); // Redirect to login page
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid mx-5">
          <img src={logo} alt="logo" style= {{height: "90px"}}/>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"><i className="fa-solid fa-bars"></i></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className={`nav-link ${isActive('/') ? 'active' : ''}`} aria-current="page" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isActive('/signup') ? 'active' : ''}`} href="/signup">
                  Register
                </a>
              </li>
              <li className="nav-item">
                <a className={`nav-link ${isActive('/login') ? 'active' : ''}`} href="/login">Login</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/" onClick={handleSignOut}>Logout</a>
              </li>
              <li className="nav-item dropdown">
                <a className={`nav-link dropdown-toggle ${isActive('/change-password') || isActive('/profile') ? 'active' : ''}`} href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Settings
                </a>
                <ul className="dropdown-menu">
                  <li><a className="dropdown-item" href="#">light dark mode</a></li>
                  <li><a className="dropdown-item" href="#">Change Password</a></li>
                  <li><a className="dropdown-item" href="#">update account/profile </a></li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>



    </div>
  );
};

export default Navbar;





