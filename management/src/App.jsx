import { useState, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import { AddProduct, Dashboard, Login, Orders, Products, Register } from './pages';
import Sidebar from './components/Sidebar';
import { isLogin, login, logout } from './utils/isLogin';
import AddProductV2 from './pages/AddProductV2';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(isLogin());

  useEffect(() => {
    setIsLoggedIn(isLogin());
  }, []);

  return (
    <>
      <div className="content">
        <Sidebar isLoggedIn={isLoggedIn} />

        <Routes className='routes'>
          <Route path="/" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/products" element={<Products />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/add-product" element={<AddProductV2 />} />
          <Route path="/edit-product/:id" element={<AddProduct />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
