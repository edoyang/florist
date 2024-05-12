import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CarouselV2 from "../../components/CarouselV2";
import PriceDisplay from "../../components/PriceDisplay";
import products from "../../dummy/product.json";
import "./style.scss";

const Product = () => {
  const { id } = useParams(); // This 'id' is expected to be a string matching MongoDB's ObjectId
  const product = products.find(p => p._id.$oid === id); // Use _id.$oid to find the product

  if (!product) {
    return <div>Product not found</div>;
  }

  const [mainImage, setMainImage] = useState(product.product_image[0]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    setMainImage(product.product_image[0]);
  }, [product]);

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

  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const elementId = hash.replace("#", "");
      const element = document.getElementById(elementId);
      if (element) {
        const yOffset = -250;
        const y = element.getBoundingClientRect().top + window.scrollY + yOffset;
        window.scrollTo({ top: y });
      }
    }
  }, [product]);

  return (
    <div id="product-page" className="product-page">
      <div className="images">
        <div className="image-display">
          <img src={mainImage} alt={product.product_name} onError={handleImageError} />
        </div>
        <div className="image-collection">
          {product.product_image.map((img, index) => (
            <div className="collection-item" key={index}>
              <img src={img} alt={`${product.product_name} ${index + 1}`}
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
      
      <CarouselV2 products={products.filter(p => p.category.includes('Birthday'))} title="Related Products" links={[]} />
    </div>
  );
};

export default Product;
