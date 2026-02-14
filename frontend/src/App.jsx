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
  const [orders, setOrders] = useState([])

  const loadCart = async () => {
    const response = await axios.get('/api/cart-items?expand=product')
    setCart(response.data)
  }

  const loadOrders = async () => {
    const response = await axios.get('/api/orders?expand=products')
    setOrders(response.data)
  }
  
  useEffect(() => {
    loadCart()

    loadOrders()
  })

  return(
    <>
      <Routes>
        <Route path='/' element={<HomePage cart={cart} loadCart={loadCart} />} />
        <Route path='checkout' element={<CheckoutPage cart={cart} />} />
        <Route path='orders' element={<OrdersPage cart={cart} orders={orders} />} />
        <Route path='/tracking/:orderId/:productId' element={<TrackingPage cart={cart} orders={orders}/>} />
      </Routes>
    </>
  )
  
}

export default App
