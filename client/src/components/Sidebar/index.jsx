import { Carousel } from '..'
import CarouselButtons from '../CarouselButtons'
import productData from '../../dummy/product.json'
{/* const productPromise = fetch('http://localhost:5000/api/products').then(res => res.json()); */}
import './style.scss'
import Category from '../Category'

const Sidebar = () => {
  return (
    <div className="sidebar">
        <Category />

        <Carousel title="HOT DEALS" products={productData} productsPerGrid={1} type="single" />
        <Carousel title="HOT DEALS" products={productData} productsPerGrid={3} type="multi" />
        <Carousel title="HOT DEALS" products={productData} productsPerGrid={3} type="multi" />

        <div className="deals">
          <div className="title">
            <h1>NEWSLETTER</h1>
          </div>
          <div className="newsletter">
            <p>Sign up for our newsletter</p>
            <input type="email" placeholder="Enter your email" />
            <button className="subscribe">Subscribe</button>
          </div>
        </div>

        <div className="founder">
          <img draggable="false" src="" alt="" />
          <h3>Edoardo</h3>
          <p>Hehe</p>
        </div>

        <div className="promo">
          <img draggable="false" src="" alt="" />
          <button>Free shipping on orders over $100</button>
        </div>
    </div>
  )
}

export default Sidebar