import React from 'react'
import './TrackingPage.css'
import Header from '../../components/Header'
import dayjs from 'dayjs'
import { useParams } from 'react-router'
import { useEffect, useState } from 'react'
import axios from 'axios'

const TrackingPage = ({ cart }) => {
  const { orderId, productId } = useParams()
  const [order, setOrder] = useState(null)
  useEffect(() => {
    axios
      .get(`/api/orders/${orderId}?expand=products`)
      .then(res => setOrder(res.data))
  }, [orderId])

  if (!order) return <div>Loading...</div>

  const currentOrder = order.products.find(item => item.productId === productId)

  // Total delivery time
  const totalDeliveryTimeMs = currentOrder.estimatedDeliveryTimeMs - order.orderTimeMs;

  // Time passed since order was created
  const timePassedMs = dayjs().valueOf() - order.orderTimeMs;

  // Progress percentage
  let deliveryPercent = (timePassedMs / totalDeliveryTimeMs) * 100;

  // Limit to max 100%
  deliveryPercent = Math.min(deliveryPercent, 100);

  const isPreparing = deliveryPercent < 33;
  const isShipped = deliveryPercent >= 33 && deliveryPercent < 100;
  const isDelivered = deliveryPercent === 100;




  return (
    <>
      <title>tracking</title>
      <Header cart={cart} />

      <div className="tracking-page">
        <div className="order-tracking">
          <a className="back-to-orders-link link-primary" href="/orders">
            View all orders
          </a>

          <div className="delivery-date">
            {isDelivered ? 'Delivered on' : 'Arriving on'}{' '}
            {dayjs(currentOrder.estimatedDeliveryTimeMs).format('dddd, MMMM DD')}
          </div>

          <div className="product-info">
            {currentOrder.name}
          </div>

          <div className="product-info">
            Quantity: {currentOrder.quantity}
          </div>

          <img className="product-image" src={currentOrder.product.image} alt={currentOrder.product.name} />

          <div className="progress-labels-container">
            <div className={`progress-label ${isPreparing ? 'current-status' : ''}`}>
              Preparing
            </div>

            <div className={`progress-label ${isShipped ? 'current-status' : ''}`}>
              Shipped
            </div>

            <div className={`progress-label ${isDelivered ? 'current-status' : ''}`}>
              Delivered
            </div>
          </div>


          <div className="progress-bar-container">
            <div className="progress-bar" style={{ width: `${deliveryPercent}%` }}></div>
          </div>
        </div>
      </div>
    </>
  )
}

export default TrackingPage
