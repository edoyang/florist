import { useRef, useState, useEffect } from 'react';
import CarouselButtons from '../CarouselButtons';
import './style.scss'

const Carousel = ({ title, products, productsPerGrid, type }) => {
  const carouselRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState({ canScrollLeft: false, canScrollRight: true });
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const carousel = carouselRef.current;
    const updateScrollPosition = () => {
      if (!carousel) return;
      const maxScrollLeft = carousel.scrollWidth - carousel.offsetWidth;
      setScrollPosition({
        canScrollLeft: carousel.scrollLeft > 0,
        canScrollRight: carousel.scrollLeft < maxScrollLeft 
      });
    };

    if (carousel) {
      carousel.addEventListener('scroll', updateScrollPosition);
      updateScrollPosition();
      return () => carousel.removeEventListener('scroll', updateScrollPosition);
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

    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, [scrollPosition.canScrollRight, isHovering]);

  const handleMouseEnter = () => setIsHovering(true);
  const handleMouseLeave = () => setIsHovering(false);

  const chunkProducts = (arr, size) =>
    Array.from({ length: Math.ceil(arr.length / size) }, (v, i) =>
      arr.slice(i * size, i * size + size)
    );

    const productChunks = chunkProducts(products, productsPerGrid);

  const renderStars = (review) => {
    const fullStars = Math.floor(review);
    const halfStar = review % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStar;
    return (
      <>
        {Array(fullStars).fill().map((_, idx) => (
          <img key={idx} src="review.svg" alt="full star"/>
        ))}
        {halfStar === 1 && <img src="review_0.svg" alt="half star"/>}
        {Array(emptyStars).fill().map((_, idx) => (
          <img key={`empty-${idx}`} src="review_0.svg" alt="empty star"/>
        ))}
      </>
    );
  };

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
                <div className="item" key={product.id}>
                  <div className="image">
                    <img draggable="false" src={product.product_image[0]} alt={product.product_name} />
                  </div>
                  <div className="detail">
                    <p className='pname'>{product.product_name}</p>
                    <p className='price'>{`$${product.price[0]}`}</p>
                    <div className='review'>
                      <div className="review-stars">
                        {renderStars(product.review)}
                      </div>
                      <p>({product.review})</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Carousel;