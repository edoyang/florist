import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './style.scss';
import searchSvg from '../../assets/search.svg';
import logo from '../../assets/logo.png';
import products from '../../dummy/product.json'; 

const Header = () => {
    const [isActive, setIsActive] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const [openCart, setOpenCart] = useState(false);
    const [searchInput, setSearchInput] = useState('');
    const [filteredProducts, setFilteredProducts] = useState([]);
    const [showSearchOverlay, setShowSearchOverlay] = useState(false);
    const headerRef = useRef(null);
    const navigate = useNavigate();

    const handleImageError = (e) => {
        e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
    };

    const toggleClassActive = () => {
        setIsActive(!isActive);
    }

    const toggleClassOpen = () => {
        setIsOpen(!isOpen);
    }

    const toggleCartOpen = () => {
        setOpenCart(!openCart);
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (headerRef.current && !headerRef.current.contains(event.target)) {
                setIsActive(false);
                setShowSearchOverlay(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const handleSearchChange = (event) => {
        const searchText = event.target.value;
        setSearchInput(searchText);

        if (searchText.trim()) {
            const filtered = products.filter(product =>
                product.product_name.toLowerCase().includes(searchText.toLowerCase())
            );
            setFilteredProducts(filtered);
            setShowSearchOverlay(true);
        } else {
            setShowSearchOverlay(false);
        }
    };

    const handleSearchClick = () => {
        if (filteredProducts.length > 0) {
            navigate(`/product/${filteredProducts[0]._id.$oid}#product-page`); // Navigate to the first product's page
        }
    };

    return (
        <div className="header" ref={headerRef}>
            <div className="user-menu">
                <div className={`hamburger ${isActive ? 'active' : ''}`} onClick={toggleClassActive}>
                    <span className="line"></span>
                    <span className="line"></span>
                    <span className="line"></span>
                </div>
                <div className={`left ${isActive ? 'active' : ''}`}>
                    <Link to="/">Home</Link>
                    <Link to="/browse/special">Special Offers</Link>
                    <Link to="/contact">Contact</Link>
                    <Link to="/donate">Donate</Link>
                    <Link to="/payment">Brand</Link>
                </div>
                <div className="right">
                    <div className="user-button" onClick={toggleClassOpen}>
                        <p>Wish list (0)</p>
                    </div>
                    <div className="user-button" onClick={toggleClassOpen}>
                        <p>$AUD</p>

                        <div className={`user-overlay ${isOpen ? 'active' : ''}`}>
                            <p>$AUD</p>
                            <p>$IDR</p>
                        </div>
                    </div>
                    <div className="user-button" onClick={toggleClassOpen}>
                        <p>English</p>

                        <div className={`user-overlay ${isOpen ? 'active' : ''}`}>
                            <p>English</p>
                        </div>
                    </div>
                    <div className="user-button" onClick={toggleClassOpen}>
                        <p>Edoyang</p>

                        <div className={`user-overlay ${isOpen ? 'active' : ''}`}>
                            <Link to="/account">Account</Link>
                            <Link to="/order">Order history</Link>
                            <Link to="/logout">Logout</Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className="main-header">
                <div className="logo">
                    <Link to="/"><img src={logo} alt="Logo" /></Link>
                </div>
                <div className="search-bar">
                    <input type="text" placeholder='Search' value={searchInput} onChange={handleSearchChange} />
                    <button className='search' onClick={handleSearchClick}>
                        <img src={searchSvg} alt="search" loading='lazy' draggable="false" />
                    </button>
                    <div className={`search-overlay ${showSearchOverlay ? 'flex' : 'none'}`}>
                        {filteredProducts.map(product => (
                            <Link to={`/product/${product._id.$oid}#product-page`} key={product._id.$oid} className="item">
                                <div className="item-image">
                                    <img onError={handleImageError} src={product.product_image[0]} alt={product.product_name} />
                                </div>
                                <div className="item-detail">
                                    <p className='item-name'>{product.product_name}</p>
                                    <h4 className='item-price'>${product.price}</h4>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="cart">
                    <div className="logo">
                    <Link to="/"><img src={logo} alt="Logo" /></Link>
                    </div>
                    <div className={`cart-list ${openCart ? 'active' : ''}`}>
                        <p>Your shopping cart is empty</p>

                        {/* <div className="item">
                            <div className="image">
                                <img src="https://via.placeholder.com/150" alt="Product" />
                            </div>
                            <div className="detail">
                                <p>Product Name</p>
                                <p>Price</p>
                            </div>
                            <button>x</button>
                        </div> */}
                        
                    </div>
                    <div className="cart-detail" onClick={toggleCartOpen}>
                        <p>0 Items</p>
                        <p>$0.00</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
