import React from 'react'
import { useState } from 'react'
import { formatMoney } from '../../utils/money'
import axios from 'axios'
import QuantitySelector from '../../components/QuantitySelector'

const Product = ({ product, loadCart }) => {
  let [quantity, setQuantity] = useState(1)
  const [added, setAdded] = useState(false)


  const addToCart = async () => {
    await axios.post('/api/cart-items', {
      productId: product.id,
      quantity: quantity
    })
    await loadCart()
    setAdded(true)

    setTimeout(() => {
      setAdded(false)
    }, 500)
  }

  const selectQuantity = (e) => {
    const updatedQuantity = Number(e.target.value)
    setQuantity(updatedQuantity)
  }

  return (
    <div key={product.id} className="product-container">
      <div className="product-image-container">
        <img className="product-image"
          src={product.image} />
      </div>

      <div className="product-name limit-text-to-2-lines">
        {product.name}
      </div>

      <div className="product-rating-container">
        <img className="product-rating-stars"
          src={`images/ratings/rating-${(product.rating.stars) * 10}.png`} />
        <div className="product-rating-count link-primary">
          {product.rating.count}
        </div>
      </div>

      <div className="product-price">
        {formatMoney(product.priceCents)}
      </div>

      <QuantitySelector quantity={quantity} onChange={selectQuantity} />

      <div className="product-spacer"></div>

      <div className={`added-to-cart ${added ? 'visible' : ''}`}>
        <img src="images/icons/checkmark.png" alt="added" />
        added
      </div>


      <button className="add-to-cart-button button-primary"
        onClick={addToCart}>
        Add to Cart
      </button>
    </div>
  )
}

export default Product
