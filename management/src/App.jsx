import { Link, Route, Routes } from 'react-router-dom'
import './App.css'
import { AddProduct, Dashboard, Login, Orders, Products, Register } from './pages'

function App() {

  return (
    <>
      <div className="sidebar">
        <div className="logo">
          <h1>Management</h1>
        </div>
        <div className="menu">
          <Link to="/">Register</Link>
          <Link to="/login">Login</Link>
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/products">Products</Link>
          <Link to="/orders">Orders</Link>
        </div>
      </div>

    <Routes>
      <Route path="/" element={<Register />} />  
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/products" element={<Products />} />
      <Route path="/orders" element={<Orders />} />
      <Route path="add-product" element={<AddProduct />} />

    </Routes>
    </>
  )
}

export default App
