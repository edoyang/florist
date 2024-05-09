import './style.scss'
import LeftArrow from '../../assets/left.svg';
import RightArrow from '../../assets/right.svg';

const CarouselButtons = ({ carouselRef, canScrollRight, canScrollLeft }) => {
  const scrollCarousel = (offset) => {
    if (carouselRef.current) {
      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollLeft + offset,
        behavior: 'smooth'
      });
    }
  };

  const handleMoveLeft = () => {
    if (canScrollLeft) {
      scrollCarousel(-carouselRef.current.offsetWidth);
    } else {
      carouselRef.current.scrollTo({
        left: carouselRef.current.scrollWidth - carouselRef.current.offsetWidth,
        behavior: 'smooth'
      });
    }
  };

  const handleMoveRight = () => {
    if (canScrollRight) {
      scrollCarousel(carouselRef.current.offsetWidth);
    } else {
      carouselRef.current.scrollTo({
        left: 0,
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className='carousel-buttons'>
        <button onClick={handleMoveLeft}><img src={LeftArrow} alt="Left" draggable="false" /></button>
        <button onClick={handleMoveRight}><img src={RightArrow} alt="Right" draggable="false" /></button>
    </div>
  );
}

export default CarouselButtons;
