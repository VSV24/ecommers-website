import { Routes, Route } from 'react-router'
import HomePage from './pages/home/HomePage'
import axios from 'axios'
import { useState,useEffect } from 'react'
import './App.css'
import CheckoutPage from './pages/checkout/CheckoutPage'
import OrdersPage from './pages/orders/OrdersPage'
import TrackingPage from './pages/tracking/TrackingPage'

function App() {
  const [cart, setCart] = useState([])
  
  useEffect(() => {
    axios.get('/api/cart-items?expand=product')
    .then((res) => setCart(res.data))
    .catch(err => console.error('Failed to load cart-items', err))
  },[])

  return(
    <>
      <Routes>
        <Route path='/' element={<HomePage cart={cart} />} />
        <Route path='checkout' element={<CheckoutPage cart={cart} />} />
        <Route path='orders' element={<OrdersPage cart={cart} />} />
        <Route path='Tracking' element={<TrackingPage cart={cart}/>} />
      </Routes>
    </>
  )
  
}

export default App
