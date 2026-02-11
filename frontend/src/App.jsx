import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import axios from 'axios'
import { useState,useEffect } from 'react'
import './App.css'
import CheckoutPage from './pages/CheckoutPage'
import OrdersPage from './pages/OrdersPage'
import TrackingPage from './pages/TrackingPage'

function App() {
  const [cart, setCart] = useState([])
  
  useEffect(() => {
    axios.get('http://localhost:3000/api/cart-items?expand=product')
    .then((res) => setCart(res.data))
    .catch(console.error('error while loading cart'))
  },[])

  return(
    <>
      <Routes>
        <Route path='/' element={<HomePage cart={cart} />} />
        <Route path='checkout' element={<CheckoutPage cart={cart} />} />
        <Route path='orders' element={<OrdersPage/>} />
        <Route path='Tracking' element={<TrackingPage/>} />
      </Routes>
    </>
  )
  
}

export default App
