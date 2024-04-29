import { useRef, useState, useEffect } from 'react';
import CarouselButtons from '../CarouselButtons';

const DealsCarousel = ({ title }) => {
  const carouselRef = useRef(null);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    const carousel = carouselRef.current;
    if (!carousel) return;
    // Check if carousel is at the end
    const isAtEnd = carousel.scrollWidth - carousel.offsetWidth <= carousel.scrollLeft;
    setCanScrollRight(!isAtEnd);
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      carousel.addEventListener('scroll', checkScrollPosition);
      return () => carousel.removeEventListener('scroll', checkScrollPosition);
    }
  }, []);

  return (
    <div className="deals">
      <div className="title">
        <h1>{title}</h1>
        <CarouselButtons carouselRef={carouselRef} canScrollRight={canScrollRight} />
      </div>
      <div className="multi-slider">
        <div className="carousel" ref={carouselRef}>
          {/* First Grid */}
          <div className="grid">
            <div className="item">
                <img draggable="false" src="" alt="" />
                <p className='pname'>product name</p>
                <p className='price'>product price</p>
                <p className='review'>star reviews</p>
            </div>
            <div className="item">
                <img draggable="false" src="" alt="" />
                <p className='pname'>product name</p>
                <p className='price'>product price</p>
                <p className='review'>star reviews</p>
            </div>
            <div className="item">
                <img draggable="false" src="" alt="" />
                <p className='pname'>product name</p>
                <p className='price'>product price</p>
                <p className='review'>star reviews</p>
            </div>
          </div>
          {/* Second Grid */}
          <div className="grid">
            <div className="item">
                <img draggable="false" src="" alt="" />
                <p className='pname'>product name</p>
                <p className='price'>product price</p>
                <p className='review'>star reviews</p>
            </div>
            <div className="item">
                <img draggable="false" src="" alt="" />
                <p className='pname'>product name</p>
                <p className='price'>product price</p>
                <p className='review'>star reviews</p>
            </div>
            <div className="item">
                <img draggable="false" src="" alt="" />
                <p className='pname'>product name</p>
                <p className='price'>product price</p>
                <p className='review'>star reviews</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DealsCarousel;