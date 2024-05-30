import React, { useState, useEffect } from 'react';
import './style.scss';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:3000/productsManagement');
      setProducts(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const deleteProduct = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/product/${id}`);
      setProducts(products.filter(product => product._id !== id));
    } catch (error) {
      console.error('Failed to delete the product', error);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className='products-page page'>
      <div className="products-page-title">
        <div className="page-title">
          <h1>Products</h1>
        </div>
        <button id="add-product" className='btn-primary'><Link to="/add-product">Add Product</Link></button>
      </div>

      <div className="products-list">
        {products.map((product) => (
          <div key={product._id} className="product">
            <div className="product-image">
              <img src={product.product_image[0]} alt={product.product_name} />
            </div>
            <div className="product-info">
              <h1>{product.product_name}</h1>
              <p>Price: ${product.price}</p>
              <p>Stock: {product.stocks}</p>
            </div>
            <div className="product-actions">
              <div className="buttons flex">
                <Link to={`/edit-product/${product._id}`}>
                  <button className="btn-primary">Edit</button>
                </Link>
                <button className="btn-danger" onClick={() => deleteProduct(product._id)}>Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Products;