import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signup } from "./Auth.js"; // Correct import path


const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSignup = async () => {
        const data = await signup(email, password);

        if (data.success) {
            alert("Signup successful! Please log in.");
            navigate("/login"); // Redirect to the login page
        } else {
            // const errorMessage=data.data?.message || data.error || "unknown error ocurred";
            console.log("signup failed message", data)
            const errorMessage=data.data.error
            alert(`Signup failed: ${errorMessage}`);
        }
    };

    return (
        <div className="signup-container">
            <h1>Signup</h1>
            <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
            />
            <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
            />
            <button onClick={handleSignup}>Signup</button>
        </div>
    );
};

export default Signup;
