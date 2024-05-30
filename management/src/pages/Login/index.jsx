import React, { useState } from 'react';
import './style.scss'

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });

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
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credentials)
      });
      const data = await response.json();
      console.log(data);
      if (response.status === 200) {
        alert('Login successful!');
        // Perform further actions like redirecting to another page or storing the user session
      } else {
        alert(data.message);  // Show error message from server
      }
    } catch (error) {
      console.error('Failed to login:', error);
      alert('Failed to login');
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
