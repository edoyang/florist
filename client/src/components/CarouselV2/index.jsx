import { useRef, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import ReviewStar from '../ReviewStar';
import leftArrow from '../../assets/left.svg';
import rightArrow from '../../assets/right.svg';

const CarouselV2 = ({ title, products, links }) => {
  const carouselRef = useRef(null);
  const totalWidth = useRef(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    if (carouselRef.current) {
      totalWidth.current = carouselRef.current.scrollWidth - carouselRef.current.offsetWidth;
    }
  }, [products]);

  const handleImageError = (e) => {
    e.target.src = 'https://upload.wikimedia.org/wikipedia/commons/6/65/No-Image-Placeholder.svg';
  };

  const handlePrevClick = () => {
    if (carouselRef.current && !isTransitioning) {
      setIsTransitioning(true);
      if (carouselRef.current.scrollLeft === 0) {
        carouselRef.current.scrollLeft = totalWidth.current;
      } else {
        carouselRef.current.scrollLeft -= 250;
      }
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };

  const handleNextClick = () => {
    if (carouselRef.current && !isTransitioning) {
      setIsTransitioning(true);
      if (carouselRef.current.scrollLeft + carouselRef.current.clientWidth >= totalWidth.current) {
        carouselRef.current.scrollLeft = 0; 
      } else {
        carouselRef.current.scrollLeft += 250;
      }
      setTimeout(() => setIsTransitioning(false), 500);
    }
  };
  

  return (
    <div className='carousel-2'>
      <div className="title">
          <div className="top-left">
              <h2 className='title'>{title}</h2>
              <div className="filter">
                {links && links.map(link => (
                  <Link draggable={false} key={link.label} to={link.path}>{link.label}</Link>
                ))}
              </div>
          </div>
          <div className="carousel-controls">
              <button onClick={handlePrevClick}>
                <img draggable={false} src={leftArrow} alt="left" />
              </button>
              <button onClick={handleNextClick}>
                <img draggable={false} src={rightArrow} alt="right" />
              </button>
          </div>
      </div>
      <div ref={carouselRef} className="carousel-2-container">
          {products.map(product => (
              <div key={product.id} className="item">
                  <div className="image">
                      <img draggable={false} 
                        src={product.product_image[0]} 
                        alt={product.product_name}
                        onError={handleImageError}
                      />
                  </div>
                  <p>{product.product_name}</p>
                  <h4>${product.price[0]}</h4>
                  <div className="review">
                    <div className="review-stars">
                      <p>{product.review}</p>
                      <ReviewStar review={product.review} />
                    </div>
                  </div>
              </div>
          ))}
      </div>
    </div>
  );
};

export default CarouselV2;