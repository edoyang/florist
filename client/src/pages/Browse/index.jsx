import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ReviewStar from "../../components/ReviewStar";
import categorySvg from "../../assets/category-dark.svg";
import gridSvg from "../../assets/grid.svg";
import "./style.scss";
import allProducts from "../../dummy/product.json";
import anniversary from "../../dummy/product-anniversary.json";
import PriceDisplay from "../../components/PriceDisplay";

const Browse = () => {
  const [products, setProducts] = useState([]);
  const { category } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const fileName = category ? `product-${category}.json` : 'product.json';
      try {
        const response = await fetch(`http://localhost:3000/products/${fileName}`);
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products', error);
      }
    };

    fetchData();
  }, [category]);

  useEffect(() => {
    if (category) {
      const filteredProducts = allProducts.filter(product =>
        product.category.map(cat => cat.toLowerCase()).includes(category.toLowerCase())
      );
      setProducts(filteredProducts);
    } else {
      setProducts(allProducts);
    }
  }, [category]);
  
  
  const [layout, setLayout] = useState('grid');

  const handleLayoutChange = (layoutType) => {
    setLayout(layoutType);
  };

  const handleImageError = (e) => {
    e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
  }

  return (
    <div className="browse-page">
      <div className="utilities">
        <div className="template">
          <div onClick={() => handleLayoutChange('flex')} className="image-container">
            <img src={categorySvg} alt="list" />
          </div>
          <div onClick={() => handleLayoutChange('grid')}  className="image-container">
            <img src={gridSvg} alt="grid" />
          </div>
        </div>

        <div className="sorting">
          <p>Sort By:</p>
          <select className="selection">
            <option value="default">Default</option>
            <option value="price">Price</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      <div className={`listing ${layout}`}>
        {products.map((product, index) => (
          <Link to={`/product/${product._id}`} key={index} className="item">
            <div className="item-image">
              <img onError={handleImageError} src={product.product_image[0]} alt={product.product_name} />
              <div className="buttons">
                <button className="add-to-cart">Add to Cart</button>
                <button className="wish-list">Wish list</button>
              </div>
            </div>
            <div className="item-details">
              <p className="title">{product.product_name}</p>
              <PriceDisplay product={product} />
              <div className="review">
                <div className="review-stars">
                  <ReviewStar review={product.review} />
                </div>
              </div>
              <div className="user-button">
                <button className="add-to-cart">Add to Cart</button>
                <button className="wish-list">Wish list</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Browse;