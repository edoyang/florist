import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';
import leftArrow from '../../assets/left.svg';
import rightArrow from '../../assets/right.svg';

function Slider({ items }) {
  const scrollContainer = useRef(null);
  const intervalRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainer.current) {
      const container = scrollContainer.current;
      if (container.scrollLeft <= 0) {
        container.scrollTo({ left: container.scrollWidth - container.offsetWidth, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -150, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      const container = scrollContainer.current;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScrollLeft - container.clientWidth) {
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 150, behavior: 'smooth' });
      }
    }
  };

  const startAutoScroll = () => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        if (scrollContainer.current) {
          const container = scrollContainer.current;
          const maxScrollLeft = container.scrollWidth - container.clientWidth;
          if (container.scrollLeft >= maxScrollLeft - container.clientWidth) {
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRight();
          }
        }
      }, 1500);
    }
  };

  const stopAutoScroll = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  };

  useEffect(() => {
    startAutoScroll();
    return () => stopAutoScroll();
  }, []);

  return (
    <div className="hero" onMouseEnter={stopAutoScroll} onMouseLeave={startAutoScroll}>
      <div className="container" ref={scrollContainer}>
        {items.map((item, index) => (
          <Link draggable={false} key={index} to={item.link}>
            <img draggable={false} src={item.imageUrl} alt={`Slide ${index + 1}`} />
          </Link>
        ))}
      </div>
      <div className="hero-buttons">
        <button draggable={false} onClick={scrollLeft}><img draggable={false} src={leftArrow} alt='left' /></button>
        <button draggable={false} onClick={scrollRight}><img draggable={false} src={rightArrow} alt='right' /></button>
      </div>
    </div>
  );
}

export default Slider;
