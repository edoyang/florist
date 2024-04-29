import { Carousel } from '..'
import CarouselButtons from '../CarouselButtons'
import './style.scss'

const Sidebar = () => {
  return (
    <div className="sidebar">
        <div className="category">
          <div className="label">
            <img draggable="false" src="category.svg" alt="category.svg" />
            <p>CATEGORY</p>
          </div>
          <div className="list">
            <div className="label">
              <img draggable="false" src="birthday.svg" alt="birthday.svg" />
              <p>Birthday</p>
            </div>
            <div className="label">
              <img draggable="false" src="anniversary.svg" alt="anniversary.svg" />
              <p>Anniversary</p>
            </div>
            <div className="label">
              <img draggable="false" src="valentine.svg" alt="valentine.svg" />
              <p>Valentine</p>
            </div>
            <div className="label">
              <img draggable="false" src="in-memorial.svg" alt="in-memorial.svg" />
              <p>In Memorial</p>
            </div>
            <div className="label">
              <img draggable="false" src="gift.svg" alt="gift.svg" />
              <p>For Gift</p>
            </div>
            <div className="label">
              <img draggable="false" src="promo.svg" alt="promo.svg" />
              <p>Promo</p>
            </div>
          </div>
        </div>

        <div className="deals single">
          <div className="title">
            <h1>HOT DEALS</h1>
            <CarouselButtons />
          </div>
          <div className="slider">
            <div className="item">
              <img draggable="false" src="example.webp" alt="flowers" />
              <p className='pname'>product name</p>
              <p className='price'>product price</p>
              <p className='review'>star reviews</p>
            </div>
          </div>
        </div>
        

        <Carousel title='HOT DEALS' />

        <Carousel title='TOP DEALS' />


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
          <p>Free shipping on orders over $100</p>
        </div>
    </div>
  )
}

export default Sidebar