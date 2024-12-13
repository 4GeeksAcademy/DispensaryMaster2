import React from "react";
import { Link } from "react-router-dom";

export const Sidebar = () => {
    return (
        <div className="d-flex flex-column bg-light" style={{ height: "100vh", width: "250px" }}>
           
            <nav className="nav flex-column px-3">
                {/* Existing Links */}
                <Link className="nav-link" to="/overview">Overview</Link>
                <Link className="nav-link" to="/summary">Summary</Link>
                <Link className="nav-link" to="/dashboards">Dashboards</Link>
                <Link className="nav-link" to="/stores">Stores</Link>
                <Link className="nav-link" to="/suppliers">Suppliers</Link>
                <Link className="nav-link" to="/products">Products</Link>
                <Link className="nav-link" to="/category">Category</Link>
                <Link className="nav-link" to="/orders">Orders</Link>
                <Link className="nav-link" to="/cart-management">Cart Management</Link>
                <Link className="nav-link" to="/inventory">Inventory</Link>
                <Link className="nav-link" to="/users">Users</Link>
                <Link className="nav-link" to="/analytics">Analytics</Link>
                <Link className="nav-link" to="/reports">Reports</Link>
                <Link className="nav-link" to="/barcode-scanner">Barcode Scanner</Link>

                {/* Divider */}
                <hr className="my-3" />

                {/* New Feature Links */}
                <h5 className="px-3 mt-3 text-secondary">Medical Features</h5>
                <Link className="nav-link" to="/medical-dashboard">Medical Dashboard</Link>
                <Link className="nav-link" to="/patient-management">Patient Management</Link>
                <Link className="nav-link" to="/prescription-tracking">Prescription Tracking</Link>
                <Link className="nav-link" to="/medical-reports">Medical Reports</Link>

                {/* Settings Section */}
                <h5 className="px-3 mt-3 text-secondary">Settings</h5>
                <Link className="nav-link" to="/profile-settings">Profile Settings</Link>
                <Link className="nav-link" to="/system-settings">System Settings</Link>
                <Link className="nav-link" to="/notifications">Notifications</Link>

                {/* Help and Logout */}
                <hr className="my-3" />
                <Link className="nav-link" to="/help">Help</Link>
                <Link className="nav-link" to="/contact-us">Contact Us</Link>
                <Link className="nav-link text-danger mt-3" to="/logout">Logout</Link>
            </nav>
        </div>
    );
};

export default Sidebar;
