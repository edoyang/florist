import { Route, Routes } from 'react-router-dom'
import './App.scss'
import Sidebar from './components/Sidebar'
import { Home } from './pages'
import { Contact } from './pages'
import { Donate } from './pages'
import { Payment } from './pages'
import { Product } from './pages'
import NoPage from './pages/NoPage'
import Browse from './pages/Browse'

function App() {
  return (
    <div className='app'>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/browse/:category?" element={<Browse />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/donate" element={<Donate />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NoPage />} />
      </Routes>
    </div>
  )
}

export default App
