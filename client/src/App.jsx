import { Route, Routes } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import { Home } from './pages'
import { Contact } from './pages'
import { Donate } from './pages'
import { Payment } from './pages'
import { Product } from './pages'

function App() {
  return (
    <div className='app'>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product" element={<Product />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </div>
  )
}

export default App
