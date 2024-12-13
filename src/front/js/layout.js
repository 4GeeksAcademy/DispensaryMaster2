import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import injectContext from "./store/appContext"; // Context for global state
import Home from "./pages/Home";
import AboutUs from "./pages/AboutUs";
import Shop from "./pages/Shop";
import Deals from "./pages/Deals";
import ContactUs from "./pages/ContactUs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import Products from "./pages/Products";
import Inventory from "./pages/Inventory";
import Invoices from "./pages/Invoices";
import Stores from "./pages/Stores";
import Suppliers from "./pages/Suppliers";
import Orders from "./pages/Orders";
import CartManagement from "./pages/CartManagement";
import Users from "./pages/Users";
import Analytics from "./pages/Analytics";
import Reports from "./pages/Reports";
import BarcodeScanner from "./pages/BarcodeScanner";
import Navbar from "./component/Navbar";
import Sidebar from "./component/Sidebar";
import { Footer } from "./component/footer";

const Layout = () => {
    const basename = process.env.BASENAME || "";

    return (
        <BrowserRouter basename={basename}>
            <ScrollToTop>
                {/* Navbar */}
                <Navbar />
                
                <div className="d-flex">
                    <Sidebar />
                    <div className="flex-grow-1 p-3">

                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/about-us" element={<AboutUs />} />
                            <Route path="/shop" element={<Shop />} />
                            <Route path="/deals" element={<Deals />} />
                            <Route path="/contact-us" element={<ContactUs />} />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />

                            {/* Protected Routes */}
                            <Route path="/dashboard" element={<Dashboard />} />
                            <Route path="/products" element={<Products />} />
                            <Route path="/inventory" element={<Inventory />} />
                            <Route path="/invoices" element={<Invoices />} />
                            <Route path="/stores" element={<Stores />} />
                            <Route path="/suppliers" element={<Suppliers />} />
                            <Route path="/orders" element={<Orders />} />
                            <Route path="/cart-management" element={<CartManagement />} />
                            <Route path="/users" element={<Users />} />
                            <Route path="/analytics" element={<Analytics />} />
                            <Route path="/reports" element={<Reports />} />
                            <Route path="/barcode-scanner" element={<BarcodeScanner />} />

                            {/* Fallback Route */}
                            <Route path="*" element={<h1>Page Not Found</h1>} />
                        </Routes>
                    </div>
                </div>

                {/* Footer */}
                <Footer />
            </ScrollToTop>
        </BrowserRouter>
    );
};

export default injectContext(Layout);
