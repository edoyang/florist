import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CarouselV2 from "../../components/CarouselV2";
import PriceDisplay from "../../components/PriceDisplay";
import "./style.scss";

const Product = () => {
  const api = import.meta.env.VITE_API_URL;

  const [products, setProductData] = useState([]);
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState('');
  const [quantity, setQuantity] = useState(1);

  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${api}/products`);
        const data = await response.json();
        setProductData(data);
        const foundProduct = data.find(p => p._id === id);
        setProduct(foundProduct);
        setMainImage(foundProduct ? foundProduct.product_image[0] : '');
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };
    fetchData();
  }, [id]);

  if (!product) {
    return <div>Product not found</div>;
  }

  const handleImageError = (e) => {
    e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
  };

  const handleThumbnailClick = (img) => {
    setMainImage(img);
  };

  const incrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1);
  };

  const decrementQuantity = () => {
    setQuantity(prevQuantity => prevQuantity > 1 ? prevQuantity - 1 : 1);
  };

  return (
    <div id="product-page" className="product-page">
      <div className="images">
        <div className="image-display">
          <img src={mainImage.url} alt={product.product_name} onError={handleImageError} />
        </div>
        <div className="image-collection">
          {product.product_image.map((img, index) => (
            <div className="collection-item" key={index}>
              <img src={img.url} alt={`${product.product_name} ${index + 1}`}
                onClick={() => handleThumbnailClick(img)}
                onError={handleImageError} />
            </div>
          ))}
        </div>
      </div>
      <div className="details">
        <h4 className="title">{product.product_name}</h4>
        <p className="availability">{product.isActive ? "In Stock" : "Out of Stock"}</p>
        <PriceDisplay product={product} />
        <div className="category">
          <p>Category: {product.category.map((cat, index) => (
            <span key={index}>{cat}{index < product.category.length - 1 ? ', ' : ''}</span>
          ))}</p>
        </div>
      </div>
      <div className="order-form">
        <form>
          <label htmlFor="extra">Extra Request:</label>
          <textarea type="text" name="extra" id="extra" placeholder="Any specific requests?" />
          <label htmlFor="date">Pickup Date:</label>
          <input type="date" name="date" id="date" />
          <div className="quantity">
            <button type="button" onClick={decrementQuantity}>-</button>
            <input type="number" name="quantity" id="quantity" value={quantity} min={1} readOnly />
            <button type="button" onClick={incrementQuantity}>+</button>
          </div>
          <button type="submit">Add to Cart</button>
        </form>
      </div>
      <CarouselV2 products={products.filter(p => p.category.some(cat => product.category.includes(cat)))} title="Related Products" links={[]} />
    </div>
  );
};

export default Product;
