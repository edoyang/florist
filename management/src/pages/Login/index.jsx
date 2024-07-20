import React, { useState } from 'react';
import { login } from '../../utils/isLogin';
import './style.scss'

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const api = import.meta.env.VITE_API_URL;
  

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCredentials(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`${api}/login`, {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
  
      if (response.ok) {  // Checks if the status code is in the range 200-299
        const data = await response.json();
        console.log(data);
        login();  // Assuming this function properly sets up the session or token
        window.location.href = '/dashboard';
        alert('Login successful!');
      } else {
        // Handle non-200 responses
        const errorData = await response.text();  // Using text() in case the response is not in JSON format
        const message = errorData ? JSON.parse(errorData).message : 'Failed to login';
        alert(message);
      }
    } catch (error) {
      console.error('Failed to login:', error);
      alert('Failed to process login');
    }
  };
  

  return (
    <div className="login-page page">
      <form className="login-form user-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" value={credentials.email} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" value={credentials.password} onChange={handleChange} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
