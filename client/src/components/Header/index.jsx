import { Link } from 'react-router-dom';
import './style.scss';
import { useState } from 'react';

const Header = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleClassActive = () => {
        setIsActive(!isActive);
    }

  return (
    <div className="header">
        <div className="user-menu">
        <div className={`hamburger ${isActive ? 'active' : ''}`} onClick={toggleClassActive}>
                <span className="line"></span>
                <span className="line"></span>
                <span className="line"></span>
            </div>
            <div className={`left ${isActive ? 'active' : ''}`}>
                <Link to="/">Home</Link>
                <Link to="/product">Special Offers</Link>
                <Link to="/contact">Contact</Link>
                <Link to="/donate">Donate</Link>
                <Link to="/payment">Brand</Link>
            </div>
            <div className="right">
                <p>Wish list (0)</p>
                <p>$AUD</p>
                <p>English</p>
                <p>Edoyang</p>
            </div>

        </div>
            <div className="main-header">
                <div className="logo">
                    <h1>LOGO</h1>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder='Search' />
                    <button className='search'>
                        <img src="search.svg" alt="search" loading='lazy' />
                    </button>
                </div>
                <div className="cart">
                    <div className="cart-icon">
                        <i className="fas fa-shopping-cart"></i>
                        <div className="cart-list">
                            <p>Your shopping cart is empty</p>
                        </div>
                    </div>
                    <div className="cart-detail">
                        <p>0 Items</p>
                        <p>$0.00</p>
                    </div>
                </div>
            </div>
    </div>
  )
}

export default Header