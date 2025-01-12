import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
        const loginData = { email, password };
        const response = await fetch('http://localhost:4000/user/', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(loginData),
          });
        
        const data = await response.json();
      alert(res.data.message);
    //   {
    //     "username": "user123",
    //     "password": "user12",
    //     "taskIds": [],
    //     "_id": "6783a854dfdb2e3de987b03a",
    //     "__v": 0
    // }
      localStorage.setItem('userId', res.data._id);
      localStorage.setItem('Islogged', true);
    } catch (err) {
      console.error(err.response.data.message);
      alert(err.response.data.message);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Register</button>
    </form>
  );
}

export default Register;
