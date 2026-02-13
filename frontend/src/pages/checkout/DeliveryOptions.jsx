import React from 'react'
import { formatMoney } from '../../utils/money';
import dayjs from 'dayjs';

const DeliveryOptions = ({deliveryOptions, cartItem}) => {
  
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
          return (
            <div className="delivery-option" key={deliveryOption.id}>
              <input type="radio" checked={deliveryOption.id === cartItem.deliveryOptionId}
                className="delivery-option-input"
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
