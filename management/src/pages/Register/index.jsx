import { useState } from 'react';
import './style.scss'

const Register = () => {

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: formData.username,
          email: formData.email,
          password: formData.password
        })
      });
      const data = await response.json();
      console.log(data);
      alert(data.message);
    } catch (error) {
      console.error('Failed to register', error);
    }
  };

  return (
    <div className="register-page page">
      <form className="register-form user-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" placeholder='Insert username' value={formData.username} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder='Email address' value={formData.email} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder='Password' value={formData.password} onChange={handleChange} />
        </div>
        <div className="input-group">
          <label htmlFor="confirmPassword">Confirm Password</label>
          <input type="password" id="confirmPassword" name="confirmPassword" placeholder='Confirm password' value={formData.confirmPassword} onChange={handleChange} />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  )
}

export default Register;