import './style.scss'
import { Link } from 'react-router-dom'

const Products = () => {
  return (
    <div className='products-page'>
        <div className="products-page-title">
            <div className="page-title">
                <h1>Products</h1>
            </div>
            <button id="add-product" className='btn-primary'><Link to="/add-product">Add Product</Link></button>
        </div>

        <div className="products-list">
            <div className="product">
                <div className="product-image">
                    <img src="" alt="" />
                </div>
                <div className="product-info">
                    <h1>Product 1</h1>
                    <p>Price: $100</p>
                    <p>Stock: 100</p>
                </div>
                <div className="product-actions">
                    <img src="/" alt="" />
                    <div className="buttons flex">
                        <button className="btn-primary">Edit</button>
                        <button className="btn-danger">Delete</button>
                    </div>
                </div>
            </div>
        </div>

        <div className="pagination">
            <button>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button>
        </div>

    </div>
  )
}

export default Products