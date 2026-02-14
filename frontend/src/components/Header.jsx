import './Header.css'
import { Link } from 'react-router'
import {useState} from 'react'
import { useNavigate } from 'react-router'


const Header = ({ cart }) => {
  const [text, setText] = useState("");
  const navigate = useNavigate()

  let totalQuantity = 0
  cart.forEach(cartItem => {
    totalQuantity += cartItem.quantity
  });

  const handleSubmit = () => {
    navigate(`/?search=${text}`)
  }

  const handleChange = (e) => {
    setText(e.target.value)
  };
  

  return (
    <>
      <div className="header">
        <div className="left-section">
          <Link to="/" className="header-link">
            <img className="logo"
              src="images/logo-white.png" />
            <img className="mobile-logo"
              src="images/mobile-logo-white.png" />
          </Link>
        </div>

        <div className="middle-section">
          <input className="search-bar" type="text" value={text} placeholder="Search" onChange={handleChange} />

          <button className="search-button" onClick={handleSubmit} >
            <img className="search-icon" src="images/icons/search-icon.png" />
          </button>
        </div>

        <div className="right-section">
          <Link className="orders-link header-link" to="/orders">

            <span className="orders-text">Orders</span>
          </Link>

          <Link className="cart-link header-link" to="/checkout">
            <img className="cart-icon" src="images/icons/cart-icon.png" />
            <div className="cart-quantity">{totalQuantity}</div>
            <div className="cart-text">Cart</div>
          </Link>
        </div>
      </div >
    </>
  )
}

export default Header
