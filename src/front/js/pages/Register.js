// import React, { useEffect, useState, useContext, } from "react";
// import { Context } from "../store/appContext";
// import { useNavigate } from "react-router-dom";
// import { register } from "./Auth";


// const RegisterForm = () => {
//     const [email, setEmail] = useState("");
//     const [password, setPassword] = useState("");
//     const { store, actions } = useContext(Context);
//     const navigate = useNavigate();

//     const handleRegister = async () => {
//         const data = await register(email, password);
//         if (data){
//             navigate("/login")
//         }
//       };
    
//       return (
//         <div>
//           <h1>Register</h1>
//           <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//           <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
//           <button onClick={handleRegister}>Register</button>
//         </div>
//       );
//     };
    
//     export default RegisterForm;    