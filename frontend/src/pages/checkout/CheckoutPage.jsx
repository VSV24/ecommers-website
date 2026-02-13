import React from 'react';
import './checkout-header.css'
import './CheckoutPage.css'
import axios from 'axios'
import { useState, useEffect } from 'react'
import OrderSummary from './OrderSummary';
import CheckoutHeader from './CheckoutHeader';
import PaymentSummary from './PaymentSummary';

const CheckoutPage = ({ cart }) => {
  let [deliveryOptions, setDeliveryOptions] = useState([])
  let [paymentSummary, setPaymentSummary] = useState(null)

  useEffect(() => {
    axios.get('/api/delivery-options?expand=estimatedDeliveryTime')
      .then((res) => setDeliveryOptions(res.data))
      .catch(err => console.error('Failed to load delivery-options', err))

    axios.get('/api/payment-summary')
      .then((res) => setPaymentSummary(res.data))
      .catch(err => console.error('Failed to load payment-summary', err))
  }, [])

  return (
    <>
      <title>checkout</title>
      <CheckoutHeader paymentSummary={paymentSummary} />

      <div className="checkout-page">
        <div className="page-title">Review your order</div>

        <div className="checkout-grid">
          <OrderSummary cart={cart} deliveryOptions={deliveryOptions} />

          <PaymentSummary paymentSummary={paymentSummary} />
        </div>
      </div>
    </>
  )
}

export default CheckoutPage
