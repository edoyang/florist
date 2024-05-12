import { useRef, useState, useEffect } from 'react';
import CarouselButtons from '../CarouselButtons';
import ReviewStar from '../ReviewStar';
import { updateScrollPosition } from '../../utils/scroll';
import { chunkProducts } from '../../utils/chunkProduct';
import PriceDisplay from '../PriceDisplay';
import './style.scss';
import { Link } from 'react-router-dom';

const Carousel = ({ title, products, productsPerGrid, type }) => {
  const carouselRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState({ canScrollLeft: false, canScrollRight: true });
  const [isHovering, setIsHovering] = useState(false);

  const handleImageError = (e) => {
    e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
  };
  
  useEffect(() => {
    const update = () => updateScrollPosition(carouselRef, setScrollPosition);
    if (carouselRef.current) {
      carouselRef.current.addEventListener('scroll', update);
      update();
      return () => carouselRef.current.removeEventListener('scroll', update);
    }
  }, []);

  useEffect(() => {
    let interval;
    if (!isHovering) {
      interval = setInterval(() => {
        if (scrollPosition.canScrollRight) {
          carouselRef.current.scrollTo({
            left: carouselRef.current.scrollLeft + carouselRef.current.offsetWidth,
            behavior: 'smooth'
          });
        } else {
          carouselRef.current.scrollTo({
            left: 0,
            behavior: 'smooth'
          });
        }
      }, 5000);
    }

    return () => clearInterval(interval);
  }, [scrollPosition.canScrollRight, isHovering]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);
  const productChunks = chunkProducts(products, productsPerGrid);

  return (
    <div className="deals" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <div className="title">
        <h1>{title}</h1>
        <CarouselButtons carouselRef={carouselRef} {...scrollPosition} />
      </div>
      <div className={`${type} slider`}>
        <div className="carousel" ref={carouselRef}>
          {productChunks.map((chunk, index) => (
            <div className="grid" key={index}>
              {chunk.map(product => (
                <Link to={`/product/${product._id.$oid}#product-page`} key={product._id.$oid} className="item">
                  <div className="image">
                    <img onError={handleImageError} draggable="false" src={product.product_image[0]} alt={product.product_name} />
                  </div>
                  <div className="detail">
                    <p className='pname'>{product.product_name}</p>
                    <PriceDisplay product={product} />
                    <div className='review'>
                      <div className="review-stars">
                        <ReviewStar review={product.review} />
                      </div>
                      <p>({product.review})</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;