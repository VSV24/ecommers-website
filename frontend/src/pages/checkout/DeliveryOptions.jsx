import React from 'react'
import { formatMoney } from '../../utils/money';
import dayjs from 'dayjs';
import axios from 'axios';

const DeliveryOptions = ({deliveryOptions, cartItem , loadCart}) => {
  
  return (
    <>
      <div className="delivery-options">
        <div className="delivery-options-title">
          Choose a delivery option:
        </div>
        {deliveryOptions.map((deliveryOption) => {

          let priceString = 'FREE SHIPPING';
          if (deliveryOption.priceCents > 0) {
            priceString = `${formatMoney(deliveryOption.priceCents)} - shipping`

          }

          const updateDeliverOption = async () => {
            await axios.put(`/api/cart-items/${cartItem.productId}`,{
              deliveryOptionId : deliveryOption.id
            })
            await loadCart()
          }

          return (
            <div className="delivery-option" key={deliveryOption.id} onClick={updateDeliverOption}>
              <input type="radio" checked={deliveryOption.id === cartItem.deliveryOptionId} onChange={() => {}}          className="delivery-option-input"
                name={`delivery-option-${cartItem.productId}`} />
              <div>
                <div className="delivery-option-date">
                  {dayjs(deliveryOption.estimatedDeliveryTimeMs).format('dddd, MMMM DD')}
                </div>
                <div className="delivery-option-price">
                  {priceString}
                </div>
              </div>
            </div>

          )

        })}

      </div>
    </>
  )
}

export default DeliveryOptions
