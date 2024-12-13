import React, { useState } from 'react';
import { signup } from './authService';

const SignupForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');

  const handleSignup = async () => {
    const data = await signup(email, password, role);
    if (data.msg) {
      alert(data.msg); // Display success message
    } else {
      alert('Signup failed: ' + data.error); // Display error message
    }
  };

  return (
    <div>
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
      <input
        type="text"
        placeholder="Role"
        value={role}
        onChange={(e) => setRole(e.target.value)}
      />
      <button onClick={handleSignup}>Signup</button>
    </div>
  );
};

export default SignupForm;
