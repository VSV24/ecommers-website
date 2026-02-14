import React from 'react'
import dayjs from 'dayjs'
import { formatMoney } from '../../utils/money'
import DeliveryOptions from './DeliveryOptions'
import axios from 'axios'
import { useState } from 'react'
import QuantitySelector from '../../components/QuantitySelector'


const OrderSummary = ({ cart, deliveryOptions, loadCart }) => {
  const [editingItemId, setEditingItemId] = useState(null)
  const [quantity, setQuantity] = useState(1)


  return (
    <>
      <div className="order-summary">
        {deliveryOptions.length > 0 && cart.map((cartItem) => {
          const selectDeliveryOption = deliveryOptions.find((deliveryOption) => {
            return deliveryOption.id === cartItem.deliveryOptionId
          })


          const deleteProduct = async () => {
            await axios.delete(`/api/cart-items/${cartItem.productId}`)
            await loadCart()
          }


          return (
            <div className="cart-item-container" key={cartItem.id}>
              <div className="delivery-date">
                Delivery date: {dayjs(selectDeliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM D')}
              </div>

              <div className="cart-item-details-grid">
                <img className="product-image"
                  src={cartItem.product.image} />

                <div className="cart-item-details">
                  <div className="product-name">
                    {cartItem.product.name}
                  </div>
                  <div className="product-price">
                    {formatMoney(cartItem.product.priceCents)}
                  </div>
                  <div className="product-quantity">
                    <span>
                      Quantity: <span className="quantity-label">{cartItem.quantity}</span>
                    </span>
                    <span
                      className="update-quantity-link link-primary"
                      onClick={() => {
                        setEditingItemId(cartItem.id)
                        setQuantity(cartItem.quantity)
                      }}
                    >
                      Update
                    </span>

                    {editingItemId === cartItem.id && (
                      <>
                      <QuantitySelector quantity={quantity} onChange={(e) => setQuantity(+e.target.value)} />

                        <span
                          className="update-quantity-link link-primary"
                          onClick={async () => {
                            await axios.put(`/api/cart-items/${cartItem.productId}`, {
                              quantity
                            })
                            await loadCart()
                            setEditingItemId(null)
                          }}
                        >
                          Save
                        </span>
                      </>
                    )}
                    <span className="delete-quantity-link link-primary" onClick={deleteProduct} >
                      Delete
                    </span>
                  </div>
                </div>

                <DeliveryOptions deliveryOptions={deliveryOptions} cartItem={cartItem} loadCart={loadCart} />
              </div>
            </div>
          )
        })}

      </div>
    </>
  )
}

export default OrderSummary
