import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './style.scss';

function Slider({ items }) {
  const scrollContainer = useRef(null);
  const intervalRef = useRef(null);

  const scrollLeft = () => {
    if (scrollContainer.current) {
      const container = scrollContainer.current;
      if (container.scrollLeft <= 0) {
        container.scrollTo({ left: container.scrollWidth - container.offsetWidth, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: -300, behavior: 'smooth' });
      }
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      const container = scrollContainer.current;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      if (container.scrollLeft >= maxScrollLeft - container.clientWidth) {
        // If near or at the end, jump back to the start
        container.scrollTo({ left: 0, behavior: 'smooth' });
      } else {
        container.scrollBy({ left: 300, behavior: 'smooth' });
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
            // If near or at the end, restart from the beginning
            container.scrollTo({ left: 0, behavior: 'smooth' });
          } else {
            scrollRight();
          }
        }
      }, 3000);
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
          <Link key={index} to={item.link}>
            <img src={item.imageUrl} alt={`Slide ${index + 1}`} />
          </Link>
        ))}
      </div>
      <div className="hero-buttons">
        <button onClick={scrollLeft}><img src='left.svg' alt='left' /></button>
        <button className="right" onClick={scrollRight}><img src='left.svg' alt='right' /></button>
      </div>
    </div>
  );
}

export default Slider;
