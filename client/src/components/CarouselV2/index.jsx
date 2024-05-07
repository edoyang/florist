import { Link } from 'react-router-dom';
import './style.scss';

const CarouselV2 = ({ title, products }) => {
  return (
    <div className='carousel-2'>
        <div className="title">
            <div className="top-left">
                <h2>{title}</h2>
                <div className="filter">
                    <Link to="/products">View All</Link>
                    <Link to="/products">Birthday</Link>
                    <Link to="/products">Anniversary</Link>
                    <Link to="/products">Valentine</Link>
                    <Link to="/products">In Memorial</Link>
                    <Link to="/products">For Gift</Link>
                    <Link to="/products">Promo</Link>
                </div>
            </div>
            <div className="carousel-2-buttons">
                <button className="left">Left</button>
                <button className="right">Right</button>
            </div>
        </div>

        <div className="carousel-2-container">
            {products.map(product => (
                <div key={product.id} className="item">
                    <div className="image">
                        <img src={product.product_image[0]} alt={product.product_name} />
                    </div>
                    <h3>{product.product_name}</h3>
                    <p>${product.price[0]}</p>
                </div>
            ))}
        </div>
    </div>
  )
}

export default CarouselV2;
