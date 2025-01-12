import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const loginData = { username, password };
  
    try {
      const response = await fetch('http://localhost:4000/user/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });
  
      const data = await response.json();
  
      if (response.ok) {
        // Handle successful login, e.g., store the user ID in localStorage
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('Islogged', true);
        window.location.href = '/home'; // Redirect to the home page
      } else {
        console.error('Error:', data.message); // Log the error message
        alert('Login failed: ' + data.message);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };
  

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input
        type="username"
        placeholder="username"
        value={username}
        onChange={(e) => setusername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
}

export default Login;
